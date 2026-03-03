import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const storage = new Storage({
  projectId: JSON.parse(process.env.GCP_KEY || "{}").project_id,
  credentials: JSON.parse(process.env.GCP_KEY || "{}"),
});

const bucketName = process.env.BUCKET_NAME || "videos-uploaded-industry";

// GET: List files for the authenticated user
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const bucket = storage.bucket(bucketName);
    const prefix = `users/${session.user.id}/`;

    const [files] = await bucket.getFiles({ prefix });

    const fileList = await Promise.all(files.map(async (file) => {
        const [metadata] = await file.getMetadata();
        
        // Generate a signed URL for download/preview
        const [signedUrl] = await file.getSignedUrl({
            action: 'read',
            expires: Date.now() + 1000 * 60 * 60, // 1 hour
        });

        return {
            name: file.name.replace(prefix, ''), // Show only relative name
            fullName: file.name, // Full path for deletion
            size: parseInt(String(metadata.size || '0')),
            contentType: metadata.contentType,
            updated: metadata.updated,
            url: signedUrl,
            publicUrl: `https://storage.googleapis.com/${bucketName}/${file.name}`
        };
    }));

    // Sort by most recent
    fileList.sort((a, b) => new Date(b.updated || 0).getTime() - new Date(a.updated || 0).getTime());

    return NextResponse.json({ files: fileList });
  } catch (error: any) {
    console.error("Error listing files:", error);
    return NextResponse.json({ error: "Failed to list files" }, { status: 500 });
  }
}

// DELETE: Remove a specific file
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { filename } = await req.json();

    if (!filename) {
        return NextResponse.json({ error: "Filename is required" }, { status: 400 });
    }

    // Security check: Ensure the file belongs to the user
    // The filename must start with users/{userId}/
    const expectedPrefix = `users/${session.user.id}/`;
    if (!filename.startsWith(expectedPrefix)) {
        return NextResponse.json({ error: "Forbidden: You can only delete your own files" }, { status: 403 });
    }

    const bucket = storage.bucket(bucketName);
    const file = bucket.file(filename);

    const [exists] = await file.exists();
    if (!exists) {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    await file.delete();

    return NextResponse.json({ success: true, message: "File deleted successfully" });

  } catch (error: any) {
    console.error("Error deleting file:", error);
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
  }
}
