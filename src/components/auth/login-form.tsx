"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { ScaleLoader } from "react-spinners";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { LoginSchema } from "@/schema";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface LoginFormProps {}

// eslint-disable-next-line no-empty-pattern
export function LoginForm({}: LoginFormProps) {
  const [isPending, startTransition] = useTransition();
  const [successMsg, setSuccessMsg] = useState<string>();
  const [errorMsg, setErrorsMsg] = useState<string>();
  const session = useSession();

  console.log(session);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "jack@email.com",
      password: "******",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      const parseRet = LoginSchema.safeParse(values);
      if (!parseRet.success) {
        setSuccessMsg(undefined);
        setErrorsMsg(parseRet.error.message);
      }

      const signInRet = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: true,
        callbackUrl: "/",
      });

      if (signInRet?.ok) {
        setSuccessMsg("Sign IN Success");
        setErrorsMsg(undefined);
      } else {
        setSuccessMsg(undefined);
        setErrorsMsg("Fail to Sign IN");
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name={"email"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>EMail</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"password"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type={"password"} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {successMsg && <p className=" border-2">{successMsg}</p>}

        {errorMsg && <p className=" border-2">{errorMsg}</p>}

        {session.status === "unauthenticated" && (
          <Button type="submit" disabled={isPending}>
            {isPending && (
              <ScaleLoader color="#36d7b7" className=" absolute py-2" />
            )}
            <p>Sign In</p>
          </Button>
        )}
        {session.status === "authenticated" && (
          <Button disabled={isPending} onClick={() => signOut()}>
            {isPending && (
              <ScaleLoader color="#36d7b7" className=" absolute py-2" />
            )}
            <p>Sign OUT</p>
          </Button>
        )}
      </form>
    </Form>
  );
}
