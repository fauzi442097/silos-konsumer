'use client'
import React, { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';

import Card from "@/components/Card";
import Button from "@/components/Button";
import MyDataTable from "@/components/Datatable/MyDatatable";
import LoadingTable from "@/components/Datatable/LoadingTable";
import { API } from "@/config/api";
import PageTitle from "@/components/PageTitle";
import { useMySwal } from "@/hooks/useMySwal";
import { columns } from "./columns";
import useDataTable from "@/hooks/useDataTable";
import { FetchingDataError } from "@/lib/exceptions";


const Page = () => {

    const router = useRouter();
    const mySwal = useMySwal();

    const [ page, setPage ] = useState(1)
    const { data, isLoading, isFetching, isError, error } = useDataTable(['getNewEntry', page], `/master/prospek?page=${page}`)

    const handlePageChange = async (page) => setPage(page);

    if ( isError) throw new Error(error.message)
    if ( data && data?.rc != 200 ) throw new FetchingDataError(data?.rm)

    return (
        <>
            <PageTitle title={'New Entry'}/>
            <Card>
                <Card.Header className={'flex justify-between flex-wrap items-center'}> 
                    <h3> Daftar Prospek Baru </h3>
                    <Button 
                        variant="primary"
                        onClick={() => router.push(`/dalam_proses/new_entry/form`)}
                    > 
                        Tambah Data 
                    </Button>
                </Card.Header>
                <Card.Body className={'without-filter'}> 
                    <MyDataTable
                        withFilter={true}
                        fixedHeader={true}
                        columns={columns}
                        data={data?.data}
                        pagination={true}
                        paginationComponentOptions={{ noRowsPerPage: true }}
                        paginationPerPage={10}
                        paginationServer
                        paginationTotalRows={data?.meta?.total}
                        onChangePage={handlePageChange}
                        progressPending={isLoading}
                        progressComponent={<LoadingTable />}
                    />
                </Card.Body>
            </Card>
        </>
    )

}

export default Page