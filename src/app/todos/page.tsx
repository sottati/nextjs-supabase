import { createClient } from '@/utils/supabase/server';
import React from 'react'
import { redirect } from "next/navigation"
import { TodoForm } from '@/components/ToDoForm';
import { ToDoList } from '@/components/ToDoList';
import { Separator } from '@/components/ui/separator';

export default async function ToDosPage() {
    const supabase = await createClient();

    const { data: { user }, } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login")
    }

    const { data: todos } = await supabase.from("todos").select().order("inserted_at", { ascending: false })

  return (
    <section className="mt-12 p-3 pt-6 max-w-2xl w-full flex flex-col gap-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Todo's
      </h1>
      <Separator className="w-full " />
      <ToDoList todos={todos ?? []} />
  </section>
    // <div className='grid place-items-center gap-4 p-24'>
    //   <ToDoList />
    // </div>
  )
}
