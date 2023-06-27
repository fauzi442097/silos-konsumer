'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

import Input from '@/components/Form/Input';
import Button from '@/components/Button';


import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingSpinner from '@/components/LoadingSpinner';
import { API } from '@/config/api';
import { AnimatePresence } from 'framer-motion'
import Alert from '@/components/Alert';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
 
const cookies = new Cookies();
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
  const router = useRouter();
  const [ alert, setAlert ] = useState({show: false,rc: 0,message: ''})

  const { setAuth, isAuthenticated} = useAuth()
  if ( isAuthenticated) router.push('/')  

  const onSubmit = async (formData) => {
      setProcessing(true)
      const { data, status, statusText} = await API.POST_PUBLIC(`auth/login`, formData)
      setProcessing(false)
      if ( status != 200 ) return setAlert({show: true, rc: status, message: statusText})
      console.log(data)

      let token = data.data.token
      let user = data.data.user

      setAuth(token, user)
      router.push('/')  
  }

  return (
    <div className='w-full mt-4'>

      <AnimatePresence>
          { alert.show && <Alert onClose={() => setAlert((prev) => ({...prev, show: false}))} type="error" title={`Error - ${alert.rc}`} message={alert.message}/>}
      </AnimatePresence>

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