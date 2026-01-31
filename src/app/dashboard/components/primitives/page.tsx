"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Layers, MousePointer2, Box, Upload, CalendarDays, List, ChevronDown, User, Settings, LogOut, UserPlus, Mail, MessageSquare, ChevronRight } from "lucide-react"
import { FileUploader } from "@/components/file-uploader"
import { FileField } from "@/components/ui/file-field"
import { DatePicker } from "@/components/ui/date-picker"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuPortal
} from "@/components/ui/dropdown-menu"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuSeparator,
    ContextMenuTrigger,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubTrigger,
    ContextMenuSubContent
} from "@/components/ui/context-menu"

export default function PrimitivesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">UI Primitives</h2>
                    <p className="text-muted-foreground">The foundational building blocks of our design system.</p>
                </div>
            </div>

            <Tabs defaultValue="buttons" className="space-y-6">
                <TabsList className="bg-muted/50 p-1 border">
                    <TabsTrigger value="buttons" className="gap-2"><MousePointer2 className="h-4 w-4" /> Interaction</TabsTrigger>
                    <TabsTrigger value="badges" className="gap-2"><Layers className="h-4 w-4" /> Identification</TabsTrigger>
                    <TabsTrigger value="cards" className="gap-2"><Box className="h-4 w-4" /> Containment</TabsTrigger>
                    <TabsTrigger value="uploads" className="gap-2"><Upload className="h-4 w-4" /> Assets</TabsTrigger>
                    <TabsTrigger value="schedule" className="gap-2"><CalendarDays className="h-4 w-4" /> Schedule</TabsTrigger>
                    <TabsTrigger value="menus" className="gap-2"><List className="h-4 w-4" /> Menus</TabsTrigger>
                </TabsList>

                <TabsContent value="buttons" className="space-y-6">
                    <Card className="border-none shadow-md overflow-hidden">
                        <CardHeader className="bg-muted/10">
                            <CardTitle>Button Variants</CardTitle>
                            <CardDescription>Core interactive elements with different semantic meanings.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-10 space-y-12">
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-center">
                                <div className="flex flex-col items-center gap-4">
                                    <Button>Default</Button>
                                    <span className="text-[10px] font-bold uppercase opacity-30 tracking-widest">Primary</span>
                                </div>
                                <div className="flex flex-col items-center gap-4">
                                    <Button variant="secondary">Secondary</Button>
                                    <span className="text-[10px] font-bold uppercase opacity-30 tracking-widest">Neutral</span>
                                </div>
                                <div className="flex flex-col items-center gap-4">
                                    <Button variant="outline">Outline</Button>
                                    <span className="text-[10px] font-bold uppercase opacity-30 tracking-widest">Ghosted</span>
                                </div>
                                <div className="flex flex-col items-center gap-4">
                                    <Button variant="ghost">Ghost</Button>
                                    <span className="text-[10px] font-bold uppercase opacity-30 tracking-widest">Invisible</span>
                                </div>
                                <div className="flex flex-col items-center gap-4">
                                    <Button variant="destructive">Destructive</Button>
                                    <span className="text-[10px] font-bold uppercase opacity-30 tracking-widest">Danger</span>
                                </div>
                            </div>

                            <div className="p-8 bg-zinc-950 rounded-2xl relative group border border-zinc-800">
                                <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-100 transition-opacity">
                                    <Code className="h-4 w-4 text-emerald-500" />
                                </div>
                                <pre className="text-emerald-500/80 font-mono text-xs overflow-x-auto leading-relaxed">
                                    {`<Button variant="primary">Submit</Button>
<Button variant="outline" size="sm">Cancel</Button>
<Button variant="ghost" size="icon">
  <Settings className="h-4 w-4" />
</Button>`}
                                </pre>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="badges" className="space-y-6">
                    <Card className="border-none shadow-md overflow-hidden">
                        <CardHeader className="bg-muted/10">
                            <CardTitle>Status Indicators</CardTitle>
                            <CardDescription>Badges and tags for metadata and status representation.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-10 space-y-12">
                            <div className="flex flex-wrap gap-6 items-center justify-center">
                                <Badge>Stable</Badge>
                                <Badge variant="secondary">In Review</Badge>
                                <Badge variant="outline" className="border-blue-500 text-blue-500">Feature</Badge>
                                <Badge variant="destructive">Urgent</Badge>
                                <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none shadow-md">Completed</Badge>
                                <Badge className="bg-indigo-500 hover:bg-indigo-600 border-none shadow-md">Architecture</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="cards" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card className="border-2 border-primary shadow-2xl relative overflow-hidden">
                            <div className="absolute -right-8 -top-8 h-24 w-24 bg-primary/10 rounded-full blur-2xl" />
                            <CardHeader>
                                <CardTitle>Featured Card</CardTitle>
                                <CardDescription>High emphasis container with shadows and borders.</CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm opacity-70 leading-relaxed">
                                Used for primary calls to action or emphasizing specific dashboard metrics. Supports complex layouts and interactions.
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-sm bg-muted/20">
                            <CardHeader>
                                <CardTitle>Subtle Card</CardTitle>
                                <CardDescription>Low emphasis container for supporting content.</CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm opacity-50 leading-relaxed">
                                Ideal for secondary information, documentation snippets, or background elements that shouldn't grab attention.
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="uploads" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Card className="border-none shadow-md overflow-hidden">
                            <CardHeader className="bg-muted/10">
                                <CardTitle>Single File Upload</CardTitle>
                                <CardDescription>Restricted to one file at a time, perfect for profile pictures or identity docs.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <FileUploader multiple={false} />
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-md overflow-hidden">
                            <CardHeader className="bg-muted/10">
                                <CardTitle>Multi-File Upload</CardTitle>
                                <CardDescription>Allow users to drop a batch of files, suitable for project assets or gallery uploads.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <FileUploader multiple={true} />
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-md overflow-hidden">
                            <CardHeader className="bg-muted/10">
                                <CardTitle>Field File Upload</CardTitle>
                                <CardDescription>A compact, input-styled file selector for forms and settings pages.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">Standard Field</label>
                                    <FileField />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest opacity-50">Multi-File Field</label>
                                    <FileField multiple={true} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="menus" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card className="border-none shadow-md overflow-hidden">
                            <CardHeader className="bg-muted/10">
                                <CardTitle>Dropdown Menu</CardTitle>
                                <CardDescription>A versatile menu for actions, navigation, and settings.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-10 flex items-center justify-center">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="gap-2 px-6 h-12 font-bold shadow-md hover:shadow-lg transition-all border-zinc-200 dark:border-zinc-800">
                                            Account Settings <ChevronDown className="h-4 w-4 opacity-50" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="center">
                                        <DropdownMenuLabel className="font-black text-[10px] uppercase tracking-widest opacity-50 px-2 py-1.5">Personal Space</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem className="gap-2 cursor-pointer">
                                                <User className="h-4 w-4 text-indigo-500" />
                                                <span className="font-medium">My Profile</span>
                                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="gap-2 cursor-pointer">
                                                <Settings className="h-4 w-4 text-emerald-500" />
                                                <span className="font-medium">Preferences</span>
                                                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuSub>
                                            <DropdownMenuSubTrigger className="gap-2 cursor-pointer">
                                                <UserPlus className="h-4 w-4 text-blue-500" />
                                                <span className="font-medium">Invite users</span>
                                            </DropdownMenuSubTrigger>
                                            <DropdownMenuPortal>
                                                <DropdownMenuSubContent className="w-48">
                                                    <DropdownMenuItem className="gap-2 cursor-pointer">
                                                        <Mail className="h-4 w-4" />
                                                        <span>via Email</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="gap-2 cursor-pointer">
                                                        <MessageSquare className="h-4 w-4" />
                                                        <span>via Message</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuSubContent>
                                            </DropdownMenuPortal>
                                        </DropdownMenuSub>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="gap-2 cursor-pointer text-rose-500 focus:text-rose-500 focus:bg-rose-500/10">
                                            <LogOut className="h-4 w-4" />
                                            <span className="font-bold">Log out</span>
                                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-md overflow-hidden">
                            <CardHeader className="bg-muted/10">
                                <CardTitle>Context Menu</CardTitle>
                                <CardDescription>Right-click interactions for contextual actions on specific elements.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-10">
                                <ContextMenu>
                                    <ContextMenuTrigger className="flex h-[180px] w-full items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-sm font-bold text-muted-foreground hover:bg-muted/30 transition-all cursor-context-menu bg-muted/10 group">
                                        <div className="text-center space-y-2 group-hover:scale-105 transition-transform duration-300">
                                            <MousePointer2 className="h-8 w-8 mx-auto opacity-20" />
                                            <p>Right click anywhere here</p>
                                        </div>
                                    </ContextMenuTrigger>
                                    <ContextMenuContent className="w-64">
                                        <ContextMenuItem className="gap-2 cursor-pointer" inset>
                                            Back
                                            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                                        </ContextMenuItem>
                                        <ContextMenuItem className="gap-2 cursor-pointer" inset disabled>
                                            Forward
                                            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                                        </ContextMenuItem>
                                        <ContextMenuItem className="gap-2 cursor-pointer" inset>
                                            Reload
                                            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                                        </ContextMenuItem>
                                        <ContextMenuSeparator />
                                        <ContextMenuSub>
                                            <ContextMenuSubTrigger className="gap-2 cursor-pointer" inset>More Tools</ContextMenuSubTrigger>
                                            <ContextMenuSubContent className="w-48">
                                                <ContextMenuItem className="gap-2 cursor-pointer">
                                                    Save Page As...
                                                    <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                                                </ContextMenuItem>
                                                <ContextMenuItem className="gap-2 cursor-pointer">Inspect Element</ContextMenuItem>
                                                <ContextMenuSeparator />
                                                <ContextMenuItem className="gap-2 cursor-pointer">Developer Tools</ContextMenuItem>
                                            </ContextMenuSubContent>
                                        </ContextMenuSub>
                                        <ContextMenuSeparator />
                                        <ContextMenuLabel className="font-black text-[10px] uppercase tracking-widest opacity-50 px-2 py-1.5" inset>Display Options</ContextMenuLabel>
                                        <ContextMenuSeparator />
                                        <ContextMenuItem className="gap-2 cursor-pointer" inset>
                                            Show Sidebar
                                            <ContextMenuShortcut>⇧⌘B</ContextMenuShortcut>
                                        </ContextMenuItem>
                                        <ContextMenuItem className="gap-2 cursor-pointer" inset>Full Resolution</ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
