'use client'

import React, { useState, useEffect } from "react";
import { useMySwal } from "@/hooks/useMySwal";
import { useLoadingStore } from "@/stores/loading";
import { API } from "@/config/api";

import Card from "@/components/Card";
import MyDataTable from "@/components/Datatable/MyDatatable";
import LoadingTable from "@/components/Datatable/LoadingTable";
import PageTitle from "@/components/PageTitle";
import { columns } from "./columns";

const Page = () => {
    // const mySwal = useMySwal();
    // const { data, loading, error, totalRows, getData } = useDataTable(`/master/report/data-cair`)
    // const handlePageChange = async (page) => getData(page);

    // useEffect(() => {
    //     if (error) return mySwal[error.type](error.message);
    // }, [error])

    // const router = useRouter();

    const [listNasabahCair, setListNasabahCair] = useState([]);
    const { loading, setLoading } = useLoadingStore()

    const mySwal = useMySwal();

    const getNasabahCair = async (page) => {
        setLoading(true)
        const response = await API.GET(`/master/report/data-cair?page=${page}`)
        setLoading(false)
        if (response.status != 200) return mySwal.error(response.data.error)

        let data = response.data
        console.log(data);
        setListNasabahCair(data)
    }

    const handlePageChange = async (page) => {
        getNasabahCair(page)
    };

    useEffect(() => {
        getNasabahCair(1);
    });

    return (
        <>
            <PageTitle title="Nasabah Cair" />
            <Card>
                <Card.Body className={'without-filter py-4'}>
                    <MyDataTable
                        dense={true}
                        withFilter={true}
                        columns={columns}
                        data={listNasabahCair}
                        pagination={true}
                        paginationComponentOptions={{ noRowsPerPage: true }}
                        paginationPerPage={10}
                        paginationServer
                        noRowsPerPage={true}
                        progressPending={loading}
                        // paginationTotalRows={totalRows}
                        onChangePage={handlePageChange}
                        progressComponent={<LoadingTable />}
                    />
                </Card.Body>
            </Card>
        </>
    )
}

export default Page 