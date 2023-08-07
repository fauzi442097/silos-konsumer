'use client'

import React, { useState, useEffect } from "react"
import { useRouter } from 'next/navigation';
import { useLoadingStore } from "@/stores/loading";
import { useMySwal } from "@/hooks/useMySwal";
import { API } from "@/config/api";
import { columns } from "./columns";

import Card from "@/components/Card";
import MyDataTable from "@/components/Datatable/MyDatatable";
import LoadingTable from "@/components/Datatable/LoadingTable";
import PageTitle from "@/components/PageTitle";

const Page = () => {
    const router = useRouter();
    const [listProspekBaru, setListProspekBaru] = useState([]);
    const { loading, setLoading } = useLoadingStore()

    const mySwal = useMySwal();

    const getProspekBaru = async (page) => {
        setLoading(true);
        const response = await API.GET(`/master/prospek/ao?param=new&page=${page}`);
        setLoading(false);
        if (response.status !== 200) return mySwal.error(response.data.error);

        let data = response.data;
        setListProspekBaru(data);
    }

    useEffect(() => {
        getProspekBaru(1);
    });

    const handlePageChange = async (page) => {
        getProspekBaru(page);
    };

    return (
        <>
            <PageTitle title="Prospek Siap Proses" />
            <Card>
                <Card.Header className={'flex justify-between flex-wrap items-center'}>
                    <h3> Daftar Prospek Siap Proses </h3>
                </Card.Header>
                <Card.Body className={'without-filter'}>
                    <MyDataTable
                        withFilter={true}
                        fixedHeader={true}
                        columns={columns}
                        data={listProspekBaru}
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