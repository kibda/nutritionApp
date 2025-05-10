import { Badge } from "@/components/ui/badge"
import { Trophy } from "lucide-react"

const achievements = [
  {
    id: 1,
    title: "5K Run Completed",
    date: "May 8, 2024",
    description: "Completed your first 5K run in under 30 minutes",
    type: "Cardio",
  },
  {
    id: 2,
    title: "100lb Bench Press",
    date: "May 5, 2024",
    description: "Reached your goal of bench pressing 100lbs",
    type: "Strength",
  },
  {
    id: 3,
    title: "7-Day Streak",
    date: "May 1, 2024",
    description: "Completed workouts for 7 consecutive days",
    type: "Consistency",
  },
]

export function RecentAchievementsCard() {
  return (
    <div className="space-y-4">
      {achievements.length > 0 ? (
        <>
          {achievements.map((achievement) => (
            <div key={achievement.id} className="flex items-start gap-4 rounded-lg border p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{achievement.title}</h4>
                  <Badge variant="outline">{achievement.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                <p className="text-xs text-muted-foreground">{achievement.date}</p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <Trophy className="mb-2 h-10 w-10 text-muted-foreground" />
          <h3 className="mb-1 font-medium">No Achievements Yet</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Complete workouts and reach your goals to earn achievements.
          </p>
        </div>
      )}
    </div>
  )
}
