import Link from "next/link";

import { getServerSession } from "next-auth";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { options } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(options);
  console.log(session);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="md:w-1/3">
        <CardHeader>
          <CardTitle className=" flex flex-col items-center justify-center text-center font-black drop-shadow-md gap-2">
            <p>AUTH-TUTORIAL</p>
            <Separator />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full flex flex-col flex-wrap items-center justify-center gap-4">
            <Button className=" w-full" variant={"outline"}>
              <Link href={"/auth/login"}>Login</Link>
            </Button>
            <Button className=" w-full" variant={"outline"}>
              <Link href={"/auth/register"}>Register</Link>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="w-full flex flex-col flex-wrap items-center justify-center gap-4">
          <Button className=" w-full" variant={"outline"}>
            <Link href={"/api/auth/signin"}>Sign IN</Link>
          </Button>
          {session ? (
            <Button className=" w-full" variant={"outline"}>
              <Link href={"/api/auth/signout"}>
                {session.user?.name} Logout
              </Link>
            </Button>
          ) : (
            <p>NO AUTH</p>
          )}
        </CardFooter>
      </Card>
    </main>
  );
}
