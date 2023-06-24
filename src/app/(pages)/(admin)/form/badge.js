
import Badge from '@/app/components/Badge'
import React from 'react'

const FormBadge = () => {
  return (
   <div className='mt-3 flex gap-4'>
   <Badge.Success> Active </Badge.Success>
   <Badge.Warning> Probation </Badge.Warning>
   <Badge.Danger> Non Aktif </Badge.Danger>
   <Badge.Light> Default </Badge.Light>
 </div>
  )
}

export default FormBadge