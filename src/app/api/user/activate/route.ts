import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import redis from "@/lib/redis";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { apiKey } = await req.json();

    if (!apiKey) {
      return NextResponse.json({ error: "API Key is required" }, { status: 400 });
    }

    // 1. Fetch Key Data
    const keyDataStr = await redis.get(`apikey:${apiKey}`);

    if (!keyDataStr) {
      return NextResponse.json({ error: "Invalid API Key" }, { status: 404 });
    }

    let keyData;
    try {
      keyData = JSON.parse(keyDataStr);
    } catch (e) {
      // Legacy handling: If value is just a string (userId), treat it as active if it matches user.
      if (keyDataStr === session.user.id) {
          // It's a legacy active key.
           // Update User Profile just in case
           const userKey = `user:${session.user.id}`;
           const userStr = await redis.get(userKey);
           if (userStr) {
             const userData = JSON.parse(userStr);
             userData.apiKey = apiKey;
             userData.accountStatus = "active";
             await redis.set(userKey, JSON.stringify(userData));
           }
           // Update Key to new format
           await redis.set(`apikey:${apiKey}`, JSON.stringify({
               userId: session.user.id,
               status: "active",
               activatedAt: new Date().toISOString()
           }));

           return NextResponse.json({ success: true, message: "Account Activated (Legacy Key Migration)" });
      }
      return NextResponse.json({ error: "Invalid API Key format" }, { status: 400 });
    }

    // 2. Validate Key Ownership (Security)
    if (keyData.userId !== session.user.id) {
      return NextResponse.json({ error: "This API Key does not belong to your account." }, { status: 403 });
    }

    // 3. Validate Status
    if (keyData.status === "active") {
        return NextResponse.json({ success: true, message: "Account is already active." });
    }

    if (keyData.status !== "pending") {
        return NextResponse.json({ error: "This API Key is invalid or expired." }, { status: 400 });
    }

    // 4. Activate Account
    // A. Update Key Status
    keyData.status = "active";
    keyData.activatedAt = new Date().toISOString();
    await redis.set(`apikey:${apiKey}`, JSON.stringify(keyData));

    // B. Link to User Profile
    const userKey = `user:${session.user.id}`;
    const userStr = await redis.get(userKey);
    if (userStr) {
      const userData = JSON.parse(userStr);
      userData.apiKey = apiKey;
      userData.accountStatus = "active";
      await redis.set(userKey, JSON.stringify(userData));
    }

    return NextResponse.json({ success: true, message: "Account Activated Successfully" });

  } catch (error: any) {
    console.error("Error activating account:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
