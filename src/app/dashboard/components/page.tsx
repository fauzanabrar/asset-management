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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Terminal, Waves, Info, CheckCircle2, AlertCircle, XCircle, Bell } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function ComponentsPage() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Component Library</h1>
                <p className="text-muted-foreground mt-2">
                    A comprehensive showcase of all UI components available in this template.
                </p>
            </div>

            <Separator />

            {/* Buttons Section */}
            <section className="space-y-4">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight">Buttons</h2>
                    <p className="text-sm text-muted-foreground">Different button variants and sizes</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Button Variants</CardTitle>
                            <CardDescription>All available button styles</CardDescription>
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

                    <Card>
                        <CardHeader>
                            <CardTitle>Button Sizes</CardTitle>
                            <CardDescription>Different button sizes</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-wrap items-center gap-2">
                            <Button size="sm">Small</Button>
                            <Button size="default">Default</Button>
                            <Button size="lg">Large</Button>
                            <Button size="icon">
                                <Info className="h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <Separator />

            {/* Form Elements Section */}
            <section className="space-y-4">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight">Form Elements</h2>
                    <p className="text-sm text-muted-foreground">Input fields and form controls</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Text Inputs</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" placeholder="Enter your email" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" placeholder="Enter password" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Textarea</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Textarea placeholder="Type your message here..." rows={5} />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Select</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a fruit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="apple">Apple</SelectItem>
                                    <SelectItem value="banana">Banana</SelectItem>
                                    <SelectItem value="orange">Orange</SelectItem>
                                    <SelectItem value="grape">Grape</SelectItem>
                                </SelectContent>
                            </Select>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Checkboxes</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <Label htmlFor="terms">Accept terms and conditions</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="marketing" />
                                <Label htmlFor="marketing">Receive marketing emails</Label>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Radio Group</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <RadioGroup defaultValue="option-one">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option-one" id="option-one" />
                                    <Label htmlFor="option-one">Option One</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option-two" id="option-two" />
                                    <Label htmlFor="option-two">Option Two</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="option-three" id="option-three" />
                                    <Label htmlFor="option-three">Option Three</Label>
                                </div>
                            </RadioGroup>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Switch & Slider</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Switch id="airplane-mode" />
                                <Label htmlFor="airplane-mode">Airplane Mode</Label>
                            </div>
                            <div className="space-y-2">
                                <Label>Volume</Label>
                                <Slider defaultValue={[50]} max={100} step={1} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <Separator />

            {/* Feedback Section */}
            <section className="space-y-4">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight">Feedback & Status</h2>
                    <p className="text-sm text-muted-foreground">Alerts, badges, and progress indicators</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Badges</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            <Badge>Default</Badge>
                            <Badge variant="secondary">Secondary</Badge>
                            <Badge variant="destructive">Destructive</Badge>
                            <Badge variant="outline">Outline</Badge>
                            <Badge className="bg-green-500 hover:bg-green-600">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Success
                            </Badge>
                            <Badge className="bg-blue-500 hover:bg-blue-600">
                                <Info className="h-3 w-3 mr-1" />
                                Info
                            </Badge>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Progress</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Progress</span>
                                    <span className="text-muted-foreground">33%</span>
                                </div>
                                <Progress value={33} />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Loading</span>
                                    <span className="text-muted-foreground">66%</span>
                                </div>
                                <Progress value={66} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Alerts</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Alert>
                                <Terminal className="h-4 w-4" />
                                <AlertTitle>Default Alert</AlertTitle>
                                <AlertDescription>
                                    You can add components to your app using the CLI.
                                </AlertDescription>
                            </Alert>
                            <Alert variant="destructive">
                                <XCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    Your session has expired. Please log in again.
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Notifications (Toast)</CardTitle>
                            <CardDescription>Interactive toast notifications</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-2">
                            <Button
                                variant="outline"
                                onClick={() => toast.success("Success!", {
                                    description: "Your changes have been saved successfully.",
                                })}
                            >
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Success Toast
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => toast.error("Error!", {
                                    description: "Something went wrong. Please try again.",
                                })}
                            >
                                <XCircle className="h-4 w-4 mr-2" />
                                Error Toast
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => toast.info("Info", {
                                    description: "This is an informational message.",
                                })}
                            >
                                <Info className="h-4 w-4 mr-2" />
                                Info Toast
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => toast.warning("Warning!", {
                                    description: "Please review your input before proceeding.",
                                })}
                            >
                                <AlertCircle className="h-4 w-4 mr-2" />
                                Warning Toast
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => toast("Default", {
                                    description: "This is a default notification.",
                                    icon: <Bell className="h-4 w-4" />,
                                })}
                            >
                                <Bell className="h-4 w-4 mr-2" />
                                Default Toast
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    const promise = new Promise((resolve) => setTimeout(resolve, 2000));
                                    toast.promise(promise, {
                                        loading: 'Loading...',
                                        success: 'Data loaded successfully!',
                                        error: 'Failed to load data',
                                    });
                                }}
                            >
                                Promise Toast
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <Separator />

            {/* Overlays Section */}
            <section className="space-y-4">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight">Overlays & Dialogs</h2>
                    <p className="text-sm text-muted-foreground">Modals, popovers, and tooltips</p>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dialog</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button>Open Dialog</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                                        <DialogDescription>
                                            This action cannot be undone. This will permanently delete your account
                                            and remove your data from our servers.
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Popover</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline">Open Popover</Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className="space-y-2">
                                        <h4 className="font-medium leading-none">Dimensions</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Set the dimensions for the layer.
                                        </p>
                                        <div className="grid gap-2">
                                            <div className="grid grid-cols-3 items-center gap-4">
                                                <Label htmlFor="width">Width</Label>
                                                <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Tooltip</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline">Hover me</Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>This is a helpful tooltip</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <Separator />

            {/* Layout Components */}
            <section className="space-y-4">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight">Layout Components</h2>
                    <p className="text-sm text-muted-foreground">Tabs, accordions, and other layout elements</p>
                </div>
                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tabs</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="account" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="account">Account</TabsTrigger>
                                    <TabsTrigger value="password">Password</TabsTrigger>
                                    <TabsTrigger value="settings">Settings</TabsTrigger>
                                </TabsList>
                                <TabsContent value="account" className="space-y-4">
                                    <p className="text-sm text-muted-foreground">
                                        Make changes to your account here. Click save when you're done.
                                    </p>
                                </TabsContent>
                                <TabsContent value="password" className="space-y-4">
                                    <p className="text-sm text-muted-foreground">
                                        Change your password here. After saving, you'll be logged out.
                                    </p>
                                </TabsContent>
                                <TabsContent value="settings" className="space-y-4">
                                    <p className="text-sm text-muted-foreground">
                                        Manage your account settings and preferences.
                                    </p>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                    <Card>
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
                                        Yes. It comes with default styles that match the other components' aesthetic.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>Is it animated?</AccordionTrigger>
                                    <AccordionContent>
                                        Yes. It's animated by default, but you can disable it if you prefer.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-none bg-transparent">
                        <div className="flex justify-center">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border bg-card text-card-foreground shadow-sm"
                            />
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    )
}
