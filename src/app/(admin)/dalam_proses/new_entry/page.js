'use client'
import React, { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';

import Card from "@/components/Card";
import Button from "@/components/Button";
import MyDataTable from "@/components/Datatable/MyDatatable";
import LoadingTable from "@/components/Datatable/LoadingTable";
import { API } from "@/config/api";
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
                    <Button 
                        variant="primary"
                        size="sm"
                        onClick={() => router.push(`/dalam_proses/new_entry/form`)}
                    > 
                        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3zm0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5zm-1 5v5h-5v2h5v5h2v-5h5v-2h-5v-5h-2z"/></svg>
                        Tambah Data 
                    </Button>
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