import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const storage = new Storage({
  projectId: JSON.parse(process.env.GCP_KEY || "{}").project_id,
  credentials: JSON.parse(process.env.GCP_KEY || "{}"),
});

const bucketName = process.env.BUCKET_NAME || "data-clients-jym";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const files: File[] = [];

    // Recolectar todos los archivos del formData (pueden venir con cualquier key o múltiples veces con la misma)
    formData.forEach((value) => {
      if (value instanceof File) {
        files.push(value);
      }
    });

    if (files.length === 0) {
      return NextResponse.json(
        { error: "No files provided" },
        { status: 400 }
      );
    }

    const uploadPromises = files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `users/${session!.user!.id}/${Date.now()}-${file.name.replace(/\s/g, "_")}`;
      const bucket = storage.bucket(bucketName);
      const blob = bucket.file(fileName);

      // Subir el archivo
      await blob.save(buffer, {
        contentType: file.type,
        resumable: false // Para archivos pequeños/medianos es más rápido false
      });

      // Generar URL firmada (valida por 1 hora por defecto, ajustable)
      const [signedUrl] = await blob.getSignedUrl({
        action: "read",
        expires: Date.now() + 1000 * 60 * 60, // 1 hora
      });

      return {
        fileName,
        originalName: file.name,
        signedUrl,
        publicUrl: `https://storage.googleapis.com/${bucketName}/${fileName}`
      };
    });

    const results = await Promise.all(uploadPromises);

    // Enviar los resultados al webhook de n8n
    let webhookSuccess = false;
    try {
      const webhookUrl = "https://primary-production-dd6b7.up.railway.app/webhook/get_files";
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key-auth": process.env.API_KEY_AUTH || ""
        },
        body: JSON.stringify({
          success: true,
          uploadedConfig: {
            count: results.length,
            bucket: bucketName
          },
          files: results
        }),
      });

      if (webhookResponse.ok) {
        webhookSuccess = true;
      } else {
        console.warn("Error sending data to n8n webhook:", webhookResponse.statusText);
      }
    } catch (webhookError) {
      console.error("Error connecting to n8n webhook:", webhookError);
    }

    return NextResponse.json({
      success: true,
      warning: webhookSuccess ? undefined : "Los archivos se subieron correctamente, pero el sistema de procesamiento no respondió. Por favor contacta a soporte: jymindustry@jymindustry.com",
      uploadedConfig: {
        count: results.length,
        bucket: bucketName
      },
      files: results
    });

  } catch (error: any) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Error uploading file", details: error.message },
      { status: 500 }
    );
  }
}
