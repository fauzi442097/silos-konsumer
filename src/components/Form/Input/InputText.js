import React, { forwardRef } from 'react'

// eslint-disable-next-line react/display-name
const InputText = forwardRef(({ 
  className, 
  errors, 
  name, 
  validation, 
  register,
  hideError = false, 
  ...props 
}, ref) => {

   return (
     <>
       <input 
         type={'text'} 
         className={`form-control ${errors ? 'form-invalid' : ''} ${className || ''}`}
         ref={null}
         {...register && {...register(name, validation)} }
         {...props} 
         />
       {(errors && !hideError) && <span className='mt-1 block text-sm form-invalid-message'>{errors.message}</span>}
     </>
   )
 });

export default InputText