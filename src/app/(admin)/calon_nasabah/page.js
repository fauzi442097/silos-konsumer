'use client'

import React, { useState, useEffect } from "react"
import { useMySwal } from "@/hooks/useMySwal";
import { columns } from "./columns";

import Card from "@/components/Card";
import MyDataTable from "@/components/Datatable/MyDatatable";
import LoadingTable from "@/components/Datatable/LoadingTable";
import PageTitle from "@/components/PageTitle";
import useDataTable from "@/hooks/useDataTable";
import { FetchingDataError } from "@/lib/exceptions";

const Page = () => {
    const mySwal = useMySwal();

    const showMessage = () => {
        mySwal.warning('Tes 123')
    }

    const [page, setPage] = useState(1)
    const { data, isLoading, isFetching, isPreviousData, isError, error } = useDataTable(['getCalonNasabah', page], `/master/prospek/ao?param=complete&page=${page}`)
    const handlePageChange = async (page) => setPage(page);

    if ( isError) throw new Error(error.message)
    if ( data && data?.rc != 200 ) throw new FetchingDataError(data?.rm)


    return (
        <>
            <PageTitle title="Calon Nasabah" />
            <Card className={'without-filter'}>
                <Card.Body>
                    <MyDataTable 
                        dense={true}
                        withFilter={true}
                        columns={columns}
                        data={data?.data}
                        pagination={true}
                        paginationComponentOptions={{ noRowsPerPage: true }}
                        paginationPerPage={10}
                        paginationServer
                        noRowsPerPage={true}
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