"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { useApp } from "@/context/app-context"
import { Dumbbell } from "lucide-react"

export function StartWorkoutDialog({ workout }: { workout: any }) {
  const router = useRouter()
  const { logWorkout } = useApp()
  const [open, setOpen] = useState(false)
  const [isStarting, setIsStarting] = useState(false)

  const handleStartWorkout = () => {
    setIsStarting(true)

    // Simulate API call
    setTimeout(() => {
      // Log the workout
      logWorkout({
        workoutId: workout.id,
        completed: false,
        duration: 0,
        exercises: workout.exercises.map((exercise: any) => ({
          exerciseId: exercise.name,
          sets: [],
        })),
      })

      setIsStarting(false)
      setOpen(false)

      // Navigate to a workout tracking page (in a real app)
      router.push("/exercise/workouts")
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-green-500 to-blue-600">Start Workout</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Start Workout</DialogTitle>
          <DialogDescription>You're about to start {workout.name}. Get ready!</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="flex items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Dumbbell className="h-10 w-10 text-primary" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="text-center text-lg font-medium">{workout.name}</div>
            <div className="text-center text-sm text-muted-foreground">
              {workout.type} • {workout.duration} • {workout.exercises.length} exercises
            </div>
            <div className="text-center text-sm text-muted-foreground">Difficulty: {workout.difficulty}</div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            className="bg-gradient-to-r from-green-500 to-blue-600"
            onClick={handleStartWorkout}
            disabled={isStarting}
          >
            {isStarting ? "Starting..." : "Start Now"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
