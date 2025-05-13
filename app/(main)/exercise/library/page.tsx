"use client"

import { useState, useEffect } from "react"
import { 
  Activity, 
  ArrowUpDown, 
  ChevronDown, 
  Dumbbell, 
  Filter, 
  Heart, 
  List, 
  Play, 
  Plus, 
  Search, 
  Grid, 
  Star, 
  Bookmark, 
  BookmarkCheck,
  X
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
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
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample exercise data
const exercises = [
  {
    id: 1,
    name: "Barbell Bench Press",
    category: "Strength",
    muscle: "Chest",
    difficulty: "Intermediate",
    equipment: "Barbell",
    image: "/api/placeholder/600/400",
    video: "https://www.youtube.com/shorts/_YrJc-kTYA0", // YouTube link
    link: "https://www.example.com/exercise/bench-press", // Additional link for more information
    description:
      "A compound exercise that primarily targets the chest muscles, but also engages the shoulders and triceps.",
    instructions: [
      "Lie on a flat bench with your feet flat on the floor.",
      "Grip the barbell with hands slightly wider than shoulder-width apart.",
      "Lower the barbell to your mid-chest.",
      "Press the barbell back up to the starting position.",
      "Repeat for the desired number of repetitions.",
    ],
    rating: 4.8,
    reviews: 324,
    popularWith: ["Beginners", "Bodybuilders"]
  },
  {
    id: 2,
    name: "Squat",
    category: "Strength",
    muscle: "Legs",
    difficulty: "Intermediate",
    equipment: "Barbell",
    image: "/api/placeholder/600/400",
    video: "https://www.youtube.com/watch?v=dQFqjQT0V7A", // YouTube link
    link: "https://www.example.com/exercise/squat", // Additional link for more information
    description: "A compound exercise that primarily targets the quadriceps, hamstrings, and glutes.",
    instructions: [
      "Stand with feet shoulder-width apart.",
      "Place the barbell across your upper back.",
      "Bend your knees and lower your body until your thighs are parallel to the floor.",
      "Push through your heels to return to the starting position.",
      "Repeat for the desired number of repetitions.",
    ],
    rating: 4.9,
    reviews: 456,
    popularWith: ["Strength Athletes", "Olympic Lifters"]
  },
  {
    id: 3,
    name: "Deadlift",
    category: "Strength",
    muscle: "Back",
    difficulty: "Advanced",
    equipment: "Barbell",
    image: "/api/placeholder/600/400",
    video: "https://www.youtube.com/watch?v=36Uh3PYGG_k", // YouTube link
    link: "https://www.example.com/exercise/deadlift", // Additional link for more information
    description: "A compound exercise that targets multiple muscle groups including the back, glutes, and hamstrings.",
    instructions: [
      "Stand with feet hip-width apart, with the barbell over your mid-foot.",
      "Bend at the hips and knees to grip the barbell.",
      "Lift the barbell by extending your hips and knees.",
      "Lower the barbell back to the floor by hinging at the hips and bending the knees.",
      "Repeat for the desired number of repetitions.",
    ],
    rating: 4.7,
    reviews: 312,
    popularWith: ["Powerlifters", "Athletes"]
  },
  {
    id: 4,
    name: "Pull-Ups",
    category: "Strength",
    muscle: "Back",
    difficulty: "Intermediate",
    equipment: "Pull-Up Bar",
    image: "/api/placeholder/600/400",
    video: "https://www.youtube.com/watch?v=eGo4IYlbE5g",
    link: "https://www.example.com/exercise/pull-ups",
    description: "A bodyweight exercise that primarily targets the back and biceps muscles.",
    instructions: [
      "Grip a pull-up bar with hands slightly wider than shoulder-width apart.",
      "Hang with arms fully extended.",
      "Pull your body up until your chin is over the bar.",
      "Lower your body back to the starting position.",
      "Repeat for the desired number of repetitions.",
    ],
    rating: 4.6,
    reviews: 265,
    popularWith: ["Calisthenics", "CrossFit"]
  },
  {
    id: 5,
    name: "Overhead Press",
    category: "Strength",
    muscle: "Shoulders",
    difficulty: "Intermediate",
    equipment: "Barbell",
    image: "/api/placeholder/600/400",
    video: "https://www.youtube.com/watch?v=2yjwXTZQDDI",
    link: "https://www.example.com/exercise/overhead-press",
    description: "A compound exercise that targets the shoulder muscles and triceps.",
    instructions: [
      "Stand with feet shoulder-width apart.",
      "Hold a barbell at shoulder height with an overhand grip.",
      "Press the barbell overhead until your arms are fully extended.",
      "Lower the barbell back to the starting position.",
      "Repeat for the desired number of repetitions.",
    ],
    rating: 4.5,
    reviews: 198,
    popularWith: ["Military", "Bodybuilders"]
  },
  {
    id: 6,
    name: "Romanian Deadlift",
    category: "Strength",
    muscle: "Hamstrings",
    difficulty: "Intermediate",
    equipment: "Barbell",
    image: "/api/placeholder/600/400",
    video: "https://www.youtube.com/watch?v=JCXUYuzwNrM",
    link: "https://www.example.com/exercise/romanian-deadlift",
    description: "A variation of the deadlift that primarily targets the hamstrings and lower back.",
    instructions: [
      "Stand with feet hip-width apart, holding a barbell in front of your thighs.",
      "Keep a slight bend in your knees throughout the movement.",
      "Hinge at the hips to lower the barbell, keeping it close to your body.",
      "Lower until you feel a stretch in your hamstrings.",
      "Return to the starting position by driving your hips forward.",
      "Repeat for the desired number of repetitions.",
    ],
    rating: 4.4,
    reviews: 156,
    popularWith: ["Athletes", "Bodybuilders"]
  }
]

// Color map for difficulty levels
const difficultyColors = {
  Beginner: "bg-green-100 text-green-800",
  Intermediate: "bg-blue-100 text-blue-800",
  Advanced: "bg-red-100 text-red-800"
}

// Icon map for muscle groups
const muscleIcons = {
  Chest: "Chest",
  Legs: "Legs",
  Back: "Back",
  Shoulders: "Shoulders",
  Hamstrings: "Hamstrings",
  default: "Muscle"
}

export default function ExerciseLibraryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [filters, setFilters] = useState({
    category: [],
    muscle: [],
    difficulty: [],
    equipment: [],
  })
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [bookmarkedExercises, setBookmarkedExercises] = useState([])
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    
    return () => clearTimeout(timer)
  }, [])

  // Toggle bookmark for an exercise
  const toggleBookmark = (exerciseId) => {
    if (bookmarkedExercises.includes(exerciseId)) {
      setBookmarkedExercises(bookmarkedExercises.filter(id => id !== exerciseId))
    } else {
      setBookmarkedExercises([...bookmarkedExercises, exerciseId])
    }
  }

  // Filter exercises based on search term and filters
  const filteredExercises = exercises.filter((exercise) => {
    // Filter by search term
    const matchesSearch =
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by category, muscle, difficulty, equipment
    const matchesCategory = filters.category.length === 0 || filters.category.includes(exercise.category)
    const matchesMuscle = filters.muscle.length === 0 || filters.muscle.includes(exercise.muscle)
    const matchesDifficulty = filters.difficulty.length === 0 || filters.difficulty.includes(exercise.difficulty)
    const matchesEquipment = filters.equipment.length === 0 || filters.equipment.includes(exercise.equipment)
    
    // Filter by bookmarks if enabled
    const matchesBookmarks = !showBookmarksOnly || bookmarkedExercises.includes(exercise.id)

    return matchesSearch && matchesCategory && matchesMuscle && matchesDifficulty && matchesEquipment && matchesBookmarks
  })

  // Sort exercises
  const sortedExercises = [...filteredExercises].sort((a, b) => {
    let comparison = 0
    
    if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name)
    } else if (sortBy === "difficulty") {
      const difficultyOrder = { "Beginner": 1, "Intermediate": 2, "Advanced": 3 }
      comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
    } else if (sortBy === "rating") {
      comparison = a.rating - b.rating
    }
    
    return sortOrder === "asc" ? comparison : -comparison
  })

  // Get unique values for filters
  const categories = [...new Set(exercises.map((e) => e.category))]
  const muscles = [...new Set(exercises.map((e) => e.muscle))]
  const difficulties = [...new Set(exercises.map((e) => e.difficulty))]
  const equipments = [...new Set(exercises.map((e) => e.equipment))]

  // Toggle filter selection
  const toggleFilter = (type, value) => {
    setFilters((prev) => {
      const current = prev[type]
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
    setShowBookmarksOnly(false)
  }

  // Toggle sort order
  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  // Function to render difficulty badge with appropriate color
  const renderDifficultyBadge = (difficulty) => {
    const colorClass = difficultyColors[difficulty] || "bg-gray-100 text-gray-800"
    return (
      <Badge variant="outline" className={`${colorClass} font-medium`}>
        {difficulty}
      </Badge>
    )
  }

  // Render loading skeleton
  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <div className="h-8 w-60 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="h-80 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Exercise Library
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant={showBookmarksOnly ? "default" : "outline"} 
            size="sm"
            onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
            className="gap-2"
          >
            {showBookmarksOnly ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            {showBookmarksOnly ? "Showing Bookmarks" : "Show Bookmarks"}
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
            <Plus className="h-4 w-4" />
            Add Exercise
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search exercises by name, description, or muscle group..."
            className="pl-8 border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Sort By
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={sortBy === "name"}
                onCheckedChange={() => toggleSort("name")}
              >
                Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sortBy === "difficulty"}
                onCheckedChange={() => toggleSort("difficulty")}
              >
                Difficulty {sortBy === "difficulty" && (sortOrder === "asc" ? "↑" : "↓")}
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sortBy === "rating"}
                onCheckedChange={() => toggleSort("rating")}
              >
                Rating {sortBy === "rating" && (sortOrder === "asc" ? "↑" : "↓")}
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" />
                Filters
                <Badge className="ml-1 rounded-sm px-1 font-normal">{Object.values(filters).flat().length}</Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter Exercises</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <ScrollArea className="h-[400px]">
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
              </ScrollArea>

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

      {/* Active filters */}
      {Object.values(filters).some(arr => arr.length > 0) && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Active filters:</span>
          {Object.entries(filters).map(([filterType, values]) => 
            values.map(value => (
              <Badge 
                key={`${filterType}-${value}`} 
                variant="secondary"
                className="flex items-center gap-1 py-1 px-2"
              >
                {value}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => toggleFilter(filterType, value)} 
                />
              </Badge>
            ))
          )}
          {Object.values(filters).some(arr => arr.length > 0) && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 px-2 text-xs">
              Clear all
            </Button>
          )}
        </div>
      )}

      <Tabs defaultValue="grid" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="grid" className="px-6">
              <Grid className="h-4 w-4 mr-2" />
              Grid
            </TabsTrigger>
            <TabsTrigger value="list" className="px-6">
              <List className="h-4 w-4 mr-2" />
              List
            </TabsTrigger>
          </TabsList>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {sortedExercises.length} exercise{sortedExercises.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {sortedExercises.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <Activity className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No exercises found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-center max-w-md">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button variant="outline" className="mt-4" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        ) : (
          <>
            <TabsContent value="grid" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedExercises.map((exercise) => (
                  <Card key={exercise.id} className="overflow-hidden group hover:shadow-md transition-shadow duration-200 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <CardHeader className="p-0 relative">
                      <img
                        src={exercise.image}
                        alt={exercise.name}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-1.5 opacity-90 hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(exercise.id);
                        }}
                      >
                        {bookmarkedExercises.includes(exercise.id) ? (
                          <BookmarkCheck className="h-5 w-5 text-primary" />
                        ) : (
                          <Bookmark className="h-5 w-5" />
                        )}
                      </Button>
                      <div className="absolute bottom-2 left-2">
                        {renderDifficultyBadge(exercise.difficulty)}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold line-clamp-1">{exercise.name}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                          {exercise.muscle}
                        </Badge>
                        <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                          {exercise.equipment}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{exercise.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <span className="font-medium">{exercise.rating}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">({exercise.reviews})</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl p-0 overflow-hidden">
                          <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="relative h-full">
                              <img
                                src={exercise.image}
                                alt={exercise.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute bottom-4 left-4">
                                {renderDifficultyBadge(exercise.difficulty)}
                              </div>
                            </div>
                            <div className="p-6">
                              <DialogHeader>
                                <div className="flex items-center justify-between">
                                  <DialogTitle className="text-2xl font-bold">{exercise.name}</DialogTitle>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="rounded-full"
                                    onClick={() => toggleBookmark(exercise.id)}
                                  >
                                    {bookmarkedExercises.includes(exercise.id) ? (
                                      <BookmarkCheck className="h-5 w-5 text-primary" />
                                    ) : (
                                      <Bookmark className="h-5 w-5" />
                                    )}
                                  </Button>
                                </div>
                                <DialogDescription className="mt-2">{exercise.description}</DialogDescription>
                              </DialogHeader>
                              
                              <div className="mt-4 space-y-6">
                                <div className="flex flex-wrap gap-2">
                                  <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                    {exercise.muscle}
                                  </Badge>
                                  <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                    {exercise.equipment}
                                  </Badge>
                                  <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                    {exercise.category}
                                  </Badge>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold text-lg mb-2">Instructions</h4>
                                  <ol className="list-decimal pl-6 space-y-2">
                                    {exercise.instructions.map((instruction, index) => (
                                      <li key={index} className="text-gray-700 dark:text-gray-300">{instruction}</li>
                                    ))}
                                  </ol>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold text-lg mb-2">Popular With</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {exercise.popularWith.map((group, index) => (
                                      <Badge key={index} className="bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-900 dark:text-primary-100 dark:border-primary-800">
                                        {group}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-1">
                                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                    <span className="font-medium text-lg">{exercise.rating}</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">({exercise.reviews} reviews)</span>
                                  </div>
                                </div>
                                
                                <div className="flex gap-3 mt-4">
                                  {exercise.video && (
                                    <a
                                      href={exercise.video}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 text-primary hover:text-primary-600 transition-colors"
                                    >
                                      <Play className="h-4 w-4" />
                                      Watch Video
                                    </a>
                                  )}
                                  {exercise.link && (
                                    <a
                                      href={exercise.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 text-primary hover:text-primary-600 transition-colors"
                                    >
                                      <Activity className="h-4 w-4" />
                                      Learn More
                                    </a>
                                  )}
                                </div>
                              </div>
                              
                              <DialogFooter className="mt-6">
                                <DialogClose asChild>
                                  <Button variant="outline">Close</Button>
                                </DialogClose>
                                <Button className="gap-2">
                                  <Plus className="h-4 w-4" />
                                  Add to Workout
                                </Button>
                              </DialogFooter>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="list" className="mt-0">
              <div className="space-y-4">
                {sortedExercises.map((exercise) => (
                  <Card key={exercise.id} className="overflow-hidden border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-64 overflow-hidden">
                        <img
                          src={exercise.image}
                          alt={exercise.name}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold">{exercise.name}</h3>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="rounded-full"
                            onClick={() => toggleBookmark(exercise.id)}
                          >
                            {bookmarkedExercises.includes(exercise.id) ? (
                              <BookmarkCheck className="h-5 w-5 text-primary" />
                            ) : (
                              <Bookmark className="h-5 w-5" />
                            )}
                          </Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {renderDifficultyBadge(exercise.difficulty)}
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                            {exercise.muscle}
                          </Badge>
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                            {exercise.equipment}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{exercise.description}</p>
                        
                        <div className="flex items-center gap-6 mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span className="font-medium">{exercise.rating}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">({exercise.reviews})</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <span>Popular with:</span>
                            {exercise.popularWith.map((group, index) => (
                              <Badge key={index} variant="outline" className="bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-900 dark:text-primary-100 dark:border-primary-800">
                                {group}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex gap-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline">View Details</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl p-0 overflow-hidden">
                              <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="relative h-full">
                                  <img
                                    src={exercise.image}
                                    alt={exercise.name}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute bottom-4 left-4">
                                    {renderDifficultyBadge(exercise.difficulty)}
                                  </div>
                                </div>
                                <div className="p-6">
                                  <DialogHeader>
                                    <div className="flex items-center justify-between">
                                      <DialogTitle className="text-2xl font-bold">{exercise.name}</DialogTitle>
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="rounded-full"
                                        onClick={() => toggleBookmark(exercise.id)}
                                      >
                                        {bookmarkedExercises.includes(exercise.id) ? (
                                          <BookmarkCheck className="h-5 w-5 text-primary" />
                                        ) : (
                                          <Bookmark className="h-5 w-5" />
                                        )}
                                      </Button>
                                    </div>
                                    <DialogDescription className="mt-2">{exercise.description}</DialogDescription>
                                  </DialogHeader>
                                  
                                  <div className="mt-4 space-y-6">
                                    <div className="flex flex-wrap gap-2">
                                      <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                        {exercise.muscle}
                                      </Badge>
                                      <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                        {exercise.equipment}
                                      </Badge>
                                      <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                        {exercise.category}
                                      </Badge>
                                    </div>
                                    
                                    <div>
                                      <h4 className="font-semibold text-lg mb-2">Instructions</h4>
                                      <ol className="list-decimal pl-6 space-y-2">
                                        {exercise.instructions.map((instruction, index) => (
                                          <li key={index} className="text-gray-700 dark:text-gray-300">{instruction}</li>
                                        ))}
                                      </ol>
                                    </div>
                                    
                                    <div>
                                      <h4 className="font-semibold text-lg mb-2">Popular With</h4>
                                      <div className="flex flex-wrap gap-2">
                                        {exercise.popularWith.map((group, index) => (
                                          <Badge key={index} className="bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-900 dark:text-primary-100 dark:border-primary-800">
                                            {group}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4">
                                      <div className="flex items-center gap-1">
                                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                        <span className="font-medium text-lg">{exercise.rating}</span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">({exercise.reviews} reviews)</span>
                                      </div>
                                    </div>
                                    
                                    <div className="flex gap-3 mt-4">
                                      {exercise.video && (
                                        <a
                                          href={exercise.video}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-2 text-primary hover:text-primary-600 transition-colors"
                                        >
                                          <Play className="h-4 w-4" />
                                          Watch Video
                                        </a>
                                      )}
                                      {exercise.link && (
                                        <a
                                          href={exercise.link}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-2 text-primary hover:text-primary-600 transition-colors"
                                        >
                                          <Activity className="h-4 w-4" />
                                          Learn More
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <DialogFooter className="mt-6">
                                    <DialogClose asChild>
                                      <Button variant="outline">Close</Button>
                                    </DialogClose>
                                    <Button className="gap-2">
                                      <Plus className="h-4 w-4" />
                                      Add to Workout
                                    </Button>
                                  </DialogFooter>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button variant="secondary" className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add to Workout
                          </Button>
                          
                          {exercise.video && (
                            <a
                              href={exercise.video}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-primary hover:text-primary-600 transition-colors"
                            >
                              <Play className="h-4 w-4" />
                              Watch Video
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </>
        )}
      </Tabs>
      
      {/* Recently viewed section */}
      {!showBookmarksOnly && sortedExercises.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Recently Viewed</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {sortedExercises.slice(0, 5).map((exercise) => (
              <Card key={`recent-${exercise.id}`} className="flex flex-col overflow-hidden border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="relative">
                  <img
                    src={exercise.image}
                    alt={exercise.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute bottom-2 left-2">
                    {renderDifficultyBadge(exercise.difficulty)}
                  </div>
                </div>
                <div className="p-3 flex-1 flex flex-col">
                  <h4 className="font-medium text-sm line-clamp-1">{exercise.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">{exercise.muscle}</p>
                  <div className="flex items-center mt-auto pt-2">
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-medium ml-1">{exercise.rating}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {/* Featured muscle groups section */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4">Featured Muscle Groups</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {["Chest", "Back", "Legs", "Shoulders", "Arms", "Core", "Full Body", "Cardio"].map((muscle) => (
            <Card key={muscle} className="overflow-hidden group cursor-pointer hover:shadow-md transition-shadow duration-200 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-3">
                  <Dumbbell className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold">{muscle}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {Math.floor(Math.random() * 30) + 10} exercises
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="mt-16 text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
        <h3 className="text-2xl font-bold mb-2">Can't find what you're looking for?</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
          Submit a new exercise to our library or contact our team for assistance.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="default" size="lg" className="gap-2">
            <Plus className="h-4 w-4" />
            Submit Exercise
          </Button>
          <Button variant="outline" size="lg">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  )
}