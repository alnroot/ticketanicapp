import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import type { NextAuthOptions } from "next-auth"

// Lista de correos electrónicos de administradores
const ADMIN_EMAILS = [
  "alanrotta99@gmail.com",
  "leonzio.lv@gmail.com",
]

// Definir las opciones de autenticación correctamente
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/",
    error: "/auth/error",
  },
  callbacks: {
    async session({ session, token }) {
      // Añadir el rol a la sesión basado en el email
      if (session.user && session.user.email) {
        session.user.role = ADMIN_EMAILS.includes(session.user.email) ? "admin" : "user"
      }
      return session
    },
    async jwt({ token, user, account }) {
      // Añadir el rol al token JWT
      if (user) {
        token.user = user
        token.role = ADMIN_EMAILS.includes(user.email as string) ? "admin" : "user"
      }
      return token
    },
  },
  // Añadir configuración de seguridad
  secret: process.env.NEXTAUTH_SECRET || "tu_secreto_temporal_para_desarrollo",
  debug: process.env.NODE_ENV === "development",
}

// Crear y exportar el handler correctamente
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }