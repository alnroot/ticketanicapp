"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function useAdminAuth() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (status === "loading") return

    if (status === "unauthenticated") {
      router.push("/auth/login?callbackUrl=/admin")
      return
    }
    console.log(session, "y estatus: ", status)
    // Verificar si el usuario tiene rol de administrador
    if (session?.user?.role === "admin") {
      setIsAdmin(true)
    } else {
      // Redirigir a una página de acceso denegado
      router.push("/access-denied")
    }

    setIsLoading(false)
  }, [session, status, router])

  return { isAdmin, isLoading, session }
}

