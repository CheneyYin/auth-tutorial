"use server";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schema";
import { User } from "@prisma/client";
import { z } from "zod";

// export type User = Omit<z.infer<typeof RegisterSchema>, "confirmPassword">;

export async function getUserByEmail(email: string) {
  return db.user.findFirst({
    where: {
      email: email,
    },
  });
}

export async function validateCredital(email: string, password: string) {
  const id = await db.user.findFirst({
    select: {
      id: true,
    },
    where: {
      email: email,
      password: password,
    },
  });
  return id !== null;
}

export async function isExistUserByEmail(email: string) {
  const id = await db.user.findFirst({
    select: {
      id: true,
    },
    where: {
      email: email,
    },
  });
  return id !== null;
}

export async function getAllUsers() {
  return db.user.findMany();
}

export async function saveUser(value: User) {
  return db.user.create({
    data: value,
  });
}
