"use client"
import Form from '@/components/helpers/Form';
import { useParams } from 'next/navigation';
import React from 'react'

const page = () => {
const { id } = useParams();
const parmId = id as string
  return (
    <div className='bg-secondary padding-x h-screen pt-10'>
    
      <Form parmID={parmId}/>
    </div>
  )
}

export default page
