import React from 'react'

const Radio = ({ 
   label, 
   className,
   name,
   validation, 
   register,  
   errors,
   ...props
}) => {
   return (
      <>
         <label htmlFor={props.is} className="radio-label">
            <input
               className="radio-input"
               type="radio"
               {...props}
               {...register && {...register(name, validation)} }
            />
            <span className="custom-radio" />
            <span className='inline-block -ml-1 dark:text-grey'> {label} </span>
         </label>
         {errors && <span className='mt-1 block text-sm form-invalid-message'>{errors.message}</span>}
      </>
   )
 }
 

export default Radio