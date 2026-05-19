"use client"

import { useState, useTransition } from "react"
import { register } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { AuthCard } from "@/components/auth-card"

export default function RegisterPage() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [errors, setErrors] = useState<Record<string, string[]>>({})

    async function handleSubmit(formData: FormData) {
        setErrors({})

        startTransition(async () => {
            const result = await register(formData)

            if (result?.error) {
                if (typeof result.error === "object") {
                    setErrors(result.error)
                } else {
                    toast.error(result.error)
                }
                return
            }

            toast.success("Akun berhasil dibuat!")
            router.push("/login")
        })
    }

    return (
        <AuthCard
            title="Daftar Akun Baru"
            description="Masukkan detail Anda di bawah ini untuk membuat akun"
            footerText="Sudah punya akun?"
            footerLinkText="Masuk"
            footerLinkHref="/login"
        >
            <form action={handleSubmit}>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Nama Lengkap Anda"
                            required
                            disabled={isPending}
                        />
                        {errors.name && (
                            <p className="text-xs text-red-500">{errors.name[0]}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            name="username"
                            placeholder="johndoe123"
                            required
                            disabled={isPending}
                        />
                        {errors.username && (
                            <p className="text-xs text-red-500">{errors.username[0]}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email (Opsional)</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                            disabled={isPending}
                        />
                        {errors.email && (
                            <p className="text-xs text-red-500">{errors.email[0]}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="location">Nama Cabang / Lokasi (Opsional)</Label>
                        <Input
                            id="location"
                            name="location"
                            placeholder="Contoh: Cabang Makassar"
                            disabled={isPending}
                        />
                        {errors.location && (
                            <p className="text-xs text-red-500">{errors.location[0]}</p>
                        )}
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
                        {errors.password && (
                            <p className="text-xs text-red-500">{errors.password[0]}</p>
                        )}
                    </div>
                    <Button className="w-full" type="submit" disabled={isPending}>
                        {isPending ? "Sedang membuat akun..." : "Daftar"}
                    </Button>
                </div>
            </form>
        </AuthCard>
    )
}
