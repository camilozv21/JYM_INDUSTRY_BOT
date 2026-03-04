import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import redis from "@/lib/redis";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // 1. Check if user is authenticated and is a superadmin
    if (!session || !session.user || session.user.role !== "superadmin") {
      return NextResponse.json({ error: "Unauthorized: Superadmin access required" }, { status: 403 });
    }

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 2. Find the user ID by email
    const emailKey = `user:email:${email}`;
    const userId = await redis.get(emailKey);

    if (!userId) {
      return NextResponse.json({ error: "User not found. Please ask the user to sign in once first." }, { status: 404 });
    }

    // 3. Generate a new API Key
    const apiKey = `sk_live_${uuidv4().replace(/-/g, "")}`;

    // 4. Store in Redis
    // A. Store the lookup: apiKey -> { userId, status, createdAt }
    // We store it as a JSON string to track status.
    const keyData = {
      userId,
      status: "active", // Auto-activate for now, or "pending" if you want strict manual activation
      createdAt: new Date().toISOString(),
      email
    };
    await redis.set(`apikey:${apiKey}`, JSON.stringify(keyData));

    // B. Store in user object for reference (Auto-assign for convenience)
    // If you want strict manual activation, remove this block and let the user input it.
    /*
    const userKey = `user:${userId}`;
    const userDataStr = await redis.get(userKey);
    if (userDataStr) {
      const userData = JSON.parse(userDataStr);
      userData.apiKey = apiKey; 
      await redis.set(userKey, JSON.stringify(userData));
    }
    */
    
    // NOTE: Based on the new requirement "user must paste and upload their api key",
    // we should set status to "pending" and NOT link it to the user yet.
    // However, the prompt says "esta api key se valida y se guarda con un registro de que es valida".
    // Let's stick to the plan:
    // 1. Admin generates key -> Redis: apikey:XYZ -> { status: "pending", userId, email }
    // 2. User gets email.
    // 3. User enters key -> Redis: apikey:XYZ -> { status: "active", ... } AND user:ID -> { apiKey: XYZ }

    // Re-doing step 4A with "pending" status and removing 4B.
    await redis.set(`apikey:${apiKey}`, JSON.stringify({
      userId,
      status: "pending",
      createdAt: new Date().toISOString(),
      email
    }));

    // 5. Send Email

    // 5. Send Email
    const mailOptions = {
        from: `"JYM Industry Bot" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Your API Key for JYM Industry Bot",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
            <h2 style="color: #333;">Welcome to JYM Industry Bot</h2>
            <p style="color: #555;">Hello,</p>
            <p style="color: #555;">Your account has been activated with a new API Key. This key grants you access to upload content to our platform.</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
            <code style="font-size: 16px; color: #000; font-weight: bold;">${apiKey}</code>
            </div>

            <p style="color: #555;"><strong>Important:</strong> Keep this key secure. Do not share it with anyone.</p>
            
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">
            If you did not request this key, please contact support immediately.<br>
            &copy; ${new Date().getFullYear()} JYM Industry Bot
            </p>
        </div>
        `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: `API Key generated and sent to ${email}` });

  } catch (error: any) {
    console.error("Error generating API key:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
