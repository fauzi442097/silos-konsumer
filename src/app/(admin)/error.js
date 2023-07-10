'use client'

import Alert from '@/components/Alert'
import Button from '@/components/Button'
import React from 'react'

const error = ({ error, reset }) => {
  return (
    <div className='sticky flex justify-center items-center flex-col w-full'>
        <div className='p-8'>
          <h1> {error.name == 'Fetching Error' ? 'Failed to retrive data' : 'Something went wrong!'} </h1>
          <p className='text-danger text-xl'> {error.message || 'Terjadi kesalahan'} </p>
          <Button size={'sm'} onClick={reset}> Try Again </Button>
        </div>
    </div>
  )
}

export default error