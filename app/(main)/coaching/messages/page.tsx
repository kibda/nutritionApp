"use client"

import { useState } from "react"
import { ChevronDown, Paperclip, Plus, Search, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample coaches data
const coaches = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Nutrition Coach",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "Let's review your meal plan for the week.",
    time: "10:30 AM",
    unread: 2,
  },
  {
    id: 2,
    name: "Mike Peterson",
    role: "Strength Coach",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    lastMessage: "Great progress on your squat form!",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: 3,
    name: "Jennifer Lee",
    role: "Yoga Instructor",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "Don't forget your mobility exercises.",
    time: "2 days ago",
    unread: 0,
  },
]

// Sample messages data
const messages = [
  {
    id: 1,
    sender: "Sarah Johnson",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    content: "Hi John! How are you doing with the nutrition plan we discussed?",
    time: "10:15 AM",
    isUser: false,
  },
  {
    id: 2,
    sender: "You",
    content: "Hi Sarah! I've been following it pretty well. I'm finding it easier to stick to than I expected.",
    time: "10:18 AM",
    isUser: true,
  },
  {
    id: 3,
    sender: "Sarah Johnson",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    content: "That's great to hear! Have you noticed any changes in your energy levels?",
    time: "10:20 AM",
    isUser: false,
  },
  {
    id: 4,
    sender: "You",
    content:
      "Yes, definitely! I feel more energetic throughout the day, especially in the afternoons when I used to crash.",
    time: "10:22 AM",
    isUser: true,
  },
  {
    id: 5,
    sender: "Sarah Johnson",
    senderAvatar: "/placeholder.svg?height=40&width=40",
    content:
      "Excellent! That's one of the main benefits of balancing your macros properly. Let's review your meal plan for the week and see if we need to make any adjustments.",
    time: "10:30 AM",
    isUser: false,
  },
]

export default function MessagesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCoach, setSelectedCoach] = useState(coaches[0])
  const [newMessage, setNewMessage] = useState("")

  // Filter coaches based on search term
  const filteredCoaches = coaches.filter(
    (coach) =>
      coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coach.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, you would send the message to the server
      setNewMessage("")
    }
  }

  return (
    <div className="flex-1 p-0">
      <div className="flex h-[calc(100vh-4rem)] flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full border-r md:w-80">
          <div className="flex h-14 items-center justify-between border-b px-4">
            <h2 className="font-semibold">Messages</h2>
            <Button variant="ghost" size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search messages..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Tabs defaultValue="all" className="px-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="h-[calc(100vh-14rem)] overflow-auto">
            {filteredCoaches.map((coach) => (
              <div
                key={coach.id}
                className={`flex cursor-pointer items-center gap-3 border-b p-4 transition-colors hover:bg-muted ${
                  selectedCoach.id === coach.id ? "bg-muted" : ""
                }`}
                onClick={() => setSelectedCoach(coach)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={coach.avatar || "/placeholder.svg"} alt={coach.name} />
                    <AvatarFallback>{coach.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                      coach.status === "online" ? "bg-green-500" : "bg-muted"
                    }`}
                  />
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{coach.name}</div>
                    <div className="text-xs text-muted-foreground">{coach.time}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{coach.role}</div>
                  <div className="mt-1 truncate text-sm">{coach.lastMessage}</div>
                </div>
                {coach.unread > 0 && <Badge className="ml-auto bg-primary">{coach.unread}</Badge>}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex flex-1 flex-col">
          <div className="flex h-14 items-center justify-between border-b px-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={selectedCoach.avatar || "/placeholder.svg"} alt={selectedCoach.name} />
                <AvatarFallback>{selectedCoach.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{selectedCoach.name}</div>
                <div className="text-xs text-muted-foreground">{selectedCoach.role}</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon">
                <Search className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                  <DropdownMenuItem>Block Coach</DropdownMenuItem>
                  <DropdownMenuItem>Clear Chat</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.isUser ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {!message.isUser && (
                      <div className="mb-1 flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={message.senderAvatar || "/placeholder.svg"} alt={message.sender} />
                          <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="text-xs font-medium">{message.sender}</div>
                      </div>
                    )}
                    <div className="text-sm">{message.content}</div>
                    <div
                      className={`mt-1 text-right text-xs ${
                        message.isUser ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {message.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t p-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage()
                  }
                }}
              />
              <Button size="icon" className="bg-gradient-to-r from-green-500 to-blue-600" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
