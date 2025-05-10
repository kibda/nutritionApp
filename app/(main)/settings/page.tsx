"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Globe, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
    }, 1000)
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <Button className="bg-gradient-to-r from-green-500 to-blue-600" onClick={handleSave} disabled={isSaving}>
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  defaultValue="Fitness enthusiast focused on strength training and nutrition. Working towards my first marathon."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fitness Profile</CardTitle>
              <CardDescription>Update your fitness information and goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  <div className="flex items-center gap-2">
                    <Input id="height" type="number" defaultValue="5" className="w-20" />
                    <span>ft</span>
                    <Input id="heightInches" type="number" defaultValue="10" className="w-20" />
                    <span>in</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight</Label>
                  <div className="flex items-center gap-2">
                    <Input id="weight" type="number" defaultValue="175" />
                    <span>lbs</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" defaultValue="32" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fitnessLevel">Fitness Level</Label>
                  <Select defaultValue="intermediate">
                    <SelectTrigger>
                      <SelectValue placeholder="Select fitness level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="athlete">Athlete</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="primaryGoal">Primary Goal</Label>
                  <Select defaultValue="strength">
                    <SelectTrigger>
                      <SelectValue placeholder="Select primary goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weightLoss">Weight Loss</SelectItem>
                      <SelectItem value="muscleGain">Muscle Gain</SelectItem>
                      <SelectItem value="strength">Strength</SelectItem>
                      <SelectItem value="endurance">Endurance</SelectItem>
                      <SelectItem value="flexibility">Flexibility</SelectItem>
                      <SelectItem value="generalFitness">General Fitness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fitnessInterests">Fitness Interests</Label>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                  {["Weight Training", "Running", "Yoga", "HIIT", "Cycling", "Swimming", "Pilates", "CrossFit"].map(
                    (interest) => (
                      <div key={interest} className="flex items-center gap-2 rounded-lg border p-2">
                        <input
                          type="checkbox"
                          id={interest}
                          className="h-4 w-4"
                          defaultChecked={interest === "Weight Training" || interest === "Running"}
                        />
                        <Label htmlFor={interest} className="cursor-pointer">
                          {interest}
                        </Label>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="johndoe_fitness" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="america_new_york">
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="america_new_york">America/New York (UTC-5)</SelectItem>
                    <SelectItem value="america_los_angeles">America/Los Angeles (UTC-8)</SelectItem>
                    <SelectItem value="europe_london">Europe/London (UTC+0)</SelectItem>
                    <SelectItem value="asia_tokyo">Asia/Tokyo (UTC+9)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Customize the appearance of the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Color Theme</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-4 hover:bg-muted">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-blue-600" />
                    <span className="text-sm">Default</span>
                  </div>
                  <div className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-4 hover:bg-muted">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                    <span className="text-sm">Vibrant</span>
                  </div>
                  <div className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-4 hover:bg-muted">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500" />
                    <span className="text-sm">Energetic</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Switch between light and dark mode</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Reduced Motion</Label>
                  <p className="text-sm text-muted-foreground">Reduce the amount of animations</p>
                </div>
                <Switch />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Font Size</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">A</span>
                  <input type="range" min="1" max="5" defaultValue="3" className="w-full" />
                  <span className="text-lg">A</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dashboard Layout</CardTitle>
              <CardDescription>Customize your dashboard layout</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Compact View</Label>
                  <p className="text-sm text-muted-foreground">Display more information in less space</p>
                </div>
                <Switch />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Default Dashboard Tab</Label>
                <Select defaultValue="overview">
                  <SelectTrigger>
                    <SelectValue placeholder="Select default tab" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overview">Overview</SelectItem>
                    <SelectItem value="nutrition">Nutrition</SelectItem>
                    <SelectItem value="workouts">Workouts</SelectItem>
                    <SelectItem value="coaching">Coaching</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Widget Visibility</Label>
                <div className="space-y-2">
                  {[
                    "Weekly Progress Chart",
                    "Upcoming Sessions",
                    "Recent Achievements",
                    "Workout Schedule",
                    "Nutrition Summary",
                  ].map((widget) => (
                    <div key={widget} className="flex items-center justify-between rounded-lg border p-2">
                      <span>{widget}</span>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-base">Notification Types</Label>
                <div className="space-y-2">
                  {[
                    {
                      title: "Workout Reminders",
                      description: "Reminders for scheduled workouts",
                      defaultChecked: true,
                    },
                    {
                      title: "Session Reminders",
                      description: "Reminders for upcoming coaching sessions",
                      defaultChecked: true,
                    },
                    {
                      title: "Goal Updates",
                      description: "Updates on your progress towards goals",
                      defaultChecked: true,
                    },
                    {
                      title: "Coach Messages",
                      description: "Messages from your coaches",
                      defaultChecked: true,
                    },
                    {
                      title: "Achievement Unlocked",
                      description: "Notifications when you earn achievements",
                      defaultChecked: true,
                    },
                    {
                      title: "Nutrition Reminders",
                      description: "Reminders to log your meals",
                      defaultChecked: false,
                    },
                    {
                      title: "New Features",
                      description: "Updates about new platform features",
                      defaultChecked: false,
                    },
                    {
                      title: "Promotional Content",
                      description: "Special offers and promotions",
                      defaultChecked: false,
                    },
                  ].map((notification) => (
                    <div key={notification.title} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <Label>{notification.title}</Label>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                      </div>
                      <Switch defaultChecked={notification.defaultChecked} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Schedule</CardTitle>
              <CardDescription>Set your preferred notification times</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Quiet Hours</Label>
                  <p className="text-sm text-muted-foreground">Don't send notifications during these hours</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Start Time</Label>
                  <Input type="time" defaultValue="22:00" />
                </div>
                <div className="space-y-2">
                  <Label>End Time</Label>
                  <Input type="time" defaultValue="07:00" />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-base">Workout Reminder Time</Label>
                <p className="text-sm text-muted-foreground">How long before a workout to send a reminder</p>
                <Select defaultValue="30">
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes before</SelectItem>
                    <SelectItem value="30">30 minutes before</SelectItem>
                    <SelectItem value="60">1 hour before</SelectItem>
                    <SelectItem value="120">2 hours before</SelectItem>
                    <SelectItem value="1440">1 day before</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Manage your privacy preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-base">Profile Visibility</Label>
                <Select defaultValue="friends">
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public - Anyone can view your profile</SelectItem>
                    <SelectItem value="friends">Friends - Only your connections can view your profile</SelectItem>
                    <SelectItem value="private">Private - Only you can view your profile</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label className="text-base">Activity Sharing</Label>
                <div className="space-y-2">
                  {[
                    {
                      title: "Share Workouts",
                      description: "Allow others to see your completed workouts",
                      defaultChecked: true,
                    },
                    {
                      title: "Share Achievements",
                      description: "Allow others to see your achievements",
                      defaultChecked: true,
                    },
                    {
                      title: "Share Progress",
                      description: "Allow others to see your fitness progress",
                      defaultChecked: false,
                    },
                    {
                      title: "Share Nutrition",
                      description: "Allow others to see your nutrition data",
                      defaultChecked: false,
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <Label>{item.title}</Label>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <Switch defaultChecked={item.defaultChecked} />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Data Collection</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow us to collect anonymous usage data to improve the platform
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-base">Connected Services</Label>
                <div className="space-y-2">
                  {[
                    { name: "Apple Health", connected: true },
                    { name: "Google Fit", connected: false },
                    { name: "Fitbit", connected: false },
                    { name: "Strava", connected: true },
                  ].map((service) => (
                    <div key={service.name} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Globe className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {service.connected ? "Connected" : "Not connected"}
                          </p>
                        </div>
                      </div>
                      <Button variant={service.connected ? "destructive" : "outline"}>
                        {service.connected ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2">
              <div className="space-y-2">
                <h4 className="font-medium">Data Management</h4>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline">Export My Data</Button>
                  <Button variant="destructive">Delete My Account</Button>
                </div>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              <Button className="mt-2">Change Password</Button>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Button variant="outline">Enable</Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-base">Active Sessions</Label>
                <div className="space-y-2">
                  {[
                    {
                      device: "iPhone 13 Pro",
                      location: "New York, USA",
                      lastActive: "Active now",
                      current: true,
                    },
                    {
                      device: "MacBook Pro",
                      location: "New York, USA",
                      lastActive: "2 hours ago",
                      current: false,
                    },
                    {
                      device: "iPad Air",
                      location: "Boston, USA",
                      lastActive: "3 days ago",
                      current: false,
                    },
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{session.device}</span>
                          {session.current && <Badge>Current</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {session.location} • {session.lastActive}
                        </p>
                      </div>
                      {!session.current && <Button variant="ghost">Sign Out</Button>}
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-2">
                  Sign Out All Other Devices
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
