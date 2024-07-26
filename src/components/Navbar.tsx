import React from 'react'
import { ThemeToggler } from "@/components/ThemeToggler";
import { Button } from './ui/button';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { signout } from '@/app/login/actions'
import { User } from 'lucide-react';


export default async function Navbar() {

    const supabase = await createClient();

    const { data: { user }} = await supabase.auth.getUser();

    console.log(user?.user_metadata.user_name)

  return (
    <div className="absolute top-4 left-4 flex flex-row gap-2">
        <ThemeToggler />
        {user !== null ? (
            <form action={signout} className='flex flex-row gap-2'>
                <Button className='flex flex-row p-3 gap-1' variant={'outline'}>
                    <User className='size-[1.2rem]'></User>
                    {user.user_metadata.user_name}
                </Button>
                <Button variant="secondary">Log Out</Button>
            </form>
        ) : (
            <Button variant={'secondary'}>
                <Link href="/login">Log In</Link>
            </Button>
        )}
        <Button variant="link">
            <Link href="/todos">Todos</Link>
        </Button>
        <Button variant="link">
            <Link href="/dolar">Dolar</Link>
        </Button>
    </div>
  )
}