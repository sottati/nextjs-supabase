"use client"

import React from 'react'
import { Card, CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle, } from './ui/card'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { Todo } from '@/types/custom'
import { Checkbox } from './ui/checkbox'
import { cn } from '@/lib/utils'
import { Trash2 } from 'lucide-react'
import { deleteTodo, updateTodo } from '@/app/todos/actions'

function ToDoItem( { todo }: {todo: Todo} ) {
  return (
    <form>
      <ToDoCard todo={todo} />
    </form>
  )
}

function ToDoCard( { todo }: {todo: Todo} ) {
  return (
    <Card className={cn("w-full")}>
      <CardContent className='flex items-start gap-3 p-3'>
        <span className='size-10 flex items-center justify-center'>
          <Checkbox checked={Boolean(todo.is_complete)} onCheckedChange={async (val) => {
            if(val === "indeterminate") return
            await updateTodo({...todo, is_complete: val });
          }} />
        </span>
        <p className={cn("flex-1 pt-2 minw-0 break-words")}>{todo.task}</p>
        <Button formAction={async (data) => {
          await deleteTodo(todo.id)
        }} variant="ghost" size="icon">
          <Trash2 className='size-5' />
          <span className='sr-only'>Delete Todo</span>
        </Button>
      </CardContent>
    </Card>
  )
}

export default ToDoItem