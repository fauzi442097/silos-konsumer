import { cn } from '@/lib/utils'
import React from 'react'

const LabelScoring = ({label, value, className}) => {
   return (
      <div className={cn('flex justify-between my-4', className)}>
         <label className='text-muted'> {label} </label>
         <p className='mb-0 dark:text-grey'>{value} </p>
      </div>
   )
}

const InfoScoring = ({ data }) => {
  return (
   <div className='bg-white dark:bg-dark-depth1 w-[25%] rounded-2xl py-8 px-8' style={{ boxShadow: '0px -3px #2e9a47, 0px 2px 1px #dfe0e0' }}> 
      <p className='font-inter-medium text-xl text-gray-500 mb-1'> Scoring </p>
      <div className='my-8'>
         <LabelScoring label={'Hasil Slik'} value={data.biCheck}/>
         <hr className='border-dashed border-gray-400'/>
         <LabelScoring label={'Nama Analis'} value={data.namaAnalis}/>
         <hr className='border-dashed border-gray-400'/>
         <LabelScoring label={'Skor Analis'} value={data.score}/>
         <hr className='border-dashed border-gray-400'/>
         <LabelScoring label={'Rekomendasi'} value={data.rekomendasi}/>
         <hr className='border-dashed border-gray-400'/>
         <LabelScoring label={'Level Risiko'} value={data.risk}/>
         <hr className='border-dashed border-gray-400'/>
         <LabelScoring label={'Riti'} value={data.riti.toFixed(2)}/>
         <hr className='border-dashed border-gray-400'/>
         <LabelScoring label={'Collateral Coverage'} value={0} className={'mb-0'}/>
      </div>
   </div>
  )
}

export default InfoScoring