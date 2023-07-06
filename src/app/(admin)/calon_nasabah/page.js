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

const Page = () => {
    const [listCalonNasabah, setListCalonNasabah] = useState([]);
    const { loading, setLoading } = useLoadingStore();
    const mySwal = useMySwal();

    const getCalonNasabah = async (page) => {
        setLoading(true);
        const response = await API.GET(`/master/prospek/ao?param=complete&page=${page}`)
        setLoading(false);
        if(response.status !== 200) return mySwal.error(response.data.error);

        let data = response.data;
        console.log(data);
        setListCalonNasabah(data);
    }

    useEffect(() => {
        getCalonNasabah(1);
    }, [])

    const handlePageChange = async (page) => {
        getCalonNasabah(page);
    };

    return (
        <>
            <PageTitle title="Calon Nasabah" />
            <Card>
                <Card.Body>
                    <MyDataTable 
                        withFilter={true}
                        fixedHeader={true}
                        columns={columns}
                        data={listCalonNasabah}
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