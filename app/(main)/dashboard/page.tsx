import { Activity, Calendar, Dumbbell, Utensils } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NutritionChart } from "@/components/nutrition-chart"
import { WorkoutCalendar } from "@/components/workout-calendar"
import { UpcomingSessionsCard } from "@/components/upcoming-sessions-card"
import { RecentAchievementsCard } from "@/components/recent-achievements-card"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Last updated: Today at 9:30 AM</span>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="workouts">Workouts</TabsTrigger>
          <TabsTrigger value="coaching">Coaching</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Weekly Workouts</CardTitle>
                <Dumbbell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4/5</div>
                <Progress value={80} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">80% of weekly goal completed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nutrition Score</CardTitle>
                <Utensils className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87/100</div>
                <Progress value={87} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">Great progress this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Streak</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14 days</div>
                <Progress value={100} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">Keep up the great work!</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <Progress value={40} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">Next session: Tomorrow, 10:00 AM</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Weekly Progress</CardTitle>
                <CardDescription>Your fitness metrics for the past week</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <NutritionChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>Your scheduled coaching sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingSessionsCard />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>Your latest fitness milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentAchievementsCard />
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Workout Schedule</CardTitle>
                <CardDescription>Your planned workouts for the month</CardDescription>
              </CardHeader>
              <CardContent>
                <WorkoutCalendar />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="nutrition" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nutrition Overview</CardTitle>
              <CardDescription>Your nutrition metrics and meal plans</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <NutritionChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workouts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workout Schedule</CardTitle>
              <CardDescription>Your planned workouts for the month</CardDescription>
            </CardHeader>
            <CardContent>
              <WorkoutCalendar />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coaching" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>Your scheduled coaching sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <UpcomingSessionsCard />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
