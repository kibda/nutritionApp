"use client"

import { useState } from "react"
import { Search, Filter, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

// Static data for coaches
const coaches = [
  { id: 1, name: "John Doe", specialty: "Nutrition", availability: ["Mon 10 AM", "Wed 2 PM", "Fri 11 AM"] },
  { id: 2, name: "Jane Smith", specialty: "Fitness", availability: ["Tue 9 AM", "Thu 3 PM", "Sat 10 AM"] },
  { id: 3, name: "Alex Brown", specialty: "Yoga", availability: ["Mon 5 PM", "Wed 7 PM", "Fri 6 PM"] },
]

// Get unique specialties and days for filters
const specialties = [...new Set(coaches.map((coach) => coach.specialty))]
const days = [...new Set(coaches.flatMap((coach) => coach.availability.map((slot) => slot.split(" ")[0])))]

export default function CoachingSessionReservation() {
  const [searchTerm, setSearchTerm] = useState("")
  const [specialtyFilter, setSpecialtyFilter] = useState("")
  const [dayFilter, setDayFilter] = useState("")
  const [selectedCoach, setSelectedCoach] = useState<any>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("")
  const { toast } = useToast()

  // Filter coaches based on search term and filters
  const filteredCoaches = coaches.filter((coach) => {
    const matchesSearch =
      coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coach.specialty.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSpecialty = specialtyFilter === "" || coach.specialty === specialtyFilter

    const matchesDay = dayFilter === "" || coach.availability.some((slot) => slot.startsWith(dayFilter))

    return matchesSearch && matchesSpecialty && matchesDay
  })

  const handleReservation = () => {
    toast({
      title: "Session Reserved!",
      description: `You've booked a session with ${selectedCoach?.name} on ${selectedTimeSlot}`,
    })

    // Add a small delay before redirecting
    setTimeout(() => {
      window.location.href = "/BookingConfirmation"
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#008080] mb-8">Book a Coaching Session</h1>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Filter Panel */}
          <div className="w-full lg:w-1/4 space-y-4 bg-white p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <Filter className="h-5 w-5 text-[#008080]" />
              Filters
            </h2>

            <div className="space-y-2">
              <label className="text-sm font-medium">Specialty</label>
              <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Specialties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Day</label>
              <Select value={dayFilter} onValueChange={setDayFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Days</SelectItem>
                  {days.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => {
                setSpecialtyFilter("")
                setDayFilter("")
                setSearchTerm("")
              }}
            >
              Clear Filters
            </Button>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by coach name or specialty..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Coach List */}
            {filteredCoaches.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCoaches.map((coach) => (
                  <div
                    key={coach.id}
                    className="rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Custom Card Header - Fully colored with no white space */}
                    <div className="bg-[#008080] text-white p-4">
                      <h3 className="text-xl font-semibold">{coach.name}</h3>
                      <Badge className="bg-[#00FF7F] text-[#008080] hover:bg-[#00FF7F]/90 mt-1">
                        {coach.specialty}
                      </Badge>
                    </div>

                    <div className="p-4">
                      <h3 className="text-sm font-medium flex items-center gap-2 mb-3">
                        <Calendar className="h-5 w-5 text-[#008080]" />
                        Available Sessions
                      </h3>
                      <ul className="space-y-2 text-sm">
                        {coach.availability.map((slot, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            {slot}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="px-4 pb-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="w-full bg-[#008080] hover:bg-[#008080]/90"
                            onClick={() => setSelectedCoach(coach)}
                          >
                            Book Session
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Book a Session with {selectedCoach?.name}</DialogTitle>
                            <DialogDescription>
                              Select an available time slot to book your coaching session.
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <h3 className="text-sm font-medium">Coach</h3>
                              <p>
                                {selectedCoach?.name} - {selectedCoach?.specialty}
                              </p>
                            </div>

                            <div className="space-y-2">
                              <h3 className="text-sm font-medium">Select Time Slot</h3>
                              <Select onValueChange={setSelectedTimeSlot}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose a time" />
                                </SelectTrigger>
                                <SelectContent>
                                  {selectedCoach?.availability.map((slot: string, index: number) => (
                                    <SelectItem key={index} value={slot}>
                                      {slot}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <DialogFooter>
                            <Button
                              className="bg-[#008080] hover:bg-[#008080]/90"
                              onClick={handleReservation}
                              disabled={!selectedTimeSlot}
                            >
                              Confirm Reservation
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <h3 className="text-lg font-medium text-gray-500">No coaches found matching your criteria</h3>
                <p className="text-gray-400 mt-2">Try adjusting your filters or search term</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
