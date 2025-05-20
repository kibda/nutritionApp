"use client"

import { useState, useRef, FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Dumbbell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@/app/context/UserContext"

// Define the user type
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

export default function LoginPage() {
  const router = useRouter()
  const { login } = useUser()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  
  // Form refs with proper types
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    const email = emailRef.current?.value
    const password = passwordRef.current?.value
    
    // Check if it's the admin account
    if (email === "admin@calorize.com" && password === "admin123") {
      // Log in as admin
      console.log("Logging in as admin")
      const adminUser: User = {
        id: "admin1",
        name: "Admin User",
        email: "admin@calorize.com",
        role: "admin"
      }
      login(adminUser)
      
      // Add a brief delay for UX purposes
      setTimeout(() => {
        setIsLoading(false)
        router.push("/dashboard")
      }, 1000)
    } else {
      // For demo purposes, accept any valid-looking email/password combination
      if (email && password && password.length >= 6) {
        // Log in as regular user
        console.log("Logging in as regular user")
        const regularUser: User = {
          id: "user1",
          name: "Regular User",
          email: email || "",
          role: "user"
        }
        login(regularUser)
        
        setTimeout(() => {
          setIsLoading(false)
          router.push("/dashboard")
        }, 1000)
      } else {
        setIsLoading(false)
        setError("Invalid email or password")
      }
    }
  }

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    const name = nameRef.current?.value
    const email = emailRef.current?.value
    const password = passwordRef.current?.value
    const confirmPassword = confirmPasswordRef.current?.value
    
    // Simple validation
    if (!name || !email || !password) {
      setIsLoading(false)
      setError("All fields are required")
      return
    }
    
    if (password !== confirmPassword) {
      setIsLoading(false)
      setError("Passwords do not match")
      return
    }
    
    // Register as regular user
    const newUser: User = {
      id: "user" + Math.floor(Math.random() * 1000),
      name: name,
      email: email,
      role: "user"
    }
    
    console.log("Registering new user:", newUser)
    login(newUser)
    
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
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
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="name@example.com" ref={emailRef} required />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="#" className="text-xs text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input id="password" type="password" ref={passwordRef} required />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-500 to-blue-600"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                    
                    {/* Helper text for demo purposes */}
                    <div className="text-xs text-center text-muted-foreground">
                      <p>Admin login: admin@calorize.com / admin123</p>
                      <p>Or use any email/password for regular user</p>
                    </div>
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
                <form onSubmit={handleRegister}>
                  <div className="grid gap-4">
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" type="text" placeholder="John Doe" ref={nameRef} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input id="register-email" type="email" placeholder="name@example.com" ref={emailRef} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input id="register-password" type="password" ref={passwordRef} required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" ref={confirmPasswordRef} required />
                    </div>
                    <Button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-500 to-blue-600"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Account..." : "Create Account"}
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
        </Tabs>
      </div>
    </div>
  )
}