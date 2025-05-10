import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-[#008080] mb-8">Nutrition App</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/Feedback">
          <Button className="bg-[#008080] hover:bg-[#008080]/90 min-w-[200px]">Submit Feedback</Button>
        </Link>

        <Link href="/Feedback-Dashboard">
          <Button variant="outline" className="border-[#008080] text-[#008080] hover:bg-[#008080]/10 min-w-[200px]">
            View Feedback Dashboard
          </Button>
        </Link>

        <Link href="/CoachReservation">
          <Button className="bg-[#00FF7F] text-[#008080] hover:bg-[#00FF7F]/90 min-w-[200px]">
            Book Coaching Session
          </Button>
        </Link>
      </div>
    </div>
  )
}
