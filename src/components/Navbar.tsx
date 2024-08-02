import React from "react";
import { ThemeToggler } from "@/components/ThemeToggler";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { signout } from "@/app/login/actions";
import { User, LogOut } from "lucide-react";
import { TransitionLink } from "./utils/TransitionLink";
import { Card } from "./ui/card";

export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <Card className="flex flex-row md:flex-col w-full md:w-1/6 p-4 gap-2">
      <ThemeToggler />
      {user !== null ? (
        <form
          action={signout}
          className="flex flex-row md:flex-col xl:flex-row justify-between gap-2"
        >
          <Button className="grow flex flex-row p-3 gap-1" variant={"outline"}>
            <User className="size-[1.2rem]"></User>
            {user.user_metadata.user_name}
          </Button>
          <Button
            variant="secondary"
            className="flex items-center justify-center p-2 md:p-3 gap-2"
          >
            <LogOut className="size-[1.2rem]" />
            <span className="hidden md:inline xl:hidden">Log Out</span>
          </Button>
        </form>
      ) : (
        <Button variant={"secondary"}>
          <Link href="/login">Log In</Link>
        </Button>
      )}
      <Button variant="outline">
        <TransitionLink href="/">Home</TransitionLink>
      </Button>
      <Button variant="outline">
        <TransitionLink href="/todos">Todos</TransitionLink>
      </Button>
      <Button variant="outline">
        <TransitionLink href="/dolar">Dolar</TransitionLink>
      </Button>
    </Card>
  );
}
