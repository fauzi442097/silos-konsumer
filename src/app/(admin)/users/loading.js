'use client'

import React from 'react'
import Card from '@/components/Card'
import PageTitle from '@/components/PageTitle'
import LoadingSkeletonTable from '@/components/LoadingSkeletonTable'

const loading = () => {
  return (
    <>
        <PageTitle title='Users'/>
        <Card>
            <Card.Header className={'flex justify-between items-center mb-8 animate-pulse'}>
                <div className='h-8 align-middle bg-gray-200 w-[200px]'> </div>
                <div className='h-4 align-middle bg-gray-200 w-[100px]'> </div>
            </Card.Header>
            <Card.Body>
              <LoadingSkeletonTable totalColumn={9}/>
            </Card.Body>
        </Card>
    </>
  )
}

export default loading