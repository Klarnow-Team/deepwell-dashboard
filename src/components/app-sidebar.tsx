"use client"

import * as React from "react"
import { LayoutDashboard, Users, UserPlus, User, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Access",
    url: "/access",
    icon: Users,
  },
  {
    title: "Signups",
    url: "/signups",
    icon: UserPlus,
  },
  {
    title: "Account",
    url: "/account",
    icon: User,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to logout")
      }

      toast.success("Logged out successfully")
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("Failed to logout")
    }
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard" className="flex items-center">
                <img 
                  src="/Asset 20.svg" 
                  alt="DeepWell Logo" 
                  className="h-8 w-auto"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-3">
        <SidebarMenu className="mt-6 space-y-5">
          {navItems.map((item) => {
            const isActive = pathname === item.url
            return (
              <SidebarMenuItem key={item.title} className="px-1">
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    "text-base py-3.5 px-5 rounded-full transition-all",
                    isActive && "!bg-[#00674F] !text-white scale-105 shadow-sm data-[active=true]:!bg-[#00674F] data-[active=true]:!text-white"
                  )}
                >
                  <Link href={item.url} className="flex items-center gap-3">
                    <item.icon className={cn("h-6 w-6", isActive && "h-7 w-7")} />
                    <span className={cn("text-base font-medium", isActive && "font-semibold")}>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="px-3 pb-4">
        <SidebarMenu>
          <SidebarMenuItem className="px-1">
            <SidebarMenuButton
              onClick={handleLogout}
              className={cn(
                "text-base py-3.5 px-5 rounded-full transition-all w-full",
                "text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
              )}
            >
              <LogOut className="h-6 w-6" />
              <span className="text-base font-medium">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
