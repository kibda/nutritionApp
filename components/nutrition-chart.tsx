"use client"

import { useState } from "react"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const nutritionData = [
  {
    name: "Mon",
    calories: 2100,
    protein: 150,
    carbs: 200,
    fat: 70,
  },
  {
    name: "Tue",
    calories: 2300,
    protein: 160,
    carbs: 220,
    fat: 75,
  },
  {
    name: "Wed",
    calories: 2000,
    protein: 140,
    carbs: 190,
    fat: 65,
  },
  {
    name: "Thu",
    calories: 2200,
    protein: 155,
    carbs: 210,
    fat: 72,
  },
  {
    name: "Fri",
    calories: 2400,
    protein: 165,
    carbs: 230,
    fat: 78,
  },
  {
    name: "Sat",
    calories: 1900,
    protein: 135,
    carbs: 180,
    fat: 62,
  },
  {
    name: "Sun",
    calories: 2050,
    protein: 145,
    carbs: 195,
    fat: 68,
  },
]

const macroData = [
  {
    name: "Protein",
    value: 30,
    color: "#10b981",
  },
  {
    name: "Carbs",
    value: 45,
    color: "#3b82f6",
  },
  {
    name: "Fat",
    value: 25,
    color: "#f59e0b",
  },
]

export function NutritionChart() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <Tabs defaultValue="calories" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="calories">Calories</TabsTrigger>
        <TabsTrigger value="macros">Macros</TabsTrigger>
        <TabsTrigger value="breakdown">Daily Breakdown</TabsTrigger>
      </TabsList>

      <TabsContent value="calories" className="h-[300px]">
        <Chart>
          <ChartContainer>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={nutritionData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="calories" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Chart>
      </TabsContent>

      <TabsContent value="macros" className="h-[300px]">
        <Chart>
          <ChartContainer>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={nutritionData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="protein" fill="#10b981" />
                <Bar dataKey="carbs" fill="#3b82f6" />
                <Bar dataKey="fat" fill="#f59e0b" />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Chart>
      </TabsContent>

      <TabsContent value="breakdown" className="h-[300px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-1/2">
            <Chart>
              <ChartContainer>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={nutritionData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="protein" stroke="#10b981" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="carbs" stroke="#3b82f6" />
                    <Line type="monotone" dataKey="fat" stroke="#f59e0b" />
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </Chart>
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="text-center font-medium">Macro Distribution</div>
            <div className="flex flex-col gap-2">
              {macroData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <div className="flex-1 text-sm">
                    {item.name} ({item.value}%)
                  </div>
                  <div className="w-full max-w-[180px]">
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${item.value}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
