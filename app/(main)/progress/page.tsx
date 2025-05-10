"use client"

import { useState } from "react"
import { LineChart, Plus, Scale, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample weight data
const weightData = [
  { date: "Jan", weight: 185 },
  { date: "Feb", weight: 183 },
  { date: "Mar", weight: 181 },
  { date: "Apr", weight: 179 },
  { date: "May", weight: 176 },
  { date: "Jun", weight: 175 },
  { date: "Jul", weight: 173 },
  { date: "Aug", weight: 172 },
]

// Sample body measurements data
const measurementsData = [
  { date: "Jan", chest: 42, waist: 36, arms: 15, legs: 24 },
  { date: "Feb", chest: 42.5, waist: 35.5, arms: 15.2, legs: 24.2 },
  { date: "Mar", chest: 43, waist: 35, arms: 15.5, legs: 24.5 },
  { date: "Apr", chest: 43.2, waist: 34.5, arms: 15.7, legs: 24.8 },
  { date: "May", chest: 43.5, waist: 34, arms: 16, legs: 25 },
  { date: "Jun", chest: 44, waist: 33.5, arms: 16.2, legs: 25.3 },
  { date: "Jul", chest: 44.2, waist: 33, arms: 16.5, legs: 25.5 },
  { date: "Aug", chest: 44.5, waist: 32.5, arms: 16.8, legs: 25.8 },
]

// Sample strength data
const strengthData = [
  { date: "Jan", bench: 185, squat: 225, deadlift: 275 },
  { date: "Feb", bench: 190, squat: 235, deadlift: 285 },
  { date: "Mar", bench: 195, squat: 245, deadlift: 295 },
  { date: "Apr", bench: 200, squat: 255, deadlift: 305 },
  { date: "May", bench: 205, squat: 265, deadlift: 315 },
  { date: "Jun", bench: 210, squat: 275, deadlift: 325 },
  { date: "Jul", bench: 215, squat: 285, deadlift: 335 },
  { date: "Aug", bench: 225, squat: 295, deadlift: 345 },
]

// Sample cardio data
const cardioData = [
  { date: "Jan", runningPace: 10.2, runningDistance: 2.5, cycling: 15 },
  { date: "Feb", runningPace: 10.0, runningDistance: 3.0, cycling: 17 },
  { date: "Mar", runningPace: 9.8, runningDistance: 3.5, cycling: 18 },
  { date: "Apr", runningPace: 9.5, runningDistance: 4.0, cycling: 20 },
  { date: "May", runningPace: 9.3, runningDistance: 4.5, cycling: 22 },
  { date: "Jun", runningPace: 9.0, runningDistance: 5.0, cycling: 24 },
  { date: "Jul", runningPace: 8.8, runningDistance: 5.5, cycling: 26 },
  { date: "Aug", runningPace: 8.5, runningDistance: 6.0, cycling: 28 },
]

// Sample body composition data
const bodyCompositionData = [
  { date: "Jan", bodyFat: 22, muscle: 40, water: 55 },
  { date: "Feb", bodyFat: 21, muscle: 41, water: 55.5 },
  { date: "Mar", bodyFat: 20, muscle: 42, water: 56 },
  { date: "Apr", bodyFat: 19, muscle: 43, water: 56.5 },
  { date: "May", bodyFat: 18, muscle: 44, water: 57 },
  { date: "Jun", bodyFat: 17, muscle: 45, water: 57.5 },
  { date: "Jul", bodyFat: 16, muscle: 46, water: 58 },
  { date: "Aug", bodyFat: 15, muscle: 47, water: 58.5 },
]

export default function ProgressPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [timeRange, setTimeRange] = useState("6m")

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Progress Tracking</h2>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-gradient-to-r from-green-500 to-blue-600">
            <Plus className="mr-2 h-4 w-4" />
            Log Measurement
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Weight</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">172 lbs</div>
              <Badge className="bg-green-500">-13 lbs</Badge>
            </div>
            <p className="text-xs text-muted-foreground">from starting weight of 185 lbs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Body Fat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">15%</div>
              <Badge className="bg-green-500">-7%</Badge>
            </div>
            <p className="text-xs text-muted-foreground">from starting body fat of 22%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Muscle Mass</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">47%</div>
              <Badge className="bg-green-500">+7%</Badge>
            </div>
            <p className="text-xs text-muted-foreground">from starting muscle mass of 40%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Weight Goal: 165 lbs</span>
                <span className="text-sm font-medium">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="weight" className="space-y-4">
        <TabsList>
          <TabsTrigger value="weight">Weight</TabsTrigger>
          <TabsTrigger value="measurements">Measurements</TabsTrigger>
          <TabsTrigger value="strength">Strength</TabsTrigger>
          <TabsTrigger value="cardio">Cardio</TabsTrigger>
          <TabsTrigger value="body-composition">Body Composition</TabsTrigger>
        </TabsList>

        <TabsContent value="weight" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weight Tracking</CardTitle>
              <CardDescription>Track your weight progress over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <Chart>
                <ChartContainer
                  config={{
                    weight: {
                      label: "Weight",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={weightData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="weight"
                        stroke="var(--color-weight)"
                        fill="var(--color-weight)"
                        fillOpacity={0.2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </Chart>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span className="text-sm">Weight (lbs)</span>
              </div>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Log Weight
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Weight History</CardTitle>
              <CardDescription>Your recent weight measurements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {weightData.slice().reverse().map((entry, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Scale className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{entry.weight} lbs</p>
                        <p className="text-sm text-muted-foreground">{entry.date} 2024</p>
                      </div>
                    </div>
                    {index > 0 && (
                      <Badge className={entry.weight < weightData.slice().reverse()[index - 1].weight ? "bg-green-500" : "bg-red-500"}>
                        {entry.weight < weightData.slice().reverse()[index - 1].weight
                          ? `-${weightData.slice().reverse()[index - 1].weight - entry.weight}`
                          : `+${entry.weight - weightData.slice().reverse()[index - 1].weight}`} lbs
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="measurements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Body Measurements</CardTitle>
              <CardDescription>Track your body measurements over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <Chart>
                <ChartContainer
                  config={{
                    chest: {
                      label: "Chest",
                      color: "hsl(var(--chart-1))",
                    },
                    waist: {
                      label: "Waist",
                      color: "hsl(var(--chart-2))",
                    },
                    arms: {
                      label: "Arms",
                      color: "hsl(var(--chart-3))",
                    },
                    legs: {
                      label: "Legs",
                      color: "hsl(var(--chart-4))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={measurementsData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="chest" stroke="var(--color-chest)" strokeWidth={2} />
                      <Line type="monotone" dataKey="waist" stroke="var(--color-waist)" strokeWidth={2} />
                      <Line type="monotone" dataKey="arms" stroke="var(--color-arms)" strokeWidth={2} />
                      <Line type="monotone" dataKey="legs" stroke="var(--color-legs)" strokeWidth={2} />
                      <Legend />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </Chart>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Log Measurements
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Current Measurements</CardTitle>
                <CardDescription>Your most recent body measurements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { name: "Chest", value: 44.5, change: "+2.5" },
                    { name: "Waist", value: 32.5, change: "-3.5" },
                    { name: "Arms", value: 16.8, change: "+1.8" },
                    { name: "Legs", value: 25.8, change: "+1.8" },
                    { name: "Shoulders", value: 52.0, change: "+3.0" },
                    { name: "Hips", value: 38.5, change: "-2.0" },
                  ].map((measurement) => (
                    <div key={measurement.name} className="flex items-center justify-between rounded-lg border p-3">
                      <span className="font-medium">{measurement.name}</span>
                      <div className="flex items-center gap-2">
                        <span>{measurement.value} in</span>
                        <Badge
                          className={
                            measurement.change.startsWith("+")
                              ? measurement.name === "Waist" || measurement.name === "Hips"
                                ? "bg-red-500"
                                : "bg-green-500"
                              : measurement.name === "Waist" || measurement.name === "Hips"
                                ? "bg-green-500"
                                : "bg-red-500"
                          }
                        >
                          {measurement.change} in
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Measurement Goals</CardTitle>
                <CardDescription>Track progress towards your measurement goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Chest", current: 44.5, goal: 46, progress: 83 },
                    { name: "Waist", current: 32.5, goal: 32, progress: 88 },
                    { name: "Arms", current: 16.8, goal: 18, progress: 75 },
                    { name: "Legs", current: 25.8, goal: 27, progress: 65 },
                  ].map((goal) => (
                    <div key={goal.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{goal.name}</span>
                        <span className="text-sm">
                          {goal.current} / {goal.goal} in
                        </span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Update Goals
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="strength" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Strength Progress</CardTitle>
              <CardDescription>Track your strength gains over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <Chart>
                <ChartContainer
                  config={{
                    bench: {
                      label: "Bench Press",
                      color: "hsl(var(--chart-1))",
                    },
                    squat: {
                      label: "Squat",
                      color: "hsl(var(--chart-2))",
                    },
                    deadlift: {
                      label: "Deadlift",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={strengthData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="bench" fill="var(--color-bench)" />
                      <Bar dataKey="squat" fill="var(--color-squat)" />
                      <Bar dataKey="deadlift" fill="var(--color-deadlift)" />
                      <Legend />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </Chart>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Log Strength
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Bench Press</CardTitle>
                <CardDescription>1 Rep Max</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">225 lbs</div>
                  <Badge className="bg-green-500">+40 lbs</Badge>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Goal: 250 lbs</span>
                    <span>90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Squat</CardTitle>
                <CardDescription>1 Rep Max</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">295 lbs</div>
                  <Badge className="bg-green-500">+70 lbs</Badge>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Goal: 315 lbs</span>
                    <span>94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Deadlift</CardTitle>
                <CardDescription>1 Rep Max</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">345 lbs</div>
                  <Badge className="bg-green-500">+70 lbs</Badge>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Goal: 405 lbs</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Strength Records</CardTitle>
              <CardDescription>Your latest personal records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { exercise: "Bench Press", weight: 225, date: "Aug 15, 2024", reps: 1 },
                  { exercise: "Squat", weight: 295, date: "Aug 12, 2024", reps: 1 },
                  { exercise: "Deadlift", weight: 345, date: "Aug 10, 2024", reps: 1 },
                  { exercise: "Overhead Press", weight: 145, date: "Aug 8, 2024", reps: 1 },
                  { exercise: "Barbell Row", weight: 185, date: "Aug 5, 2024", reps: 5 },
                ].map((record, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Dumbbell className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{record.exercise}</p>
                        <p className="text-sm text-muted-foreground">
                          {record.weight} lbs × {record.reps} {record.reps === 1 ? "rep" : "reps"}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">{record.date}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cardio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cardio Progress</CardTitle>
              <CardDescription>Track your cardio performance over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <Chart>
                <ChartContainer
                  config={{
                    runningPace: {
                      label: "Running Pace (min/mile)",
                      color: "hsl(var(--chart-1))",
                    },
                    runningDistance: {
                      label: "Running Distance (miles)",
                      color: "hsl(var(--chart-2))",
                    },
                    cycling: {
                      label: "Cycling Speed (mph)",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={cardioData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="runningPace"
                        stroke="var(--color-runningPace)"
                        strokeWidth={2}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="runningDistance"
                        stroke="var(--color-runningDistance)"
                        strokeWidth={2}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="cycling"
                        stroke="var(--color-cycling)"
                        strokeWidth={2}
                      />
                      <Legend />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </Chart>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Log Cardio
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Running</CardTitle>
                <CardDescription>Current Performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Pace (min/mile)</div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">8:30</div>
                      <Badge className="bg-green-500">-1:42</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Distance (miles)</div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">6.0</div>
                      <Badge className="bg-green-500">+3.5</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Weekly Mileage</div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">18.5</div>
                      <Badge className="bg-green-500">+10.2</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Cycling</CardTitle>
                <CardDescription>Current Performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Speed (mph)</div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">28.0</div>
                      <Badge className="bg-green-500">+13.0</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Distance (miles)</div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">25.0</div>
                      <Badge className="bg-green-500">+15.0</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Weekly Mileage</div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">75.0</div>
                      <Badge className="bg-green-500">+45.0</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Swimming</CardTitle>
                <CardDescription>Current Performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Pace (min/100m)</div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">1:45</div>
                      <Badge className="bg-green-500">-0:20</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Distance (meters)</div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">1500</div>
                      <Badge className="bg-green-500">+500</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Weekly Distance</div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">4500</div>
                      <Badge className="bg-green-500">+2000</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Cardio Activities</CardTitle>
              <CardDescription>Your latest cardio workouts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  {
                    activity: "Running",
                    details: "6.2 miles • 8:30 min/mile",
                    duration: "52:42",
                    date: "Aug 18, 2024",
                    calories: 620,
                  },
                  {
                    activity: "Cycling",
                    details: "25 miles • 18.5 mph",
                    duration: "1:21:15",
                    date: "Aug 16, 2024",
                    calories: 850,
                  },
                  {
                    activity: "Swimming",
                    details: "1500m • 1:45 min/100m",
                    duration: "26:15",
                    date: "Aug 14, 2024",
                    calories: 450,
                  },
                  {
                    activity: "Running",
                    details: "5.0 miles • 8:45 min/mile",
                    duration: "43:45",
                    date: "Aug 12, 2024",
                    calories: 500,
                  },
                  {
                    activity: "Cycling",
                    details: "20 miles • 17.8 mph",
                    duration: "1:07:30",
                    date: "Aug 10, 2024",
                    calories: 720,
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <TrendingUp className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{activity.activity}</p>
                        <p className="text-sm text-muted-foreground">{activity.details}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{activity.duration}</p>
                      <p className="text-sm text-muted-foreground">{activity.calories} cal</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="body-composition" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Body Composition</CardTitle>
              <CardDescription>Track your body composition over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <Chart>
                <ChartContainer
                  config={{
                    bodyFat
