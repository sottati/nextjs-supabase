import React from 'react'
import { ThemeToggler } from "@/components/ThemeToggler";
import { Button } from './ui/button';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { signout } from '@/app/login/actions'


export default async function Navbar() {

    const supabase = await createClient();

    const { data: { user }} = await supabase.auth.getUser();

  return (
    <div className="absolute top-4 left-4 flex flex-row gap-2">
        <ThemeToggler />
        {user !== null ? (
            <form action={signout} className='flex flex-row gap-2'>
                <Button variant={'outline'}>{user.email}</Button>
                <Button>Log Out</Button>
            </form>
        ) : (
            <Button variant={'secondary'}>
                <Link href="/login">Log In</Link>
            </Button>
        )}
        <Button variant="link">
            <Link href="/todos">Todos</Link>
        </Button>
    </div>
  )
}