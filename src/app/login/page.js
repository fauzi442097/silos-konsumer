'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation';
import Input from '@/components/Form/Input';
import Button from '@/components/Button';

import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingSpinner from '@/components/LoadingSpinner';
import { PUBLIC_URL_API } from '@/config/env';

const loginSchema = yup.object({
  username: yup.string().required('Wajib diisi'),
  password: yup.string().required('Wajib diisi')
})

const Page = () => {

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const [ processing, setProcessing ] = useState(false)

  const pathname = usePathname();  
  const login = () => {
    pathname.startsWith('/dashboard');
  }

  const onSubmit = async (data) => {
    setProcessing(true)
    try {
      const result = await fetch(`${PUBLIC_URL_API}auth/login`, {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                      })

      console.log(result)
      setProcessing(false)
    } catch (e) {
      setProcessing(false)
    }
  }

  return (
    <div className='w-full mt-4'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className='mt-8 mb-10'> Login </h2>
        <div className='mb-8'>
          <label className='mb-1.5 block dark:text-grey'> Username </label>
          <Input.Text
              name={'username'}
              register={register}
              errors={errors.username}
            />
        </div>
        <div className='mb-8'>
          <label className='mb-1.5 block dark:text-grey'> Password </label>
          <Input.Password
            name={'password'}
            errors={errors.password}
            register={register}
          />
        </div>
        <div className='my-10'>
            <Button.Primary 
              type="submit" 
              disabled={processing}
              className={`w-full flex justify-center items-center gap-2 ${processing && 'cursor-not-allowed'}`}> 
                {processing && <LoadingSpinner/>} 
                {processing ? 'Processing ...' : 'Login'} 
            </Button.Primary>
        </div>
       </form>
    </div>
  )
}

export default Page