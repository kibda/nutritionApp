import React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { NutritionChatBubble } from "@/components/chat-bot"
import { UserProvider } from "../context/UserContext"

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen">
      
      <AppSidebar />
      <main className="flex-1 overflow-x-hidden flex justify-center items-center p-6">
        <div className="w-full max-w-4xl flex justify-center">
          {children}
        </div>
      </main>
      <NutritionChatBubble />
      
    </div>
  )
}