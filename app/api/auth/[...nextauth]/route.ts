import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import type { NextAuthOptions } from "next-auth"

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
      return session
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.user = user
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

