import Link from "next/link";

import { FaGithub } from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "../ui/button";

import { Separator } from "../ui/separator";

import { AuthHeader } from "./auth-header";
import { Social } from "./social";

interface CardWrapperProps {
  label: string;
  backHref: string;
  backLabel: string;
  children: React.ReactNode;
  social?: string;
}

export function CardWrapper({
  label,
  backHref,
  backLabel,
  children,
  social, // eslint-disable-line no-unused-vars
}: CardWrapperProps) {
  return (
    <Card className=" drop-shadow-md">
      <CardHeader className=" text-center font-bold text-lg drop-shadow-lg">
        <AuthHeader label={label} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex flex-col items-center justify-center space-y-2">
        <div className="w-full flex flex-wrap items-center justify-center gap-2">
          <Social
            label="GitHub"
            provider="github"
            icon={<FaGithub className="text-lg" />}
          />
          <Social
            label="Google"
            provider="google"
            icon={<FcGoogle className="text-lg" />}
          />
        </div>

        <Separator />
        <Button variant={"link"}>
          <Link href={backHref}>{backLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
