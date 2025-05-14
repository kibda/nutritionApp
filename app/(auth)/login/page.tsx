"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Dumbbell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="w-full h-screen flex items-center justify-center ">
      {/* Background image overlay covers the entire viewport */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20" />
      
      <div className="relative w-full max-w-md px-4">
        <div className="mb-8 flex items-center justify-center gap-2 text-center text-3xl font-bold text-white">
          <Dumbbell className="h-8 w-8" />
          <span>Calorize</span>
        </div>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Welcome back</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="name@example.com" required />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="#" className="text-xs text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input id="password" type="password" required />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-500 to-blue-600"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline">Google</Button>
                  <Button variant="outline">Apple</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>Enter your information to create an account</CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" type="text" placeholder="John Doe" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="name@example.com" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" required />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-green-500 to-blue-600">Create Account</Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline">Google</Button>
                  <Button variant="outline">Apple</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}