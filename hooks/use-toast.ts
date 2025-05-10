"use client"

// Simple toast hook for notifications
export function useToast() {
  const toast = ({ title, description }: { title: string; description?: string }) => {
    alert(`${title}\n${description || ""}`)
  }

  return { toast }
}
