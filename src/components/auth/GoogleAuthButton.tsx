"use client";

import { signIn } from "next-auth/react";

export default function GoogleAuthButton({ isSignUp = false }: { isSignUp?: boolean }) {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-lg ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl"
    >
      <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
        <path
          d="M12.0003 20.4502C5.97825 20.4502 1.48123 15.6882 1.48123 9.99824C1.48123 8.35624 1.86824 6.81524 2.56324 5.43824L5.27524 7.64624C4.85224 8.34924 4.61124 9.14824 4.61124 9.99824C4.61124 13.5602 7.08524 16.6662 10.3702 17.6582L13.1492 19.8652C16.3262 18.2562 18.5282 14.9392 18.5282 11.0852V9.99824H12.0003V6.99824H21.5003C21.6192 7.55824 21.6782 8.14024 21.6782 8.74024C21.6782 15.7082 17.5142 20.4502 12.0003 20.4502Z"
          fill="#34A853"
        />
        <path
          d="M2.56317 5.43825L5.27517 7.64625C7.02617 4.17925 10.6352 1.88925 14.8052 2.05325C16.9452 2.13725 18.9052 2.92425 20.4492 4.22125L23.1362 1.53425C20.6722 -0.627754 17.2792 -1.54775 13.9162 -1.06675C8.01917 -0.222754 3.09017 3.53525 1.05417 8.94825L2.56317 5.43825Z"
          fill="#EA4335"
        />
        <path
          d="M21.5004 6.9982L18.5284 9.9982H12.0004V11.0852H18.5284C18.3964 12.6352 17.8424 14.0722 17.0094 15.2892L14.7214 17.1062L17.4854 19.3132C20.2524 16.7112 21.6784 12.8712 21.6784 8.7402C21.6784 8.1402 21.6194 7.5582 21.5004 6.9982Z"
          fill="#4285F4"
        />
        <path
          d="M10.3702 17.6582C7.08521 16.6662 4.61121 13.5602 4.61121 9.99822C4.61121 9.14822 4.85221 8.34922 5.27521 7.64622L2.56321 5.43822C0.608209 8.27122 0.177209 11.9702 1.62121 15.2202L4.01821 13.3132L10.3702 17.6582Z"
          fill="#FBBC05"
        />
      </svg>
      <span className="text-sm font-semibold leading-6">
        {isSignUp ? "Registrarse con Google" : "Iniciar sesión con Google"}
      </span>
    </button>
  );
}
