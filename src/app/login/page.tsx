import { emaillogin, signup } from './actions'
import ToDoCard from "@/components/ToDoCard";
import { Button } from "@/components/ui/button";
import { Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle, } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { OAuthButtons } from './oauth-sigin';

export default async function LoginPage() {

  const supabase = await createClient();

    const { data: { user }, } = await supabase.auth.getUser();

    if (user) {
        return redirect("/todos")
    }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <Card>
        <CardHeader>
          <CardTitle>Log in</CardTitle>
          <CardDescription>Inicia Sesion</CardDescription>
        </CardHeader>
        <CardContent>
          <form  className='flex flex-col gap-4'>
            {/* <label htmlFor="email">Email:</label> */}
            <Input id="email" placeholder="Email" name="email" type="email" required  />
            {/* <label htmlFor="password">Password:</label> */}
            <Input id="password" placeholder="password" name="password" type="password" required  />
            <Button formAction={emaillogin}>Log in</Button>
            <OAuthButtons />
            <Button variant="link" formAction={signup}>Sign up</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}