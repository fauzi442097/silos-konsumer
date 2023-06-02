import React from 'react'
import { IoMdClose } from 'react-icons/io'


const ButtonPrimary = ({ children, className, ...props }) => {
  return (
    <button className={`btn btn-primary ${className || ''}`} {...props}> 
        {children} 
    </button>
  )
}

const ButtonLightPrimary = ({ children, className, ...props }) => {
  return (
    <button className={`btn btn-light-primary ${className || ''}`} {...props}> 
        {children} 
    </button>
  )
}

const ButtonOutlinePrimary = ({ children, className, ...props }) => {

  return (
    <button className={`btn btn-outline-primary ${className || ''}`} {...props}> 
      {children}
    </button>
  )
}

const ButtonSecondary = ({ children, className, ...props }) => {

  return (
    <button className={`btn btn-secondary ${className || ''}`} {...props}> 
        {children} 
    </button>
  )
}

const ButtonIcon = ({ children, className, ...props }) => {
  return (
    <button className={`btn ${className || ''}`} {...props}> 
        {children} 
    </button>
  )
}

const ButtonClean = ({ children, className, ...props }) => {
  return (
     <button className={`btn btn-clean ${className || ''}`} {...props}> 
        {children} 
    </button>
  )
}

const ButtonCloseModal = ({ ...props}) => {
  return (
    <button className='bg-slate-100 dark:hover:bg-[#2f3133] shadow-lg dark:bg-dark-depth2 rounded-lg p-1.5 border-slate-100 hover:bg-slate-200 hover:border-slate-200 transition-all duration-300' {...props}> 
      <IoMdClose className='text-xl text-slate-700 dark:text-grey'/>
    </button>
  )
}


const Button = {
  Primary : ButtonPrimary,
  LightPrimary : ButtonLightPrimary,
  OutlinePrimary: ButtonOutlinePrimary,
  Secondary : ButtonSecondary,
  Icon: ButtonIcon,
  Clean: ButtonClean,
  CloseModal : ButtonCloseModal
}



export default Button