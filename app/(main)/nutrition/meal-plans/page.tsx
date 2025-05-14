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
import mealPlans2 from "@/app/data/mealPlans"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"







export default function MealPlansPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [mealPlans, setmealPlans] = useState(mealPlans2)

  const [selectedPlan, setSelectedPlan] = useState(mealPlans2[0])

  const [open, setOpen] = useState(false)
const [newPlanName, setNewPlanName] = useState("")
const [newPlanDesc, setNewPlanDesc] = useState("")

const [openAddMeal, setOpenAddMeal] = useState(false)
const [newMealName, setNewMealName] = useState("")
const [newMealTime, setNewMealTime] = useState("")


const [newFoods, setNewFoods] = useState<{ name: string; amount: string; calories: string; protein: string; carbs: string; fat: string; }[]>([])

const [currentFood, setCurrentFood] = useState({
  name: "",
  amount: "",
  calories: "",
  protein: "",
  carbs: "",
  fat: "",
})



const [newMeals, setNewMeals] = useState([
  {
    id: Date.now(),
    name: "",
    time: "",
    foods: [
      {
        name: "",
        amount: "",
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      },
    ],
  },
])

function calculateNutritionFromMeals(meals:any[]) {
  return meals.reduce(
    (totals, meal) => {
      totals.calories += meal.calories
      totals.protein += meal.protein
      totals.carbs += meal.carbs
      totals.fat += meal.fat
      return totals
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  )
}

const [editingPlan, setEditingPlan] = useState<typeof mealPlans2[0] | null>(null)
const [editModalOpen, setEditModalOpen] = useState(false)

const [editingMeal, setEditingMeal] = useState<any | null>(null)
const [openEditMeal, setOpenEditMeal] = useState(false)






  

  

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
  <Utensils className="h-8 w-8 text-primary" />
  <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-yellow-600 dark:from-green-400 dark:to-yellow-400">
    Meal Plans
  </h2>
</div>

                        <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-green-500 to-blue-600">
                      <Plus className="mr-2 h-4 w-4 " />
                      Create New Plan
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Meal Plan</DialogTitle>
                    </DialogHeader>


                    {/* Add your form fields here */}


                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  <Input
                    placeholder="Plan name"
                    value={newPlanName}
                    onChange={(e) => setNewPlanName(e.target.value)}
                  />
                  <Textarea
                    placeholder="Plan description"
                    value={newPlanDesc}
                    onChange={(e) => setNewPlanDesc(e.target.value)}
                  />
                  
                
                </div>


                    

                    <DialogFooter className="mt-4">
                      <Button
                        onClick={() => {
                          const newPlan = {
                            id: Date.now(),
                            name: newPlanName,
                            description: newPlanDesc,
                            calories: 0,
                            protein: 0,
                            carbs: 0,
                            fat: 0,
                            meals: [],
                          }
                        setmealPlans([...mealPlans, newPlan]) // You'd normally use useState to manage this instead
                          setSelectedPlan(newPlan)
                          setNewPlanName("")
                          setNewPlanDesc("")
                          setOpen(false)
                        }}
                      >
                        Save
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

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
              <Card key={plan.id} className={`flex flex-col h-full ${plan.id === selectedPlan.id ? "border-primary" : ""}`}>
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

                  {plan.meals.length > 0 ? (
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
                  ) : (
                    <div className="mt-4">
                    <h4 className="mb-2 font-medium">Meals</h4>
                    <div className="mt-4 text-center text-sm text-muted-foreground">
                      No meals planned yet.
                    </div>
                  </div>
                  )}
                </CardContent>
               
                <div className="flex-grow" />
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => setSelectedPlan(plan)}>
                    View Details
                  </Button>
                  <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingPlan(plan)
                          setEditModalOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {/* dialog edit name and desc */}
                      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Meal Plan</DialogTitle>
                          </DialogHeader>
                          {editingPlan && (
                            <div className="space-y-4">
                              <Input
                                value={editingPlan.name}
                                onChange={(e) =>
                                  setEditingPlan({ ...editingPlan, name: e.target.value })
                                }
                                placeholder="Meal Plan Name"
                              />
                              <Textarea
                                value={editingPlan.description}
                                onChange={(e) =>
                                  setEditingPlan({ ...editingPlan, description: e.target.value })
                                }
                                placeholder="Description"
                              />
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setEditModalOpen(false)
                                    setEditingPlan(null)
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() => {
                                    const updatedPlans = mealPlans.map((p) =>
                                      p.id === editingPlan.id ? editingPlan : p
                                    )
                                    setmealPlans(updatedPlans)

                                    // Also update selectedPlan if needed
                                    if (selectedPlan?.id === editingPlan.id) {
                                      setSelectedPlan(editingPlan)
                                    }

                                    setEditModalOpen(false)
                                    setEditingPlan(null)
                                  }}
                                >
                                  Save Changes
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>


                    <Button variant="ghost" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const updatedPlans = mealPlans.filter((p) => p.id !== plan.id)
                        setmealPlans(updatedPlans)

                        // Deselect the deleted plan if it's selected
                        if (selectedPlan?.id === plan.id) {
                          setSelectedPlan(updatedPlans[0] || null)
                        }
                      }}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
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

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const updatedMeals = selectedPlan.meals.filter((m) => m.id !== meal.id)

                              const updatedNutrition = calculateNutritionFromMeals(updatedMeals)

                              const updatedPlan = {
                                ...selectedPlan,
                                meals: updatedMeals,
                                ...updatedNutrition, // overwrite calories, protein, carbs, fat
                              }

                              const updatedPlans = mealPlans.map((plan) =>
                                plan.id === selectedPlan.id ? updatedPlan : plan
                              )

                              setmealPlans(updatedPlans)
                              setSelectedPlan(updatedPlan)
                            }}
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingMeal({ ...meal })
                              setOpenEditMeal(true)
                            }}
                          >
                            <Edit className="h-4 w-4 text-blue-500" />
                          </Button>



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
              <div className="pt-4 text-right">
        <Button className="bg-gradient-to-r from-green-500 to-blue-600" onClick={() => setOpenAddMeal(true)}>+ Add Meal</Button>

      </div>
      <Dialog open={openAddMeal} onOpenChange={setOpenAddMeal}>
            <DialogContent>
              <DialogHeader>
            <DialogTitle>Add New Meal</DialogTitle>
            <DialogDescription>Enter meal and food details below</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-4">
            <div className="space-y-1">
              <Label htmlFor="meal-name">Meal Name</Label>
              <Input
                id="meal-name"
                value={newMealName}
                onChange={(e) => setNewMealName(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="meal-time">Time</Label>
              <Input
                id="meal-time"
                type="time"
                value={newMealTime}
                onChange={(e) => setNewMealTime(e.target.value)}
              />
            </div>

            <Separator />
            <h4 className="text-sm font-medium">Add Foods</h4>
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="Food Name"
                value={currentFood.name}
                onChange={(e) => setCurrentFood({ ...currentFood, name: e.target.value })}
              />
              <Input
                placeholder="Amount (e.g. 1 cup)"
                value={currentFood.amount}
                onChange={(e) => setCurrentFood({ ...currentFood, amount: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Calories"
                value={currentFood.calories}
                onChange={(e) => setCurrentFood({ ...currentFood, calories: String(+e.target.value) })}
              />
              <Input
                type="number"
                placeholder="Protein (g)"
                value={currentFood.protein}
                onChange={(e) => setCurrentFood({ ...currentFood, protein: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Carbs (g)"
                value={currentFood.carbs}
                onChange={(e) => setCurrentFood({ ...currentFood, carbs: String(+e.target.value) })}
              />
              <Input
                type="number"
                placeholder="Fat (g)"
                value={currentFood.fat}
                onChange={(e) => setCurrentFood({ ...currentFood, fat: String(+e.target.value) })}
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (currentFood.name) {
                  setNewFoods([...newFoods, currentFood])
                  setCurrentFood({ name: "", amount: "", calories: "", protein: "", carbs: "", fat: "" })
                }
              }}
            >
              + Add Food
            </Button>

            {newFoods.length > 0 && (
              <div className="mt-4 space-y-2 text-sm">
                <h5 className="font-medium">Foods Added:</h5>
                {newFoods.map((food, index) => (
                  <div key={index} className="flex justify-between text-muted-foreground">
                    <span>{food.name} - {food.amount}</span>
                    <span>{food.calories} kcal</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end pt-4">
              <Button
                onClick={() => {
                  const newMeal = {
                    id: Date.now(),
                    name: newMealName,
                    time: newMealTime,
                    foods: newFoods.map((food) => ({
                      ...food,
                      calories: Number(food.calories),
                      protein: Number(food.protein),
                      carbs: Number(food.carbs),
                      fat: Number(food.fat),
                    })),
                  }

                  // const updatedPlan = {
                  //   ...selectedPlan,
                  //   meals: [...selectedPlan.meals, newMeal],
                  // }
                  const updatedMeals = [...selectedPlan.meals, newMeal]

                      // Calculate totals from updated meals
                      const totalCalories = updatedMeals.reduce(
                        (sum, meal) => sum + meal.foods.reduce((mSum, food) => mSum + Number(food.calories), 0),
                        0
                      )
                      const totalProtein = updatedMeals.reduce(
                        (sum, meal) => sum + meal.foods.reduce((mSum, food) => mSum + Number(food.protein), 0),
                        0
                      )
                      const totalCarbs = updatedMeals.reduce(
                        (sum, meal) => sum + meal.foods.reduce((mSum, food) => mSum + Number(food.carbs), 0),
                        0
                      )
                      const totalFat = updatedMeals.reduce(
                        (sum, meal) => sum + meal.foods.reduce((mSum, food) => mSum + Number(food.fat), 0),
                        0
                      )

                      const updatedPlan = {
                        ...selectedPlan,
                        meals: updatedMeals,
                        calories: totalCalories,
                        protein: totalProtein,
                        carbs: totalCarbs,
                        fat: totalFat,
                      }


                              const updatedPlans = mealPlans.map((plan) =>
                                plan.id === selectedPlan.id ? updatedPlan : plan
                              )

                  setmealPlans(updatedPlans)
                  setSelectedPlan(updatedPlan)

                  // Reset dialog state
                  setNewMealName("")
                  setNewMealTime("")
                  setNewFoods([])
                  setCurrentFood({ name: "", amount: "", calories: "", protein: "", carbs: "", fat: "" })
                  setOpenAddMeal(false)
                }}
              >
                Save Meal
              </Button>
            </div>
          </div>

            </DialogContent>
</Dialog>

{/* edit meeal dialog */}
            <Dialog open={openEditMeal} onOpenChange={setOpenEditMeal} >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Meal</DialogTitle>
                  <DialogDescription>Modify meal name, time, or foods.</DialogDescription>
                </DialogHeader>

                {editingMeal && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <Label>Meal Name</Label>
                      <Input
                        value={editingMeal.name}
                        onChange={(e) => setEditingMeal({ ...editingMeal, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Time</Label>
                      <Input
                        type="time"
                        value={editingMeal.time}
                        onChange={(e) => setEditingMeal({ ...editingMeal, time: e.target.value })}
                      />
                    </div>

                    <Separator />
                    <h4 className="text-sm font-medium">Foods</h4>
                    <div className="overflow-y-scroll max-h-96" >
                    {editingMeal.foods.map((food: any, index: number) => (
                      <div key={index} className="grid grid-cols-6 gap-2 items-center text-sm">
                        <Input
                          value={food.name}
                          onChange={(e) => {
                            const newFoods = [...editingMeal.foods]
                            newFoods[index].name = e.target.value
                            setEditingMeal({ ...editingMeal, foods: newFoods })
                          }}
                          placeholder="Name"
                        />
                        <Input
                          value={food.amount}
                          onChange={(e) => {
                            const newFoods = [...editingMeal.foods]
                            newFoods[index].amount = e.target.value
                            setEditingMeal({ ...editingMeal, foods: newFoods })
                          }}
                          placeholder="Amount"
                        />
                        <Input
                          type="number"
                          value={food.calories}
                          onChange={(e) => {
                            const newFoods = [...editingMeal.foods]
                            newFoods[index].calories = Number(e.target.value)
                            setEditingMeal({ ...editingMeal, foods: newFoods })
                          }}
                          placeholder="Calories"
                        />
                        <Input
                          type="number"
                          value={food.protein}
                          onChange={(e) => {
                            const newFoods = [...editingMeal.foods]
                            newFoods[index].protein = Number(e.target.value)
                            setEditingMeal({ ...editingMeal, foods: newFoods })
                          }}
                          placeholder="Protein"
                        />
                        <Input
                          type="number"
                          value={food.carbs}
                          onChange={(e) => {
                            const newFoods = [...editingMeal.foods]
                            newFoods[index].carbs = Number(e.target.value)
                            setEditingMeal({ ...editingMeal, foods: newFoods })
                          }}
                          placeholder="Carbs"
                        />
                        <Input
                          type="number"
                          value={food.fat}
                          onChange={(e) => {
                            const newFoods = [...editingMeal.foods]
                            newFoods[index].fat = Number(e.target.value)
                            setEditingMeal({ ...editingMeal, foods: newFoods })
                          }}
                          placeholder="Fat"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newFoods = editingMeal.foods.filter((_, i) => i !== index)
                            setEditingMeal({ ...editingMeal, foods: newFoods })
                          }}
                        >
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newFood = {
                          name: "",
                          amount: "",
                          calories: 0,
                          protein: 0,
                          carbs: 0,
                          fat: 0,
                        }
                        setEditingMeal({ ...editingMeal, foods: [...editingMeal.foods, newFood] })
                      }}
                    >
                      + Add Food
                    </Button>

                    <div className="flex justify-end pt-4 gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setOpenEditMeal(false)
                          setEditingMeal(null)
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          const updatedMeals = selectedPlan.meals.map((m) =>
                            m.id === editingMeal.id ? editingMeal : m
                          )

                          const updatedNutrition = {
                            calories: updatedMeals.reduce(
                              (sum, meal) =>
                                sum + meal.foods.reduce((fSum, f) => fSum + Number(f.calories), 0),
                              0
                            ),
                            protein: updatedMeals.reduce(
                              (sum, meal) =>
                                sum + meal.foods.reduce((fSum, f) => fSum + Number(f.protein), 0),
                              0
                            ),
                            carbs: updatedMeals.reduce(
                              (sum, meal) =>
                                sum + meal.foods.reduce((fSum, f) => fSum + Number(f.carbs), 0),
                              0
                            ),
                            fat: updatedMeals.reduce(
                              (sum, meal) =>
                                sum + meal.foods.reduce((fSum, f) => fSum + Number(f.fat), 0),
                              0
                            ),
                          }

                          const updatedPlan = {
                            ...selectedPlan,
                            meals: updatedMeals,
                            ...updatedNutrition,
                          }

                          const updatedPlans = mealPlans.map((plan) =>
                            plan.id === selectedPlan.id ? updatedPlan : plan
                          )

                          setmealPlans(updatedPlans)
                          setSelectedPlan(updatedPlan)
                          setOpenEditMeal(false)
                          setEditingMeal(null)
                        }}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>

    
            </CardContent>
          </Card>
        </TabsContent>


        {/* other tabscontent */}
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
