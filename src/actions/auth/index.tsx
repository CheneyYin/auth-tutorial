"use server";

import { LoginSchema, RegisterSchema } from "@/schema";
import { z } from "zod";

export interface Response<T> {
  status: "success" | "error";
  payload?: T;
  msg?: string;
}

const credentials = new Map<String, String>();
credentials.set("cheneyyin@hotmail.com", "123456");

export type LoginResponse = Response<{}>;

export async function login(
  value: z.infer<typeof LoginSchema>,
): Promise<LoginResponse> {
  await sleep(3000);
  const password = credentials.get(value.email);
  if (password === undefined) {
    return {
      status: "error",
      msg: "No user exists",
    };
  }

  if (password !== value.password) {
    return {
      status: "error",
      msg: "Incorrect password",
    };
  }

  return { status: "success" };
}

export type RegisterResponse = Response<{}>;

function registerSuccessResponse(): RegisterResponse {
  return {
    status: "success",
  };
}

function registerErrorResponse(msg: string): RegisterResponse {
  return {
    status: "error",
    msg: msg,
  };
}

export async function register(
  value: z.infer<typeof RegisterSchema>,
): Promise<RegisterResponse> {
  sleep(3000);
  if (value.password !== value.confirmPassword) {
    return registerErrorResponse(
      "The passwords entered twice are not consistent",
    );
  }
  if (credentials.has(value.email)) {
    return registerErrorResponse("The email has been registed.");
  }
  credentials.set(value.email, value.password);
  return registerSuccessResponse();
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
