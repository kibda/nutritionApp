import { createOpenAI } from "@ai-sdk/openai"
import { streamText } from "ai"

// Create a Groq-compatible OpenAI client
const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY || "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",
  baseURL: "https://api.groq.com/openai/v1",
})

export async function POST(req: Request) {
  const { messages } = await req.json()

  const systemMessage = {
    role: "system",
    content: `You are a nutrition assistant that ONLY provides information about nutrition, diet, healthy eating, 
    food facts, and related topics. If asked about anything outside of nutrition, politely decline and 
    redirect the conversation back to nutrition topics. Always provide evidence-based information and 
    clarify when something is a general guideline versus a specific recommendation that would require 
    personalized professional advice. Keep your answers concise and to the point, as you're displayed in a small chat bubble.`,
  }

  const messagesWithSystem = [systemMessage, ...messages]

  const result = await streamText({
    model:groq("llama3-70b-8192") , // Correct Groq model name
    messages: messagesWithSystem,
    
  })

  return result.toDataStreamResponse()
}