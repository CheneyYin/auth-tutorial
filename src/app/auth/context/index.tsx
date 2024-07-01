"use client";

import { SessionProvider, SessionProviderProps } from "next-auth/react";

export function AuthProvider({
  props,
  children,
}: {
  props?: SessionProviderProps;
  children: React.ReactNode;
}) {
  return <SessionProvider {...props}>{children}</SessionProvider>;
}
