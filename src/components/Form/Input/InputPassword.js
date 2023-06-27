import React, { useState } from 'react'


const EyeIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'><path fill='currentColor' d='M11.5 18c4 0 7.46-2.22 9.24-5.5C18.96 9.22 15.5 7 11.5 7s-7.46 2.22-9.24 5.5C4.04 15.78 7.5 18 11.5 18m0-12c4.56 0 8.5 2.65 10.36 6.5C20 16.35 16.06 19 11.5 19S3 16.35 1.14 12.5C3 8.65 6.94 6 11.5 6m0 2C14 8 16 10 16 12.5S14 17 11.5 17S7 15 7 12.5S9 8 11.5 8m0 1A3.5 3.5 0 0 0 8 12.5a3.5 3.5 0 0 0 3.5 3.5a3.5 3.5 0 0 0 3.5-3.5A3.5 3.5 0 0 0 11.5 9Z'/></svg>"
const EyeCloseIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'><path fill='currentColor' d='M2.54 4.71L3.25 4L20 20.75l-.71.71l-3.34-3.35c-1.37.57-2.87.89-4.45.89c-4.56 0-8.5-2.65-10.36-6.5c.97-2 2.49-3.67 4.36-4.82L2.54 4.71M11.5 18c1.29 0 2.53-.23 3.67-.66l-1.12-1.13c-.73.5-1.6.79-2.55.79C9 17 7 15 7 12.5c0-.95.29-1.82.79-2.55L6.24 8.41a10.64 10.64 0 0 0-3.98 4.09C4.04 15.78 7.5 18 11.5 18m9.24-5.5C18.96 9.22 15.5 7 11.5 7c-1.15 0-2.27.19-3.31.53l-.78-.78C8.68 6.26 10.06 6 11.5 6c4.56 0 8.5 2.65 10.36 6.5a11.47 11.47 0 0 1-4.07 4.63l-.72-.73c1.53-.96 2.8-2.3 3.67-3.9M11.5 8C14 8 16 10 16 12.5c0 .82-.22 1.58-.6 2.24l-.74-.74c.22-.46.34-.96.34-1.5A3.5 3.5 0 0 0 11.5 9c-.54 0-1.04.12-1.5.34l-.74-.74c.66-.38 1.42-.6 2.24-.6M8 12.5a3.5 3.5 0 0 0 3.5 3.5c.67 0 1.29-.19 1.82-.5L8.5 10.68c-.31.53-.5 1.15-.5 1.82Z'/></svg>"

const InputPassword = ({ 
  className, 
  errors, 
  name, 
  validation, 
  register,
  ...props 
}) => {

  const [ showPassword, setShowPassword ] = useState(false)

   return (
      <>
        <div className='input-group' {...props}>
            <input 
                type={!showPassword ? 'password' : 'text'} 
                className={`form-control ${errors ? 'form-invalid' : ''} ${className || ''}`} 
                {...register && {...register(name, validation)} }
                {...props} 
                style={{ borderRight: '0' }}
              />
            <div 
                className={`input-group-append flex justify-center items-center cursor-pointer dark:border-none dark:bg-dark-depth2 px-2 rounded-tr-xl rounded-br-xl border-t border-r border-b ${errors ? 'border-red-500 dark:border-red-400 focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-400 dark:focus:border-red-400' : ''}`} 
                style={{ borderLeft: '0' }}
                onClick={() => setShowPassword((prev) => !prev)}>
                <span className="dark:text-grey" dangerouslySetInnerHTML={{ __html: !showPassword ? EyeCloseIcon : EyeIcon }}/> 
            </div>
        </div>  
       {errors && <span className='mt-1 block text-sm form-invalid-message'>{errors.message}</span>}
      </>
   )
 }

export default InputPassword