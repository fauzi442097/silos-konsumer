import React from 'react'

const Textarea = ({ children, ...props}) => {
  return (
    <textarea 
        className={`form-control w-full ${props.className || ''}`} {...props} />
  )
}

export default Textarea