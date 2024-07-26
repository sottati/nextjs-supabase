import React, { useEffect, useState } from 'react'
import { Dolar } from '@/types/custom'

import { createClient } from '@/utils/supabase/server';
import { redirect } from "next/navigation"

import { CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"

import { Area, AreaChart } from "recharts"
import { GetDolarTable } from '@/app/dolar/actions';

const chartConfig = {
    compra: {
      label: "Compra",
      color: "hsl(var(--chart-1))",
    },
    venta: {
      label: "Venta",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig

export default function DolarChart() {
  const [dolarData, setDolarData] = useState<Dolar[]>([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const result = await GetDolarTable();
      setIsLoading(true)
      if (result?.data) {
        const parsedData = result.data.map(item => ({
          ...item,
          compra: parseFloat(item.compra.replace(',', '.')),
          venta: parseFloat(item.venta.replace(',', '.')),
        }));
        setDolarData(parsedData);
        setIsLoading(false)
      } else {
        // Manejar redirección o estado de carga
        redirect("/login");
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (<p>Cargando...</p>) : (
        <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={dolarData}
              margin={{
                left: 24,
                right: 24,
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
              {/* <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickCount={10}
              /> */}
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Area
                dataKey="compra"
                type="linear"
                fill="var(--color-compra)"
                fillOpacity={0.4}
                stroke="var(--color-compra)"
                stackId="a"
              />
              <Area
                dataKey="venta"
                type="linear"
                fill="var(--color-venta)"
                fillOpacity={0.4}
                stroke="var(--color-venta)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </div>
  )
}
