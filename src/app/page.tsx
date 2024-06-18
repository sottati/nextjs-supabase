import { ThemeToggler } from "@/components/ThemeToggler";
import ToDoCard from "@/components/ToDoCard";
import { Button } from "@/components/ui/button";
import { Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle, } from "@/components/ui/card";
import Image from "next/image";



interface Todo {
  todo: string;
  desc: string;
}

export default function Home() {
  return (
    <main className="grid place-items-center gap-4 p-4">
      <div className="absolute top-4 left-4">
        <ThemeToggler />
      </div>
      <h1>To Do List App</h1>
      <ToDoCard todo="Tarea numero 1" desc="descripcion de la tarea 1" />
    </main>
  );
}
