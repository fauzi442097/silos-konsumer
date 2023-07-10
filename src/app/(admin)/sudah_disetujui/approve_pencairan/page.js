'use client'
import React, { useEffect, useState } from "react"
import Cookies from 'universal-cookie';

import Card from "@/components/Card";
import MyDataTable from "@/components/Datatable/MyDatatable";
import LoadingTable from "@/components/Datatable/LoadingTable";
import { API } from "@/config/api";
import PageTitle from "@/components/PageTitle";
import { useLoadingStore } from "@/stores/loading";
import { useMySwal } from "@/hooks/useMySwal";
import { columns } from "./columns";

const cookies = new Cookies();

const Page = () => {
    const [listApprovePencairan, setListApprovePencairan] = useState([]);
    const { loading, setLoading } = useLoadingStore()

    const mySwal = useMySwal();

    let auth = cookies.get('auth')

    const getPencairan = async (page) => {
        setLoading(true)
        let body = [
            {
                userId: auth.user.userId,
                branchId: auth.user.branch.id,
                statusPembiayaan: [5],
                page: page,
                // 'search': keyword,
            }
        ];
        let url = `/master/nasabah/status?page=${page}`;
        const response = await API.GETWITHBODY(url, body);
        setLoading(false)
        if ( response.status != 200 ) return mySwal.error(response.data.error)

        let data = response.data
        console.log(data);
        setListApprovePencairan(data)
    }

    useEffect(() => {
        getPencairan(1);
    }, []);

    const handlePageChange = async (page) => {
        getPencairan(page)
	};

    return (
        <>
            <PageTitle title="Approve Pencairan Kredit" />
            <Card>
                <Card.Header>
                    <h3>Approve Pencairan Kredit</h3>
                </Card.Header>
                <Card.Body className={'without-filter'}> 
                    <MyDataTable
                        withFilter={true}
                        fixedHeader={true}
                        columns={columns}
                        data={listApprovePencairan}
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