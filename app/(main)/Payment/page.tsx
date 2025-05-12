"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Check, CreditCard, Calendar, Lock, DollarSignIcon as PaypalLogo } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Form schema validation
const paymentFormSchema = z.object({
  cardName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  cardNumber: z.string().regex(/^\d{16}$/, {
    message: "Card number must be 16 digits.",
  }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: "Expiry date must be in MM/YY format.",
  }),
  cvv: z.string().regex(/^\d{3,4}$/, {
    message: "CVV must be 3 or 4 digits.",
  }),
  saveCard: z.boolean().optional(),
})

// Mock order data
const orderSummary = {
  items: [
    { name: "Nutrition Coaching Session", price: 75.0, quantity: 1 },
    { name: "Meal Plan Add-on", price: 25.0, quantity: 1 },
  ],
  subtotal: 100.0,
  tax: 8.0,
  total: 108.0,
}

export default function PaymentGateway() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")

  // Initialize form
  const form = useForm<z.infer<typeof paymentFormSchema>>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      saveCard: false,
    },
  })

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return v
  }

  // Form submission handler
  function onSubmit(values: z.infer<typeof paymentFormSchema>) {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      console.log("Payment processed:", values)
      setIsProcessing(false)
      setIsComplete(true)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#008080] mb-8">Payment Gateway</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="bg-[#008080] text-white">
                <CardTitle>Secure Payment</CardTitle>
                <CardDescription className="text-[#F5F5F5]">Complete your purchase securely</CardDescription>
              </CardHeader>

              {isComplete ? (
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <div className="bg-[#00FF7F]/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Check className="h-8 w-8 text-[#008080]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#008080] mb-2">Payment Successful!</h3>
                    <p className="text-gray-600 mb-6">
                      Your payment has been processed successfully. A confirmation email has been sent to your email
                      address.
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 max-w-sm mx-auto text-left">
                      <p className="text-sm text-gray-500 mb-1">Transaction ID</p>
                      <p className="font-medium mb-2">
                        TXN-{Math.random().toString(36).substring(2, 10).toUpperCase()}
                      </p>
                      <p className="text-sm text-gray-500 mb-1">Amount Paid</p>
                      <p className="font-medium">${orderSummary.total.toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              ) : (
                <CardContent className="pt-6">
                  <Tabs defaultValue="credit-card" onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="credit-card" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span>Credit Card</span>
                      </TabsTrigger>
                      <TabsTrigger value="paypal" className="flex items-center gap-2">
                        <PaypalLogo className="h-4 w-4" />
                        <span>PayPal</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="credit-card">
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="cardName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name on Card</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      placeholder="1234 5678 9012 3456"
                                      {...field}
                                      onChange={(e) => {
                                        const formatted = formatCardNumber(e.target.value)
                                        e.target.value = formatted
                                        field.onChange(e.target.value.replace(/\s/g, ""))
                                      }}
                                      maxLength={19}
                                    />
                                    <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="expiryDate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Expiry Date</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Input
                                        placeholder="MM/YY"
                                        {...field}
                                        onChange={(e) => {
                                          const formatted = formatExpiryDate(e.target.value)
                                          e.target.value = formatted
                                          field.onChange(e.target.value)
                                        }}
                                        maxLength={5}
                                      />
                                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="cvv"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>CVV</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Input
                                        type="password"
                                        placeholder="123"
                                        {...field}
                                        maxLength={4}
                                        onChange={(e) => {
                                          const value = e.target.value.replace(/[^0-9]/g, "")
                                          e.target.value = value
                                          field.onChange(value)
                                        }}
                                      />
                                      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="pt-4">
                            <Button
                              type="submit"
                              className="w-full bg-[#008080] hover:bg-[#008080]/90"
                              disabled={isProcessing}
                            >
                              {isProcessing ? "Processing..." : `Pay $${orderSummary.total.toFixed(2)}`}
                            </Button>
                          </div>

                          <div className="flex items-center justify-center text-xs text-gray-500 gap-1 pt-2">
                            <Lock className="h-3 w-3" />
                            <span>Secure payment processed with 256-bit encryption</span>
                          </div>
                        </form>
                      </Form>
                    </TabsContent>

                    <TabsContent value="paypal">
                      <div className="text-center py-8">
                        <PaypalLogo className="h-12 w-12 mx-auto mb-4 text-[#0070ba]" />
                        <p className="text-gray-600 mb-6">
                          Click the button below to pay with PayPal. You will be redirected to PayPal to complete your
                          payment.
                        </p>
                        <Button
                          className="bg-[#0070ba] hover:bg-[#005ea6]"
                          onClick={() => {
                            setIsProcessing(true)
                            setTimeout(() => {
                              setIsProcessing(false)
                              setIsComplete(true)
                            }, 2000)
                          }}
                          disabled={isProcessing}
                        >
                          {isProcessing ? "Processing..." : `Pay with PayPal`}
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              )}
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderSummary.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                  ))}

                  <Separator className="my-2" />

                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${orderSummary.subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${orderSummary.tax.toFixed(2)}</span>
                  </div>

                  <Separator className="my-2" />

                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${orderSummary.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 flex flex-col items-start pt-4">
                <h4 className="font-medium mb-2">Payment Method</h4>
                <RadioGroup defaultValue="credit" className="w-full space-y-2">
                  <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="credit" id="credit" />
                    <label htmlFor="credit" className="flex items-center justify-between w-full cursor-pointer">
                      <span>Credit Card</span>
                      <div className="flex gap-1">
                        <div className="h-6 w-10 bg-blue-600 rounded"></div>
                        <div className="h-6 w-10 bg-red-500 rounded"></div>
                        <div className="h-6 w-10 bg-gray-800 rounded"></div>
                      </div>
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <label htmlFor="paypal" className="flex items-center justify-between w-full cursor-pointer">
                      <span>PayPal</span>
                      <PaypalLogo className="h-6 w-6 text-[#0070ba]" />
                    </label>
                  </div>
                </RadioGroup>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
