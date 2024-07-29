"use client"

import React, { useState } from 'react'
import DolarChart from '@/components/DolarChart';
import DolarDatePicker from "@/components/DolarDatePicker"

export default function DolarPage() {
  const [date, setDate] = useState({ from: null, to: null })
  return (
    <section className="mt-12 w-full max-w-3xl mx-auto flex flex-col justify-center p-8 gap-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Dolar
        {date.from, date.to}
      </h1>
      <DolarDatePicker />
      <DolarChart />
    </section>
  )
}
