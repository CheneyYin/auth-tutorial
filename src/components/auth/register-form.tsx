"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { ScaleLoader } from "react-spinners";
import { z } from "zod";

import { register } from "@/actions/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { RegisterSchema } from "@/schema";


import { Button } from "../ui/button";
import { Input } from "../ui/input";



interface RegisterFormProps {}

// eslint-disable-next-line no-empty-pattern
export function RegisterForm({}: RegisterFormProps) {
  const [isPending, startTransition] = useTransition();
  const [successMsg, setSuccessMsg] = useState<string>();
  const [errorMsg, setErrorsMsg] = useState<string>();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "jack",
      email: "jack@email.com",
      password: "******",
      confirmPassword: "******",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    if (values.password !== values.confirmPassword) {
      setSuccessMsg(undefined);
      setErrorsMsg("The passwords entered twice are not consistent");
      return;
    }

    startTransition(async () => {
      const ret = await register(values);
      if (ret.status === "success") {
        setSuccessMsg("Register Success");
        setErrorsMsg(undefined);
      } else {
        setSuccessMsg(undefined);
        setErrorsMsg(ret.msg);
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
          name={"name"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name={"confirmPassword"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
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
          <p>Register</p>
        </Button>
      </form>
    </Form>
  );
}
