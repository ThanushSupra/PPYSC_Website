import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  name: z.string().min(1),
}).refine(d => d.password === d.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords must match",
});

export const RegistrationSchema = z.object({
  parentName: z.string().min(1),
  parentEmail: z.string().email(),
  childName: z.string().min(1),
  birthdate: z.string(), // or z.coerce.date()
  phone: z.string().min(10),
  consent: z.boolean().refine(Boolean, "Consent is required"),
});
export type RegistrationInput = z.infer<typeof RegistrationSchema>;