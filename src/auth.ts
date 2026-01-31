import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { db } from './db';
import { users } from './db/schema';
import { eq, or } from 'drizzle-orm';
import { compare } from 'bcryptjs';
import { z } from 'zod';

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                // Schema now allows any string for "email" field (which is our identifier)
                const parsedCredentials = z
                    .object({ email: z.string().min(1), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    const [user] = await db
                        .select()
                        .from(users)
                        .where(or(eq(users.username, email), eq(users.email, email)));

                    if (!user) {
                        console.log('User not found:', email);
                        return null;
                    }

                    const passwordsMatch = await compare(password, user.password);
                    if (passwordsMatch) return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    };

                    console.log('Password mismatch for:', email);
                    return null;
                }

                console.log('Invalid credentials validation:', parsedCredentials.error);
                return null;
            },
        }),
    ],
});
