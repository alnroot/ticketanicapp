import Image from "next/image"
import Link from "next/link"
import { CalendarDays, Clock, MapPin, Share2, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function EventPage({ params }: { params: { id: string } }) {
  // Datos de ejemplo para un evento
  const event = {
    id: Number.parseInt(params.id),
    title: "Festival de Música de Verano",
    date: "15 de junio, 2025",
    time: "14:00 - 22:00",
    location: "Parque Central, Nueva York",
    image: "/placeholder.svg?height=600&width=1200",
    price: "49,99€",
    description:
      "Únete al festival de música más grande del verano con artistas de primer nivel de todo el mundo. Disfruta de un día de música increíble, comida y diversión en el corazón del Parque Central.",
    organizer: "Eventos NYC",
    capacity: "5.000 asistentes",
  }

  return (
    <main className="container px-4 py-6 mx-auto space-y-6 md:py-8">
      <div className="space-y-2">
        <Link href="/" className="text-sm text-muted-foreground hover:underline">
          ← Volver a eventos
        </Link>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{event.title}</h1>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3" />
            {event.date}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {event.time}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {event.location}
          </Badge>
        </div>
      </div>

      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" priority />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Sobre este evento</h2>
              <p className="text-muted-foreground">{event.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Detalles del Evento</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-medium">Capacidad</h3>
                    <p className="text-sm text-muted-foreground">{event.capacity}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CalendarDays className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-medium">Fecha y Hora</h3>
                    <p className="text-sm text-muted-foreground">
                      {event.date}, {event.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-medium">Ubicación</h3>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-20">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Precio</h3>
                <span className="text-xl font-bold">{event.price}</span>
              </div>
              <Separator />
              <div className="space-y-2">
                <Button className="w-full">Comprar Entradas</Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartir Evento
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">Organizado por {event.organizer}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

