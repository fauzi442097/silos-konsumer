import { cn } from '@/lib/utils'
import React from 'react'

const Textarea = ({ 
  className, 
  errors, 
  name, 
  validation, 
  register, 
  children, 
  ...props
}) => {
  return (
    <>
      <textarea 
          className={cn('form-control w-full', className && className)} 
          {...register && {...register(name, validation)} }
          {...props} 
        />
      {errors && <span className='mt-1 block text-sm form-invalid-message'>{errors.message}</span>}
    </>
  )
}

export default Textarea