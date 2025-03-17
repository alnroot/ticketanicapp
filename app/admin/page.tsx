"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { CalendarDays, CheckCircle, Clock, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import AdminNav from "@/components/admin-nav"

export default function AdminDashboard() {
  const { data: session, status } = useSession()

  // Redireccionar si no está autenticado
  if (status === "unauthenticated") {
    redirect("/auth/login")
  }

  // Datos de ejemplo para eventos
  const events = [
    {
      id: 1,
      title: "Festival de Música de Verano",
      date: "15 de junio, 2025",
      time: "14:00 - 22:00",
      location: "Parque Central, Nueva York",
      totalTickets: 5000,
      soldTickets: 3245,
      checkedIn: 0,
    },
    {
      id: 2,
      title: "Conferencia de Tecnología 2025",
      date: "10 de julio, 2025",
      time: "09:00 - 18:00",
      location: "Centro de Convenciones, San Francisco",
      totalTickets: 2000,
      soldTickets: 1876,
      checkedIn: 0,
    },
    {
      id: 3,
      title: "Festival de Comida y Vino",
      date: "5 de agosto, 2025",
      time: "12:00 - 20:00",
      location: "Plaza del Puerto, Chicago",
      totalTickets: 3000,
      soldTickets: 2100,
      checkedIn: 0,
    },
  ]

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminNav />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Panel de Administrador</h2>
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href="/admin/events/new">Crear Evento</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Eventos</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{events.length}</div>
              <p className="text-xs text-muted-foreground">+0% desde el último mes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Entradas Vendidas</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{events.reduce((acc, event) => acc + event.soldTickets, 0)}</div>
              <p className="text-xs text-muted-foreground">+15% desde el último mes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Capacidad Total</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{events.reduce((acc, event) => acc + event.totalTickets, 0)}</div>
              <p className="text-xs text-muted-foreground">+0% desde el último mes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próximo Evento</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15 Jun</div>
              <p className="text-xs text-muted-foreground">En 45 días</p>
            </CardContent>
          </Card>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-4">Eventos Próximos</h3>

        <div className="grid gap-4">
          {events.map((event) => (
            <Card key={event.id}>
              <CardHeader className="pb-2">
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>
                  {event.date} • {event.time} • {event.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Capacidad</p>
                    <p className="text-xl font-bold">{event.totalTickets}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Vendidas</p>
                    <p className="text-xl font-bold">{event.soldTickets}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Registrados</p>
                    <p className="text-xl font-bold">{event.checkedIn}</p>
                  </div>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <Button variant="outline" asChild>
                    <Link href={`/admin/events/${event.id}`}>Gestionar</Link>
                  </Button>
                  <Button asChild>
                    <Link href={`/admin/events/${event.id}/check-in`}>Verificar Entradas</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

