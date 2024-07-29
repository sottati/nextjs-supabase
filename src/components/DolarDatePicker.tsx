"use client"

import * as React from "react"
import { useState } from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { geDolarInRange } from "@/app/dolar/actions"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import DolarChart from "./DolarChart"

export default function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
    // to: addDays(new Date(), 0),
  })
  const [dolarData, setDolarData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchData = async () => {
    if (!date.from || !date.to) {
      console.error("Las fechas 'from' y 'to' deben estar definidas.");
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await geDolarInRange(date.from, date.to);
      setDolarData(data || []);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-row flex-wrap gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
            {/* <Select
            onValueChange={(value) =>
                setDate(addDays(new Date(), parseInt(value)))
            }
            >
            <SelectTrigger>
                <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
                <SelectItem value="0">Today</SelectItem>
                <SelectItem value="1">Tomorrow</SelectItem>
                <SelectItem value="3">In 3 days</SelectItem>
                <SelectItem value="7">In a week</SelectItem>
            </SelectContent>
            </Select> */}
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <Button variant="outline" onClick={handleFetchData} disabled={isLoading}>{isLoading ? 'Cargando...' : 'Obtener Datos'}</Button>
      <p className="my-auto text-center">
        Desde: {date?.from ? format(date.from, 'dd/MM/yyyy') : 'Sin fecha'} hasta: {date?.to ? format(date.to, 'dd/MM/yyyy') : 'Sin fecha'}
      </p>
    </div>
  )
}