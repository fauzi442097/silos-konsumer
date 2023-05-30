import React from 'react'

const Button = ({ children, className, ...props }) => {
  return (
    <button className={`btn btn-light-primary ${className || ''}`} {...props}> 
        {children} 
    </button>
  )
}

export default Button