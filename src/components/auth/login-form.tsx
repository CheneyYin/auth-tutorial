"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Login } from "@/actions/auth";
import { useState, useTransition } from "react";
import { ScaleLoader } from "react-spinners";

interface LoginFormProps {}

export function LoginForm({}: LoginFormProps) {
  const [isPending, startTransition] = useTransition();
  const [successMsg, setSuccessMsg] = useState<string>();
  const [errorMsg, setErrorsMsg] = useState<string>();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "jack@email.com",
      password: "******",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      const isSuccess = await Login(values);
      if (isSuccess) {
        setSuccessMsg("Login Success");
        setErrorsMsg(undefined);
      } else {
        setSuccessMsg(undefined);
        setErrorsMsg("Login Error");
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
        <Button type="submit" disabled={isPending}>
          {isPending && (
            <ScaleLoader color="#36d7b7" className=" absolute py-2" />
          )}
          <p>Sign In</p>
        </Button>
      </form>
    </Form>
  );
}
