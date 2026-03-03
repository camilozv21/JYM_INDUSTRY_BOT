import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // 1. Redireccionar si el usuario autenticado intenta acceder a login/registro
  if (pathname.startsWith("/auth") && token) {
    return NextResponse.redirect(new URL("/upload", req.url));
  }

  // 2. Proteger rutas privadas (como /upload y /dashboard)
  if ((pathname.startsWith("/upload") || pathname.startsWith("/dashboard")) && !token) {
     const loginUrl = new URL("/auth/signin", req.url);
     loginUrl.searchParams.set("callbackUrl", pathname);
     return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/upload/:path*", "/dashboard/:path*", "/auth/:path*"],
};
