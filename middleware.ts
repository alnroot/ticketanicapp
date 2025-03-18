import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  // Verificar si la ruta comienza con /admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    // Si no hay token o el usuario no es admin, redirigir
    if (!token || token.role !== "admin") {
      // Redirigir a la página de acceso denegado
      return NextResponse.redirect(new URL("/access-denied", request.url))
    }
  }

  return NextResponse.next()
}

// Configurar las rutas que deben ser protegidas
export const config = {
  matcher: ["/admin/:path*"],
}

