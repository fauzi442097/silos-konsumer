'use client'

import React, { useState, useEffect } from "react"
import { useLoadingStore } from "@/stores/loading";
import { useMySwal } from "@/hooks/useMySwal";
import { API } from "@/config/api";
import { columns } from "./columns";

import Card from "@/components/Card";
import MyDataTable from "@/components/Datatable/MyDatatable";
import LoadingTable from "@/components/Datatable/LoadingTable";
import PageTitle from "@/components/PageTitle";
import useDataTable from "@/hooks/useDataTable";


const Page = () => {
    const mySwal = useMySwal();
    const { data, loading, error, totalRows, getData } = useDataTable(`/master/prospek/ao?param=complete&page=1`)
    const handlePageChange = async (page) => getData(page);

    useEffect(() => {
        if ( error ) return mySwal[error.type](error.message)
    }, [error])      

    return (
        <>
            <PageTitle title="Calon Nasabah" />
            <Card>
                <Card.Header className={'flex justify-between flex-wrap items-center'}>
                    <h3> Calon Nasabah </h3>
                </Card.Header>
                <Card.Body>
                    <MyDataTable 
                        dense={true}
                        withFilter={true}
                        columns={columns}
                        data={listCalonNasabah}
                        pagination={true}
                        paginationComponentOptions={{ noRowsPerPage: true }}
                        paginationPerPage={10}
                        paginationServer
                        noRowsPerPage={true}
                        progressPending={loading}
                        paginationTotalRows={totalRows}
                        onChangePage={handlePageChange}
                        progressComponent={<LoadingTable />}
                    />
                </Card.Body>
            </Card>
        </>
    )
}

export default Page