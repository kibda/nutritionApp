"use client"

import { useState } from "react"
import { Search, Filter, Star, ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"

// Static feedback data
const feedbackData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    type: "Bug Report",
    message: "The login button is not working.",
    rating: 2,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    type: "Feature Request",
    message: "Add a dark mode option.",
    rating: 5,
  },
  {
    id: 3,
    name: "Alex Brown",
    email: "alex@example.com",
    type: "General Feedback",
    message: "Great app overall!",
    rating: 4,
  },
  {
    id: 4,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    type: "Bug Report",
    message: "App crashes when uploading large images.",
    rating: 1,
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael@example.com",
    type: "Feature Request",
    message: "Would love to see a calendar integration.",
    rating: 4,
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emily@example.com",
    type: "General Feedback",
    message: "The UI is very intuitive and easy to use.",
    rating: 5,
  },
  {
    id: 7,
    name: "Robert Taylor",
    email: "robert@example.com",
    type: "Bug Report",
    message: "Cannot save profile changes.",
    rating: 2,
  },
]

// Feedback types for filtering
const feedbackTypes = ["Bug Report", "Feature Request", "General Feedback"]

export default function FeedbackDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [ratingFilter, setRatingFilter] = useState("")
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null)

  // Filter feedback based on search term and filters
  const filteredFeedback = feedbackData.filter((feedback) => {
    const matchesSearch =
      feedback.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.message.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "" || feedback.type === typeFilter

    const matchesRating = ratingFilter === "" || feedback.rating === Number.parseInt(ratingFilter)

    return matchesSearch && matchesType && matchesRating
  })

  // Sort feedback
  const sortedFeedback = [...filteredFeedback].sort((a, b) => {
    if (!sortConfig) return 0

    const { key, direction } = sortConfig

    if (a[key as keyof typeof a] < b[key as keyof typeof b]) {
      return direction === "asc" ? -1 : 1
    }
    if (a[key as keyof typeof a] > b[key as keyof typeof b]) {
      return direction === "asc" ? 1 : -1
    }
    return 0
  })

  // Handle sorting
  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  // Get badge color based on feedback type
  const getBadgeColor = (type: string) => {
    switch (type) {
      case "Bug Report":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "Feature Request":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "General Feedback":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] min-w-full">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#008080] mb-8">Feedback Dashboard</h1>

        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Filter Panel */}
          <div className="w-full lg:w-1/4 space-y-4">
            <Card>
              <CardHeader className="text-[#008080]">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
                <CardDescription className="text-[#008080]">Narrow down feedback</CardDescription>
              </CardHeader>

              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Feedback Type</label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {feedbackTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Rating</label>
                  <Select value={ratingFilter} onValueChange={setRatingFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Ratings" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <SelectItem key={rating} value={rating.toString()}>
                          {rating} {rating === 1 ? "Star" : "Stars"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => {
                    setTypeFilter("all")
                    setRatingFilter("all")
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total Feedback</span>
                  <span className="font-medium">{feedbackData.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Bug Reports</span>
                  <span className="font-medium">{feedbackData.filter((f) => f.type === "Bug Report").length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Feature Requests</span>
                  <span className="font-medium">{feedbackData.filter((f) => f.type === "Feature Request").length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">General Feedback</span>
                  <span className="font-medium">
                    {feedbackData.filter((f) => f.type === "General Feedback").length}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t mt-2">
                  <span className="text-sm text-gray-500">Average Rating</span>
                  <span className="font-medium flex items-center">
                    {(feedbackData.reduce((acc, curr) => acc + curr.rating, 0) / feedbackData.length).toFixed(1)}
                    <Star className="h-4 w-4 ml-1 fill-[#00FF7F] text-[#00FF7F]" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, email, type or message..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Feedback Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox />
                      </TableHead>
                      <TableHead className="w-[180px]">
                        <Button variant="ghost" className="p-0 font-medium" onClick={() => requestSort("name")}>
                          User
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button variant="ghost" className="p-0 font-medium" onClick={() => requestSort("type")}>
                          Type
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead className="hidden md:table-cell">Message</TableHead>
                      <TableHead className="w-[100px] text-right">
                        <Button variant="ghost" className="p-0 font-medium" onClick={() => requestSort("rating")}>
                          Rating
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedFeedback.length > 0 ? (
                      sortedFeedback.map((feedback) => (
                        <TableRow key={feedback.id}>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8 bg-[#008080] text-white">
                                <AvatarFallback>{getInitials(feedback.name)}</AvatarFallback>
                              </Avatar>
                              <div className="grid gap-0.5">
                                <div className="font-medium">{feedback.name}</div>
                                <div className="text-xs text-gray-500">{feedback.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getBadgeColor(feedback.type)}>{feedback.type}</Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="truncate max-w-[300px]">{feedback.message}</div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end">
                              {feedback.rating}
                              <Star
                                className={`h-4 w-4 ml-1 ${feedback.rating > 0 ? "fill-[#00FF7F] text-[#00FF7F]" : "text-gray-300"}`}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                          No feedback found matching your criteria
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Mobile View for Feedback */}
            <div className="md:hidden space-y-4 mt-4">
              {sortedFeedback.length > 0 ? (
                sortedFeedback.map((feedback) => (
                  <Card key={feedback.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 bg-[#008080] text-white">
                            <AvatarFallback>{getInitials(feedback.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{feedback.name}</div>
                            <div className="text-xs text-gray-500">{feedback.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {feedback.rating}
                          <Star
                            className={`h-4 w-4 ml-1 ${feedback.rating > 0 ? "fill-[#00FF7F] text-[#00FF7F]" : "text-gray-300"}`}
                          />
                        </div>
                      </div>

                      <Badge className={`mb-2 ${getBadgeColor(feedback.type)}`}>{feedback.type}</Badge>

                      <p className="text-sm text-gray-600">{feedback.message}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center text-gray-500">
                    No feedback found matching your criteria
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
