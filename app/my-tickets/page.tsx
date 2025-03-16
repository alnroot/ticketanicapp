"use client"

import Image from "next/image"
import Link from "next/link"
import { CalendarDays, MapPin, QrCode, TicketIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function MyTicketsPage() {
  const [activeTicket, setActiveTicket] = useState<number | null>(null)

  // Datos de ejemplo para entradas
  const tickets = [
    {
      id: 1,
      eventId: 1,
      eventTitle: "Festival de Música de Verano",
      date: "15 de junio, 2025",
      location: "Parque Central, Nueva York",
      image: "/logo.jpg?height=400&width=600",
      ticketType: "Entrada General",
      price: "49,99€",
      qrCode: "/logo.jpg?height=300&width=300",
    },
    {
      id: 2,
      eventId: 2,
      eventTitle: "Conferencia de Tecnología 2025",
      date: "10 de julio, 2025",
      location: "Centro de Convenciones, San Francisco",
      image: "/logo.jpg?height=400&width=600",
      ticketType: "Acceso VIP",
      price: "149,99€",
      qrCode: "/logo.jpg?height=300&width=300",
    },
  ]

  const pastTickets = [
    {
      id: 3,
      eventId: 3,
      eventTitle: "Serie de Conciertos de Invierno",
      date: "15 de diciembre, 2024",
      location: "Madison Square Garden, Nueva York",
      image: "/logo.jpg?height=400&width=600",
      ticketType: "Entrada General",
      price: "39,99€",
      qrCode: "/logo.jpg?height=300&width=300",
    },
  ]

  return (
    <main className="container px-4 py-6 mx-auto space-y-6 md:py-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Mis Entradas</h1>
        <p className="text-muted-foreground">Gestiona tus entradas para eventos</p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="upcoming">Próximos</TabsTrigger>
          <TabsTrigger value="past">Pasados</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {tickets.length === 0 ? (
            <div className="text-center py-12">
              <TicketIcon className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No hay entradas próximas</h3>
              <p className="mt-2 text-sm text-muted-foreground">No tienes entradas para eventos próximos.</p>
              <Button className="mt-4" asChild>
                <Link href="/">Explorar Eventos</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tickets.map((ticket) => (
                <Card key={ticket.id} className="overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src={ticket.image || "/logo.jpg"}
                      alt={ticket.eventTitle}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg line-clamp-1">{ticket.eventTitle}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{ticket.ticketType}</p>
                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>{ticket.date}</span>
                    </div>
                    <div className="flex items-center mt-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="line-clamp-1">{ticket.location}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <QrCode className="mr-2 h-4 w-4" />
                          Ver Entrada
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{ticket.eventTitle}</DialogTitle>
                          <DialogDescription>
                            {ticket.ticketType} - {ticket.date}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col items-center justify-center py-4">
                          <div className="relative h-64 w-64 mb-4">
                            <Image
                              src={ticket.qrCode || "/logo.jpg"}
                              alt="Código QR de Entrada"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <p className="text-center text-sm text-muted-foreground">
                            Presenta este código QR en la entrada del evento
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/events/${ticket.eventId}`}>Detalles del Evento</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastTickets.length === 0 ? (
            <div className="text-center py-12">
              <TicketIcon className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No hay entradas pasadas</h3>
              <p className="mt-2 text-sm text-muted-foreground">No tienes entradas para eventos pasados.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pastTickets.map((ticket) => (
                <Card key={ticket.id} className="overflow-hidden opacity-75">
                  <div className="relative h-48 w-full">
                    <Image
                      src={ticket.image || "/logo.jpg"}
                      alt={ticket.eventTitle}
                      fill
                      className="object-cover grayscale"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg line-clamp-1">{ticket.eventTitle}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{ticket.ticketType}</p>
                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>{ticket.date}</span>
                    </div>
                    <div className="flex items-center mt-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="line-clamp-1">{ticket.location}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/events/${ticket.eventId}`}>Detalles del Evento</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </main>
  )
}

