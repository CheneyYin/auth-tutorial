"use server";

import { User } from "@prisma/client";

import { db } from "@/lib/db";

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

export async function findCredital(email: string, password: string) {
  return await db.user.findFirst({
    where: {
      email: email,
      password: password,
    },
  });
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

export type UserCreateArgs = Pick<User, "name" | "email" | "password">;

export async function saveUser(value: UserCreateArgs) {
  return db.user.create({
    data: value,
  });
}
