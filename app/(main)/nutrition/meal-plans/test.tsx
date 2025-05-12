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
import mealPlans from "@/app/data/mealPlans"

// Sample meal plan data


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
