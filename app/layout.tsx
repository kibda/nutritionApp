import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { NutritionChatBubble } from "@/components/chat-bot"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "FitCoach - Fitness Coaching Platform",
  description: "A comprehensive fitness coaching platform for trainers and clients"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SidebarProvider>
            {children}
            
            <Toaster />
          </SidebarProvider>
          
        </ThemeProvider>
        
      </body>
    </html>
  )
}