"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

type User = {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  plan: "free" | "premium"
  avatar?: string
}

type Measurement = {
  id: string
  date: Date
  weight?: number
  bodyFat?: number
  chest?: number
  waist?: number
  arms?: number
  legs?: number
}

type WorkoutLog = {
  id: string
  date: Date
  completed: boolean
  workoutId: string
  duration: number
  exercises: {
    exerciseId: string
    sets: { weight: number; reps: number }[]
  }[]
}

type NutritionLog = {
  id: string
  date: Date
  meals: {
    name: string
    foods: {
      name: string
      amount: string
      calories: number
      protein: number
      carbs: number
      fat: number
    }[]
  }[]
  water: number
}

type AppContextType = {
  user: User | null
  isLoading: boolean
  measurements: Measurement[]
  workoutLogs: WorkoutLog[]
  nutritionLogs: NutritionLog[]
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  addMeasurement: (measurement: Omit<Measurement, "id" | "date">) => void
  logWorkout: (workout: Omit<WorkoutLog, "id" | "date">) => void
  logNutrition: (nutrition: Omit<NutritionLog, "id" | "date">) => void
  logWater: (glasses: number) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [measurements, setMeasurements] = useState<Measurement[]>([])
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([])
  const [nutritionLogs, setNutritionLogs] = useState<NutritionLog[]>([])

  // Simulate loading user data
  useEffect(() => {
    const loadUserData = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      setUser({
        id: "user-1",
        name: "John Doe",
        email: "john.doe@example.com",
        role: "user",
        plan: "premium",
        avatar: "/placeholder.svg?height=40&width=40",
      })

      setIsLoading(false)
    }

    loadUserData()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful login
      setUser({
        id: "user-1",
        name: "John Doe",
        email: email,
        role: "user",
        plan: "premium",
        avatar: "/placeholder.svg?height=40&width=40",
      })

      toast({
        title: "Login successful",
        description: "Welcome back to FitCoach!",
      })
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })
  }

  const addMeasurement = (measurement: Omit<Measurement, "id" | "date">) => {
    const newMeasurement: Measurement = {
      id: `measurement-${Date.now()}`,
      date: new Date(),
      ...measurement,
    }

    setMeasurements((prev) => [newMeasurement, ...prev])

    toast({
      title: "Measurement added",
      description: "Your measurement has been logged successfully",
    })
  }

  const logWorkout = (workout: Omit<WorkoutLog, "id" | "date">) => {
    const newWorkout: WorkoutLog = {
      id: `workout-${Date.now()}`,
      date: new Date(),
      ...workout,
    }

    setWorkoutLogs((prev) => [newWorkout, ...prev])

    toast({
      title: "Workout logged",
      description: "Your workout has been logged successfully",
    })
  }

  const logNutrition = (nutrition: Omit<NutritionLog, "id" | "date">) => {
    const newNutrition: NutritionLog = {
      id: `nutrition-${Date.now()}`,
      date: new Date(),
      ...nutrition,
    }

    setNutritionLogs((prev) => [newNutrition, ...prev])

    toast({
      title: "Nutrition logged",
      description: "Your nutrition has been logged successfully",
    })
  }

  const logWater = (glasses: number) => {
    // Find today's nutrition log or create a new one
    const today = new Date()
    const todayLog = nutritionLogs.find(
      (log) =>
        log.date.getDate() === today.getDate() &&
        log.date.getMonth() === today.getMonth() &&
        log.date.getFullYear() === today.getFullYear(),
    )

    if (todayLog) {
      const updatedLogs = nutritionLogs.map((log) => {
        if (log.id === todayLog.id) {
          return { ...log, water: glasses }
        }
        return log
      })
      setNutritionLogs(updatedLogs)
    } else {
      logNutrition({
        meals: [],
        water: glasses,
      })
    }

    toast({
      title: "Water intake updated",
      description: `You've logged ${glasses} glasses of water today`,
    })
  }

  return (
    <AppContext.Provider
      value={{
        user,
        isLoading,
        measurements,
        workoutLogs,
        nutritionLogs,
        login,
        logout,
        addMeasurement,
        logWorkout,
        logNutrition,
        logWater,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
