'use client'
import React, { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';

import Card from "@/components/Card";
import Button from "@/components/Button";
import MyDataTable from "@/components/Datatable/MyDatatable";
import LoadingTable from "@/components/Datatable/LoadingTable";
import { API } from "@/config/api";
// import { columns } from "./columns";
import PageTitle from "@/components/PageTitle";
import { useLoadingStore } from "@/stores/loading";
import { useMySwal } from "@/hooks/useMySwal";
import { columns } from "./columns";


const Page = () => {

    const router = useRouter();
    const [listNewEntry, setListNewEntry] = useState([]);
    const { loading, setLoading } = useLoadingStore()

    const mySwal = useMySwal();

    useEffect(() => {
        getNewEntry(1);
    }, []);

    const getNewEntry = async (page) => {
        setLoading(true)
        const response = await API.GET(`/master/prospek?page=${page}`)
        setLoading(false)
        if ( response.status != 200 ) return mySwal.error(response.data.error)

        let data = response.data
        setListNewEntry(data)
    }

    const handlePageChange = async (page) => {
        getNewEntry(page)
	};


    return (
        <>
            <PageTitle title={'New Entry'}/>
            <Card>
                <Card.Header className={'flex justify-between flex-wrap items-center'}> 
                    <h3> Daftar Prospek Baru </h3>
                    <Button onClick={() => router.push(`/new_entry/form`)}> Tambah Data </Button>
                </Card.Header>
                <Card.Body className={'without-filter'}> 
                    <MyDataTable
                        withFilter={true}
                        fixedHeader={true}
                        columns={columns}
                        data={listNewEntry}
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