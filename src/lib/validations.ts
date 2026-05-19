import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(1, "Nama lengkap wajib diisi").max(100),
    username: z.string().min(3, "Username harus memiliki minimal 3 karakter").max(50),
    email: z.string().email("Alamat email tidak valid").optional().or(z.literal("")),
    location: z.string().optional().or(z.literal("")),
    password: z.string().min(6, "Kata sandi harus memiliki minimal 6 karakter"),
});

export const loginSchema = z.object({
    email: z.string().min(1, "Email atau username wajib diisi"),
    password: z.string().min(1, "Kata sandi wajib diisi"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
