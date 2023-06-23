import Button from '@/app/components/Button'
import React from 'react'

import { FiSave } from 'react-icons/fi'

const FormButton = () => {
  return (
   <div className='flex gap-2 items-start'>
      <Button.Primary className='btn-sm'> Simpan </Button.Primary>
      <Button.Primary> Simpan </Button.Primary>
      <Button.LightPrimary className='btn-lg'> Simpan </Button.LightPrimary>
      <Button.OutlinePrimary> Simpan </Button.OutlinePrimary>
      <Button.Icon className="btn-primary"> <FiSave className='text-lg'/> </Button.Icon>
      <Button.Secondary> Simpan </Button.Secondary>
      <Button.LightPrimary> Simpan </Button.LightPrimary>
   </div>
  )
}

export default FormButton