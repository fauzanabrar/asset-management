"use server"

import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { hash } from "bcryptjs"
import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth"

export async function register(formData: FormData) {
    const name = formData.get("name") as string
    const username = formData.get("username") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!name || name.trim() === "") {
        return { error: "Please enter your full name." }
    }
    if (!username || username.trim() === "") {
        return { error: "Please choose a username." }
    }
    // Email is optional now
    if (!password || password.trim() === "") {
        return { error: "Please create a password." }
    }
    if (password.length < 6) {
        return { error: "Password must be at least 6 characters long." }
    }

    try {
        console.log("Attempting to register user:", username);

        // Check if username exists
        const existingUsername = await db.select().from(users).where(eq(users.username, username))
        if (existingUsername.length > 0) {
            return { error: "This username is already taken. Please choose another one." }
        }

        // Check if email exists (only if email is provided)
        if (email && email.trim() !== "") {
            const existingEmail = await db.select().from(users).where(eq(users.email, email))
            if (existingEmail.length > 0) {
                return { error: "This email is already associated with an account." }
            }
        }

        const hashedPassword = await hash(password, 10)
        console.log("Password hashed, inserting into DB...");

        const result = await db.insert(users).values({
            username,
            email: email || null, // Handle empty string as null
            password: hashedPassword,
            name,
        }).returning();

        console.log("User created successfully:", result);
    } catch (e) {
        console.error("Detailed Registration Error:", e);
        // Cast error to any to check properties
        const err = e as any;
        return { error: `Registration failed. Please try again.` }
    }
}

export async function authenticate(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || email.trim() === "") {
        return { error: 'Please enter your email or username.' };
    }
    if (!password || password.trim() === "") {
        return { error: 'Please enter your password.' };
    }

    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid email or password. Please try again.' };
                default:
                    return { error: 'Something went wrong. Please try again.' };
            }
        }
        throw error;
    }
}

export async function logout() {
    await signOut();
}

