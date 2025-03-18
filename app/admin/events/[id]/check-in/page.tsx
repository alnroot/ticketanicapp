"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Search, X, Download } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import AdminNav from "@/components/admin-nav"
import QRScanner from "@/components/qr-scanner"

export default function EventCheckInPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [scanResult, setScanResult] = useState<null | { success: boolean; message: string; attendee?: any }>(null)
  const [checkedInAttendees, setCheckedInAttendees] = useState<any[]>([])

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
  }

  // Datos de ejemplo para asistentes
  const attendees = [
    {
      id: 1,
      name: "Ana García",
      email: "ana@example.com",
      ticketId: "TICKET-VIP-001",
      ticketType: "VIP",
      checkedIn: false,
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      email: "carlos@example.com",
      ticketId: "TICKET-GEN-002",
      ticketType: "General",
      checkedIn: false,
    },
    {
      id: 3,
      name: "María López",
      email: "maria@example.com",
      ticketId: "TICKET-VIP-003",
      ticketType: "VIP",
      checkedIn: false,
    },
    {
      id: 4,
      name: "Juan Pérez",
      email: "juan@example.com",
      ticketId: "TICKET-GEN-004",
      ticketType: "General",
      checkedIn: false,
    },
    {
      id: 5,
      name: "Laura Martínez",
      email: "laura@example.com",
      ticketId: "TICKET-VIP-005",
      ticketType: "VIP",
      checkedIn: false,
    },
  ]

  const handleScan = (data: string) => {
    // Simular verificación de QR
    console.log("QR escaneado:", data)

    // Buscar el ticket en los datos de ejemplo
    const attendee = attendees.find((a) => a.ticketId === data)

    if (attendee) {
      if (checkedInAttendees.some((a) => a.id === attendee.id)) {
        setScanResult({
          success: false,
          message: "Este asistente ya ha sido registrado anteriormente.",
          attendee,
        })
      } else {
        // Registrar al asistente
        const now = new Date()
        const time = now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0")

        const updatedAttendee = { ...attendee, checkedIn: true, checkedInTime: time }
        setCheckedInAttendees([updatedAttendee, ...checkedInAttendees])

        setScanResult({
          success: true,
          message: "Asistente registrado correctamente.",
          attendee: updatedAttendee,
        })
      }
    } else {
      setScanResult({
        success: false,
        message: "Entrada no válida o no encontrada.",
      })
    }
  }

  const handleManualSearch = () => {
    if (!searchQuery.trim()) return

    // Buscar por nombre, email o ID de ticket
    const attendee = attendees.find(
      (a) =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.ticketId.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    if (attendee) {
      if (checkedInAttendees.some((a) => a.id === attendee.id)) {
        setScanResult({
          success: false,
          message: "Este asistente ya ha sido registrado anteriormente.",
          attendee,
        })
      } else {
        // Registrar al asistente
        const now = new Date()
        const time = now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0")

        const updatedAttendee = { ...attendee, checkedIn: true, checkedInTime: time }
        setCheckedInAttendees([updatedAttendee, ...checkedInAttendees])

        setScanResult({
          success: true,
          message: "Asistente registrado correctamente.",
          attendee: updatedAttendee,
        })
      }
    } else {
      setScanResult({
        success: false,
        message: "Asistente no encontrado. Verifica los datos e intenta de nuevo.",
      })
    }
  }

  const clearScanResult = () => {
    setScanResult(null)
  }

  if (isLoading) {
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
            <Link href={`/admin/events/${event.id}`}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Volver
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Verificar Entradas</h2>
        </div>

        <p className="text-muted-foreground">
          {event.title} • {event.date} • {event.time}
        </p>

        <Tabs defaultValue="scanner" className="mt-6">
          <TabsList>
            <TabsTrigger value="scanner">Escáner QR</TabsTrigger>
            <TabsTrigger value="manual">Búsqueda Manual</TabsTrigger>
            <TabsTrigger value="checked-in">Registrados ({checkedInAttendees.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="scanner" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Escanear Código QR</CardTitle>
                <CardDescription>Escanea el código QR de la entrada para verificar al asistente.</CardDescription>
              </CardHeader>
              <CardContent>
                <QRScanner onScan={handleScan} />
              </CardContent>
            </Card>

            {scanResult && (
              <Card className={scanResult.success ? "border-green-500" : "border-red-500"}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className={scanResult.success ? "text-green-600" : "text-red-600"}>
                      {scanResult.success ? "Verificación Exitosa" : "Error de Verificación"}
                    </CardTitle>
                    <Button variant="ghost" size="icon" onClick={clearScanResult}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Alert variant={scanResult.success ? "default" : "destructive"}>
                    {scanResult.success ? <CheckCircle className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    <AlertTitle>{scanResult.success ? "Verificado" : "No Verificado"}</AlertTitle>
                    <AlertDescription>{scanResult.message}</AlertDescription>
                  </Alert>

                  {scanResult.attendee && (
                    <div className="mt-4 space-y-2">
                      <p>
                        <strong>Nombre:</strong> {scanResult.attendee.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {scanResult.attendee.email}
                      </p>
                      <p>
                        <strong>Tipo de Entrada:</strong> {scanResult.attendee.ticketType}
                      </p>
                      <p>
                        <strong>ID de Entrada:</strong> {scanResult.attendee.ticketId}
                      </p>
                      {scanResult.attendee.checkedInTime && (
                        <p>
                          <strong>Hora de Registro:</strong> {scanResult.attendee.checkedInTime}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="manual" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Búsqueda Manual</CardTitle>
                <CardDescription>Busca al asistente por nombre, email o ID de entrada.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Buscar asistente..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleManualSearch()}
                  />
                  <Button onClick={handleManualSearch}>
                    <Search className="h-4 w-4 mr-1" />
                    Buscar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {scanResult && (
              <Card className={scanResult.success ? "border-green-500" : "border-red-500"}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className={scanResult.success ? "text-green-600" : "text-red-600"}>
                      {scanResult.success ? "Verificación Exitosa" : "Error de Verificación"}
                    </CardTitle>
                    <Button variant="ghost" size="icon" onClick={clearScanResult}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Alert variant={scanResult.success ? "default" : "destructive"}>
                    {scanResult.success ? <CheckCircle className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    <AlertTitle>{scanResult.success ? "Verificado" : "No Verificado"}</AlertTitle>
                    <AlertDescription>{scanResult.message}</AlertDescription>
                  </Alert>

                  {scanResult.attendee && (
                    <div className="mt-4 space-y-2">
                      <p>
                        <strong>Nombre:</strong> {scanResult.attendee.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {scanResult.attendee.email}
                      </p>
                      <p>
                        <strong>Tipo de Entrada:</strong> {scanResult.attendee.ticketType}
                      </p>
                      <p>
                        <strong>ID de Entrada:</strong> {scanResult.attendee.ticketId}
                      </p>
                      {scanResult.attendee.checkedInTime && (
                        <p>
                          <strong>Hora de Registro:</strong> {scanResult.attendee.checkedInTime}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="checked-in" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Asistentes Registrados</CardTitle>
                <CardDescription>Lista de asistentes que han sido verificados.</CardDescription>
              </CardHeader>
              <CardContent>
                {checkedInAttendees.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No hay asistentes registrados todavía.</div>
                ) : (
                  <div className="space-y-4">
                    {checkedInAttendees.map((attendee) => (
                      <div key={attendee.id} className="flex items-center justify-between border-b pb-4">
                        <div>
                          <h4 className="font-medium">{attendee.name}</h4>
                          <p className="text-sm text-muted-foreground">{attendee.email}</p>
                          <p className="text-sm text-muted-foreground">Tipo: {attendee.ticketType}</p>
                        </div>
                        <div>
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            Registrado a las {attendee.checkedInTime}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-1" />
                  Exportar Lista
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

