"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dumbbell } from "lucide-react"

// Sample workout data
const workoutEvents = [
  { date: new Date(2024, 4, 10), type: "Strength", title: "Upper Body" },
  { date: new Date(2024, 4, 12), type: "Cardio", title: "HIIT" },
  { date: new Date(2024, 4, 14), type: "Strength", title: "Lower Body" },
  { date: new Date(2024, 4, 17), type: "Cardio", title: "Running" },
  { date: new Date(2024, 4, 19), type: "Strength", title: "Full Body" },
  { date: new Date(2024, 4, 21), type: "Recovery", title: "Yoga" },
  { date: new Date(2024, 4, 24), type: "Strength", title: "Upper Body" },
  { date: new Date(2024, 4, 26), type: "Cardio", title: "HIIT" },
  { date: new Date(2024, 4, 28), type: "Strength", title: "Lower Body" },
]

export function WorkoutCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedWorkouts, setSelectedWorkouts] = useState<any[]>([])

  // Function to handle date selection
  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)

    if (selectedDate) {
      // Find workouts for the selected date
      const workouts = workoutEvents.filter(
        (event) =>
          event.date.getDate() === selectedDate.getDate() &&
          event.date.getMonth() === selectedDate.getMonth() &&
          event.date.getFullYear() === selectedDate.getFullYear(),
      )
      setSelectedWorkouts(workouts)
    } else {
      setSelectedWorkouts([])
    }
  }

  // Function to determine if a date has a workout
  const hasWorkout = (day: Date | undefined) => {
    // Add null check to prevent the error
    if (!day) return false
    
    return workoutEvents.some(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear(),
    )
  }

  // Custom day rendering to show workout indicators
  const renderDay = (day: Date | undefined) => {
    // Add null check to prevent errors
    if (!day) return null
    
    const hasWorkoutOnDay = hasWorkout(day)

    return (
      <div className="relative">
        <div>{day.getDate()}</div>
        {hasWorkoutOnDay && (
          <div className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="md:w-1/2">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          className="rounded-md border"
          components={{
            Day: ({ day, ...props }) => (
              <button {...props}>
                {renderDay(day)}
              </button>
            ),
          }}
        />
      </div>
      <div className="md:w-1/2">
        <div className="space-y-4">
          <h3 className="font-medium">
            {date ? (
              <>Workouts for {date.toLocaleDateString("en-US", { month: "long", day: "numeric" })}</>
            ) : (
              "Select a date to view workouts"
            )}
          </h3>

          {selectedWorkouts.length > 0 ? (
            <div className="space-y-2">
              {selectedWorkouts.map((workout, index) => (
                <Card key={index}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Dumbbell className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{workout.title}</h4>
                      <p className="text-sm text-muted-foreground">45 minutes • 4 exercises</p>
                    </div>
                    <Badge
                      variant={
                        workout.type === "Strength" ? "default" : workout.type === "Cardio" ? "secondary" : "outline"
                      }
                    >
                      {workout.type}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : date ? (
            <p className="text-muted-foreground">No workouts scheduled for this day.</p>
          ) : (
            <p className="text-muted-foreground">Select a date to view your scheduled workouts.</p>
          )}
        </div>
      </div>
    </div>
  )
}