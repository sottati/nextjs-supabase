import { ThemeToggler } from "@/components/ThemeToggler";
import ToDoCard from "@/components/ToDoCard";

interface Todo {
  todo: string;
  desc: string;
}

export default function Home() {
  return (
    <main className="grid place-items-center gap-4 p-4">
      <h1>To Do List App</h1>
    </main>
  );
}
