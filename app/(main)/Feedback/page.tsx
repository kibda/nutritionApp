"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Send, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

// Form schema validation
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  feedbackType: z.string({
    required_error: "Please select a feedback type.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  rating: z.string().optional(),
})

export default function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [rating, setRating] = useState(0)
  const { toast } = useToast()

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      feedbackType: "",
      message: "",
      rating: "0",
    },
  })

  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", { ...values, rating: rating.toString() })
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback!",
      })
      setIsSubmitting(false)
      setIsSubmitted(true)
      form.reset()
      setRating(0)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#008080] mb-8">Share Your Feedback</h1>

        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-[#008080]">
            <CardTitle>Feedback Form</CardTitle>
            <CardDescription className="text-[#008080]">We value your input to improve our services</CardDescription>
          </CardHeader>

          {isSubmitted ? (
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <div className="bg-[#00FF7F]/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Send className="h-8 w-8 text-[#008080]" />
                </div>
                <h3 className="text-xl font-semibold text-[#008080] mb-2">Thank You!</h3>
                <p className="text-gray-600 mb-4">Your feedback has been submitted successfully.</p>
                <Button onClick={() => setIsSubmitted(false)} className="bg-[#008080] hover:bg-[#008080]/90">
                  Submit Another Response
                </Button>
              </div>
            </CardContent>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="pt-6 space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="feedbackType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Feedback Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select feedback type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Bug Report">Bug Report</SelectItem>
                            <SelectItem value="Feature Request">Feature Request</SelectItem>
                            <SelectItem value="General Feedback">General Feedback</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please provide details about your feedback..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating (Optional)</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                className="focus:outline-none"
                                onClick={() => {
                                  setRating(star)
                                  field.onChange(star.toString())
                                }}
                              >
                                <Star
                                  className={`h-8 w-8 ${rating >= star ? "fill-[#00FF7F] text-[#00FF7F]" : "text-gray-300"}`}
                                />
                              </button>
                            ))}
                          </div>
                        </FormControl>
                        <FormDescription>How would you rate your experience?</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>

                <CardFooter className="flex justify-end border-t pt-4">
                  <Button type="submit" className="bg-[#008080] hover:bg-[#008080]/90" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Feedback"}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          )}
        </Card>
      </div>
    </div>
  )
}
