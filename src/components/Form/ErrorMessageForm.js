import React from 'react'

const ErrorMessageForm = ({ children }) => {
  return (
    <span className='block text-sm form-invalid-message'>{children}</span>
  )
}

export default ErrorMessageForm