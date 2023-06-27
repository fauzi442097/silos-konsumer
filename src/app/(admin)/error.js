'use client'

import Button from '@/components/Button'
import React from 'react'

const error = ({ error, reset }) => {
  return (
    <div className='fixed inset-0 flex justify-center items-center flex-col w-full'>
        <div className='p-8'>
          <h1>Something went wrong!</h1>
          <p className='text-danger text-xl'> {error.message || 'Terjadi kesalahan'} </p>
          <Button.Primary size={'sm'} onClick={reset}> Try Again </Button.Primary>
        </div>
    </div>
  )
}

export default error