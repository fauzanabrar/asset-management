"use client"

import { useState } from "react"
import { useFormStatus } from "react-dom"
import { authenticate } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button className="w-full" aria-disabled={pending} disabled={pending}>
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign In"}
        </Button>
    )
}

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    return (
        <Card className="border-none shadow-2xl bg-white/80 dark:bg-card/50 backdrop-blur-xl">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
                <CardDescription className="text-center">
                    Enter your email to sign in to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={async (formData) => {
                    const result = await authenticate(formData)
                    if (result?.error) setErrorMessage(result.error)
                }}>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email or Username</Label>
                            <Input
                                id="email"
                                name="email"
                                placeholder="Email or Username"
                                type="text"
                                autoCapitalize="none"
                                autoComplete="username"
                                autoCorrect="off"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                        {errorMessage && (
                            <p className="text-sm text-red-500 font-medium">{errorMessage}</p>
                        )}
                        <SubmitButton />
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <p className="px-8 text-center text-sm text-muted-foreground w-full">
                    Don&apos;t have an account?{" "}
                    <a href="/register" className="underline underline-offset-4 hover:text-primary">
                        Sign up
                    </a>
                </p>
            </CardFooter>
        </Card>
    )
}
