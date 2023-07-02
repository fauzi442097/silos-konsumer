
import Badge from '@/components/Badge'
import React from 'react'

const FormBadge = () => {
  return (
   <div className='mt-3 flex gap-4'>
   <Badge variant={'success'}> Active </Badge>
   <Badge variant={'warning'}> Probation </Badge>
   <Badge variant={'danger'}> Non Aktif </Badge>
   <Badge variant={'light'}> Default </Badge>
 </div>
  )
}

export default FormBadge