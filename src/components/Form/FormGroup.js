import { cn } from '@/lib/utils'
import React from 'react'

const FormGroup = ({ className, label, input }) => {
  return (
    <div className={cn('flex gap-4 flex-wrap mb-2', className)}>
      {label}
      {input}
    </div>
  )
}

export default FormGroup