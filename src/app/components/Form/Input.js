import React from 'react'
import InputDate from './InputDate'

const InputText = ({ className, ...props }) => {
  return (
    <input type={'text'} className={`form-control ${className || ''}`} {...props} />
  )
}

const InputPassword = ({ className, ...props }) => {
  return (
    <input type={'password'} className={`form-control ${className || ''}`} {...props} />
  )
}

const InputFile = ({ className, ...props }) => {
  return (
    <input type={'file'} className={`form-control-file ${className || ''}`} {...props} />
  )
}

const InputNumber = ({ className, ...props }) => {
  return (
    <input type={'number'} onWheel={(e) => e.target.blur()} className={`form-control ${className || ''}`} {...props} />
  )
}


const Input = {
  Text : InputText,
  Number : InputNumber,
  Password: InputPassword,
  File: InputFile,
  Date: InputDate
}

export default Input