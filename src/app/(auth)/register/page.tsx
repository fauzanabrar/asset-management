"use client"

import { useState } from "react"
import { register } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    })
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    return (
        <Card className="border-none shadow-2xl bg-white/80 dark:bg-card/50 backdrop-blur-xl">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
                <CardDescription className="text-center">
                    Enter your email below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={async (formData) => {
                    const result = await register(formData)
                    if (result?.error) {
                        setErrorMessage(result.error)
                    } else {
                        // Redirect to login or auto-login
                        window.location.href = "/login"
                    }
                }}>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                name="username"
                                placeholder="johndoe123"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email (Optional)</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="m@example.com"
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
                        <Button className="w-full">Create account</Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <p className="px-8 text-center text-sm text-muted-foreground w-full">
                    Already have an account?{" "}
                    <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                        Sign in
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}
