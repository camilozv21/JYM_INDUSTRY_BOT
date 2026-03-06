import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import redis from "@/lib/redis";

const storage = new Storage({
  projectId: JSON.parse(process.env.GCP_KEY || "{}").project_id,
  credentials: JSON.parse(process.env.GCP_KEY || "{}"),
});

const bucketName = process.env.BUCKET_NAME || "data-clients-jym";

// GET: List files for the authenticated user
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check Account Status
  const userKey = `user:${session.user.id}`;
  const userStr = await redis.get(userKey);
  
  // If user doesn't exist in Redis yet but is logged in (via provider), they might need init. 
  // But for now, we treat as not active or create default? 
  // Let's assume activation creates the Redis entry or Auth flow does.
  // Actually, activation creates it if not exists or updates it.
  
  if (!userStr) {
      // User logged in but no redis profile? Maybe they haven't activated?
      // Or maybe the auth provider didn't sync? 
      // Safe to require activation.
      // Actually if userStr is null, we can't check status.
      return NextResponse.json({ error: "Account not setup. Please go to Activation page." }, { status: 403 });
  }
  
  let userData;
  try {
      userData = JSON.parse(userStr);
  } catch (e) {
      return NextResponse.json({ error: "User data error" }, { status: 500 });
  }

  if (userData.accountStatus !== 'active') {
      return NextResponse.json({ error: "Account not active. Please activate your API Key." }, { status: 403 });
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

  // Check Account Status
  const userKey = `user:${session.user.id}`;
  const userStr = await redis.get(userKey);
  if (!userStr) {
      return NextResponse.json({ error: "Account not setup. Please go to Activation page." }, { status: 403 });
  }
  
  let userData;
  try {
      userData = JSON.parse(userStr);
  } catch (e) {
      return NextResponse.json({ error: "User data error" }, { status: 500 });
  }

  if (userData.accountStatus !== 'active') {
      return NextResponse.json({ error: "Account not active. Please activate your API Key." }, { status: 403 });
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

    // Trigger n8n webhook for deletion
    try {
      const webhookUrl = "https://primary-production-dd6b7.up.railway.app/webhook/delete_replace";
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key-auth": process.env.API_KEY_AUTH || ""
        },
        body: JSON.stringify({
          success: true,
          action: "delete",
          files: [{
            fileName: filename,
            originalName: filename.split('/').pop() || filename
          }]
        }),
      });
    } catch (webhookError) {
      console.error("Error triggering deletion webhook:", webhookError);
      // We don't fail the deletion if the webhook fails, but we log it.
    }

    return NextResponse.json({ success: true, message: "File deleted successfully" });

  } catch (error: any) {
    console.error("Error deleting file:", error);
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
  }
}
