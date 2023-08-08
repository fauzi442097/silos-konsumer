import React from 'react'

const InputText = ({ 
  className, 
  errors, 
  name, 
  validation, 
  register,
  hideError = false, 
  ...props 
}) => {

   return (
     <>
       <input 
         type={'text'} 
         className={`form-control ${errors ? 'form-invalid' : ''} ${className || ''}`}
         {...register && {...register(name, validation)} }
         {...props} />
       {(errors && !hideError) && <span className='mt-1 block text-sm form-invalid-message'>{errors.message}</span>}
     </>
   )
 }

export default InputText