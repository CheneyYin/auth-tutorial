"use server";

import { z } from "zod";

import {
  isExistUserByEmail,
  saveUser,
  UserCreateArgs,
  validateCredital,
} from "@/data/user";
import { sha256 } from "@/lib/hash";
import { LoginSchema, RegisterSchema } from "@/schema";

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
  const ret = LoginSchema.safeParse(value);
  if (!ret.success) {
    return createErrorResponse("Invalid parameters", ret.error);
  }

  const isRegisted = await isExistUserByEmail(value.email);
  if (!isRegisted) {
    return createErrorResponse("No user exists");
  }

  if (!(await validateCredital(value.email, sha256(value.password)))) {
    return createErrorResponse("Incorrect password");
  }

  return createSuccessResponse();
}

export async function register(
  value: z.infer<typeof RegisterSchema>,
): Promise<Response<{} | z.ZodError<typeof value>>> {
  const ret = RegisterSchema.safeParse(value);
  if (!ret.success) {
    return createErrorResponse("Invalid parameters", ret.error);
  }

  if (value.password !== value.confirmPassword) {
    return createErrorResponse(
      "The passwords entered twice are not consistent",
    );
  }

  const isRegisted = await isExistUserByEmail(value.email);

  if (isRegisted) {
    return createErrorResponse("The email has been registed.");
  }

  const {
    confirmPassword, // eslint-disable-line no-unused-vars
    ...userObj
  } = value;
  const userArgs: UserCreateArgs = {
    ...userObj,
    password: sha256(userObj.password),
  };
  const user = await saveUser(userArgs);
  return createSuccessResponse(user);
}

/* eslint-disable no-unused-vars */
function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
/* eslint-enable no-unused-vars */
