import { cn } from '@/lib/utils'
import React from 'react'

export const LabelDebitur = ({label, value, className}) => {
   return (
      <div className={cn('flex justify-between my-4 flex-wrap', className)}>
         <label className='text-muted'> {label} </label>
         <p className='mb-0 dark:text-grey'>{value} </p>
      </div>
   )
}

const InfoDebitur = ({ data }) => {
  return (
   <div className='bg-white dark:bg-dark-depth1 w-[25%] rounded-2xl py-8 px-8' style={{ boxShadow: '0px -3px #2e9a47, 0px 2px 1px #dfe0e0' }}> 
      <p className='font-inter-medium text-xl text-gray-500 mb-1'> Informasi Debitur </p>
      <div className='my-8'>
         <LabelDebitur label={'Nama Debitur'} value={data.namaNasabah}/>
         <hr className='border-dashed border-gray-400'/>
         <LabelDebitur label={'No Identitas'} value={data.noIdentitas}/>
         <hr className='border-dashed border-gray-400'/>
         <LabelDebitur label={'Tempat Lahir'} value={data.tempatLahir}/>
         <hr className='border-dashed border-gray-400'/>
         <LabelDebitur label={'Tanggal Lahir'} value={data.tanggalLahir}/>
         <hr className='border-dashed border-gray-400'/>
         <LabelDebitur label={'Alamat'} value={data.alamat} className={'mb-0'}/>
      </div>
   </div>
  )
}

export default InfoDebitur