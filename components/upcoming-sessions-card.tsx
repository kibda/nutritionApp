import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MessageSquare, Video } from "lucide-react"

const upcomingSessions = [
  {
    id: 1,
    coach: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      specialty: "Nutrition Coach",
    },
    date: "May 12, 2024",
    time: "10:00 AM",
    type: "Video Call",
    icon: Video,
  },
  {
    id: 2,
    coach: {
      name: "Mike Peterson",
      avatar: "/placeholder.svg?height=40&width=40",
      specialty: "Strength Coach",
    },
    date: "May 15, 2024",
    time: "2:30 PM",
    type: "In-person",
    icon: Calendar,
  },
]

export function UpcomingSessionsCard() {
  return (
    <div className="space-y-4">
      {upcomingSessions.length > 0 ? (
        <>
          {upcomingSessions.map((session) => (
            <div key={session.id} className="flex items-start gap-4 rounded-lg border p-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={session.coach.avatar || "/placeholder.svg"} alt={session.coach.name} />
                <AvatarFallback>{session.coach.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{session.coach.name}</h4>
                  <span className="flex items-center text-xs text-muted-foreground">
                    <session.icon className="mr-1 h-3 w-3" />
                    {session.type}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{session.coach.specialty}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    {session.date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    {session.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between">
            <Button variant="outline" size="sm">
              Reschedule
            </Button>
            <Button size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              Message Coach
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <Calendar className="mb-2 h-10 w-10 text-muted-foreground" />
          <h3 className="mb-1 font-medium">No Upcoming Sessions</h3>
          <p className="mb-4 text-sm text-muted-foreground">You don't have any coaching sessions scheduled.</p>
          <Button>Book a Session</Button>
        </div>
      )}
    </div>
  )
}
