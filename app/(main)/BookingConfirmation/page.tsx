"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Clock, MapPin, CreditCard, CheckCircle, CalendarPlus, X, ArrowRight, MessageSquare, Share2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

// Mock booking data
const bookingData = {
  id: "BK-" + Math.random().toString(36).substring(2, 10).toUpperCase(),
  coach: {
    name: "Jane Smith",
    specialty: "Nutrition",
    avatar: "/placeholder.svg?height=80&width=80"
  },
  session: {
    type: "Initial Consultation",
    date: "Monday, May 15, 2025",
    time: "10:00 AM - 11:00 AM",
    location: "Video Call (Zoom)",
    notes: "Please prepare any questions you have about your nutrition goals."
  },
  payment: {
    amount: 75.00,
    method: "Credit Card (ending in 4242)",
    status: "Paid"
  }
}

export default function BookingConfirmation() {
  const [isCancelling, setIsCancelling] = useState(false)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)
  const { toast } = useToast()

  const handleAddToCalendar = () => {
    toast({
      title: "Added to Calendar",
      description: "This session has been added to your calendar",
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Nutrition Coaching Session with ${bookingData.coach.name}`,
        text: `I've booked a nutrition coaching session on ${bookingData.session.date} at ${bookingData.session.time}`,
        url: window.location.href,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      toast({
        title: "Booking Link Copied",
        description: "The booking link has been copied to your clipboard",
      })
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
    }
  }

  const handleCancelBooking = () => {
    setIsCancelling(true)
    
    // Simulate cancellation process
    setTimeout(() => {
      setIsCancelling(false)
      setShowCancelConfirm(true)
      
      // Scroll to the confirmation message
      setTimeout(() => {
        document.getElementById('cancel-confirmation')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-8">
      <div className="container mx-auto px-4">
        {showCancelConfirm && (
          <Alert className="mb-6 bg-red-50 border-red-200" id="cancel-confirmation">
            <X className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-600">Booking Cancelled</AlertTitle>
            <AlertDescription>
              Your booking has been cancelled and a refund has been processed to your original payment method.
              It may take 3-5 business days to appear in your account.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#008080]">Booking Confirmation</h1>
          {!showCancelConfirm && (
            <div className="bg-[#00FF7F]/20 text-[#008080] px-4 py-2 rounded-full flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="font-medium">Confirmed</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Booking Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="text-[#008080]">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Session Details</CardTitle>
                    <CardDescription className="text-[#008080]">
                      Confirmation #{bookingData.id}
                    </CardDescription>
                  </div>
                  {showCancelConfirm && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                      Cancelled
                    </span>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-[#008080] flex items-center justify-center text-white text-2xl font-bold">
                      {bookingData.coach.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{bookingData.session.type}</h3>
                    <p className="text-gray-600 mb-4">with {bookingData.coach.name}, {bookingData.coach.specialty} Coach</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-[#008080] mt-0.5" />
                        <div>
                          <p className="font-medium">Date</p>
                          <p className="text-gray-600">{bookingData.session.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-[#008080] mt-0.5" />
                        <div>
                          <p className="font-medium">Time</p>
                          <p className="text-gray-600">{bookingData.session.time}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-[#008080] mt-0.5" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-gray-600">{bookingData.session.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <CreditCard className="h-5 w-5 text-[#008080] mt-0.5" />
                        <div>
                          <p className="font-medium">Payment</p>
                          <p className="text-gray-600">${bookingData.payment.amount.toFixed(2)} • {bookingData.payment.status}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <h4 className="font-medium">Session Notes</h4>
                  <p className="text-gray-600">{bookingData.session.notes}</p>
                  
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-4">
                    <h4 className="font-medium text-blue-800 flex items-center gap-2 mb-2">
                      <MessageSquare className="h-4 w-4" />
                      Preparation Tips
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1 pl-6 list-disc">
                      <li>Have your food diary ready if you've been keeping one</li>
                      <li>Prepare any specific questions about your nutrition goals</li>
                      <li>Be ready to discuss your current eating habits and lifestyle</li>
                      <li>Have your camera and microphone set up for the video call</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-wrap gap-3 border-t pt-4">
                {!showCancelConfirm ? (
                  <>
                    <Button 
                      className="bg-[#008080] hover:bg-[#008080]/90"
                      onClick={handleAddToCalendar}
                    >
                      <CalendarPlus className="h-4 w-4 mr-2" />
                      Add to Calendar
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="border-[#008080] text-[#008080] hover:bg-[#008080]/10"
                      onClick={handleShare}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="border-red-500 text-red-500 hover:bg-red-50 ml-auto"
                      onClick={() => handleCancelBooking()}
                      disabled={isCancelling}
                    >
                      {isCancelling ? "Cancelling..." : "Cancel Booking"}
                    </Button>
                  </>
                ) : (
                  <Link href="/CoachReservation" className="w-full">
                    <Button className="w-full bg-[#008080] hover:bg-[#008080]/90">
                      Book Another Session
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          </div>
          
       
          
        </div>
      </div>
    </div>
  )
}
