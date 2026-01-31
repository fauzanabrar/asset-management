"use server"

import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth"
import { registerSchema, loginSchema } from "./validations"
import { UserService } from "./user-service"

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
        if (await UserService.isUsernameTaken(username)) {
            return { error: "This username is already taken. Please choose another one." };
        }

        if (email && await UserService.isEmailTaken(email)) {
            return { error: "This email is already associated with an account." };
        }

        await UserService.createUser(validatedFields.data);

        return { success: true };
    } catch (error) {
        console.error("[REGISTER_ERROR]:", error);
        return { error: "Registration failed. Please try again later." };
    }
}

/**
 * Handles user authentication via credentials.
 */
export async function authenticate(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = loginSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return { error: "Invalid login credentials provided." };
    }

    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid username/email or password." };
                default:
                    return { error: "An unexpected error occurred during sign in." };
            }
        }
        throw error;
    }
}

/**
 * Signs the user out of their session.
 */
export async function logout() {
    try {
        await signOut();
    } catch (error) {
        console.error("[LOGOUT_ERROR]:", error);
    }
}
