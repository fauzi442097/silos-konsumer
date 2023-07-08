'use client'
import Card from '@/components/Card'
import MyDataTable from '@/components/Datatable/MyDatatable'
import PageTitle from '@/components/PageTitle'
import useDataTable from '@/hooks/useDataTable'
import React from 'react'
import { useState } from 'react'
import { columns } from './columns'
import LoadingTable from '@/components/Datatable/LoadingTable'
import { PUBLIC_DUMMY_API } from '@/config/env'
import Skeleton from 'react-loading-skeleton'

const warpperComponent = ({children}) => {
   <div>{children}</div>
} 

const Page = () => {

   const [ page, setPage ] = useState(0)
   const { data, isLoading, isError, error } = useDataTable(['getProduct', page], `${PUBLIC_DUMMY_API}/products?limit=10&skip=${page}`)
   const handlePageChange = (numPage) => setPage((numPage * 10) - 10)


 
  return (
    <>
      <PageTitle title={'Products'}/>
      <Card className={'without-filter'}>
         <Card.Body>
               <MyDataTable 
                  withFilter={true}
                  columns={columns}
                  defaultSortAsc={true}
                  data={data?.products}
                  pagination={true}
                  paginationComponentOptions={{ noRowsPerPage: true }}
                  paginationPerPage={10}
                  paginationServer
                  noRowsPerPage={true}
                  paginationTotalRows={data?.total}
                  onChangePage={handlePageChange}
                  progressPending={isLoading}
                  progressComponent={<LoadingTable/>}
               />
         </Card.Body>
      </Card>
    </>
  )
}

export default Page