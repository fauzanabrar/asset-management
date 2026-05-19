"use client"

import { useState, useTransition } from "react"
import { authenticate } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { AuthCard } from "@/components/auth-card"

export default function LoginPage() {
    const [isPending, startTransition] = useTransition()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    async function handleSubmit(formData: FormData) {
        setErrorMessage(null)

        startTransition(async () => {
            const result = await authenticate(formData)
            if (result?.error) {
                setErrorMessage(result.error)
                toast.error(result.error)
            }
        })
    }

    return (
        <AuthCard
            title="Login"
            description="Masukkan email atau username Anda untuk masuk"
            footerText="Belum punya akun?"
            footerLinkText="Daftar"
            footerLinkHref="/register"
        >
            <form action={handleSubmit}>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email atau Username</Label>
                        <Input
                            id="email"
                            name="email"
                            placeholder="name@example.com"
                            type="text"
                            autoCapitalize="none"
                            autoComplete="username"
                            autoCorrect="off"
                            required
                            disabled={isPending}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Kata Sandi</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            disabled={isPending}
                        />
                    </div>
                    {errorMessage && (
                        <p className="text-sm text-red-500 font-medium text-center">{errorMessage}</p>
                    )}
                    <Button className="w-full" type="submit" disabled={isPending}>
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sedang Masuk...
                            </>
                        ) : (
                            "Masuk"
                        )}
                    </Button>
                </div>
            </form>
        </AuthCard>
    )
}
