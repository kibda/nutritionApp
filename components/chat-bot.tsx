"use client"
import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Loader2, X, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function NutritionChatBubble() {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  })

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Bubble Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg flex items-center justify-center"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Open nutrition chat</span>
        </Button>
      )}

      {/* Chat Interface */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out transform",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
        )}
      >
        <Card className="w-[350px] md:w-[400px] h-[500px] flex flex-col shadow-xl">
          <CardHeader className="bg-white border-b py-3 px-4 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-md flex items-center gap-2">
              <span className="text-green-600">🥗</span> Nutrition Assistant
            </CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </CardHeader>

          <CardContent className="flex-1 p-0 overflow-hidden">
  <div className="h-full flex flex-col">
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
              {messages.length === 0 ? (
                <div className="flex h-full items-center justify-center text-center p-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Welcome to your Nutrition Assistant!</p>
                    <p className="text-xs text-muted-foreground">
                      Ask questions about nutrition, diet plans, food facts, or healthy recipes.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 " >
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex max-w-[80%] rounded-lg px-3 py-2 ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {message.role !== "user" && (
                            <Avatar className="h-6 w-6 mt-1">
                              <AvatarFallback className="bg-green-100 text-green-800 text-xs">NA</AvatarFallback>
                            </Avatar>
                          )}
                          <div className="space-y-1 text-sm">
                            {message.parts.map((part, i) => {
                              if (part.type === "text") {
                                return (
                                  <div key={i} className="whitespace-pre-wrap">
                                    {part.text}
                                  </div>
                                )
                              }
                              return null
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              </div>
  </div>
          </CardContent>

          <CardFooter className="border-t p-3">
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Input
                placeholder="Ask about nutrition..."
                value={input}
                onChange={handleInputChange}
                className="flex-1 text-sm"
                disabled={isLoading}
              />
              <Button type="submit" size="sm" disabled={isLoading || !input.trim()}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}