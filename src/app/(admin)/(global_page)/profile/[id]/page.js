'use client'

import Badge from '@/components/Badge'
import PageTitle from '@/components/PageTitle'
import { cn, formatRupiah, formatTanggal, sleep } from '@/lib/utils'
import React, { use, useEffect, useState } from 'react'
import { useTheme } from '@/hooks/ThemeContext'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { TabPekerjaan, TabPembiayaan, TabProfile } from '../tabInfo'
import useGet from '@/hooks/useGet'
import DataNotFound from '@/components/DataNotFound'
import Button, { buttonVariants } from '@/components/Button'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

export const Info = ({label, value, className}) => {
  return (
    <div className={cn(['my-0', className])}>
        <span className='text-muted'> {label} </span>
        <p className='text-lg dark:text-grey'> {value} </p>
    </div>
  )
}

export const InfoProfile = ({ label, value, className, labelClass, valueClass}) => {

  return (
    <div className={cn('flex flex-wrap justify-between items-center my-2', className)}>
      <p className={cn('text-muted flex-1', labelClass)}> {label} </p>
      <p className={cn('flex-1 text-right text-lg dark:text-grey', valueClass)}> {value} </p>
    </div>
  )
}

const DetailProfile = ({params}) => {

  const searchParams = useSearchParams()
  const profileType = searchParams.get('type')

  const router = useRouter()
  const urlBack = profileType == 'prospect' ? '/dalam_proses/new_entry' : ''


  const id = params.id
  const { data, isLoading, isError, error, isFetching, refetch } = useGet(['nasabah', id], `/master/prospek/${id}/show`, {retry: 1,refetchOnWindowFocus: false,enabled: id != null})
  const dataProspek = data?.data?.data

  const [ showTab, setShowTab ] = useState({
    profile : true,
    pekerjaan: false,
    pembiayaan: false
  })

  const handleActiveTab = (tabName) => {
    const newObject = Object.keys(setShowTab)
            .filter((key) => !key.includes(clicked))
            .reduce((obj, key) => {
                return Object.assign(obj, {
                    [key]: false
                });
        }, {});

    newObject[tabName] = !showTab[tabName];
    setShowTab(newObject)
  }  

  const { theme } = useTheme()
  const boxShadowCardStyle = theme == 'light' ? {
    'boxShadow': '#c7cdc969 3px 0px 25px 0px'
  } : {}

  
  const isLoadingContent = isLoading || isFetching
  
  return (
    <>
      <PageTitle 
          title={'Detail Nasabah'} 
          pageAction={<Button variant='secondary' onClick={() => router.push(urlBack)}> Kembali </Button>}
      />

      { isError ? <DataNotFound message={error} withAction handleTryAgain={() => refetch()}/> : (
        <div className='flex gap-4 mb-8 w-full flex-col md:flex-row'>

          <div style={boxShadowCardStyle} className='card px-8 py-8 w-full md:flex-[1] rounded-2xl bg-white dark:bg-dark-depth1 dark:text-grey dark:shadow-none self-start'> 

            <div className='flex flex-wrap justify-between items-center'>
              <div>
                <h2 className='mb-0'> {isLoadingContent ? <Skeleton width={150} height={20} borderRadius={'0.5rem'}/>  : dataProspek.nmProspek} </h2>
                <span className='text-muted'> {isLoadingContent ? <Skeleton height={10} borderRadius={'0.5rem'}/>  : dataProspek.noIdentitas} </span>
              </div>
              <span> {isLoadingContent ? <Skeleton height={20} width={50} borderRadius={'0.5rem'}/>  :  <Badge className={'text-xs'}> New Entry </Badge>  }</span>
            </div>

            <div className='w-full border-b my-8 border-dashed'/>
            <InfoProfile label="Jenis KTP" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : `${dataProspek.isLifetime ? 'Seumur hidup' : 'Masa berlaku'}`}/>
            <InfoProfile label="Masa Berlaku KTP" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : `${dataProspek.isLifetime ? formatTanggal(dataProspek.expKtp) : '-'}`}/>
            <InfoProfile label={'Jenis Kelamin'} value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : dataProspek.jenisKelamin}/>
            <InfoProfile label={'TTL'} value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/> : `${dataProspek.tempatLahir} / ${formatTanggal(dataProspek.tglLahir)}`}/>
            <InfoProfile label={'Status Menikah'} value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : dataProspek.menikahDesc}/>

            <InfoProfile label="No Telp" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : dataProspek.telp || '-'} />
            <InfoProfile label="No HP" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : dataProspek.noHp || '-'} />
          </div>

          <div className='card bg-white dark:bg-dark-depth1 p-8 w-full md:flex-[3] self-start' style={boxShadowCardStyle}> 
            <div className='flex flex-2 border-b gap-4 flex-wrap'>
              <div className={cn(['tab-nasabah', showTab.profile && 'active'])} onClick={() => handleActiveTab('profile')}> 
                <p className='title-tab-nasabah'> 
                  <span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" fillRule="evenodd" d="M8 7a4 4 0 1 1 8 0a4 4 0 0 1-8 0Zm0 6a5 5 0 0 0-5 5a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3a5 5 0 0 0-5-5H8Z" clipRule="evenodd"/>
                      </svg>
                  </span>
                  Data Profile 
                </p> 
              </div>
              <div className={cn(['tab-nasabah', showTab.pekerjaan && 'active'])} onClick={() => handleActiveTab('pekerjaan')}> 
                <p className='title-tab-nasabah'> 
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" fillRule="evenodd" d="M11 3a3 3 0 0 0-3 3v1H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3h-3V6a3 3 0 0 0-3-3h-2zm3 4h-4V6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1z" clipRule="evenodd"/>
                    </svg>
                  </span>
                  Data Pekerjaan
                </p> 
              </div>
              <div className={cn(['tab-nasabah', showTab.pembiayaan && 'active'])} onClick={() => handleActiveTab('pembiayaan')}> 
                <p className='title-tab-nasabah'> 
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M2 8a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8zm9 4a1 1 0 1 1 2 0a1 1 0 0 1-2 0zm1-3a3 3 0 1 0 0 6a3 3 0 0 0 0-6z" clipRule="evenodd"/></svg>
                  </span>
                  Data Pembiayaan 
                </p> 
              </div>
            </div>

            <div className='py-4'>
              {showTab.profile && <TabProfile isLoadingContent={isLoadingContent} dataProspek={dataProspek}/>}
              {showTab.pekerjaan && <TabPekerjaan isLoadingContent={isLoadingContent} dataProspek={dataProspek}/>}
              {showTab.pembiayaan && <TabPembiayaan isLoadingContent={isLoadingContent} dataProspek={dataProspek}/>}
            </div>

          </div>

        </div>
      )}
    </>
  )
}

export default DetailProfile