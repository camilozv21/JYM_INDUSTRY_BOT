import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import redis from "@/lib/redis";
import { v4 as uuidv4 } from "uuid";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' && user.email) {
        try {
          const emailKey = `user:email:${user.email}`;
          const existingUserId = await redis.get(emailKey);

          if (!existingUserId) {
            // New User
            const newUserId = uuidv4();
            const newUser = {
              id: newUserId,
              name: user.name,
              email: user.email,
              image: user.image,
              createdAt: new Date().toISOString(),
              role: 'user', // Default role
            };

            const userKey = `user:${newUserId}`;
            
            // Should verify transaction via multi, but simple set/set is okay for basic
            await redis.set(userKey, JSON.stringify(newUser));
            await redis.set(emailKey, newUserId);
            
            console.log(`User created: ${user.email} (${newUserId})`);
          } else {
             // Optionally update last login
             // await redis.set(`user:${existingUserId}:last_login`, new Date().toISOString());
          }
          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false; // Denial of entry
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // First sign in, append user info
      if (user && user.email) {
         try {
           const existingUserId = await redis.get(`user:email:${user.email}`);
           if (existingUserId) {
             token.id = existingUserId;
             const userDataStr = await redis.get(`user:${existingUserId}`);
             if (userDataStr) {
               const parsed = JSON.parse(userDataStr);
               token.role = parsed.role;
             }
           }
         } catch(e) {
           console.error("Error fetching user in jwt callback", e);
         }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        // session.user.role = token.role as string; // if declare module supports role
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    // signOut success redirects to home or custom
  },
  secret: process.env.NEXTAUTH_SECRET,
};
