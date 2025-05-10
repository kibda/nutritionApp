import React from "react"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex-1 overflow-x-hidden flex justify-center items-center min-h-screen p-6  bg-gradient-to-br from-green-500 to-blue-600">
      <div className="w-full max-w-md flex justify-center">
        {children}
      </div>
    </main>
  )
}