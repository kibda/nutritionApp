"use client"

import type React from "react"

import { useState } from "react"
import { PlusCircle, Search, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

// Coach type definition
type Coach = {
  id: string
  name: string
  email: string
  specialization: string
  clients: number
  status: "active" | "inactive"
}

export default function AdminDashboard() {
  // Sample data for coaches
  const [coaches, setCoaches] = useState<Coach[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      specialization: "Weight Loss",
      clients: 12,
      status: "active",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      specialization: "Sports Nutrition",
      clients: 8,
      status: "active",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael.b@example.com",
      specialization: "Diabetes Management",
      clients: 15,
      status: "inactive",
    },
    {
      id: "4",
      name: "Emma Wilson",
      email: "emma.w@example.com",
      specialization: "Vegan Nutrition",
      clients: 10,
      status: "active",
    },
  ])

  // State for search query
  const [searchQuery, setSearchQuery] = useState("")

  // State for coach form dialog
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentCoach, setCurrentCoach] = useState<Coach | null>(null)

  // State for delete confirmation dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [coachToDelete, setCoachToDelete] = useState<Coach | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "",
    clients: 0,
    status: "active" as "active" | "inactive",
  })

  // Filter coaches based on search query
  const filteredCoaches = coaches.filter(
    (coach) =>
      coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coach.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coach.specialization.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle opening the form for creating a new coach
  const handleAddCoach = () => {
    setCurrentCoach(null)
    setFormData({
      name: "",
      email: "",
      specialization: "",
      clients: 0,
      status: "active",
    })
    setIsFormOpen(true)
  }

  // Handle opening the form for editing an existing coach
  const handleEditCoach = (coach: Coach) => {
    setCurrentCoach(coach)
    setFormData({
      name: coach.name,
      email: coach.email,
      specialization: coach.specialization,
      clients: coach.clients,
      status: coach.status,
    })
    setIsFormOpen(true)
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "clients" ? Number.parseInt(value) || 0 : value,
    }))
  }

  // Handle form submission
  const handleSubmit = () => {
    if (currentCoach) {
      // Update existing coach
      setCoaches(coaches.map((coach) => (coach.id === currentCoach.id ? { ...coach, ...formData } : coach)))
    } else {
      // Create new coach
      const newCoach: Coach = {
        id: Date.now().toString(),
        ...formData,
      }
      setCoaches([...coaches, newCoach])
    }
    setIsFormOpen(false)
  }

  // Handle coach deletion
  const handleDeleteClick = (coach: Coach) => {
    setCoachToDelete(coach)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (coachToDelete) {
      setCoaches(coaches.filter((coach) => coach.id !== coachToDelete.id))
    }
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Nutrition Platform Admin</h1>
          <Button onClick={handleAddCoach} className="bg-gradient-to-r from-green-500 to-blue-600">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Coach
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search coaches by name, email, or specialization..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead className="text-center">Clients</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCoaches.length > 0 ? (
                filteredCoaches.map((coach) => (
                  <TableRow key={coach.id}>
                    <TableCell className="font-medium">{coach.name}</TableCell>
                    <TableCell>{coach.email}</TableCell>
                    <TableCell>{coach.specialization}</TableCell>
                    <TableCell className="text-center">{coach.clients}</TableCell>
                    <TableCell>
                      <Badge variant={coach.status === "active" ? "default" : "secondary"}>{coach.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleEditCoach(coach)}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-destructive"
                          onClick={() => handleDeleteClick(coach)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No coaches found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Create/Edit Coach Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentCoach ? "Edit Coach" : "Add New Coach"}</DialogTitle>
            <DialogDescription>
              {currentCoach ? "Update the coach's information below." : "Fill in the details to add a new coach."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="specialization" className="text-right">
                Specialization
              </Label>
              <Input
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="clients" className="text-right">
                Clients
              </Label>
              <Input
                id="clients"
                name="clients"
                type="number"
                value={formData.clients}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              {currentCoach ? "Save Changes" : "Add Coach"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {coachToDelete?.name}'s profile and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
