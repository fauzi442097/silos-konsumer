import React from 'react'
import { FaCheck } from 'react-icons/fa'


const Checkbox = ({ label, className, ...props}) => {
  return (
   <label className={`checbox-container relative select-none gap-1.5 items-center inline-flex ${className || ''}`}>
      <span className='h-5 w-5'>
         <input type="checkbox" className='form-check border rounded-md peer' {...props}/>
         <FaCheck className='font-inter-bold w-3 h-3 absolute text-green-600 dark:text-green-400 top-1.5 left-1 dark:text-opacity-0 text-opacity-0 transition check peer-checked:text-opacity-100'/>
      </span>
      <span> {label} </span>
   </label>
  )
}

export default Checkbox