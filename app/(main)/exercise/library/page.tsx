"use client"

import { useState } from "react"
import { ArrowUpDown, ChevronDown, Dumbbell, Filter, Play, Plus, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample exercise data
const exercises = [
  {
    id: 1,
    name: "Barbell Bench Press",
    category: "Strength",
    muscle: "Chest",
    difficulty: "Intermediate",
    equipment: "Barbell",
    image: "/placeholder.svg?height=200&width=300",
    video: "#",
    description:
      "A compound exercise that primarily targets the chest muscles, but also engages the shoulders and triceps.",
    instructions: [
      "Lie on a flat bench with your feet flat on the floor.",
      "Grip the barbell with hands slightly wider than shoulder-width apart.",
      "Lower the barbell to your mid-chest.",
      "Press the barbell back up to the starting position.",
      "Repeat for the desired number of repetitions.",
    ],
  },
  {
    id: 2,
    name: "Squat",
    category: "Strength",
    muscle: "Legs",
    difficulty: "Intermediate",
    equipment: "Barbell",
    image: "/placeholder.svg?height=200&width=300",
    video: "#",
    description: "A compound exercise that primarily targets the quadriceps, hamstrings, and glutes.",
    instructions: [
      "Stand with feet shoulder-width apart.",
      "Place the barbell across your upper back.",
      "Bend your knees and lower your body until your thighs are parallel to the floor.",
      "Push through your heels to return to the starting position.",
      "Repeat for the desired number of repetitions.",
    ],
  },
  {
    id: 3,
    name: "Deadlift",
    category: "Strength",
    muscle: "Back",
    difficulty: "Advanced",
    equipment: "Barbell",
    image: "/placeholder.svg?height=200&width=300",
    video: "#",
    description: "A compound exercise that targets multiple muscle groups including the back, glutes, and hamstrings.",
    instructions: [
      "Stand with feet hip-width apart, with the barbell over your mid-foot.",
      "Bend at the hips and knees to grip the barbell.",
      "Lift the barbell by extending your hips and knees.",
      "Lower the barbell back to the floor by hinging at the hips and bending the knees.",
      "Repeat for the desired number of repetitions.",
    ],
  },
  {
    id: 4,
    name: "Pull-up",
    category: "Strength",
    muscle: "Back",
    difficulty: "Intermediate",
    equipment: "Pull-up Bar",
    image: "/placeholder.svg?height=200&width=300",
    video: "#",
    description: "A compound exercise that primarily targets the back and biceps.",
    instructions: [
      "Grip the pull-up bar with hands wider than shoulder-width apart.",
      "Hang from the bar with arms fully extended.",
      "Pull your body up until your chin is over the bar.",
      "Lower your body back to the starting position.",
      "Repeat for the desired number of repetitions.",
    ],
  },
  {
    id: 5,
    name: "Push-up",
    category: "Strength",
    muscle: "Chest",
    difficulty: "Beginner",
    equipment: "Bodyweight",
    image: "/placeholder.svg?height=200&width=300",
    video: "#",
    description: "A compound exercise that primarily targets the chest, shoulders, and triceps.",
    instructions: [
      "Start in a plank position with hands slightly wider than shoulder-width apart.",
      "Lower your body until your chest nearly touches the floor.",
      "Push your body back up to the starting position.",
      "Repeat for the desired number of repetitions.",
    ],
  },
  {
    id: 6,
    name: "Plank",
    category: "Core",
    muscle: "Abs",
    difficulty: "Beginner",
    equipment: "Bodyweight",
    image: "/placeholder.svg?height=200&width=300",
    video: "#",
    description: "An isometric core exercise that strengthens the abdominals, back, and shoulders.",
    instructions: [
      "Start in a push-up position, but with your weight on your forearms.",
      "Keep your body in a straight line from head to heels.",
      "Engage your core and hold the position.",
      "Hold for the desired amount of time.",
    ],
  },
]

export default function ExerciseLibraryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedExercise, setSelectedExercise] = useState<any>(null)
  const [filters, setFilters] = useState({
    category: [],
    muscle: [],
    difficulty: [],
    equipment: [],
  })

  // Filter exercises based on search term and filters
  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch =
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = filters.category.length === 0 || filters.category.includes(exercise.category)
    const matchesMuscle = filters.muscle.length === 0 || filters.muscle.includes(exercise.muscle)
    const matchesDifficulty = filters.difficulty.length === 0 || filters.difficulty.includes(exercise.difficulty)
    const matchesEquipment = filters.equipment.length === 0 || filters.equipment.includes(exercise.equipment)

    return matchesSearch && matchesCategory && matchesMuscle && matchesDifficulty && matchesEquipment
  })

  // Get unique values for filters
  const categories = [...new Set(exercises.map((e) => e.category))]
  const muscles = [...new Set(exercises.map((e) => e.muscle))]
  const difficulties = [...new Set(exercises.map((e) => e.difficulty))]
  const equipments = [...new Set(exercises.map((e) => e.equipment))]

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
      category: [],
      muscle: [],
      difficulty: [],
      equipment: [],
    })
    setSearchTerm("")
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Exercise Library</h2>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search exercises..."
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
              <DropdownMenuLabel>Filter Exercises</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <div className="p-2">
                <h4 className="mb-2 text-sm font-medium">Category</h4>
                {categories.map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={filters.category.includes(category)}
                    onCheckedChange={() => toggleFilter("category", category)}
                  >
                    {category}
                  </DropdownMenuCheckboxItem>
                ))}
              </div>

              <DropdownMenuSeparator />

              <div className="p-2">
                <h4 className="mb-2 text-sm font-medium">Muscle Group</h4>
                {muscles.map((muscle) => (
                  <DropdownMenuCheckboxItem
                    key={muscle}
                    checked={filters.muscle.includes(muscle)}
                    onCheckedChange={() => toggleFilter("muscle", muscle)}
                  >
                    {muscle}
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
                <h4 className="mb-2 text-sm font-medium">Equipment</h4>
                {equipments.map((equipment) => (
                  <DropdownMenuCheckboxItem
                    key={equipment}
                    checked={filters.equipment.includes(equipment)}
                    onCheckedChange={() => toggleFilter("equipment", equipment)}
                  >
                    {equipment}
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Sort
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem>Name (A-Z)</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Name (Z-A)</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Difficulty (Easiest First)</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Difficulty (Hardest First)</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add to Workout
          </Button>
        </div>

        <TabsContent value="grid" className="mt-4">
          {filteredExercises.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredExercises.map((exercise) => (
                <Card key={exercise.id} className="overflow-hidden">
                  <div className="relative aspect-video">
                    <img
                      src={exercise.image || "/placeholder.svg"}
                      alt={exercise.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity hover:opacity-100">
                      <Button variant="secondary" size="icon">
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{exercise.name}</h3>
                        <p className="text-sm text-muted-foreground">{exercise.muscle}</p>
                      </div>
                      <Badge
                        variant={
                          exercise.difficulty === "Beginner"
                            ? "outline"
                            : exercise.difficulty === "Intermediate"
                              ? "secondary"
                              : "default"
                        }
                      >
                        {exercise.difficulty}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => setSelectedExercise(exercise)}
                          >
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          {selectedExercise && (
                            <>
                              <DialogHeader>
                                <DialogTitle>{selectedExercise.name}</DialogTitle>
                                <DialogDescription>{selectedExercise.description}</DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4 md:grid-cols-2">
                                <div>
                                  <div className="relative aspect-video overflow-hidden rounded-lg">
                                    <img
                                      src={selectedExercise.image || "/placeholder.svg"}
                                      alt={selectedExercise.name}
                                      className="h-full w-full object-cover"
                                    />
                                    <Button variant="secondary" size="icon" className="absolute bottom-2 right-2">
                                      <Play className="h-6 w-6" />
                                    </Button>
                                  </div>
                                  <div className="mt-4 flex flex-wrap gap-2">
                                    <Badge variant="outline">{selectedExercise.category}</Badge>
                                    <Badge variant="outline">{selectedExercise.muscle}</Badge>
                                    <Badge variant="outline">{selectedExercise.equipment}</Badge>
                                    <Badge
                                      variant={
                                        selectedExercise.difficulty === "Beginner"
                                          ? "outline"
                                          : selectedExercise.difficulty === "Intermediate"
                                            ? "secondary"
                                            : "default"
                                      }
                                    >
                                      {selectedExercise.difficulty}
                                    </Badge>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="mb-2 font-medium">Instructions</h3>
                                  <ol className="ml-4 space-y-2">
                                    {selectedExercise.instructions.map((instruction: string, i: number) => (
                                      <li key={i} className="text-sm">
                                        {i + 1}. {instruction}
                                      </li>
                                    ))}
                                  </ol>
                                  <div className="mt-4 flex gap-2">
                                    <Button className="flex-1">
                                      <Plus className="mr-2 h-4 w-4" />
                                      Add to Workout
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <Dumbbell className="mb-2 h-10 w-10 text-muted-foreground" />
              <h3 className="mb-1 font-medium">No Exercises Found</h3>
              <p className="mb-4 text-sm text-muted-foreground">Try adjusting your filters or search term.</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="list" className="mt-4">
          {filteredExercises.length > 0 ? (
            <div className="space-y-2">
              {filteredExercises.map((exercise) => (
                <Card key={exercise.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md">
                        <img
                          src={exercise.image || "/placeholder.svg"}
                          alt={exercise.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{exercise.name}</h3>
                        <p className="text-sm text-muted-foreground">{exercise.description.substring(0, 100)}...</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{exercise.muscle}</Badge>
                        <Badge
                          variant={
                            exercise.difficulty === "Beginner"
                              ? "outline"
                              : exercise.difficulty === "Intermediate"
                                ? "secondary"
                                : "default"
                          }
                        >
                          {exercise.difficulty}
                        </Badge>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedExercise(exercise)}>
                            View Details
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <Dumbbell className="mb-2 h-10 w-10 text-muted-foreground" />
              <h3 className="mb-1 font-medium">No Exercises Found</h3>
              <p className="mb-4 text-sm text-muted-foreground">Try adjusting your filters or search term.</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
