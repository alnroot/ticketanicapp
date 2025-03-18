"use client"

import Link from "next/link"
import { Home, Menu, Ticket, User, LogOut, Settings } from "lucide-react"
import { useState } from "react"
import { useSession, signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function MainNav() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated"

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="flex items-center space-x-2">
            <Ticket className="h-6 w-6" />
            <span className="font-bold">Ticketanica</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Inicio
            </Link>
            <Link href="/events" className="text-sm font-medium transition-colors hover:text-primary">
              Eventos
            </Link>
            <Link href="/my-tickets" className="text-sm font-medium transition-colors hover:text-primary">
              Mis Entradas
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                      <AvatarFallback>{session.user?.name ? getInitials(session.user.name) : "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
                  <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                    {session.user?.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/my-tickets">Mis Entradas</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Panel de Administrador</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/auth/login" className="hidden md:block">
                  <Button variant="outline" size="sm">
                    Iniciar sesión
                  </Button>
                </Link>
                <Link href="/auth/register" className="hidden md:block">
                  <Button size="sm">Registrarse</Button>
                </Link>
              </>
            )}

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Alternar menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="pr-0">
                <div className="flex flex-col gap-4 px-4">
                  {isAuthenticated && (
                    <div className="flex items-center gap-2 py-4 border-b">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                        <AvatarFallback>{session.user?.name ? getInitials(session.user.name) : "U"}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{session.user?.name}</span>
                        <span className="text-xs text-muted-foreground">{session.user?.email}</span>
                      </div>
                    </div>
                  )}
                  <Link href="/" className="flex items-center py-2" onClick={() => setIsOpen(false)}>
                    <Home className="mr-2 h-5 w-5" />
                    Inicio
                  </Link>
                  <Link href="/events" className="flex items-center py-2" onClick={() => setIsOpen(false)}>
                    <Ticket className="mr-2 h-5 w-5" />
                    Eventos
                  </Link>
                  <Link href="/my-tickets" className="flex items-center py-2" onClick={() => setIsOpen(false)}>
                    <Ticket className="mr-2 h-5 w-5" />
                    Mis Entradas
                  </Link>

                  <Link href="/admin" className="flex items-center py-2" onClick={() => setIsOpen(false)}>
                    <Settings className="mr-2 h-5 w-5" />
                    Panel de Administrador
                  </Link>

                  {isAuthenticated ? (
                    <button
                      className="flex items-center py-2 text-left"
                      onClick={() => {
                        handleSignOut()
                        setIsOpen(false)
                      }}
                    >
                      <LogOut className="mr-2 h-5 w-5" />
                      Cerrar sesión
                    </button>
                  ) : (
                    <>
                      <Link href="/auth/login" className="flex items-center py-2" onClick={() => setIsOpen(false)}>
                        <User className="mr-2 h-5 w-5" />
                        Iniciar sesión
                      </Link>
                      <Link href="/auth/register" className="flex items-center py-2" onClick={() => setIsOpen(false)}>
                        <User className="mr-2 h-5 w-5" />
                        Registrarse
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

