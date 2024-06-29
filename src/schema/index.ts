import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is Required!"),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(6, "Password at least has 6 characters."),
    confirmPassword: z.string().min(6, "Password at least has 6 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Please confirm your password!",
    path: ["confirmPassword"],
  });
