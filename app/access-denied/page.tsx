import Link from "next/link"
import { ShieldAlert } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function AccessDeniedPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md text-center">
        <div className="flex justify-center mb-4">
          <ShieldAlert className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Acceso Denegado</h1>
        <p className="text-gray-600 mb-6">
          No tienes permisos para acceder a esta sección. Esta área está reservada para administradores.
        </p>
        <div className="space-y-2">
          <Button asChild className="w-full">
            <Link href="/">Volver al Inicio</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/auth/login">Iniciar Sesión con Otra Cuenta</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

