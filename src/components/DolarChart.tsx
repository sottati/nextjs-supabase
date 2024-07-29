import React, { useEffect, useState } from 'react'
import { Dolar } from '@/types/custom'

import { createClient } from '@/utils/supabase/server';
import { redirect } from "next/navigation"

import { CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"

import { Area, AreaChart } from "recharts"
import { GetDolarTable, getDolartInRange } from '@/app/dolar/actions';

const chartConfig = {
    compra: {
      label: "Compra",
      color: "hsl(var(--chart-1))",
    },
    venta: {
      label: "Venta",
      color: "hsl(var(--chart-2))",
    },
    media: {
      label: "Media",
      color: "hsl(var(--chart-3))",
    }
  } satisfies ChartConfig

export default function DolarChart() {
  const [dolarData, setDolarData] = useState<Dolar[]>([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      // const result = await getDolartInRange();
      const result = await GetDolarTable();

      setIsLoading(true)
      if (result?.data) {
        const parsedData = result.data.map(item => ({
          ...item,
          compra: parseFloat(item.compra.replace(',', '.')),
          venta: parseFloat(item.venta.replace(',', '.')),
          media: 15.00,
        }));
        setDolarData(parsedData);
        setIsLoading(false)
      } else {
        redirect("/login");
      }
    }
    fetchData();
  }, []);

  console.log(dolarData)

  return (
    <div>
      {isLoading ? (<p>Cargando...</p>) : (
        <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={dolarData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("es-ES", {
                    month: "short",
                    day: "numeric",
                  })
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickCount={10}
              />
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent indicator="dot"/>}
              />
              <ChartLegend content={<ChartLegendContent />}/>
              <defs>
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
                type="linear"
                fill="url(#fillCompra)"
                fillOpacity={0.4}
                stroke="var(--color-compra)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </div>
  )
}
