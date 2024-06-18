import ToDoCard from '@/components/ToDoCard'
import { createClient } from '@/utils/supabase/server';
import React from 'react'
import { redirect } from "next/navigation"

async function page() {
    const supabase = await createClient();

    const { data: { user }, } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login")
    }

    const todos = ["This is a todo"]
  return (
    <div className='grid place-items-center gap-4 p-4'>
        <ToDoCard todo="Tarea numero 1" desc="descripcion de la tarea 1" ></ToDoCard>
    </div>
  )
}

export default page