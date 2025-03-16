import Image from "next/image"
import { CalendarDays, MapPin } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface EventCardProps {
  event: {
    id: number
    title: string
    date: string
    location: string
    image: string
    price: string
  }
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 w-full">
        <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" priority />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg line-clamp-1">{event.title}</h3>
        <div className="flex items-center mt-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4 mr-1" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center mt-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="line-clamp-1">{event.location}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Badge variant="secondary">{event.price}</Badge>
        <span className="text-sm text-muted-foreground">Disponible</span>
      </CardFooter>
    </Card>
  )
}

