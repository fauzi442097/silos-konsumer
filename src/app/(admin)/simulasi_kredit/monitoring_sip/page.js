'use client'

import React, { useEffect, useState } from 'react';
import { useMySwal } from "@/hooks/useMySwal";
import { columns } from "./columns";
import { useLoadingStore } from "@/stores/loading";
import { API } from "@/config/api";

import Card from '@/components/Card';
import MyDataTable from "@/components/Datatable/MyDatatable";
import LoadingTable from "@/components/Datatable/LoadingTable";
import PageTitle from "@/components/PageTitle";

const Page = () => {

  const [listMonitoringSIP, setListMonitoringSIP] = useState([]);
  const { loading, setLoading } = useLoadingStore()

  const mySwal = useMySwal();

  const getMonitoringSIP = async (page) => {
    setLoading(true)
    const response = await API.GET(`/master/prospek/others?page=${page}`)
    setLoading(false)
    if (response.status != 200) return mySwal.error(response.data.error)

    let data = response.data
    setListMonitoringSIP(data)
  }

  const handlePageChange = async (page) => {
    getMonitoringSIP(page)
  };

  useEffect(() => {
    getMonitoringSIP(1);
  });

  return (
    <>
      <PageTitle title="Monitoring SIP" />
      <Card>
        <Card.Header className={'flex justify-between flex-wrap items-center'}>
          <h3> Monitoring SIP </h3>
        </Card.Header>
        <Card.Body>
          <MyDataTable
            withFilter={true}
            fixedHeader={true}
            columns={columns}
            data={listMonitoringSIP}
            pagination={true}
            paginationPerPage={10}
            paginationServer
            progressPending={loading}
            onChangePage={handlePageChange}
            progressComponent={<LoadingTable />}
          />
        </Card.Body>
      </Card>
    </>
  )
}

export default Page