"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Dolar } from '@/types/custom';  // Asegúrate de tener el tipo Dolar definido correctamente

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

  const { data, error } = await supabase.from<Dolar>("Dolar").select("*");

  if (error) {
    console.error("Error fetching dolar data:", error);
    return null;
  }

  return { data };
}
