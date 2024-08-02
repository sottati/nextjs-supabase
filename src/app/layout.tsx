import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dolar App | sottati",
  description: "Creada por el mascapito de sottati",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body className="h-screen w-screen flex">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          themes={["red", "dark", "light", "aesthetic"]}
          disableTransitionOnChange
        >
          <div className="flex flex-col md:flex-row w-full h-full p-4 gap-4">
            <Navbar />
            <main className="flex-1 flex border rounded-lg p-6 overflow-y-scroll">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
