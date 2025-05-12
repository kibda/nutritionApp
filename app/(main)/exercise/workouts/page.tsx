'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea" 
import { Badge } from "@/components/ui/badge"
import { Clock, Edit, Plus, Dumbbell, CalendarIcon } from "lucide-react"

export default function WorkoutTabs() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [workoutData, setWorkoutData] = useState({
    id: '',
    title: '',
    description: '',
    exercises: [] as string[],
  })
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setEditDialogOpen] = useState(false)
  const [workouts, setWorkouts] = useState([
    { id: 'push-day', title: 'Push Day', description: 'Upper body workout focusing on chest, shoulders, and triceps.', exercises: ['Push'] },
    { id: 'pull-day', title: 'Pull Day', description: 'Upper body workout focusing on back and biceps.', exercises: ['Pull'] },
    { id: 'leg-day', title: 'Leg Day', description: 'Lower body workout focusing on quads, hamstrings, and glutes.', exercises: ['Legs'] },
  ])

  const exerciseTypes = ['Push', 'Pull', 'Legs', 'Core', 'Cardio']
  
  // Exercise type color mapping
  const exerciseColorMap = {
    Push: 'bg-blue-100 text-blue-800',
    Pull: 'bg-purple-100 text-purple-800',
    Legs: 'bg-green-100 text-green-800',
    Core: 'bg-amber-100 text-amber-800',
    Cardio: 'bg-red-100 text-red-800'
  }

  const handleCreateWorkout = () => {
    const newWorkout = {
      id: Math.random().toString(36).substr(2, 9),
      title: workoutData.title,
      description: workoutData.description,
      exercises: workoutData.exercises,
    }

    setWorkouts([...workouts, newWorkout])
    setCreateDialogOpen(false)
    setWorkoutData({ id: '', title: '', description: '', exercises: [] })
  }

  const handleEditWorkout = () => {
    const updatedWorkouts = workouts.map(workout =>
      workout.id === workoutData.id
        ? { ...workout, title: workoutData.title, description: workoutData.description, exercises: workoutData.exercises }
        : workout
    )
    setWorkouts(updatedWorkouts)
    setEditDialogOpen(false)
    setWorkoutData({ id: '', title: '', description: '', exercises: [] })
  }

  const openEditDialog = (workoutId: string) => {
    const workoutToEdit = workouts.find(workout => workout.id === workoutId)
    if (workoutToEdit) {
      setWorkoutData(workoutToEdit)
    }
    setEditDialogOpen(true)
  }

  const handleExerciseChange = (exercise: string) => {
    setWorkoutData((prevData) => {
      const isSelected = prevData.exercises.includes(exercise)
      const updatedExercises = isSelected
        ? prevData.exercises.filter(item => item !== exercise)  // Remove if already selected
        : [...prevData.exercises, exercise]  // Add if not selected

      return { ...prevData, exercises: updatedExercises }
    })
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 flex items-center">
        <Dumbbell className="mr-2" size={28} />
        Fitness Tracker
      </h1>
      
      <Tabs defaultValue="today" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList className="bg-gray-200">
            <TabsTrigger value="today" className="data-[state=active]:bg-white">
              Today's Workouts
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-white">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Calendar
            </TabsTrigger>
          </TabsList>
          <Button 
            onClick={() => setCreateDialogOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" /> Create Workout
          </Button>
        </div>
        
        <TabsContent value="today">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <Card key={workout.id} className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-t-lg pb-4">
                  <CardTitle className="text-xl font-bold text-gray-800">{workout.title}</CardTitle>
                  <CardDescription className="text-gray-600">{workout.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex items-center text-gray-600 mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Duration: 1h</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Exercise Focus:</p>
                    <div className="flex flex-wrap gap-2">
                      {workout.exercises.map((exercise) => (
                        <Badge key={exercise} className={`${exerciseColorMap[exercise as keyof typeof exerciseColorMap]} font-medium`}>
                          {exercise}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 rounded-b-lg">
                  <Button variant="outline" onClick={() => openEditDialog(workout.id)} className="w-full border-gray-300 hover:bg-gray-100">
                    <Edit className="w-4 h-4 mr-2" /> Edit Workout
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="calendar">
          <Card className="border-none shadow-md p-4">
            <CardHeader>
              <CardTitle className="text-xl">Workout Schedule</CardTitle>
              <CardDescription>Select a date to view or plan workouts</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar 
                mode="single" 
                selected={date} 
                onSelect={setDate} 
                className="rounded-md border" 
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Create Workout Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Create New Workout
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Workout Title</label>
                <Input
                  placeholder="e.g., Full Body HIIT"
                  value={workoutData.title}
                  onChange={(e) => setWorkoutData({ ...workoutData, title: e.target.value })}
                  className="border-gray-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Workout Description</label>
                <Textarea
                  placeholder="Describe your workout..."
                  value={workoutData.description}
                  onChange={(e) => setWorkoutData({ ...workoutData, description: e.target.value })}
                  className="border-gray-300 min-h-[80px]"
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-3">Select Exercise Types:</p>
                <div className="grid grid-cols-2 gap-2">
                  {exerciseTypes.map((exercise) => (
                    <div key={exercise} className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
                      <Checkbox
                        id={`create-${exercise}`}
                        checked={workoutData.exercises.includes(exercise)}
                        onCheckedChange={() => handleExerciseChange(exercise)}
                        className="data-[state=checked]:bg-indigo-600"
                      />
                      <label 
                        htmlFor={`create-${exercise}`}
                        className="text-sm font-medium cursor-pointer"
                      >
                        {exercise}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                onClick={handleCreateWorkout}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700"
              >
                Save Workout
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Workout Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center">
                <Edit className="w-5 h-5 mr-2" />
                Edit Workout
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Workout Title</label>
                <Input
                  placeholder="Workout Title"
                  value={workoutData.title}
                  onChange={(e) => setWorkoutData({ ...workoutData, title: e.target.value })}
                  className="border-gray-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Workout Description</label>
                <Textarea
                  placeholder="Workout Description"
                  value={workoutData.description}
                  onChange={(e) => setWorkoutData({ ...workoutData, description: e.target.value })}
                  className="border-gray-300 min-h-[80px]"
                />
              </div>
              <div>
                <p className="text-sm font-medium mb-3">Select Exercise Types:</p>
                <div className="grid grid-cols-2 gap-2">
                  {exerciseTypes.map((exercise) => (
                    <div key={exercise} className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
                      <Checkbox
                        id={`edit-${exercise}`}
                        checked={workoutData.exercises.includes(exercise)}
                        onCheckedChange={() => handleExerciseChange(exercise)}
                        className="data-[state=checked]:bg-indigo-600"
                      />
                      <label 
                        htmlFor={`edit-${exercise}`}
                        className="text-sm font-medium cursor-pointer"
                      >
                        {exercise}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button 
                onClick={handleEditWorkout}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Tabs>
    </div>
  )
}