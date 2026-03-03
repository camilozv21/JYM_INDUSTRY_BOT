"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { LogOut, User, ChevronDown, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function UserAvatar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="h-10 w-10 animate-pulse rounded-full bg-neutral-200" />
    );
  }

  if (status === "unauthenticated" || !session?.user) {
    return null;
  }

  const userImage = session.user.image;
  const userName = session.user.name || "Usuario";
  const userEmail = session.user.email || "";
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white p-1 pr-3 hover:bg-neutral-50 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-200 focus:ring-offset-2"
      >
        <div className="relative h-8 w-8 overflow-hidden rounded-full bg-neutral-100 ring-1 ring-neutral-200">
          {userImage ? (
            <Image
              src={userImage}
              alt={userName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-neutral-900 text-xs font-medium text-white">
              {initials}
            </div>
          )}
        </div>
        <span className="hidden text-sm font-medium text-neutral-700 md:block max-w-25 truncate">
          {userName}
        </span>
        <ChevronDown className={`h-4 w-4 text-neutral-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.1 }}
            className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-neutral-200 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 divide-y divide-neutral-100"
          >
            <div className="px-4 py-3">
              <p className="text-sm font-medium text-neutral-900 truncate">{userName}</p>
              <p className="text-xs text-neutral-500 truncate">{userEmail}</p>
            </div>
            
            <div className="py-1">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard className="h-4 w-4" />
                Panel de Control
              </Link>
            </div>

            <div className="py-1">
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Cerrar Sesión
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
