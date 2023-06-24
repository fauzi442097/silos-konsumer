'use client'
import React from 'react'
import { usePathname } from 'next/navigation';
import Input from '@/app/components/Form/Input';
import Button from '@/app/components/Button';

const Page = () => {
  const pathname = usePathname();  
  const login = () => {
    pathname.startsWith('/dashboard');
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

export default Page