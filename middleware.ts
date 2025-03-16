// Este archivo es necesario para configurar correctamente NextAuth.js
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Este middleware asegura que NextAuth.js funcione correctamente
export function middleware(request: NextRequest) {
  // Puedes personalizar este middleware según tus necesidades
  return NextResponse.next()
}

