import React from 'react'
import { Form } from './ui/form'
import ToDoItem from './ToDoItem'
import { Todo } from '@/types/custom'
import { TodoForm } from './ToDoForm'

export function ToDoList({ todos }: { todos: Array<Todo> }) {
    
  return (
    <>
      <div className='w-full flex flex-col gap-4'>
        <TodoForm />
        {todos?.map((todo) => {
            return <ToDoItem todo={todo} key={todo.id} />
        })}
      </div>
    </>
  )
}
