import React from 'react'

const InputPassword = ({ 
  className, 
  errors, 
  name, 
  validation, 
  register,
  ...props 
}) => {
   return (
      <>
       <input 
          type={'password'} 
          className={`form-control ${errors ? 'form-invalid' : ''} ${className || ''}`} 
          {...register && {...register(name, validation)} }
          {...props} 
        />
       {errors && <span className='mt-1 block text-sm form-invalid-message'>{errors.message}</span>}
      </>
   )
 }

export default InputPassword