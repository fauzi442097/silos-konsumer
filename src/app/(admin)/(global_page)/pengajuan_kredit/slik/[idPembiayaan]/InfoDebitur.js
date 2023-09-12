import { cn } from '@/lib/utils'
import React from 'react'
import moment from 'moment'

export const LabelDebitur = ({ label, value, className }) => {
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
            <LabelDebitur label={'Nama Debitur'} value={data[0].nasabah.nama_nasabah} />
            <hr className='border-dashed border-gray-400' />
            <LabelDebitur label={'No Identitas'} value={data[0].nasabah.no_identitas} />
            <hr className='border-dashed border-gray-400' />
            <LabelDebitur label={'Tempat Lahir'} value={data[0].nasabah.tpt_lahir} />
            <hr className='border-dashed border-gray-400' />
            <LabelDebitur label={'Tanggal Lahir'} value={moment(data[0].nasabah.tgl_lahir).format('LL')} />
            <hr className='border-dashed border-gray-400' />
            <LabelDebitur label={'Alamat'} value={data[0].nasabah.alamat} className={'mb-0'} />
         </div>
      </div>
   )
}

export default InfoDebitur