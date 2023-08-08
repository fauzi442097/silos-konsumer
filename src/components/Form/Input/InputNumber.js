import React from 'react'

const InputNumber = ({ 
    className, 
    errors, 
    name, 
    validation, 
    register, 
    hideError = false, 
    maxLength = 0,
    ...props 
}) => {

  const setMaxLength = (e) => {
    if ( maxLength != 0 && e.target.value.length > maxLength ) {
      e.target.value = Math.abs(e.target.value.slice(0, maxLength))
    }
  }

   return (
      <>
        <input 
          type={'number'} 
          onWheel={(e) => e.target.blur()} 
          onInput={setMaxLength}
          className={`form-control ${errors ? 'form-invalid' : ''} ${className || ''}`} 
          {...register && {...register(name, validation)} }
          {...props} />
        {(errors && !hideError) && <span className='mt-1 block text-sm form-invalid-message'>{errors.message}</span>}
      </>
   )
}

export default InputNumber

 