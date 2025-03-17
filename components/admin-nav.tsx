"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, CalendarDays, Home, Settings, Ticket, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function AdminNav() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Panel",
      href: "/admin",
      icon: Home,
    },
    {
      title: "Eventos",
      href: "/admin/events",
      icon: CalendarDays,
    },
    {
      title: "Entradas",
      href: "/admin/tickets",
      icon: Ticket,
    },
    {
      title: "Usuarios",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Estadísticas",
      href: "/admin/stats",
      icon: BarChart3,
    },
    {
      title: "Configuración",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/admin" className="flex items-center font-bold text-lg">
          <Ticket className="mr-2 h-5 w-5" />
          <span>Ticketanica Admin</span>
        </Link>
        <nav className="ml-auto flex items-center space-x-1 md:space-x-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "default" : "ghost"}
              size="sm"
              className={cn(
                "h-9",
                pathname === item.href ? "bg-primary text-primary-foreground" : "text-muted-foreground",
              )}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="h-4 w-4 mr-1" />
                <span className="hidden md:inline-block">{item.title}</span>
              </Link>
            </Button>
          ))}
          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-1" />
              <span className="hidden md:inline-block">Volver al Sitio</span>
            </Link>
          </Button>
        </nav>
      </div>
    </div>
  )
}

