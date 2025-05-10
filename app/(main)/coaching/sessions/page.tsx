"use client"

import { useState } from "react"
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  MessageSquare,
  Plus,
  Search,
  Star,
  Video,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { format } from "date-fns"

// Sample coaches data
const coaches = [
  {
    id: 1,
    name: "Sarah Johnson",
    specialty: "Nutrition Coach",
    experience: "8 years",
    rating: 4.9,
    reviews: 124,
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Certified nutritionist specializing in weight management and sports nutrition. I help clients develop sustainable eating habits for long-term success.",
    price: 75,
    availability: ["Mon", "Wed", "Fri"],
  },
  {
    id: 2,
    name: "Mike Peterson",
    specialty: "Strength Coach",
    experience: "12 years",
    rating: 4.8,
    reviews: 98,
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Former competitive powerlifter with over a decade of coaching experience. I specialize in strength training and athletic performance.",
    price: 85,
    availability: ["Tue", "Thu", "Sat"],
  },
  {
    id: 3,
    name: "Jennifer Lee",
    specialty: "Yoga & Mobility",
    experience: "6 years",
    rating: 4.7,
    reviews: 76,
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Certified yoga instructor and mobility specialist. I help clients improve flexibility, reduce pain, and enhance overall movement quality.",
    price: 65,
    availability: ["Mon", "Tue", "Thu", "Sun"],
  },
  {
    id: 4,
    name: "David Wilson",
    specialty: "HIIT & Conditioning",
    experience: "10 years",
    rating: 4.9,
    reviews: 112,
    avatar: "/placeholder.svg?height=200&width=200",
    bio: "Specializing in high-intensity interval training and metabolic conditioning. I help clients maximize fat loss and improve cardiovascular fitness.",
    price: 80,
    availability: ["Wed", "Fri", "Sat", "Sun"],
  },
]

// Sample upcoming sessions
const upcomingSessions = [
  {
    id: 1,
    coach: coaches[0],
    date: "May 12, 2024",
    time: "10:00 AM",
    duration: "45 minutes",
    type: "Video Call",
    status: "Confirmed",
  },
  {
    id: 2,
    coach: coaches[1],
    date: "May 15, 2024",
    time: "2:30 PM",
    duration: "60 minutes",
    type: "In-person",
    status: "Confirmed",
  },
]

// Sample past sessions
const pastSessions = [
  {
    id: 1,
    coach: coaches[0],
    date: "May 1, 2024",
    time: "11:00 AM",
    duration: "45 minutes",
    type: "Video Call",
    status: "Completed",
    notes: "Discussed nutrition plan adjustments and progress on weight loss goals.",
  },
  {
    id: 2,
    coach: coaches[1],
    date: "April 28, 2024",
    time: "3:00 PM",
    duration: "60 minutes",
    type: "In-person",
    status: "Completed",
    notes: "Focused on squat form and introduced new accessory exercises for leg day.",
  },
  {
    id: 3,
    coach: coaches[2],
    date: "April 20, 2024",
    time: "9:00 AM",
    duration: "45 minutes",
    type: "Video Call",
    status: "Completed",
    notes: "Worked on mobility routine for hip flexibility and lower back pain relief.",
  },
]

