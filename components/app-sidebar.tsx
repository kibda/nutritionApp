"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Activity,
  Calendar,
  ChevronDown,
  CreditCard,
  Dumbbell,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  Trophy,
  User,
  UserCog,
  Utensils,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useUser } from "@/app/context/UserContext"  // Import user context

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAdmin, logout } = useUser() // Get user and isAdmin from context
  console.log("User:", user)
  console.log("Is Admin:", isAdmin)
  
  const [openGroups, setOpenGroups] = useState({
    nutrition: true,
    exercise: true,
    coaching: true,
    feedback: true,
    admin: true,
  })

  const isActive = (path: string) => pathname === path
  
  // Handle logout
  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-xl font-bold">
            <Activity className="h-6 w-6 text-green-500" />
            <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent font-extrabold ">Calorize</span>
          </div>
          <SidebarTrigger className="ml-auto" />
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
                <Link href="/dashboard">
                  <Home />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/profile")}>
                <Link href="/profile">
                  <User />
                  <span>My Profile</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />

        <Collapsible
          open={openGroups.nutrition}
          onOpenChange={(open) => setOpenGroups({ ...openGroups, nutrition: open })}
          className="group/collapsible"
        >
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center">
                Nutrition
                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/nutrition/meal-plans")}>
                      <Link href="/nutrition/meal-plans">
                        <Utensils />
                        <span>Meal Plans</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/nutrition/tracking")}>
                      <Link href="/nutrition/tracking">
                        <Activity />
                        <span>Nutrition Tracking</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <Collapsible
          open={openGroups.exercise}
          onOpenChange={(open) => setOpenGroups({ ...openGroups, exercise: open })}
          className="group/collapsible"
        >
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center">
                Exercise
                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/exercise/library")}>
                      <Link href="/exercise/library">
                        <Dumbbell />
                        <span>Exercise Library</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/exercise/workouts")}>
                      <Link href="/exercise/workouts">
                        <Activity />
                        <span>My Workouts</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/exercise/achievements")}>
                      <Link href="/exercise/achievements">
                        <Trophy />
                        <span>Achievements</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <Collapsible
          open={openGroups.coaching}
          onOpenChange={(open) => setOpenGroups({ ...openGroups, coaching: open })}
          className="group/collapsible"
        >
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center">
                Coaching
                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/Payment")}>
                      <Link href="/Payment">
                        <CreditCard />
                        <span>Payment</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/BookingConfirmation")}>
                      <Link href="/BookingConfirmation">
                        <Calendar />
                        <span>Booking Confirmation </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/CoachReservation")}>
                      <Link href="/CoachReservation">
                        <Calendar />
                        <span>Coach Reservation</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <Collapsible
          open={openGroups.feedback}
          onOpenChange={(open) => setOpenGroups({ ...openGroups, feedback: open })}
          className="group/collapsible"
        >
        <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center">
                Feedback
                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/Feedback")}>
                      <Link href="/Feedback">
                        <Utensils />
                        <span>Feedback</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Admin section - Only visible to admin users */}
        {isAdmin && (
          <Collapsible
            open={openGroups.admin}
            onOpenChange={(open) => setOpenGroups({ ...openGroups, admin: open })}
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="flex w-full items-center">
                  Admin
                  <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={isActive("/admin/manageCoaches")}>
                        <Link href="/admin/manageCoaches">
                          <UserCog />
                          <span>Manage Coaches</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={isActive("/Feedback-Dashboard")}>
                        <Link href="/Feedback-Dashboard">
                          <Activity />
                          <span>Feedback Dashboard</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
            <AvatarFallback>{user?.name ? user.name.charAt(0) : 'U'}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user?.name || "Guest"}</span>
            <span className="text-xs text-muted-foreground">{isAdmin ? "Admin" : "Member"}</span>
          </div>
          <div className="ml-auto flex gap-1">
            <ModeToggle />
            <Button variant="ghost" size="icon" asChild>
              <Link href="/settings">
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}