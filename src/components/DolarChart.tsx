import React, { useEffect, useState } from "react";
import { DateRangeProp, Dolar, DolarChartProps } from "@/types/custom";

import { CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

import { Area, AreaChart, Line, LineChart } from "recharts";
import { GetDolarTable, getDolarInRange } from "@/app/dolar/actions";
import { Switch } from "./ui/switch";

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
  },
} satisfies ChartConfig;

export default function DolarChart({ dateRange }: DolarChartProps) {
  const [dolarData, setDolarData] = useState<Dolar[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showChart, setShowChart] = useState(false);

  const handleToggle = () => {
    setShowChart((showChart) => !showChart);
  };

  useEffect(() => {
    async function fetchData() {
      if (!dateRange || !dateRange.from || !dateRange.to) {
        return;
      }

      setIsLoading(true);

      const result = await getDolarInRange(dateRange);
      if (result?.data) {
        const parsedData = result.data.map((item) => ({
          ...item,
          compra: parseFloat(item.compra.replace(",", ".")),
          venta: parseFloat(item.venta.replace(",", ".")),
        }));
        setDolarData(parsedData);
        setIsLoading(false);
      } else {
        setError(result.error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [dateRange]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Switch onClick={handleToggle} />
      {/* <Button onClick={handleToggle} variant={'outline'}>{showChart ? 'ON' : 'Mostrar valor venta'}</Button> */}
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={dolarData}
            margin={{
              left: 0,
              right: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(6, 11)}
              angle={-45}
              textAnchor="end"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={8}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="dot" />}
            />
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
            </defs>
            <Line
              dataKey="compra"
              type="monotone"
              fill="var(--color-compra)"
              fillOpacity={0.4}
              stroke="var(--color-compra)"
              dot={false}

              // stackId="a"
            />
            {showChart && (
              <Line
                dataKey="venta"
                type="natural"
                stroke="var(--color-venta)"
                dot={false}
              />
            )}
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      )}
    </div>
  );
}
