"use client";

import { signIn } from "next-auth/react";

export default function GoogleAuthButton({ isSignUp = false }: { isSignUp?: boolean }) {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
    >

      <span className="text-sm font-semibold leading-6">
        {isSignUp ? "Sign up with Google" : "Sign in with Google"}
      </span>
    </button>
  );
}
