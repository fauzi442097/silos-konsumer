import React from 'react'

const InputFile = ({ 
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
        type={'file'} 
        className={`form-control-file ${errors ? 'form-invalid' : ''} ${className || ''}`} 
        {...register && {...register(name, validation)} }
        {...props} 
      />
      {errors && <span className='mt-1 block text-sm form-invalid-message'>{errors.message}</span>}
    </>
  )
}

export default InputFile