import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";


import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "To Do App | sottati",
  description: "Creada por el mascapito de sottati",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            themes={["red", "blue", "dark", "light"]}
            disableTransitionOnChange
          >
            {children}
          <Navbar />
          </ThemeProvider>
        </body>
    </html>
  );
}
