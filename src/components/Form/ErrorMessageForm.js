import React from 'react'

const ErrorMessageForm = ({ children }) => {
  return (
    <span className='mt-1 block text-sm form-invalid-message'>{children}</span>
  )
}

export default ErrorMessageForm