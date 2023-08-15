import React from 'react'
import { InfoProfile } from '@/app/(admin)/(global_page)/profile/[id]/page'
import Badge from '@/components/Badge'
import Skeleton from 'react-loading-skeleton'
import FormSlik from './FormSlik'
import TabAction from '@/components/TabAction'

const Slik = ({ prevAction, onSubmit }) => {

  let idSlik = 1;
  const id = idSlik
  const isLoadingContent = false

  const storeSlik = (data) => {
    console.log(data)
    onSubmit();
}

  return (
    <>
      <div className='py-4'>

        <div className='flex flex-wrap justify-between items-center'>
          <div>
            <h2 className='mb-0'> {isLoadingContent ? <Skeleton width={150} height={20} borderRadius={'0.5rem'} /> : 'Ahmad Fauzi'} </h2>
            <span className='text-muted'> {isLoadingContent ? <Skeleton height={10} borderRadius={'0.5rem'} /> : '3273032001980821'} </span>
          </div>
          <span> {isLoadingContent ? <Skeleton height={20} width={50} borderRadius={'0.5rem'} /> : <Badge variant="danger" className={'text-xs'}> Progress Slik </Badge>}</span>
        </div>

        <div className='grid grid-cols-3 mt-4'>
          <InfoProfile
            className={'flex flex-col items-start justify-start'}
            label={'Tempat / Tanggal Lahir'}
            labelClass={'mb-1 flex-none'}
            value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'} /> : `Prindavan / 20-01-1990`}
            valueClass={'flex-none'} />

          <InfoProfile
            className={'flex flex-col items-start justify-start'}
            label={'Status Menikah'}
            labelClass={'mb-1 flex-none'}
            value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'} /> : 'Belum Menikah'}
            valueClass={'flex-none'}
          />

          <InfoProfile
            className={'flex flex-col items-start justify-start'}
            label={'Alamat'}
            labelClass={'mb-1 flex-none'}
            value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'} /> : 'LINGKUNGAN II RT.000 RW.000'}
            valueClass={'flex-none'}
          />

          <InfoProfile
            className={'flex flex-col items-start justify-start'}
            label={'No.Identitas Pasangan'}
            labelClass={'mb-1 flex-none'}
            value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'} /> : '1231231231231232'}
            valueClass={'flex-none'}
          />

          <InfoProfile
            className={'flex flex-col items-start justify-start'}
            label={'Nama Pasangan'}
            labelClass={'mb-1 flex-none'}
            value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'} /> : 'Dewi'}
            valueClass={'flex-none'}
          />
        </div>

        <div className='w-full border-b mb-8 border-dashed' />

        <FormSlik />
      </div>

      <TabAction onSubmit={storeSlik} prevAction={prevAction} />

      <div className='bg-primary-500'>
      </div>

    </>
  )
}

export default Slik