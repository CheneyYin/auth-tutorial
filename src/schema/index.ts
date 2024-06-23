import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is Required!"),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password at least has 6 characters."),
  confirmPassword: z.string().min(6, "Password at least has 6 characters."),
});
