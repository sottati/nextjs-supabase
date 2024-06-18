import React from 'react'
import { Card, CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle, } from './ui/card'
import { Separator } from './ui/separator'
import { Button } from './ui/button'

function ToDoCard( {todo, desc} ) {
  return (
    <Card>
        <CardHeader>
            <CardTitle>{todo}</CardTitle>
            <CardDescription>{desc}</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-row gap-2'>
            <Button variant={'outline'}>Resolver</Button>
            <Button variant={'destructive'} >Eliminar</Button>
        </CardContent>
    </Card>
  )
}

export default ToDoCard