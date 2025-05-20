"use client"

import { useState } from "react"
import { Calendar, Filter, Medal, Search, Share, Trophy, Award } from "lucide-react"
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

// Achievement Card Component
const AchievementCard = ({ achievement }) => (
  <Card className="overflow-hidden transition-all hover:shadow-md">
    <div className="relative h-2">
      <div className={`absolute inset-0 ${achievement.color}`} />
    </div>
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <div className={`${achievement.color} rounded-full p-1`}>
            <achievement.icon className="h-4 w-4 text-white" />
          </div>
          {achievement.name}
        </CardTitle>
        <Badge variant={achievement.completed ? "default" : "outline"} className={achievement.completed ? `${achievement.color.replace('bg-', 'bg-opacity-20 text-')}` : ""}>
          {achievement.completed ? "Completed" : "In Progress"}
        </Badge>
      </div>
      <CardDescription>{achievement.description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>Progress</span>
          <span className="font-medium">{achievement.progress}%</span>
        </div>
        <Progress value={achievement.progress} className={`h-2 ${achievement.completed ? achievement.color : ""}`} />
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
        <Button variant="outline" size="sm" className="w-full hover:bg-slate-50">
          <Share className="mr-2 h-4 w-4" />
          Share Achievement
        </Button>
      </CardFooter>
    )}
  </Card>
)

export default function AchievementsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    category: [],
    status: [],
  })
  const [activeTab, setActiveTab] = useState("all")

  // Filter achievements based on search term, filters, and active tab
  const filteredAchievements = achievements.filter((achievement) => {
    const matchesSearch =
      achievement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      achievement.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = filters.category.length === 0 || filters.category.includes(achievement.category)
    
    const matchesStatus =
      filters.status.length === 0 ||
      (filters.status.includes("Completed") && achievement.completed) ||
      (filters.status.includes("In Progress") && !achievement.completed)
    
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "completed" && achievement.completed) ||
      (activeTab === "in-progress" && !achievement.completed)
    
    return matchesSearch && matchesCategory && matchesStatus && matchesTab
  })

  // Get unique categories
  const categories = [...new Set(achievements.map((a) => a.category))]

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
      status: [],
    })
    setSearchTerm("")
  }

  // Stats for the dashboard
  const completedCount = achievements.filter(a => a.completed).length
  const inProgressCount = achievements.length - completedCount
  const completionRate = Math.round((completedCount / achievements.length) * 100)
  const overallProgress = Math.round(achievements.reduce((sum, a) => sum + a.progress, 0) / achievements.length)

  return (
    <div className="flex-1 space-y-6 bg-slate-50 p-4 pt-6 md:p-8">
      <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-sm">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Your Achievements</h2>
            <p className="text-muted-foreground">Track your fitness milestones and progress</p>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
            <Award className="h-6 w-6 text-blue-500" />
            <div>
              <div className="text-sm font-medium">Overall Progress</div>
              <div className="flex items-center gap-2">
                <Progress value={overallProgress} className="h-2 w-32" />
                <div className="text-sm font-medium">{overallProgress}%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 pt-2 md:grid-cols-4">
          <div className="rounded-xl border bg-white p-4 text-center shadow-sm transition-all hover:shadow">
            <div className="text-3xl font-bold text-blue-600">{achievements.length}</div>
            <div className="text-sm text-muted-foreground">Total Achievements</div>
          </div>
          <div className="rounded-xl border bg-white p-4 text-center shadow-sm transition-all hover:shadow">
            <div className="text-3xl font-bold text-green-600">{completedCount}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
          <div className="rounded-xl border bg-white p-4 text-center shadow-sm transition-all hover:shadow">
            <div className="text-3xl font-bold text-amber-600">{inProgressCount}</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </div>
          <div className="rounded-xl border bg-white p-4 text-center shadow-sm transition-all hover:shadow">
            <div className="text-3xl font-bold text-purple-600">{completionRate}%</div>
            <div className="text-sm text-muted-foreground">Completion Rate</div>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
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
                  {Object.values(filters).flat().length > 0 && (
                    <Badge className="ml-1 rounded-sm px-1 font-normal">{Object.values(filters).flat().length}</Badge>
                  )}
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

        <Tabs defaultValue="all" className="w-full pt-4" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 rounded-lg">
            <TabsTrigger value="all" className="rounded-md">All Achievements</TabsTrigger>
            <TabsTrigger value="completed" className="rounded-md">Completed</TabsTrigger>
            <TabsTrigger value="in-progress" className="rounded-md">In Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {filteredAchievements.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredAchievements.map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Trophy className="mb-4 h-12 w-12 text-slate-300" />
                <h3 className="mb-1 text-xl font-semibold">No achievements found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            {filteredAchievements.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredAchievements.map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Medal className="mb-4 h-12 w-12 text-slate-300" />
                <h3 className="mb-1 text-xl font-semibold">No completed achievements</h3>
                <p className="text-muted-foreground">Keep up the great work to earn achievements!</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="in-progress" className="mt-6">
            {filteredAchievements.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredAchievements.map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Award className="mb-4 h-12 w-12 text-slate-300" />
                <h3 className="mb-1 text-xl font-semibold">No in-progress achievements</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}