"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { AlertCircle, Ticket } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  let errorMessage = "Ocurrió un error durante la autenticación."

  if (error === "OAuthSignin") errorMessage = "Error al iniciar el proceso de autenticación con Google."
  if (error === "OAuthCallback") errorMessage = "Error al procesar la respuesta de Google."
  if (error === "OAuthCreateAccount") errorMessage = "Error al crear la cuenta con Google."
  if (error === "EmailCreateAccount") errorMessage = "Error al crear la cuenta con correo electrónico."
  if (error === "Callback") errorMessage = "Error en la respuesta del proveedor de autenticación."
  if (error === "AccessDenied") errorMessage = "Acceso denegado. No tienes permiso para iniciar sesión."
  if (error === "Configuration") errorMessage = "Error de configuración del servidor."

  return (
    <div className="container flex h-screen w-full flex-col items-center justify-center px-4 md:px-6">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex justify-center">
            <Ticket className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Error de autenticación</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-center">No se pudo completar la autenticación</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button asChild className="w-full">
              <Link href="/auth/login">Volver a intentar</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">Volver al inicio</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

