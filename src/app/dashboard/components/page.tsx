"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Terminal, Waves } from "lucide-react"
import { useState } from "react"

export default function ComponentsPage() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Components Gallery</h3>
                <p className="text-sm text-muted-foreground">
                    A showcase of the UI components available in this template.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Buttons Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Buttons</CardTitle>
                        <CardDescription>Different styles and sizes.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        <Button>Default</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="destructive">Destructive</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="link">Link</Button>
                    </CardContent>
                </Card>

                {/* Badges Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Badges</CardTitle>
                        <CardDescription>Status indicators and labels.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                        <Badge variant="outline">Outline</Badge>
                    </CardContent>
                </Card>

                {/* Inputs Card */}
                <Card className="col-span-1 md:col-span-2 lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Form Elements</CardTitle>
                        <CardDescription>Inputs, Switches, Sliders.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Switch id="airplane-mode" />
                            <Label htmlFor="airplane-mode">Airplane Mode</Label>
                        </div>
                        <div className="space-y-2">
                            <Label>Volume</Label>
                            <Slider defaultValue={[33]} max={100} step={1} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email-2">Email</Label>
                            <Input type="email" id="email-2" placeholder="Email" />
                        </div>
                    </CardContent>
                </Card>

                {/* Calendar Card */}
                <Card className="col-span-1 border-none shadow-none bg-transparent">
                    <div className="flex justify-center">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border bg-card text-card-foreground shadow-sm"
                        />
                    </div>
                </Card>

                {/* Alerts & Progress */}
                <Card className="col-span-1 md:col-span-2">
                    <CardHeader>
                        <CardTitle>Feedback</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Alert>
                            <Terminal className="h-4 w-4" />
                            <AlertTitle>Heads up!</AlertTitle>
                            <AlertDescription>
                                You can add components to your app using the cli.
                            </AlertDescription>
                        </Alert>
                        <div className="space-y-2">
                            <Label>Loading Progress</Label>
                            <Progress value={33} />
                        </div>
                    </CardContent>
                </Card>

                {/* Accordion */}
                <Card className="col-span-1 md:col-span-2 lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Accordion</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design pattern.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Is it styled?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It comes with default styles that matches the other components&apos; aesthetic.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
