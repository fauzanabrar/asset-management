import { Home, Database, Settings, Box, User, FileText, LayoutDashboard, Server } from "lucide-react"

export interface SidebarSubItem {
    title: string;
    url: string;
}

export interface SidebarItem {
    title: string;
    url?: string;
    icon?: any;
    items?: SidebarSubItem[];
}

export interface SidebarGroup {
    title: string;
    type: string;
    items: SidebarItem[];
}

export const sidebarGroups: SidebarGroup[] = [
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
                items: [
                    { title: "All Tables", url: "/dashboard/database" },
                    { title: "Query Editor", url: "/dashboard/database/query" },
                    { title: "Migrations", url: "/dashboard/database/migrations" },
                ]
            },
            {
                title: "Components",
                icon: Box,
                items: [
                    { title: "Library", url: "/dashboard/components" },
                    { title: "Primitives", url: "/dashboard/components/primitives" },
                ]
            },
            {
                title: "API Keys",
                url: "/dashboard/api-keys",
                icon: Server,
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
