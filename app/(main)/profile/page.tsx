"use client"

import { useState } from "react"
import { Camera, Edit, Save, Activity, Heart, Weight, Calendar, Flame, Medal, Trophy, Apple, BarChart2, TrendingUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")
  
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Fitness Profile</h2>
          <p className="text-muted-foreground">View and manage your fitness journey</p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)} className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white">
          {isEditing ? (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </>
          )}
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-3">
          <CardHeader className="relative h-48 overflow-hidden p-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500" />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 bg-black/20 text-white hover:bg-black/30 hover:text-white"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="-mt-16 flex flex-col items-center">
            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
              <AvatarImage src="/placeholder.svg?height=128&width=128" alt="User" />
              <AvatarFallback className="bg-gradient-to-br from-blue-400 to-teal-400 text-white text-2xl">JD</AvatarFallback>
            </Avatar>
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-bold">John Doe</h3>
              <div className="flex items-center justify-center gap-2 mt-1">
                <Badge className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">Premium Member</Badge>
                <Badge variant="outline" className="border-blue-500 text-blue-500">Level 8</Badge>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="border-blue-300">Weight Loss</Badge>
              <Badge variant="outline" className="border-blue-300">Strength Training</Badge>
              <Badge variant="outline" className="border-blue-300">Running</Badge>
              <Badge variant="outline" className="border-blue-300">Nutrition</Badge>
              <Badge variant="outline" className="border-blue-300">Yoga</Badge>
            </div>
            <Separator className="my-4" />
            <div className="grid w-full grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-500">24</div>
                <div className="text-xs text-muted-foreground">Workouts</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-teal-500">8</div>
                <div className="text-xs text-muted-foreground">Achievements</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-500">14</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="w-full">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Daily Activity Goal</span>
                <span className="text-sm font-medium text-blue-500">78%</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full mt-4">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-950">
                <Heart className="h-5 w-5 text-pink-500" />
                <div>
                  <div className="text-sm font-medium">68 bpm</div>
                  <div className="text-xs text-muted-foreground">Resting HR</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-teal-50 dark:bg-teal-950">
                <Flame className="h-5 w-5 text-orange-500" />
                <div>
                  <div className="text-sm font-medium">2,140</div>
                  <div className="text-xs text-muted-foreground">Calories</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pb-4">
            <Button variant="outline" className="text-blue-500 border-blue-200 hover:border-blue-500 hover:bg-blue-50">View Detailed Stats</Button>
          </CardFooter>
        </Card>
        
        <div className="md:col-span-4 space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="body">Body Metrics</TabsTrigger>
              <TabsTrigger value="fitness">Fitness Goals</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Manage your personal details and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="John Doe" disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input id="dob" type="date" defaultValue="1990-01-15" disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select defaultValue="male" disabled={!isEditing}>
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="nonbinary">Non-binary</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="activity">Activity Level</Label>
                      <Select defaultValue="moderate" disabled={!isEditing}>
                        <SelectTrigger id="activity">
                          <SelectValue placeholder="Select activity level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedentary">Sedentary</SelectItem>
                          <SelectItem value="light">Lightly Active</SelectItem>
                          <SelectItem value="moderate">Moderately Active</SelectItem>
                          <SelectItem value="very">Very Active</SelectItem>
                          <SelectItem value="extreme">Extremely Active</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="body" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Body Metrics</CardTitle>
                  <CardDescription>Track your physical measurements and progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="height">Height</Label>
                      <div className="flex gap-2">
                        <Input id="height" type="number" defaultValue="5" disabled={!isEditing} />
                        <Input id="height-in" type="number" defaultValue="10" disabled={!isEditing} />
                        <Select defaultValue="imperial" disabled={!isEditing}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="imperial">ft/in</SelectItem>
                            <SelectItem value="metric">cm</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Current Weight</Label>
                      <div className="flex gap-2">
                        <Input id="weight" type="number" defaultValue="175" disabled={!isEditing} />
                        <Select defaultValue="imperial" disabled={!isEditing}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="imperial">lbs</SelectItem>
                            <SelectItem value="metric">kg</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="target-weight">Target Weight</Label>
                      <Input id="target-weight" type="number" defaultValue="165" disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="body-fat">Body Fat %</Label>
                      <Input id="body-fat" type="number" defaultValue="18.5" disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bmi">BMI</Label>
                      <Input id="bmi" type="number" defaultValue="24.2" disabled readOnly />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Body Measurements</Label>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="chest">Chest (in)</Label>
                        <Input id="chest" type="number" defaultValue="42" disabled={!isEditing} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="waist">Waist (in)</Label>
                        <Input id="waist" type="number" defaultValue="34" disabled={!isEditing} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hips">Hips (in)</Label>
                        <Input id="hips" type="number" defaultValue="38" disabled={!isEditing} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="thighs">Thighs (in)</Label>
                        <Input id="thighs" type="number" defaultValue="22" disabled={!isEditing} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="biceps">Biceps (in)</Label>
                        <Input id="biceps" type="number" defaultValue="14" disabled={!isEditing} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="neck">Neck (in)</Label>
                        <Input id="neck" type="number" defaultValue="16" disabled={!isEditing} />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Measurement History</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="fitness" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Fitness Goals & Metrics</CardTitle>
                  <CardDescription>Set your fitness goals and view your current stats</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Primary Fitness Goal</Label>
                    <RadioGroup defaultValue="weight-loss" disabled={!isEditing} className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="weight-loss" id="weight-loss" />
                        <Label htmlFor="weight-loss" className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-blue-500" />
                          Weight Loss
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="muscle-gain" id="muscle-gain" />
                        <Label htmlFor="muscle-gain" className="flex items-center gap-2">
                          <Weight className="h-4 w-4 text-blue-500" />
                          Muscle Gain
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="endurance" id="endurance" />
                        <Label htmlFor="endurance" className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-blue-500" />
                          Endurance
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="general-fitness" id="general-fitness" />
                        <Label htmlFor="general-fitness" className="flex items-center gap-2">
                          <Heart className="h-4 w-4 text-blue-500" />
                          General Fitness
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Label>Daily Step Goal</Label>
                      <span className="text-blue-500 font-medium">10,000 steps</span>
                    </div>
                    <Slider defaultValue={[10000]} max={20000} step={500} disabled={!isEditing} />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <Label>Weekly Workout Goal</Label>
                      <span className="text-blue-500 font-medium">5 days</span>
                    </div>
                    <Slider defaultValue={[5]} max={7} step={1} disabled={!isEditing} />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <Label>Fitness Benchmarks</Label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="benchpress">Bench Press Max (lbs)</Label>
                        <Input id="benchpress" type="number" defaultValue="185" disabled={!isEditing} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="squat">Squat Max (lbs)</Label>
                        <Input id="squat" type="number" defaultValue="225" disabled={!isEditing} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deadlift">Deadlift Max (lbs)</Label>
                        <Input id="deadlift" type="number" defaultValue="275" disabled={!isEditing} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mile-time">Mile Run Time (min:sec)</Label>
                        <Input id="mile-time" type="text" defaultValue="8:30" disabled={!isEditing} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vo2max">VO2 Max (ml/kg/min)</Label>
                      <Input id="vo2max" type="number" defaultValue="42" disabled={!isEditing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="restinghr">Resting Heart Rate (bpm)</Label>
                      <Input id="restinghr" type="number" defaultValue="68" disabled={!isEditing} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="nutrition" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Nutrition & Diet</CardTitle>
                  <CardDescription>Configure your nutrition preferences and goals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Diet Preference</Label>
                    <Select defaultValue="balanced" disabled={!isEditing}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select diet preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="balanced">Balanced</SelectItem>
                        <SelectItem value="keto">Ketogenic</SelectItem>
                        <SelectItem value="lowcarb">Low Carb</SelectItem>
                        <SelectItem value="vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="vegan">Vegan</SelectItem>
                        <SelectItem value="paleo">Paleo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Daily Calorie Target</Label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tdee">TDEE (Maintenance)</Label>
                        <Input id="tdee" type="number" defaultValue="2450" disabled readOnly />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="target-calories">Target Calories</Label>
                        <Input id="target-calories" type="number" defaultValue="2100" disabled={!isEditing} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Macronutrient Goals</Label>
                    <div className="grid gap-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Protein (40%)</Label>
                          <span className="text-blue-500 font-medium">210g</span>
                        </div>
                        <Slider defaultValue={[40]} max={100} step={5} disabled={!isEditing} className="bg-blue-100" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Carbohydrates (30%)</Label>
                          <span className="text-blue-500 font-medium">158g</span>
                        </div>
                        <Slider defaultValue={[30]} max={100} step={5} disabled={!isEditing} className="bg-blue-100" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Fat (30%)</Label>
                          <span className="text-blue-500 font-medium">70g</span>
                        </div>
                        <Slider defaultValue={[30]} max={100} step={5} disabled={!isEditing} className="bg-blue-100" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Food Allergies & Restrictions</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="border-red-200 bg-red-50 text-red-500">Peanuts</Badge>
                      <Badge variant="outline" className="border-red-200 bg-red-50 text-red-500">Dairy</Badge>
                      {isEditing && (
                        <Button variant="outline" size="sm" className="h-6">
                          + Add
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Water Intake Goal</Label>
                    <div className="flex items-center gap-4">
                      <Slider defaultValue={[8]} max={16} step={1} disabled={!isEditing} className="flex-1" />
                      <span className="text-blue-500 font-medium whitespace-nowrap">8 glasses/day</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Nutrition History</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-500" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Weight className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Upper Body Workout Completed</p>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">45 minutes · 320 calories · 4 exercises</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Apple className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Logged Meal: Lunch</p>
                      <span className="text-xs text-muted-foreground">4 hours ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">650 calories · 45g protein · 30g carbs · 20g fat</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <BarChart2 className="h-4 w-4 text-orange-500" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">New Weight Recorded</p>
                      <span className="text-xs text-muted-foreground">Yesterday</span>
                    </div>
                    <p className="text-sm text-muted-foreground">175 lbs · Down 0.5 lbs from last week</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Medal className="h-4 w-4 text-purple-500" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Achievement Unlocked: Consistency</p>
                      <span className="text-xs text-muted-foreground">2 days ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Completed workouts 3 days in a row</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full text-blue-500">View All Activity</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}