export default function CoachingSessionsPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [selectedCoach, setSelectedCoach] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Filter coaches based on search term
  const filteredCoaches = coaches.filter(
    (coach) =>
      coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coach.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Coaching Sessions</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Book New Session
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="past">Past Sessions</TabsTrigger>
          <TabsTrigger value="coaches">Find Coaches</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingSessions.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {upcomingSessions.map((session) => (
                <Card key={session.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge>{session.status}</Badge>
                      <Badge variant="outline">{session.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={session.coach.avatar || "/placeholder.svg"} alt={session.coach.name} />
                        <AvatarFallback>{session.coach.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-medium">{session.coach.name}</h3>
                        <p className="text-sm text-muted-foreground">{session.coach.specialty}</p>
                        <div className="mt-2 flex flex-col gap-1 text-sm">
                          <div className="flex items-center">
                            <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                            {session.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            {session.time} ({session.duration})
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                    <Button size="sm">
                      {session.type === "Video Call" ? (
                        <>
                          <Video className="mr-2 h-4 w-4" />
                          Join Call
                        </>
                      ) : (
                        <>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Message
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <CalendarIcon className="mb-2 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-1 text-lg font-medium">No Upcoming Sessions</h3>
                <p className="mb-4 text-muted-foreground">You don't have any coaching sessions scheduled.</p>
                <Button>Book a Session</Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Session Calendar</CardTitle>
              <CardDescription>View and manage your upcoming coaching sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="md:w-1/2">
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm" onClick={() => setDate(new Date())}>
                      Today
                    </Button>
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="icon">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <div className="text-sm font-medium">{format(date, "MMMM yyyy")}</div>
                      <Button variant="outline" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      className="rounded-md border"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <h3 className="mb-4 font-medium">{format(date, "EEEE, MMMM do, yyyy")}</h3>
                  {upcomingSessions.some((session) => session.date === format(date, "MMMM d, yyyy")) ? (
                    <div className="space-y-2">
                      {upcomingSessions
                        .filter((session) => session.date === format(date, "MMMM d, yyyy"))
                        .map((session) => (
                          <Card key={session.id}>
                            <CardContent className="p-4 flex items-center gap-4">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                {session.type === "Video Call" ? (
                                  <Video className="h-5 w-5 text-primary" />
                                ) : (
                                  <CalendarIcon className="h-5 w-5 text-primary" />
                                )}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{session.coach.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {session.time} • {session.duration}
                                </p>
                              </div>
                              <Badge variant="outline">{session.type}</Badge>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                      <CalendarIcon className="mb-2 h-10 w-10 text-muted-foreground" />
                      <h3 className="mb-1 font-medium">No Sessions</h3>
                      <p className="mb-4 text-sm text-muted-foreground">No coaching sessions scheduled for this day.</p>
                      <Button size="sm">Book for This Day</Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastSessions.length > 0 ? (
            <div className="space-y-4">
              {pastSessions.map((session) => (
                <Card key={session.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{session.status}</Badge>
                      <div className="text-sm text-muted-foreground">
                        {session.date} • {session.time}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={session.coach.avatar || "/placeholder.svg"} alt={session.coach.name} />
                        <AvatarFallback>{session.coach.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-medium">{session.coach.name}</h3>
                        <p className="text-sm text-muted-foreground">{session.coach.specialty}</p>
                        <div className="mt-2">
                          <h4 className="text-sm font-medium">Session Notes</h4>
                          <p className="text-sm text-muted-foreground">{session.notes}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button size="sm">Book Again</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <CalendarIcon className="mb-2 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-1 text-lg font-medium">No Past Sessions</h3>
                <p className="mb-4 text-muted-foreground">You haven't had any coaching sessions yet.</p>
                <Button>Book Your First Session</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="coaches" className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search coaches..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCoaches.map((coach) => (
              <Card key={coach.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={coach.avatar || "/placeholder.svg"} alt={coach.name} />
                      <AvatarFallback>{coach.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="mt-4 font-medium">{coach.name}</h3>
                    <p className="text-sm text-muted-foreground">{coach.specialty}</p>
                    <div className="mt-2 flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <span className="text-sm font-medium">{coach.rating}</span>
                      <span className="text-xs text-muted-foreground">({coach.reviews} reviews)</span>
                    </div>
                    <div className="mt-4 text-sm text-muted-foreground">{coach.experience} experience</div>
                    <div className="mt-2 text-sm font-medium">${coach.price} per session</div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => setSelectedCoach(coach)}>
                        View Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      {selectedCoach && (
                        <>
                          <DialogHeader>
                            <DialogTitle>{selectedCoach.name}</DialogTitle>
                            <DialogDescription>{selectedCoach.specialty}</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4 md:grid-cols-2">
                            <div className="flex flex-col items-center">
                              <Avatar className="h-32 w-32">
                                <AvatarImage
                                  src={selectedCoach.avatar || "/placeholder.svg"}
                                  alt={selectedCoach.name}
                                />
                                <AvatarFallback>{selectedCoach.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="mt-4 flex items-center gap-1">
                                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                                <span className="text-sm font-medium">{selectedCoach.rating}</span>
                                <span className="text-xs text-muted-foreground">({selectedCoach.reviews} reviews)</span>
                              </div>
                              <div className="mt-2 text-sm text-muted-foreground">
                                {selectedCoach.experience} experience
                              </div>
                              <div className="mt-2 text-sm font-medium">${selectedCoach.price} per session</div>
                              <div className="mt-4">
                                <h4 className="mb-2 text-sm font-medium">Availability</h4>
                                <div className="flex gap-1">
                                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                    <Badge
                                      key={day}
                                      variant={selectedCoach.availability.includes(day) ? "default" : "outline"}
                                      className="px-2 py-1"
                                    >
                                      {day}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3 className="mb-2 font-medium">About</h3>
                              <p className="text-sm text-muted-foreground">{selectedCoach.bio}</p>

                              <h3 className="mb-2 mt-4 font-medium">Specialties</h3>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline">Weight Management</Badge>
                                <Badge variant="outline">Strength Training</Badge>
                                <Badge variant="outline">Nutrition Planning</Badge>
                                <Badge variant="outline">Athletic Performance</Badge>
                              </div>

                              <h3 className="mb-2 mt-4 font-medium">Certifications</h3>
                              <ul className="ml-4 list-disc text-sm text-muted-foreground">
                                <li>Certified Strength and Conditioning Specialist (CSCS)</li>
                                <li>Precision Nutrition Level 2 Coach</li>
                                <li>Functional Movement Screen (FMS) Certified</li>
                              </ul>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline">Message</Button>
                            <Button>Book Session</Button>
                          </DialogFooter>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button>Book Session</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
