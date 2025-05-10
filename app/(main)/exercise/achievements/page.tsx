"use client"

import { useState } from "react"
import { Calendar, Filter, Medal, Search, Share, Trophy } from "lucide-react"
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

// Sample achievements data
const achievements = [
  {
    id: 1,
    name: "Consistency Champion",
    description: "Complete workouts for 7 consecutive days",
    category: "Consistency",
    progress: 100,
    completed: true,
    date: "May 8, 2024",
    icon: Trophy,
    color: "bg-amber-500",
  },
  {
    id: 2,
    name: "Strength Milestone",
    description: "Bench press 100% of your body weight",
    category: "Strength",
    progress: 100,
    completed: true,
    date: "April 22, 2024",
    icon: Medal,
    color: "bg-blue-500",
  },
  {
    id: 3,
    name: "Cardio King",
    description: "Complete a 5K run in under 30 minutes",
    category: "Cardio",
    progress: 100,
    completed: true,
    date: "April 15, 2024",
    icon: Trophy,
    color: "bg-red-500",
  },
  {
    id: 4,
    name: "Nutrition Master",
    description: "Track your nutrition for 30 consecutive days",
    category: "Nutrition",
    progress: 80,
    completed: false,
    date: null,
    icon: Medal,
    color: "bg-green-500",
  },
  {
    id: 5,
    name: "Flexibility Guru",
    description: "Complete 10 yoga or mobility sessions",
    category: "Flexibility",
    progress: 60,
    completed: false,
    date: null,
    icon: Trophy,
    color: "bg-purple-500",
  },
  {
    id: 6,
    name: "Weight Loss Warrior",
    description: "Lose 10 pounds from your starting weight",
    category: "Weight Management",
    progress: 70,
    completed: false,
    date: null,
    icon: Medal,
    color: "bg-teal-500",
  },
  {
    id: 7,
    name: "Early Bird",
    description: "Complete 5 workouts before 7 AM",
    category: "Lifestyle",
    progress: 40,
    completed: false,
    date: null,
    icon: Trophy,
    color: "bg-orange-500",
  },
  {
    id: 8,
    name: "Social Butterfly",
    description: "Share 10 workouts on social media",
    category: "Social",
    progress: 20,
    completed: false,
    date: null,
    icon: Medal,
    color: "bg-pink-500",
  },
]

export default function AchievementsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    category: [],
    status: [],
  })

  // Filter achievements based on search term and filters
  const filteredAchievements = achievements.filter((achievement) => {
    const matchesSearch =
      achievement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      achievement.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filters.category.length === 0 || filters.category.includes(achievement.category)
    const matchesStatus =
      filters.status.length === 0 ||
      (filters.status.includes("Completed") && achievement.completed) ||
      (filters.status.includes("In Progress") && !achievement.completed)
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Get unique categories
  const categories = [...new Set(achievements.map((a) => a.category))]

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
      status: [],
    })
    setSearchTerm("")
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Achievements</h2>
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">Overall Progress:</div>
          <Progress value={65} className="h-2 w-32" />
          <div className="text-sm">65%</div>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search achievements..."
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
              <DropdownMenuLabel>Filter Achievements</DropdownMenuLabel>
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
                <h4 className="mb-2 text-sm font-medium">Status</h4>
                <DropdownMenuCheckboxItem
                  checked={filters.status.includes("Completed")}
                  onCheckedChange={() => toggleFilter("status", "Completed")}
                >
                  Completed
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filters.status.includes("In Progress")}
                  onCheckedChange={() => toggleFilter("status", "In Progress")}
                >
                  In Progress
                </DropdownMenuCheckboxItem>
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
          <TabsTrigger value="all">All Achievements</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAchievements.map((achievement) => (
              <Card key={achievement.id} className="overflow-hidden">
                <div className="relative h-2">
                  <div className={`absolute inset-0 ${achievement.color}`} />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <achievement.icon className={`h-5 w-5 ${achievement.color} text-white rounded-full p-0.5`} />
                      {achievement.name}
                    </CardTitle>
                    <Badge variant={achievement.completed ? "default" : "outline"}>
                      {achievement.completed ? "Completed" : "In Progress"}
                    </Badge>
                  </div>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{achievement.progress}%</span>
                    </div>
                    <Progress value={achievement.progress} className="h-2" />
                    {achievement.completed && achievement.date && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>Completed on {achievement.date}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                {achievement.completed && (
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      <Share className="mr-2 h-4 w-4" />
                      Share Achievement
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {achievements
              .filter((a) => a.completed)
              .map((achievement) => (
                <Card key={achievement.id} className="overflow-hidden">
                  <div className="relative h-2">
                    <div className={`absolute inset-0 ${achievement.color}`} />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <achievement.icon className={`h-5 w-5 ${achievement.color} text-white rounded-full p-0.5`} />
                        {achievement.name}
                      </CardTitle>
                      <Badge>Completed</Badge>
                    </div>
                    <CardDescription>{achievement.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                      {achievement.date && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>Completed on {achievement.date}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      <Share className="mr-2 h-4 w-4" />
                      Share Achievement
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="in-progress" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {achievements
              .filter((a) => !a.completed)
              .map((achievement) => (
                <Card key={achievement.id} className="overflow-hidden">
                  <div className="relative h-2">
                    <div className={`absolute inset-0 ${achievement.color}`} />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <achievement.icon className={`h-5 w-5 ${achievement.color} text-white rounded-full p-0.5`} />
                        {achievement.name}
                      </CardTitle>
                      <Badge variant="outline">In Progress</Badge>
                    </div>
                    <CardDescription>{achievement.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Achievement Statistics</CardTitle>
          <CardDescription>Your achievement progress and milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border p-4 text-center">
              <div className="text-3xl font-bold text-primary">{achievements.length}</div>
              <div className="text-sm text-muted-foreground">Total Achievements</div>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <div className="text-3xl font-bold text-primary">{achievements.filter((a) => a.completed).length}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <div className="text-3xl font-bold text-primary">{achievements.filter((a) => !a.completed).length}</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <div className="text-3xl font-bold text-primary">
                {Math.round((achievements.filter((a) => a.completed).length / achievements.length) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
