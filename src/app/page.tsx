import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
      </Card>
    </main>
  );
}
