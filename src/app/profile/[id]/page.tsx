'use client'
import React from 'react'

function page({params}) {
  return (
    <div className=' flex flex-col items-center justify-center min-h-screen'>
        <h1>The Id is</h1>
        <h2 className=' bg-green-500 text-black p-3 mt-2'>{params.id}</h2>
    </div>
  )
}

export default page