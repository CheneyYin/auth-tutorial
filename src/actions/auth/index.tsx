"use server";

import { prisma } from "@/lib/db";
import { LoginSchema, RegisterSchema } from "@/schema";
import { string, z } from "zod";

export interface Response<P> {
  status: "success" | "error";
  payload?: P;
  msg?: string;
}

function createSuccessResponse<P>(payload?: P): Response<P> {
  return {
    status: "success",
    payload: payload,
  };
}

function createErrorResponse<P>(msg: string, payload?: P): Response<P> {
  return {
    status: "error",
    payload: payload,
    msg: msg,
  };
}

export async function login(
  value: z.infer<typeof LoginSchema>,
): Promise<Response<{} | z.ZodError<typeof value>>> {
  await sleep(3000);
  const ret = LoginSchema.safeParse(value);
  if (!ret.success) {
    return createErrorResponse("Invalid parameters", ret.error);
  }

  const user = await getUserByEmail(value.email);
  if (user === null) {
    return createErrorResponse("No user exists");
  }

  if (user?.password !== value.password) {
    return createErrorResponse("Incorrect password");
  }

  return createSuccessResponse();
}

export async function register(
  value: z.infer<typeof RegisterSchema>,
): Promise<Response<{} | z.ZodError<typeof value>>> {
  sleep(3000);
  const ret = RegisterSchema.safeParse(value);
  if (!ret.success) {
    return createErrorResponse("Invalid parameters", ret.error);
  }

  if (value.password !== value.confirmPassword) {
    return createErrorResponse(
      "The passwords entered twice are not consistent",
    );
  }

  const _user = await getUserByEmail(value.email);

  if (_user !== null) {
    return createErrorResponse("The email has been registed.");
  }

  const { confirmPassword, ...userObj } = value;
  const user = await saveUser(userObj);
  return createSuccessResponse(user);
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findFirst({
    where: {
      email: email,
    },
  });
}

export async function getAllUsers() {
  return prisma.user.findMany();
}

export type User = Omit<z.infer<typeof RegisterSchema>, "confirmPassword">;

export async function saveUser(value: User) {
  return prisma.user.create({
    data: value,
  });
}
