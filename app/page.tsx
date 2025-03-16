import Link from "next/link"
import { CalendarDays, MapPin, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import EventCard from "@/components/event-card"

export default function Home() {
  // Datos de ejemplo para eventos
  const events = [
    {
      id: 1,
      title: "Festival de Música de Verano",
      date: "15 de junio, 2025",
      location: "Parque Central, Nueva York",
      image: "/logo.jpg?height=400&width=600",
      price: "49,99€",
    },
    {
      id: 2,
      title: "Conferencia de Tecnología 2025",
      date: "10 de julio, 2025",
      location: "Centro de Convenciones, San Francisco",
      image: "/images.png?height=400&width=600",
      price: "99,99€",
    },
    {
      id: 3,
      title: "Festival de Comida y Vino",
      date: "5 de agosto, 2025",
      location: "Plaza del Puerto, Chicago",
      image: "/logo.jpg?height=400&width=600",
      price: "35,00€",
    },
    {
      id: 4,
      title: "Festival Internacional de Cine",
      date: "20 de septiembre, 2025",
      location: "Teatro del Centro, Los Ángeles",
      image: "/logo.jpg?height=400&width=600",
      price: "25,00€",
    },
  ]

  return (
    <main className="container px-4 py-6 mx-auto space-y-6 md:py-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Descubre Eventos</h1>
        <p className="text-muted-foreground">Encuentra y compra entradas para eventos increíbles cerca de ti</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar eventos..." className="pl-9" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button variant="outline" size="sm" className="rounded-full">
          <CalendarDays className="mr-2 h-4 w-4" />
          Hoy
        </Button>
        <Button variant="outline" size="sm" className="rounded-full">
          <CalendarDays className="mr-2 h-4 w-4" />
          Este fin de semana
        </Button>
        <Button variant="outline" size="sm" className="rounded-full">
          <MapPin className="mr-2 h-4 w-4" />
          Cerca de mí
        </Button>
        <Button variant="outline" size="sm" className="rounded-full">
          Música
        </Button>
        <Button variant="outline" size="sm" className="rounded-full">
          Tecnología
        </Button>
        <Button variant="outline" size="sm" className="rounded-full">
          Comida
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Link key={event.id} href={`/events/${event.id}`}>
            <EventCard event={event} />
          </Link>
        ))}
      </div>
    </main>
  )
}

