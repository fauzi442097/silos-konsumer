'use client'
import { Button, Input } from '@/app/components'
import React from 'react'

const page = () => {

  const login = () => {
    alert('tes');
  }

  return (
    <div className='w-full mt-4'>
      <form onSubmit={() => login()}>
        <h2 className='mt-8 mb-10'> Login </h2>
        <div className='mb-6'>
          <label className='mb-1.5 block dark:text-grey'> Username </label>
          <Input.Text/>
        </div>
        <div className='mb-6'>
          <label className='mb-1.5 block dark:text-grey'> Password </label>
          <Input.Password/>
        </div>
        <div className='my-8'>
            <Button.Primary type="submit" className={'w-full'}> Login </Button.Primary>
        </div>
       </form>
    </div>
  )
}

export default page