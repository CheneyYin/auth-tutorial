"use server";

import { LoginSchema } from "@/schema";
import { z } from "zod";

const credentials = new Map<String, String>();
credentials.set("cheneyyin@hotmail.com", "123456");

export async function Login(value: z.infer<typeof LoginSchema>) {
  const password = credentials.get(value.email);
  await sleep(3000);
  return password !== undefined && password === value.password;
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
