import type { DefaultSession } from "next-auth"

// Extender el tipo User para incluir el rol
declare module "next-auth" {
  interface User {
    role?: string
  }

  interface Session {
    user: {
      role?: string
    } & DefaultSession["user"]
  }
}

// Extender el tipo JWT para incluir el rol
declare module "next-auth/jwt" {
  interface JWT {
    role?: string
  }
}

