import React from 'react'

const checkIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24'><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M20 7L10 17l-5-5'/></svg>"

const Checkbox = ({ label, className, ...props}) => {
  return (
   <label className={`checbox-container relative select-none gap-1.5 items-center inline-flex ${className || ''}`}>
      <span className='h-5 w-5'>
         <input type="checkbox" className='form-check border rounded-md peer' {...props}/>
         <span className='font-inter-bold absolute text-green-600 dark:text-green-400 top-[0.2rem] left-[0.05rem] dark:text-opacity-0 text-opacity-0 transition check peer-checked:text-opacity-100'
         dangerouslySetInnerHTML={{ __html: checkIcon }}/>
      </span>
      <span> {label} </span>
   </label>
  )
}

export default Checkbox