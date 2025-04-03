"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, User, Briefcase, Star, Mail, Settings } from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: Home,
  },
  {
    title: "Hero Section",
    href: "/admin/hero",
    icon: User,
  },
  {
    title: "About",
    href: "/admin/about",
    icon: Settings,
  },
  {
    title: "Projects",
    href: "/admin/projects",
    icon: Briefcase,
  },
  {
    title: "Reviews",
    href: "/admin/reviews",
    icon: Star,
  },
  {
    title: "Messages",
    href: "/admin/messages",
    icon: Mail,
  },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <div className="w-64 border-r bg-muted/50">
      <div className="flex h-full flex-col">
        <div className="p-6">
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
        </div>
        <ScrollArea className="flex-1">
          <nav className="grid gap-1 px-2">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent ${
                    pathname === item.href ? "bg-accent text-accent-foreground" : "transparent"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </span>
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </div>
  )
}

