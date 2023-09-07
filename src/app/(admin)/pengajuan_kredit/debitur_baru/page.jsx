'use client'

import React, { useEffect, useState } from 'react';
import { columns } from "./columns";
import MyDataTable from "@/components/Datatable/MyDatatable"
import LoadingTable from "@/components/Datatable/LoadingTable"
import useDataTable from "@/hooks/useDataTable"

import Card from '@/components/Card';
import PageTitle from "@/components/PageTitle";

const Page = () => {
  const [page, setPage] = useState(0);
  const getData = useDataTable(['getPengajuanKreditBaru', page], `/master/prospek/ao?param=complete&page=${page}`)

  return (
    <>
      <PageTitle title={'Pengajuan Kredit'} />
      <Card className="without-filter">
        <Card.Header className={'flex justify-between flex-wrap items-center'}>
          <h3> Debitur Baru </h3>
        </Card.Header>
        <Card.Body>
          <MyDataTable
            columns={columns}
            data={getData.data?.data}
            defaultSortAsc={false}
            withFilter={true}
            pagination={true}
            paginationPerPage={10}
            responsive={true}
            progressPending={false}
            progressComponent={<LoadingTable />}
          />

        </Card.Body>
      </Card>
    </>
  )
}

export default Page