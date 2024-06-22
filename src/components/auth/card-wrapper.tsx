import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { AuthHeader } from "./auth-header";
import { Social } from "./social";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Separator } from "../ui/separator";

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
  social,
}: CardWrapperProps) {
  return (
    <Card className=" drop-shadow-md">
      <CardHeader className=" text-center font-bold text-lg drop-shadow-lg">
        <AuthHeader label={label} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex flex-col items-center justify-center space-y-2">
        <div className="w-full flex flex-row items-center justify-center gap-2">
          <Social label="GitHub" icon={<FaGithub className="text-lg" />} />
          <Social label="Google" icon={<FcGoogle className="text-lg" />} />
        </div>

        <Separator />
        <Button variant={"link"}>
          <Link href={backHref}>{backLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
