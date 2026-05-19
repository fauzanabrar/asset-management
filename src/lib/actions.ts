"use server"

import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth"
import { registerSchema, loginSchema } from "./validations"
import { UserService } from "./user-service"
import { redirect } from "next/navigation"

/**
 * Handles user registration.
 * Adheres to SRP by delegating DB logic to UserService.
 */
export async function register(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = registerSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors };
    }

    const { username, email } = validatedFields.data;

    try {
        const taken = await UserService.isIdentifierTaken(username, email || undefined);

        if (taken.username) {
            return { error: "Username ini sudah digunakan. Silakan pilih yang lain." };
        }

        if (taken.email) {
            return { error: "Email ini sudah terasosiasi dengan akun lain." };
        }

        await UserService.createUser(validatedFields.data);

        return { success: true };
    } catch (error) {
        console.error("[REGISTER_ERROR]:", error);
        return { error: "Pendaftaran gagal. Silakan coba lagi nanti." };
    }
}

/**
 * Handles user authentication via credentials.
 */
export async function authenticate(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = loginSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return { error: "Kredensial login yang diberikan tidak valid." };
    }

    try {
        // We set redirect: false to handle it manually and avoid NEXT_REDIRECT errors in try-catch
        const result = await signIn("credentials", { ...rawData, redirect: false });
        if (result?.error) {
            return { error: "Username/email atau kata sandi salah." };
        }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Username/email atau kata sandi salah." };
                default:
                    return { error: "Terjadi kesalahan yang tidak terduga saat masuk." };
            }
        }
        // If it's a redirect error from Auth.js, we let it propagate if we didn't use redirect: false
        throw error;
    }

    // Manual redirect after successful sign in
    redirect("/dashboard");
}

/**
 * Signs the user out of their session.
 */
export async function logout() {
    await signOut({ redirect: false });
    redirect("/login");
}
