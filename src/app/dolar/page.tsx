"use client"
 
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart } from "recharts"

import React from 'react'
import DolarChart from '@/components/DolarChart';

import { GetDolarTable } from "./actions"

const chartConfig = {
  valor: {
    label: "Puntas"
  },
  compra: {
    label: "Compra",
    color: "hsl(var(--chart-1))",
  },
  venta: {
    label: "Venta",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

const chartData = [
    {dia: "17/07/2024",	compra: 800.00, venta: 940.00},
    {dia: "18/07/2024",	compra: 1100.00, venta: 1150.00},
    {dia: "19/07/2024",	compra: 1315.00, venta: 1345.00},
    {dia: "22/07/2024",	compra: 1210.00, venta: 1240.00},
    {dia: "23/07/2024",	compra: 1415.00, venta: 1445.00},
    {dia: "24/07/2024",	compra: 1470.00, venta: 1310.00},
    {dia: "25/07/2024",	compra: 1215.00, venta: 1245.00},
  ]

export default function DolarPage() {
  return (
    <section className="mt-12 w-full max-w-2xl mx-auto flex flex-col justify-center p-8 gap-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Dolar
      </h1>
      <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 24,
              right: 24,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="dia"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={20}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="dot" labelKey="valor" nameKey="dia"/>}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <defs>
              <linearGradient id="fillVenta" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-venta)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-venta)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillCompra" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-compra)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-compra)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="compra"
              type="natural"
              fill="url(#fillCompra)"
              fillOpacity={0.4}
              stroke="var(--color-compra)"
              stackId="a"
            />
            <Area
              dataKey="venta"
              type="natural"
              fill="url(#fillVenta)"
              fillOpacity={0.4}
              stroke="var(--color-venta)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
        <DolarChart />
    </section>
  )
}
