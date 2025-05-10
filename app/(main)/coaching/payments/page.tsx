"use client"

import { useState } from "react"
import { CreditCard, Download, Filter, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample payment methods
const paymentMethods = [
  {
    id: 1,
    type: "Credit Card",
    last4: "4242",
    expiry: "04/25",
    isDefault: true,
  },
  {
    id: 2,
    type: "Credit Card",
    last4: "1234",
    expiry: "09/26",
    isDefault: false,
  },
]

// Sample invoices
const invoices = [
  {
    id: "INV-001",
    date: "May 10, 2024",
    amount: 79.99,
    status: "Paid",
    description: "Premium Membership - Monthly",
  },
  {
    id: "INV-002",
    date: "April 10, 2024",
    amount: 79.99,
    status: "Paid",
    description: "Premium Membership - Monthly",
  },
  {
    id: "INV-003",
    date: "March 10, 2024",
    amount: 79.99,
    status: "Paid",
    description: "Premium Membership - Monthly",
  },
  {
    id: "INV-004",
    date: "May 5, 2024",
    amount: 85.0,
    status: "Paid",
    description: "Personal Training Session - Mike Peterson",
  },
  {
    id: "INV-005",
    date: "April 20, 2024",
    amount: 65.0,
    status: "Paid",
    description: "Nutrition Consultation - Sarah Johnson",
  },
]

// Sample subscription
const subscription = {
  plan: "Premium",
  price: 79.99,
  billingCycle: "Monthly",
  nextBillingDate: "June 10, 2024",
  status: "Active",
}

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    status: [],
    date: [],
  })

  // Filter invoices based on search term and filters
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filters.status.length === 0 || filters.status.includes(invoice.status)
    return matchesSearch && matchesStatus
  })

  // Toggle filter selection
  const toggleFilter = (type: string, value: string) => {
    setFilters((prev) => {
      const current = prev[type as keyof typeof prev] as string[]
      return {
        ...prev,
        [type]: current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
      }
    })
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      status: [],
      date: [],
    })
    setSearchTerm("")
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Payments</h2>
        <Button className="bg-gradient-to-r from-green-500 to-blue-600">
          <Plus className="mr-2 h-4 w-4" />
          Add Payment Method
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Current Subscription</CardTitle>
                <CardDescription>Your active membership plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{subscription.plan}</div>
                    <div className="text-sm text-muted-foreground">{subscription.billingCycle} billing</div>
                  </div>
                  <Badge>{subscription.status}</Badge>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <div className="text-muted-foreground">Price</div>
                    <div>${subscription.price}/month</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="text-muted-foreground">Next billing date</div>
                    <div>{subscription.nextBillingDate}</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Change Plan</Button>
                <Button variant="destructive">Cancel</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Payment Summary</CardTitle>
                <CardDescription>Your payment history overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">This Month</div>
                    <div className="text-xl font-bold">$164.99</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Last Month</div>
                    <div className="text-xl font-bold">$144.99</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Year to Date</div>
                    <div className="text-xl font-bold">$469.95</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Statement
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Default Payment Method</CardTitle>
                <CardDescription>Your primary payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Visa ending in {paymentMethods[0].last4}</div>
                    <div className="text-sm text-muted-foreground">Expires {paymentMethods[0].expiry}</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Edit</Button>
                <Button variant="outline">Change Default</Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
              <CardDescription>Your most recent payments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.slice(0, 5).map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.description}</TableCell>
                      <TableCell className="text-right">${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={invoice.status === "Paid" ? "outline" : "destructive"}>{invoice.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Invoices
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search invoices..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                    <Badge className="ml-1 rounded-sm px-1 font-normal">{Object.values(filters).flat().length}</Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Filter Invoices</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <div className="p-2">
                    <h4 className="mb-2 text-sm font-medium">Status</h4>
                    <DropdownMenuCheckboxItem
                      checked={filters.status.includes("Paid")}
                      onCheckedChange={() => toggleFilter("status", "Paid")}
                    >
                      Paid
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.status.includes("Pending")}
                      onCheckedChange={() => toggleFilter("status", "Pending")}
                    >
                      Pending
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.status.includes("Failed")}
                      onCheckedChange={() => toggleFilter("status", "Failed")}
                    >
                      Failed
                    </DropdownMenuCheckboxItem>
                  </div>

                  <DropdownMenuSeparator />

                  <div className="p-2">
                    <Button variant="ghost" size="sm" className="w-full" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.description}</TableCell>
                      <TableCell className="text-right">${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={invoice.status === "Paid" ? "outline" : "destructive"}>{invoice.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment-methods" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {paymentMethods.map((method) => (
              <Card key={method.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{method.type}</CardTitle>
                    {method.isDefault && <Badge>Default</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <CreditCard className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">•••• •••• •••• {method.last4}</div>
                      <div className="text-sm text-muted-foreground">Expires {method.expiry}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Edit</Button>
                  {!method.isDefault && <Button variant="outline">Make Default</Button>}
                  {!method.isDefault && <Button variant="destructive">Remove</Button>}
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Add New Payment Method</CardTitle>
              <CardDescription>Add a new credit card or payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed">
                <CreditCard className="mb-2 h-10 w-10 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-sm font-medium">Add a new payment method</p>
                  <p className="text-xs text-muted-foreground">We support credit cards, debit cards, and more</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-green-500 to-blue-600">
                <Plus className="mr-2 h-4 w-4" />
                Add Payment Method
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
