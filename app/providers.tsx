import React from "react"
import { AppProvider } from "context/app-context"
import { ThemeProvider } from "components/theme-provider"
import { SidebarProvider } from "components/ui/sidebar"
import { Toaster } from "components/ui/toaster"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <SidebarProvider>
        <AppProvider>
          {children}
          <Toaster />
        </AppProvider>
      </SidebarProvider>
    </ThemeProvider>
  )
}
