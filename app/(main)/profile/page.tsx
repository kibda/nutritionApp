"use client"

import { useState } from "react"
import { Camera, Edit, Save } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
        <Button onClick={() => setIsEditing(!isEditing)}>
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
          <CardHeader className="relative h-40 overflow-hidden p-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-400" />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 bg-black/20 text-white hover:bg-black/30 hover:text-white"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="-mt-12 flex flex-col items-center">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold">John Doe</h3>
              <p className="text-sm text-muted-foreground">Premium Member</p>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Badge variant="outline">Weight Loss</Badge>
              <Badge variant="outline">Strength Training</Badge>
              <Badge variant="outline">Nutrition</Badge>
            </div>
            <Separator className="my-4" />
            <div className="grid w-full grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold">24</div>
                <div className="text-xs text-muted-foreground">Workouts</div>
              </div>
              <div>
                <div className="text-xl font-bold">8</div>
                <div className="text-xs text-muted-foreground">Achievements</div>
              </div>
              <div>
                <div className="text-xl font-bold">14</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Manage your personal details and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="John Doe" disabled={!isEditing} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" disabled={!isEditing} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
