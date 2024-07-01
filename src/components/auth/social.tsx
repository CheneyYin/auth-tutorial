"use client";

import { signIn } from "next-auth/react";

import { Button } from "../ui/button";

interface SocialProps {
  label: string;
  provider: "github" | "google";
  icon?: React.ReactNode;
}

export function Social({ label, provider, icon }: SocialProps) {
  return (
    <div className="w-full space-x-2 space-y-2">
      <Button
        className="w-full gap-2"
        variant={"outline"}
        size={"lg"}
        onClick={() => {
          signIn(provider, {
            callbackUrl: "/",
          });
        }}
      >
        {icon}
        <p>{label}</p>
      </Button>
    </div>
  );
}
