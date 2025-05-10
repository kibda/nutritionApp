"use client"

import { useState } from "react"
import { Calendar, Dumbbell, Filter, Flame, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { StartWorkoutDialog } from "@/components/start-workout-dialog"
import { useApp } from "@/context/app-context"

// Sample workout data
const workouts = [
  {
    id: 1,
    name: "Upper Body Power",
    type: "Strength",
    duration: "45 min",
    exercises: [
      { name: "Bench Press", sets: 4, reps: "6-8", weight: "135 lbs" },
      { name: "Pull-ups", sets: 4, reps: "8-10", weight: "Bodyweight" },
      { name: "Shoulder Press", sets: 3, reps: "8-10", weight: "65 lbs" },
      { name: "Barbell Rows", sets: 3, reps: "8-10", weight: "95 lbs" },
      { name: "Tricep Dips", sets: 3, reps: "10-12", weight: "Bodyweight" },
    ],
    lastPerformed: "3 days ago",
    difficulty: "Intermediate",
    calories: 350,
  },
  {
    id: 2,
    name: "Lower Body Focus",
    type: "Strength",
    duration: "50 min",
    exercises: [
      { name: "Squats", sets: 4, reps: "8-10", weight: "185 lbs" },
      { name: "Deadlifts", sets: 4, reps: "6-8", weight: "225 lbs" },
      { name: "Lunges", sets: 3, reps: "10-12", weight: "95 lbs" },
      { name: "Leg Press", sets: 3, reps: "10-12", weight: "270 lbs" },
      { name: "Calf Raises", sets: 4, reps: "15-20", weight: "135 lbs" },
    ],
    lastPerformed: "5 days ago",
    difficulty: "Advanced",
    calories: 420,
  },
  {
    id: 3,
    name: "HIIT Cardio",
    type: "Cardio",
    duration: "30 min",
    exercises: [
      { name: "Burpees", sets: 4, reps: "45 sec", weight: "Bodyweight" },
      { name: "Mountain Climbers", sets: 4, reps: "45 sec", weight: "Bodyweight" },
      { name: "Jump Squats", sets: 4, reps: "45 sec", weight: "Bodyweight" },
      { name: "High Knees", sets: 4, reps: "45 sec", weight: "Bodyweight" },
      { name: "Plank Jacks", sets: 4, reps: "45 sec", weight: "Bodyweight" },
    ],
    lastPerformed: "Yesterday",
    difficulty: "Intermediate",
    calories: 300,
  },
  {
    id: 4,
    name: "Core Crusher",
    type: "Core",
    duration: "25 min",
    exercises: [
      { name: "Plank", sets: 3, reps: "60 sec", weight: "Bodyweight" },
      { name: "Russian Twists", sets: 3, reps: "20 each side", weight: "25 lbs" },
      { name: "Leg Raises", sets: 3, reps: "15", weight: "Bodyweight" },
      { name: "Ab Rollouts", sets: 3, reps: "12", weight: "Bodyweight" },
      { name: "Side Planks", sets: 3, reps: "45 sec each side", weight: "Bodyweight" },
    ],
    lastPerformed: "4 days ago",
    difficulty: "Beginner",
    calories: 200,
  },
]

export default function WorkoutsPage() {
  const { workoutLogs } = useApp()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null)
  const [filters, setFilters] = useState({
    type: [],
    difficulty: [],
  })

  // Filter workouts based on search term and filters
  const filteredWorkouts = workouts.filter((workout) => {
    const matchesSearch = workout.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filters.type.length === 0 || filters.type.includes(workout.type)
    const matchesDifficulty = filters.difficulty.length === 0 || filters.difficulty.includes(workout.difficulty)
    return matchesSearch && matchesType && matchesDifficulty
  })

  // Get unique values for filters
  const types = [...new Set(workouts.map((w) => w.type))]
  const difficulties = [...new Set(workouts.map((w) => w.difficulty))]

  // Toggle filter selection
  const toggleFilter = (type: string, value: string) => {
    setFilters((prev) => {
      const current = prev[type as keyof typeof prev] as string[]
      return {
        ...prev,
        [type]: current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
      }
    })
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      type: [],
      difficulty: [],
    })
    setSearchTerm("")
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">My Workouts</h2>
        <Button className="bg-gradient-to-r from-green-500 to-blue-600">
          <Plus className="mr-2 h-4 w-4" />
          Create Workout
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search workouts..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" />
                Filters
                <Badge className="ml-1 rounded-sm px-1 font-normal">{Object.values(filters).flat().length}</Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter Workouts</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <div className="p-2">
                <h4 className="mb-2 text-sm font-medium">Type</h4>
                {types.map((type) => (
                  <DropdownMenuCheckboxItem
                    key={type}
                    checked={filters.type.includes(type)}
                    onCheckedChange={() => toggleFilter("type", type)}
                  >
                    {type}
                  </DropdownMenuCheckboxItem>
                ))}
              </div>

              <DropdownMenuSeparator />

              <div className="p-2">
                <h4 className="mb-2 text-sm font-medium">Difficulty</h4>
                {difficulties.map((difficulty) => (
                  <DropdownMenuCheckboxItem
                    key={difficulty}
                    checked={filters.difficulty.includes(difficulty)}
                    onCheckedChange={() => toggleFilter("difficulty", difficulty)}
                  >
                    {difficulty}
                  </DropdownMenuCheckboxItem>
                ))}
              </div>

              <DropdownMenuSeparator />

              <div className="p-2">
                <Button variant="ghost" size="sm" className="w-full" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Workouts</TabsTrigger>
          <TabsTrigger value="recent">Recently Used</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          {filteredWorkouts.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredWorkouts.map((workout) => (
                <Card key={workout.id} className="overflow-hidden">
                  <div className="relative h-3">
                    <div
                      className={`absolute inset-0 ${
                        workout.type === "Strength"
                          ? "bg-blue-500"
                          : workout.type === "Cardio"
                            ? "bg-red-500"
                            : "bg-purple-500"
                      }`}
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{workout.name}</CardTitle>
                      <Badge
                        variant={
                          workout.difficulty === "Beginner"
                            ? "outline"
                            : workout.difficulty === "Intermediate"
                              ? "secondary"
                              : "default"
                        }
                      >
                        {workout.difficulty}
                      </Badge>
                    </div>
                    <CardDescription>
                      {workout.type} • {workout.duration}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Exercises:</div>
                      <div className="grid grid-cols-1 gap-1">
                        {workout.exercises.slice(0, 3).map((exercise, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Dumbbell className="h-3 w-3 text-muted-foreground" />
                            <span>{exercise.name}</span>
                          </div>
                        ))}
                        {workout.exercises.length > 3 && (
                          <div className="text-xs text-muted-foreground">
                            +{workout.exercises.length - 3} more exercises
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>Last: {workout.lastPerformed}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Flame className="h-3 w-3 text-muted-foreground" />
                          <span>{workout.calories} cal</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedWorkout(workout)}>
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        {selectedWorkout && (
                          <>
                            <DialogHeader>
                              <div className="flex items-center justify-between">
                                <DialogTitle>{selectedWorkout.name}</DialogTitle>
                                <Badge
                                  variant={
                                    selectedWorkout.difficulty === "Beginner"
                                      ? "outline"
                                      : selectedWorkout.difficulty === "Intermediate"
                                        ? "secondary"
                                        : "default"
                                  }
                                >
                                  {selectedWorkout.difficulty}
                                </Badge>
                              </div>
                              <DialogDescription>
                                {selectedWorkout.type} • {selectedWorkout.duration} • {selectedWorkout.calories}{" "}
                                calories
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="rounded-lg border p-4">
                                <h3 className="mb-2 font-medium">Exercises</h3>
                                <div className="space-y-2">
                                  {selectedWorkout.exercises.map((exercise: any, index: number) => (
                                    <div
                                      key={index}
                                      className="flex items-center justify-between rounded-lg bg-muted p-2"
                                    >
                                      <div className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                          <Dumbbell className="h-4 w-4 text-primary" />
                                        </div>
                                        <div>
                                          <div className="font-medium">{exercise.name}</div>
                                          <div className="text-xs text-muted-foreground">
                                            {exercise.sets} sets • {exercise.reps}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="text-sm">{exercise.weight}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Edit Workout</Button>
                              <StartWorkoutDialog workout={selectedWorkout} />
                            </DialogFooter>
                          </>
                        )}
                      </DialogContent>
                    </Dialog>
                    <StartWorkoutDialog workout={workout} />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <Dumbbell className="mb-2 h-10 w-10 text-muted-foreground" />
              <h3 className="mb-1 font-medium">No Workouts Found</h3>
              <p className="mb-4 text-sm text-muted-foreground">Try adjusting your filters or create a new workout.</p>
              <Button className="bg-gradient-to-r from-green-500 to-blue-600">Create Workout</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="recent" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workouts
              .filter((w) => w.lastPerformed === "Yesterday" || w.lastPerformed === "3 days ago")
              .map((workout) => (
                <Card key={workout.id} className="overflow-hidden">
                  <div className="relative h-3">
                    <div
                      className={`absolute inset-0 ${
                        workout.type === "Strength"
                          ? "bg-blue-500"
                          : workout.type === "Cardio"
                            ? "bg-red-500"
                            : "bg-purple-500"
                      }`}
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{workout.name}</CardTitle>
                      <Badge
                        variant={
                          workout.difficulty === "Beginner"
                            ? "outline"
                            : workout.difficulty === "Intermediate"
                              ? "secondary"
                              : "default"
                        }
                      >
                        {workout.difficulty}
                      </Badge>
                    </div>
                    <CardDescription>
                      {workout.type} • {workout.duration}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Exercises:</div>
                      <div className="grid grid-cols-1 gap-1">
                        {workout.exercises.slice(0, 3).map((exercise, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Dumbbell className="h-3 w-3 text-muted-foreground" />
                            <span>{exercise.name}</span>
                          </div>
                        ))}
                        {workout.exercises.length > 3 && (
                          <div className="text-xs text-muted-foreground">
                            +{workout.exercises.length - 3} more exercises
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>Last: {workout.lastPerformed}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Flame className="h-3 w-3 text-muted-foreground" />
                          <span>{workout.calories} cal</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => setSelectedWorkout(workout)}>
                      View Details
                    </Button>
                    <StartWorkoutDialog workout={workout} />
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="mt-4">
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <Dumbbell className="mb-2 h-10 w-10 text-muted-foreground" />
            <h3 className="mb-1 font-medium">No Favorite Workouts</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Mark workouts as favorites to quickly access them here.
            </p>
            <Button className="bg-gradient-to-r from-green-500 to-blue-600">Browse Workouts</Button>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Workout History</CardTitle>
          <CardDescription>Track your workout progress over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Weekly Goal: 5 workouts</div>
              <div className="text-sm">3/5 completed</div>
            </div>
            <Progress value={60} className="h-2" />
            <div className="grid grid-cols-7 gap-2 text-center text-xs">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="text-muted-foreground">{day}</div>
                  <div
                    className={`mt-1 flex h-8 w-8 items-center justify-center rounded-full ${
                      i === 0 || i === 2
                        ? "bg-primary text-primary-foreground"
                        : i === 1
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-muted"
                    }`}
                  >
                    {i === 0 || i === 1 || i === 2 ? <Dumbbell className="h-4 w-4" /> : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
