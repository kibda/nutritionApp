"use client"

import { useState } from "react"
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, Plus, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { NutritionChart } from "@/components/nutrition-chart"

// Sample nutrition data
const nutritionData = {
  calories: {
    goal: 2200,
    consumed: 1850,
    remaining: 350,
  },
  macros: {
    protein: {
      goal: 165,
      consumed: 140,
    },
    carbs: {
      goal: 220,
      consumed: 185,
    },
    fat: {
      goal: 73,
      consumed: 62,
    },
  },
  meals: [
    {
      id: 1,
      name: "Breakfast",
      time: "7:30 AM",
      foods: [
        { name: "Greek Yogurt", amount: "1 cup", calories: 150, protein: 20, carbs: 8, fat: 4 },
        { name: "Blueberries", amount: "1/2 cup", calories: 40, protein: 0, carbs: 10, fat: 0 },
        { name: "Granola", amount: "1/4 cup", calories: 120, protein: 3, carbs: 20, fat: 3 },
      ],
    },
    {
      id: 2,
      name: "Morning Snack",
      time: "10:30 AM",
      foods: [
        { name: "Apple", amount: "1 medium", calories: 95, protein: 0, carbs: 25, fat: 0 },
        { name: "Almonds", amount: "1 oz", calories: 160, protein: 6, carbs: 6, fat: 14 },
      ],
    },
    {
      id: 3,
      name: "Lunch",
      time: "1:00 PM",
      foods: [
        { name: "Grilled Chicken Breast", amount: "4 oz", calories: 180, protein: 35, carbs: 0, fat: 4 },
        { name: "Brown Rice", amount: "1/2 cup", calories: 110, protein: 2, carbs: 22, fat: 1 },
        { name: "Steamed Broccoli", amount: "1 cup", calories: 55, protein: 4, carbs: 11, fat: 0 },
      ],
    },
    {
      id: 4,
      name: "Afternoon Snack",
      time: "4:00 PM",
      foods: [{ name: "Protein Shake", amount: "1 scoop", calories: 120, protein: 25, carbs: 3, fat: 1 }],
    },
    {
      id: 5,
      name: "Dinner",
      time: "7:00 PM",
      foods: [
        { name: "Salmon", amount: "4 oz", calories: 200, protein: 22, carbs: 0, fat: 12 },
        { name: "Quinoa", amount: "1/2 cup", calories: 110, protein: 4, carbs: 20, fat: 2 },
        { name: "Roasted Vegetables", amount: "1 cup", calories: 80, protein: 2, carbs: 16, fat: 1 },
      ],
    },
  ],
  water: {
    goal: 8,
    consumed: 5,
  },
}

export default function NutritionTrackingPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [searchTerm, setSearchTerm] = useState("")

  // Calculate totals
  const totalCalories = nutritionData.meals.reduce(
    (sum, meal) => sum + meal.foods.reduce((mealSum, food) => mealSum + food.calories, 0),
    0,
  )

  const totalProtein = nutritionData.meals.reduce(
    (sum, meal) => sum + meal.foods.reduce((mealSum, food) => mealSum + food.protein, 0),
    0,
  )

  const totalCarbs = nutritionData.meals.reduce(
    (sum, meal) => sum + meal.foods.reduce((mealSum, food) => mealSum + food.carbs, 0),
    0,
  )

  const totalFat = nutritionData.meals.reduce(
    (sum, meal) => sum + meal.foods.reduce((mealSum, food) => mealSum + food.fat, 0),
    0,
  )

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Nutrition Tracking</h2>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Calendar className="h-4 w-4" />
                {format(date, "MMMM d, yyyy")}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
            </PopoverContent>
          </Popover>
          <div className="flex gap-1">
            <Button variant="outline" size="icon" onClick={() => setDate(new Date(date.getTime() - 86400000))}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setDate(new Date())}>
              Today
            </Button>
            <Button variant="outline" size="icon" onClick={() => setDate(new Date(date.getTime() + 86400000))}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Calories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{totalCalories}</div>
              <div className="text-sm text-muted-foreground">of {nutritionData.calories.goal}</div>
            </div>
            <Progress value={(totalCalories / nutritionData.calories.goal) * 100} className="mt-2 h-2" />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <div>Consumed</div>
              <div>Goal</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Protein</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{totalProtein}g</div>
              <div className="text-sm text-muted-foreground">of {nutritionData.macros.protein.goal}g</div>
            </div>
            <Progress value={(totalProtein / nutritionData.macros.protein.goal) * 100} className="mt-2 h-2 bg-muted" />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <div>Consumed</div>
              <div>Goal</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Carbs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{totalCarbs}g</div>
              <div className="text-sm text-muted-foreground">of {nutritionData.macros.carbs.goal}g</div>
            </div>
            <Progress value={(totalCarbs / nutritionData.macros.carbs.goal) * 100} className="mt-2 h-2 bg-muted" />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <div>Consumed</div>
              <div>Goal</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Fat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{totalFat}g</div>
              <div className="text-sm text-muted-foreground">of {nutritionData.macros.fat.goal}g</div>
            </div>
            <Progress value={(totalFat / nutritionData.macros.fat.goal) * 100} className="mt-2 h-2 bg-muted" />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <div>Consumed</div>
              <div>Goal</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nutrition Overview</CardTitle>
          <CardDescription>Track your daily nutrition intake</CardDescription>
        </CardHeader>
        <CardContent>
          <NutritionChart />
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Today's Meals</h3>
        <Button className="bg-gradient-to-r from-green-500 to-blue-600">
          <Plus className="mr-2 h-4 w-4" />
          Add Food
        </Button>
      </div>

      <div className="space-y-4">
        {nutritionData.meals.map((meal) => (
          <Card key={meal.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{meal.name}</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-muted-foreground">{meal.time}</div>
                  <Badge variant="outline">{meal.foods.reduce((sum, food) => sum + food.calories, 0)} cal</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {meal.foods.map((food, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Utensils className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{food.name}</div>
                        <div className="text-xs text-muted-foreground">{food.amount}</div>
                      </div>
                    </div>
                    <div className="text-sm">
                      <div>{food.calories} cal</div>
                      <div className="text-xs text-muted-foreground">
                        P: {food.protein}g • C: {food.carbs}g • F: {food.fat}g
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="mt-2 w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Food to {meal.name}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Water Intake</CardTitle>
          <CardDescription>Track your daily water consumption</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Daily Goal: {nutritionData.water.goal} glasses</div>
              <div className="text-sm">
                {nutritionData.water.consumed}/{nutritionData.water.goal} consumed
              </div>
            </div>
            <Progress value={(nutritionData.water.consumed / nutritionData.water.goal) * 100} className="h-2" />
            <div className="flex justify-between">
              {Array.from({ length: nutritionData.water.goal }).map((_, i) => (
                <div
                  key={i}
                  className={`h-10 w-10 rounded-full ${
                    i < nutritionData.water.consumed ? "bg-blue-500 text-white" : "bg-muted"
                  } flex items-center justify-center text-xs font-medium`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600">
                <Plus className="mr-2 h-4 w-4" />
                Add Water
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
