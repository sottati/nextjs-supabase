import { Database } from "./supabase";

export type Todo = Database["public"]["Tables"]["todos"]["Row"]
export type Dolar = Database["public"]["Tables"]["Dolar"]["Row"]