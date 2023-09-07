import React, { forwardRef } from 'react'

// eslint-disable-next-line react/display-name
const InputHidden = forwardRef(({ 
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
         type={'hidden'} 
         ref={null}
         {...props} 
         />
     </>
   )
 });

export default InputHidden