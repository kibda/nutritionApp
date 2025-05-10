"use client"

import { useState } from "react"
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  Edit,
  Plus,
  Trash,
  Utensils,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

// Sample meal plan data
const mealPlans = [
  {
    id: 1,
    name: "Weight Loss Plan",
    description: "A balanced meal plan designed for weight loss with a calorie deficit.",
    calories: 1800,
    protein: 150,
    carbs: 150,
    fat: 60,
    meals: [
      {
        id: 1,
        name: "Breakfast",
        time: "7:00 AM",
        foods: [
          { name: "Greek Yogurt", amount: "1 cup", calories: 150, protein: 20, carbs: 8, fat: 4 },
          { name: "Blueberries", amount: "1/2 cup", calories: 40, protein: 0, carbs: 10, fat: 0 },
          { name: "Granola", amount: "1/4 cup", calories: 120, protein: 3, carbs: 20, fat: 3 },
        ],
      },
      {
        id: 2,
        name: "Lunch",
        time: "12:00 PM",
        foods: [
          { name: "Grilled Chicken Breast", amount: "4 oz", calories: 180, protein: 35, carbs: 0, fat: 4 },
          { name: "Brown Rice", amount: "1/2 cup", calories: 110, protein: 2, carbs: 22, fat: 1 },
          { name: "Steamed Broccoli", amount: "1 cup", calories: 55, protein: 4, carbs: 11, fat: 0 },
        ],
      },
      {
        id: 3,
        name: "Snack",
        time: "3:00 PM",
        foods: [
          { name: "Apple", amount: "1 medium", calories: 95, protein: 0, carbs: 25, fat: 0 },
          { name: "Almonds", amount: "1 oz", calories: 160, protein: 6, carbs: 6, fat: 14 },
        ],
      },
      {
        id: 4,
        name: "Dinner",
        time: "6:30 PM",
        foods: [
          { name: "Salmon", amount: "4 oz", calories: 200, protein: 22, carbs: 0, fat: 12 },
          { name: "Quinoa", amount: "1/2 cup", calories: 110, protein: 4, carbs: 20, fat: 2 },
          { name: "Roasted Vegetables", amount: "1 cup", calories: 80, protein: 2, carbs: 16, fat: 1 },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Muscle Building Plan",
    description: "High protein meal plan designed for muscle growth and recovery.",
    calories: 2800,
    protein: 220,
    carbs: 280,
    fat: 90,
    meals: [
      {
        id: 1,
        name: "Breakfast",
        time: "7:00 AM",
        foods: [
          { name: "Eggs", amount: "4 whole", calories: 280, protein: 24, carbs: 0, fat: 20 },
          { name: "Oatmeal", amount: "1 cup", calories: 150, protein: 5, carbs: 27, fat: 2 },
          { name: "Banana", amount: "1 medium", calories: 105, protein: 1, carbs: 27, fat: 0 },
        ],
      },
      {
        id: 2,
        name: "Mid-Morning Snack",
        time: "10:00 AM",
        foods: [
          { name: "Protein Shake", amount: "1 scoop", calories: 120, protein: 25, carbs: 3, fat: 1 },
          { name: "Peanut Butter", amount: "1 tbsp", calories: 95, protein: 4, carbs: 3, fat: 8 },
        ],
      },
      {
        id: 3,
        name: "Lunch",
        time: "1:00 PM",
        foods: [
          { name: "Chicken Breast", amount: "6 oz", calories: 270, protein: 50, carbs: 0, fat: 6 },
          { name: "Sweet Potato", amount: "1 medium", calories: 115, protein: 2, carbs: 27, fat: 0 },
          { name: "Broccoli", amount: "1 cup", calories: 55, protein: 4, carbs: 11, fat: 0 },
        ],
      },
      {
        id: 4,
        name: "Afternoon Snack",
        time: "4:00 PM",
        foods: [
          { name: "Greek Yogurt", amount: "1 cup", calories: 150, protein: 20, carbs: 8, fat: 4 },
          { name: "Berries", amount: "1/2 cup", calories: 40, protein: 0, carbs: 10, fat: 0 },
          { name: "Honey", amount: "1 tbsp", calories: 60, protein: 0, carbs: 17, fat: 0 },
        ],
      },
      {
        id: 5,
        name: "Dinner",
        time: "7:00 PM",
        foods: [
          { name: "Steak", amount: "6 oz", calories: 350, protein: 42, carbs: 0, fat: 20 },
          { name: "Brown Rice", amount: "1 cup", calories: 220, protein: 4, carbs: 44, fat: 2 },
          { name: "Mixed Vegetables", amount: "1 cup", calories: 80, protein: 2, carbs: 16, fat: 1 },
        ],
      },
      {
        id: 6,
        name: "Before Bed",
        time: "9:30 PM",
        foods: [
          { name: "Casein Protein", amount: "1 scoop", calories: 120, protein: 25, carbs: 3, fat: 1 },
          { name: "Almond Milk", amount: "1 cup", calories: 30, protein: 1, carbs: 1, fat: 2 },
        ],
      },
    ],
  },
]

export default function MealPlansPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [selectedPlan, setSelectedPlan] = useState(mealPlans[0])

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Meal Plans</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Plan
        </Button>
      </div>

      <Tabs defaultValue="plans" className="space-y-4">
        <TabsList>
          <TabsTrigger value="plans">My Plans</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="shopping">Shopping List</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mealPlans.map((plan) => (
              <Card key={plan.id} className={plan.id === selectedPlan.id ? "border-primary" : ""}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex flex-col items-center rounded-lg border p-2">
                      <span className="text-muted-foreground">Calories</span>
                      <span className="text-xl font-bold">{plan.calories}</span>
                    </div>
                    <div className="flex flex-col items-center rounded-lg border p-2">
                      <span className="text-muted-foreground">Protein</span>
                      <span className="text-xl font-bold">{plan.protein}g</span>
                    </div>
                    <div className="flex flex-col items-center rounded-lg border p-2">
                      <span className="text-muted-foreground">Carbs</span>
                      <span className="text-xl font-bold">{plan.carbs}g</span>
                    </div>
                    <div className="flex flex-col items-center rounded-lg border p-2">
                      <span className="text-muted-foreground">Fat</span>
                      <span className="text-xl font-bold">{plan.fat}g</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="mb-2 font-medium">Meals</h4>
                    <div className="space-y-2">
                      {plan.meals.slice(0, 3).map((meal) => (
                        <div key={meal.id} className="flex items-center justify-between rounded-lg border p-2">
                          <div className="flex items-center gap-2">
                            <Utensils className="h-4 w-4 text-muted-foreground" />
                            <span>{meal.name}</span>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            {meal.time}
                          </div>
                        </div>
                      ))}
                      {plan.meals.length > 3 && (
                        <div className="text-center text-sm text-muted-foreground">
                          +{plan.meals.length - 3} more meals
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => setSelectedPlan(plan)}>
                    View Details
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{selectedPlan.name} Details</CardTitle>
              <CardDescription>{selectedPlan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-sm">
                    {selectedPlan.calories} calories
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    {selectedPlan.protein}g protein
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    {selectedPlan.carbs}g carbs
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    {selectedPlan.fat}g fat
                  </Badge>
                </div>

                <div className="space-y-4">
                  {selectedPlan.meals.map((meal) => (
                    <Card key={meal.id}>
                      <CardHeader className="p-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{meal.name}</CardTitle>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1 h-4 w-4" />
                            {meal.time}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b text-sm">
                              <th className="pb-2 text-left font-medium">Food</th>
                              <th className="pb-2 text-left font-medium">Amount</th>
                              <th className="pb-2 text-right font-medium">Calories</th>
                              <th className="pb-2 text-right font-medium">Protein</th>
                              <th className="hidden pb-2 text-right font-medium sm:table-cell">Carbs</th>
                              <th className="hidden pb-2 text-right font-medium sm:table-cell">Fat</th>
                            </tr>
                          </thead>
                          <tbody>
                            {meal.foods.map((food, index) => (
                              <tr key={index} className="border-b text-sm last:border-0">
                                <td className="py-2">{food.name}</td>
                                <td className="py-2">{food.amount}</td>
                                <td className="py-2 text-right">{food.calories}</td>
                                <td className="py-2 text-right">{food.protein}g</td>
                                <td className="hidden py-2 text-right sm:table-cell">{food.carbs}g</td>
                                <td className="hidden py-2 text-right sm:table-cell">{food.fat}g</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="text-sm font-medium">
                              <td className="pt-2">Total</td>
                              <td className="pt-2"></td>
                              <td className="pt-2 text-right">
                                {meal.foods.reduce((sum, food) => sum + food.calories, 0)}
                              </td>
                              <td className="pt-2 text-right">
                                {meal.foods.reduce((sum, food) => sum + food.protein, 0)}g
                              </td>
                              <td className="hidden pt-2 text-right sm:table-cell">
                                {meal.foods.reduce((sum, food) => sum + food.carbs, 0)}g
                              </td>
                              <td className="hidden pt-2 text-right sm:table-cell">
                                {meal.foods.reduce((sum, food) => sum + food.fat, 0)}g
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    {format(date, "MMMM yyyy")}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                </PopoverContent>
              </Popover>
              <div className="flex gap-1">
                <Button variant="outline" size="icon" onClick={() => setDate(new Date())}>
                  Today
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Meal
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Daily Meal Plan</CardTitle>
              <CardDescription>{format(date, "EEEE, MMMM do, yyyy")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedPlan.meals.map((meal) => (
                  <Card key={meal.id}>
                    <CardHeader className="p-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{meal.name}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          {meal.time}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="space-y-2">
                        {meal.foods.map((food, index) => (
                          <div key={index} className="flex items-center justify-between rounded-lg border p-2">
                            <div>
                              <div className="font-medium">{food.name}</div>
                              <div className="text-sm text-muted-foreground">{food.amount}</div>
                            </div>
                            <div className="text-sm">
                              {food.calories} cal | {food.protein}g protein
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shopping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shopping List</CardTitle>
              <CardDescription>Based on your meal plan for the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-medium">Proteins</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 rounded-lg border p-2">
                      <input type="checkbox" id="item-1" className="h-4 w-4" />
                      <label htmlFor="item-1" className="flex-1">
                        Chicken Breast (1.5 lbs)
                      </label>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border p-2">
                      <input type="checkbox" id="item-2" className="h-4 w-4" />
                      <label htmlFor="item-2" className="flex-1">
                        Salmon (1 lb)
                      </label>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border p-2">
                      <input type="checkbox" id="item-3" className="h-4 w-4" />
                      <label htmlFor="item-3" className="flex-1">
                        Greek Yogurt (32 oz)
                      </label>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border p-2">
                      <input type="checkbox" id="item-4" className="h-4 w-4" />
                      <label htmlFor="item-4" className="flex-1">
                        Eggs (1 dozen)
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 font-medium">Carbohydrates</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 rounded-lg border p-2">
                      <input type="checkbox" id="item-5" className="h-4 w-4" />
                      <label htmlFor="item-5" className="flex-1">
                        Brown Rice (2 lbs)
                      </label>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border p-2">
                      <input type="checkbox" id="item-6" className="h-4 w-4" />
                      <label htmlFor="item-6" className="flex-1">
                        Sweet Potatoes (3)
                      </label>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border p-2">
                      <input type="checkbox" id="item-7" className="h-4 w-4" />
                      <label htmlFor="item-7" className="flex-1">
                        Oatmeal (1 container)
                      </label>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border p-2">
                      <input type="checkbox" id="item-8" className="h-4 w-4" />
                      <label htmlFor="item-8" className="flex-1">
                        Quinoa (1 lb)
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 font-medium">Fruits & Vegetables</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 rounded-lg border p-2">
                      <input type="checkbox" id="item-9" className="h-4 w-4" />
                      <label htmlFor="item-9" className="flex-1">
                        Broccoli (1 bunch)
                      </label>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border p-2">
                      <input type="checkbox" id="item-10" className="h-4 w-4" />
                      <label htmlFor="item-10" className="flex-1">
                        Spinach (1 bag)
                      </label>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border p-2">
                      <input type="checkbox" id="item-11" className="h-4 w-4" />
                      <label htmlFor="item-11" className="flex-1">
                        Bananas (6)
                      </label>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border p-2">
                      <input type="checkbox" id="item-12" className="h-4 w-4" />
                      <label htmlFor="item-12" className="flex-1">
                        Blueberries (1 pint)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
