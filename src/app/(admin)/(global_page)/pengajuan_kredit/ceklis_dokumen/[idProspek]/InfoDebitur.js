'use client'

import React from 'react'
import { LabelDebitur } from '../../slik/[idProspek]/InfoDebitur'

const InfoDebitur = ({ data }) => {

   console.log(data)
  return (
      <div className='bg-white dark:bg-dark-depth1 w-[25%] rounded-2xl py-8 px-8 self-start' style={{ boxShadow: '0px -3px #2e9a47, 0px 2px 1px #dfe0e0' }}> 
         <p className='font-inter-medium text-xl text-gray-500 mb-1'> Informasi Debitur </p>

         <div className='my-8'>
            <LabelDebitur label={'Nama Debitur'} value={data.nmProspek}/>
            <hr className='border-dashed border-gray-400'/>
            <LabelDebitur label={'No Identitas'} value={data.noIdentitas}/>
            <hr className='border-dashed border-gray-400'/>
            <LabelDebitur label={'Jenis Kelamin'} value={data.jenisKelamin}/>
            <hr className='border-dashed border-gray-400'/>
            <LabelDebitur label={'Tempat Lahir'} value={data.tempatLahir}/>
            <hr className='border-dashed border-gray-400'/>
            <LabelDebitur label={'Status Menikah'} value={data.menikahDesc} className={'mb-0'}/>
         </div>
     
      </div>
  )
}

export default InfoDebitur