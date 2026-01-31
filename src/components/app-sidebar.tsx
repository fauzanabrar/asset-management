"use client"

import { Home, Database, Settings, Box, User, LogOut, ChevronRight, FileText, LayoutDashboard, Component, Server } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { logout } from "@/lib/actions"

// Refined menu structure
const items = [
    {
        title: "Overview",
        type: "group",
        items: [
            {
                title: "Dashboard",
                url: "/dashboard",
                icon: Home,
            },
            {
                title: "Analytics",
                url: "/dashboard/analytics",
                icon: LayoutDashboard,
            },
        ]
    },
    {
        title: "Platform",
        type: "group",
        items: [
            {
                title: "Database",
                icon: Database,
                // Accordion Item
                items: [
                    { title: "All Tables", url: "/dashboard/database" },
                    { title: "Query Editor", url: "/dashboard/database/query" },
                    { title: "Migrations", url: "/dashboard/database/migrations" },
                ]
            },
            {
                title: "Components",
                icon: Box,
                // Accordion Item
                items: [
                    { title: "Library", url: "/dashboard/components" },
                    { title: "Primitives", url: "/dashboard/components/primitives" },
                ]
            },
            {
                title: "API Keys",
                url: "/dashboard/api-keys",
                icon: Server,
                // Flat item mixed in
            }
        ]
    },
    {
        title: "Settings",
        type: "group",
        items: [
            {
                title: "General",
                url: "/dashboard/settings",
                icon: Settings,
            },
            {
                title: "Profile",
                url: "/dashboard/profile",
                icon: User,
            },
            {
                title: "Documentation",
                url: "/docs",
                icon: FileText,
            },
        ]
    }
]

export function AppSidebar({ user }: { user?: any }) {
    const pathname = usePathname()

    return (
        <Sidebar className="border-r-0 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-2xl shadow-xl transition-all duration-300">
            <SidebarHeader className="h-16 flex items-center justify-center border-b border-black/5 dark:border-white/5 px-6">
                <span className="text-xl font-bold bg-gradient-to-tr from-primary to-purple-600 bg-clip-text text-transparent">
                    Nexus Admin
                </span>
            </SidebarHeader>
            <SidebarContent className="px-4 py-6 gap-8">
                {items.map((group, index) => (
                    <SidebarGroup key={index} className="px-0">
                        <SidebarGroupLabel className="px-4 text-xs font-semibold text-muted-foreground/70 uppercase tracking-widest mb-4">
                            {group.title}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu className="gap-2">
                                {group.items.map((item: any) => (
                                    <SidebarMenuItem key={item.title}>
                                        {item.items ? (
                                            <div className="space-y-2">
                                                <div className="px-3 py-2 flex items-center gap-3 text-sm font-bold text-foreground/70 uppercase tracking-tight">
                                                    {item.icon && <item.icon className="h-4 w-4" />}
                                                    <span>{item.title}</span>
                                                </div>
                                                <SidebarMenuSub className="space-y-1 pl-4 border-l-0 px-0 mx-0 mt-0">
                                                    {item.items.map((subItem: any) => (
                                                        <SidebarMenuSubItem key={subItem.title}>
                                                            <SidebarMenuSubButton
                                                                asChild
                                                                isActive={pathname === subItem.url}
                                                                size="md"
                                                                className="h-10 text-base font-medium border border-transparent hover:bg-sidebar-accent hover:border-sidebar-border hover:shadow-sm transition-all"
                                                            >
                                                                <Link href={subItem.url}>
                                                                    <span>{subItem.title}</span>
                                                                </Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </div>
                                        ) : (
                                            <SidebarMenuButton
                                                asChild
                                                isActive={pathname === item.url}
                                                tooltip={item.title}
                                                size="lg"
                                                className="h-12 text-base font-medium border border-transparent shadow-none hover:shadow-sm hover:border-sidebar-border hover:bg-sidebar-accent transition-all"
                                            >
                                                <Link href={item.url}>
                                                    {item.icon && <item.icon className="h-5 w-5" />}
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        )}
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter className="border-t border-black/5 dark:border-white/5 p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={async () => {
                                await logout()
                            }}
                            size="lg"
                            className="h-11 text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Sign Out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
