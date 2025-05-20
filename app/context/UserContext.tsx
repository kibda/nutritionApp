"use client"

import { ReactNode, createContext, useContext, useState, useEffect } from "react"

// Define User type
export type User = {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  // add other user fields as needed
}

// Define the context type
export interface UserContextType {
  user: User | null
  loading: boolean
  login: (userData: User) => void
  logout: () => void
  isAdmin: boolean
}

// Create context with default values
const initialContext: UserContextType = {
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  isAdmin: false
}

// Create and export the context
export const UserContext = createContext<UserContextType>(initialContext)

// Define props type for UserProvider
interface UserProviderProps {
  children: ReactNode
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  // Check for saved user in localStorage on initial load
  useEffect(() => {
    const checkSavedUser = () => {
      try {
        const savedUser = localStorage.getItem("user")
        console.log("Saved user in localStorage:", savedUser)
        
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser) as User
          console.log("Parsed user:", parsedUser)
          setUser(parsedUser)
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error)
      } finally {
        setLoading(false)
      }
    }
    
    // Run on client-side only
    if (typeof window !== 'undefined') {
      checkSavedUser()
    } else {
      setLoading(false)
    }
  }, [])

  // Login function
  const login = (userData: User) => {
    console.log("UserContext: Logging in user:", userData)
    
    // Ensure we have a valid user object before setting it
    if (userData && userData.id && userData.email) {
      setUser(userData)
      
      // Save to localStorage for persistence
      try {
        localStorage.setItem("user", JSON.stringify(userData))
        console.log("User saved to localStorage")
      } catch (error) {
        console.error("Failed to save user to localStorage:", error)
      }
    } else {
      console.error("Invalid user data provided to login function:", userData)
    }
  }

  // Logout function
  const logout = () => {
    console.log("Logging out user")
    setUser(null)
    try {
      localStorage.removeItem("user")
    } catch (error) {
      console.error("Error removing user from localStorage:", error)
    }
  }

  // Check if user is admin
  const isAdmin = user?.role === "admin"

  // Create the context value object
  const contextValue: UserContextType = {
    user,
    loading,
    login,
    logout,
    isAdmin
  }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}

// Custom hook to use the user context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  
  return context
}