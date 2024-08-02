"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { DateRangeProp, Dolar, DolarChartProps } from '@/types/custom';  // Asegúrate de tener el tipo Dolar definido correctamente

export async function GetDolarTable() {
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error("Error fetching user:", userError);
    return null;
  }

  if (!user) {
    redirect("/login");
    return null;
  }

  const { data, error } = await supabase.from<Dolar>("Dolar").select().order("date", { ascending: true });

  if (error) {
    console.error("Error fetching dolar data:", error);
    return null;
  }

  return { data };
}


export async function getDolarInRange(dateRange: DateRangeProp) {
  const supabase = createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.error("Error fetching user:", userError);
    return null;
  }

  if (!user) {
    return { error: "User not authenticated" };
  }

  const { data, error } = await supabase
    .from<Dolar>("Dolar")
    .select()
    .gte('date', dateRange.from)  // Fecha de inicio
    .lte('date', dateRange.to)    // Fecha final
    .order('date', { ascending: true }); // Ordenar por fecha

  if (error) {
    console.error("Error fetching dolar data:", error);
    return null;
  }

  return { data };
}
