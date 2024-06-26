"use client";

import { Button } from "@/components/ui/button";
import { Provider } from "@supabase/supabase-js"
import { Github } from "lucide-react";
import { oAuthSignIn } from "./actions";

type OAuthProvider = {
    name: Provider;
    displayName: string;
    icon?: JSX.Element;
}

export function OAuthButtons() {
    const oAuthProviders: OAuthProvider[] = [
        {
            name: "github",
            displayName: "GitHub",
            icon: <Github className="size-5" />
        }
    ];

    return ( 
    <>
    {oAuthProviders.map((provider) => (
        <Button variant="outline" className="flex flex-row gap-2" onClick={async () => {
            await oAuthSignIn(provider.name)
        }}>
            Login with {provider.displayName}
            {provider.icon}
        </Button>
      ))}
    </>
    )
}