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
          <Checkbox />
        </span>
        <p className={cn("flex-1 pt-2 minw-0 break-words")}>{todo.task}</p>
        <Button variant="ghost" size="icon">
          <Trash2 className='size-5' />
          <span className='sr-only'>Delete Todo</span>
        </Button>
      </CardContent>
    </Card>
  )
}

export default ToDoItem