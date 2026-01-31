"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const providers = [
    { id: "anthropic", name: "Anthropic", enabled: true, modelCount: 3 },
    { id: "openai", name: "OpenAI", enabled: true, modelCount: 4 },
    { id: "google", name: "Google Gemini", enabled: false, modelCount: 2 },
    { id: "groq", name: "Groq", enabled: true, modelCount: 1 },
    { id: "ollama", name: "Ollama (Local)", enabled: false, modelCount: 0 },
];

export function Providers() {
    const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

    const toggleKey = (id: string) => {
        setShowKeys(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <Card className="h-full flex flex-col border shadow-sm bg-white/50 dark:bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-lg">Model Providers</CardTitle>
                        <CardDescription>Configure access to AI model services</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs font-normal">
                        {providers.filter(p => p.enabled).length} Active
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full px-6 pb-4">
                    <div className="space-y-4 pt-2">
                        {providers.map((provider) => (
                            <div key={provider.id} className="flex flex-col gap-3 rounded-xl border p-4 transition-all hover:bg-muted/30">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${provider.enabled ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                                            }`}>
                                            {provider.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <Label htmlFor={`enable-${provider.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                {provider.name}
                                            </Label>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {provider.modelCount} models available
                                            </p>
                                        </div>
                                    </div>
                                    <Switch id={`enable-${provider.id}`} checked={provider.enabled} />
                                </div>

                                {provider.enabled && (
                                    <div className="pl-11 pr-1">
                                        <div className="relative">
                                            <Input
                                                type={showKeys[provider.id] ? "text" : "password"}
                                                placeholder="sk-..."
                                                className="h-8 text-xs pr-8 bg-background/50"
                                                defaultValue="sk-wdk2...1234"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-0 top-0 h-8 w-8 text-muted-foreground hover:text-foreground"
                                                onClick={() => toggleKey(provider.id)}
                                            >
                                                {showKeys[provider.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
