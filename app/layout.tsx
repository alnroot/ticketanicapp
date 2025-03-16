import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import MainNav from "@/components/main-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ticketanica - Encuentra y Compra Entradas para Eventos",
  description: "Descubre y compra entradas para eventos increíbles cerca de ti",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="relative flex min-h-screen flex-col">
              <MainNav />
              <div className="flex-1">{children}</div>
              <footer className="border-t py-6 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
                  <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    © 2025 Ticketanica. Todos los derechos reservados.
                  </p>
                </div>
              </footer>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'