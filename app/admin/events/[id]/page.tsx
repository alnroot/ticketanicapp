"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Edit, Trash, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import AdminNav from "@/components/admin-nav"

export default function EventAdminPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Dar tiempo a que la sesión se cargue completamente
    if (status === "loading") return

    // Solo redirigir después de confirmar que no hay sesión
    if (status === "unauthenticated") {
      router.push("/auth/login")
    } else {
      setIsLoading(false)
    }
  }, [status, router])

  // Datos de ejemplo para el evento
  const event = {
    id: Number.parseInt(params.id),
    title: "Festival de Música de Verano",
    date: "15 de junio, 2025",
    time: "14:00 - 22:00",
    location: "Parque Central, Nueva York",
    totalTickets: 5000,
    soldTickets: 3245,
    checkedIn: 0,
    description:
      "Únete al festival de música más grande del verano con artistas de primer nivel de todo el mundo. Disfruta de un día de música increíble, comida y diversión en el corazón del Parque Central.",
    organizer: "Eventos NYC",
    ticketTypes: [
      { name: "General", price: "49,99€", sold: 2500, total: 3500 },
      { name: "VIP", price: "149,99€", sold: 745, total: 1000 },
      { name: "Backstage", price: "299,99€", sold: 0, total: 500 },
    ],
    recentAttendees: [
      {
        id: 1,
        name: "Ana García",
        email: "ana@example.com",
        ticketType: "VIP",
        checkedIn: true,
        checkedInTime: "14:05",
      },
      {
        id: 2,
        name: "Carlos Rodríguez",
        email: "carlos@example.com",
        ticketType: "General",
        checkedIn: true,
        checkedInTime: "14:10",
      },
      {
        id: 3,
        name: "María López",
        email: "maria@example.com",
        ticketType: "VIP",
        checkedIn: false,
        checkedInTime: null,
      },
    ],
  }

  if (isLoading || status === "loading") {
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
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link href="/admin">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Volver
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">{event.title}</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div>
            <p className="text-muted-foreground">
              {event.date} • {event.time} • {event.location}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Exportar Datos
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Editar Evento
            </Button>
            <Button variant="destructive" size="sm">
              <Trash className="h-4 w-4 mr-1" />
              Eliminar
            </Button>
            <Button size="sm" asChild>
              <Link href={`/admin/events/${event.id}/check-in`}>
                <Users className="h-4 w-4 mr-1" />
                Verificar Entradas
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Capacidad Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{event.totalTickets}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Entradas Vendidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{event.soldTickets}</div>
              <Progress value={(event.soldTickets / event.totalTickets) * 100} className="h-2 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Registrados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{event.checkedIn}</div>
              <Progress value={(event.checkedIn / event.soldTickets) * 100} className="h-2 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{event.totalTickets - event.soldTickets}</div>
              <Progress
                value={((event.totalTickets - event.soldTickets) / event.totalTickets) * 100}
                className="h-2 mt-2"
              />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="tickets">Entradas</TabsTrigger>
            <TabsTrigger value="attendees">Asistentes</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Descripción del Evento</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{event.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tipos de Entradas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {event.ticketTypes.map((type, index) => (
                    <div key={index} className="flex flex-col">
                      <div className="flex justify-between items-center mb-1">
                        <div className="font-medium">{type.name}</div>
                        <div className="text-sm text-muted-foreground">{type.price}</div>
                      </div>
                      <div className="flex justify-between items-center text-sm text-muted-foreground mb-1">
                        <span>
                          Vendidas: {type.sold} de {type.total}
                        </span>
                        <span>{Math.round((type.sold / type.total) * 100)}%</span>
                      </div>
                      <Progress value={(type.sold / type.total) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Entradas</CardTitle>
                <CardDescription>Administra los tipos de entradas y precios para este evento.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {event.ticketTypes.map((type, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-4">
                      <div>
                        <h4 className="font-medium">{type.name}</h4>
                        <p className="text-sm text-muted-foreground">Precio: {type.price}</p>
                        <p className="text-sm text-muted-foreground">
                          Disponibles: {type.total - type.sold} de {type.total}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                        <Button variant="destructive" size="sm">
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button>Añadir Tipo de Entrada</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendees" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Asistentes Recientes</CardTitle>
                <Button variant="outline" size="sm">
                  Ver Todos
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {event.recentAttendees.map((attendee) => (
                    <div key={attendee.id} className="flex items-center justify-between border-b pb-4">
                      <div>
                        <h4 className="font-medium">{attendee.name}</h4>
                        <p className="text-sm text-muted-foreground">{attendee.email}</p>
                        <p className="text-sm text-muted-foreground">Tipo: {attendee.ticketType}</p>
                      </div>
                      <div>
                        {attendee.checkedIn ? (
                          <div className="flex items-center text-green-600">
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              Registrado a las {attendee.checkedInTime}
                            </span>
                          </div>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            No registrado
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

