'use client'

import React, { useState } from "react"
import Card from "@/components/Card"
import PageTitle from "@/components/PageTitle"
import MyDataTable from "@/components/Datatable/MyDatatable"
import LoadingTable from "@/components/Datatable/LoadingTable"
import useDataTable from "@/hooks/useDataTable"
import { columns } from './columns'

const Page = () => {
    const [page, setPage] = useState(0);
    const getData = useDataTable(['getProspekBaru', page], `/master/prospek?page=${page}`)

    return (
        <>
            <PageTitle title={'Prospek Baru'} />
            <Card className="without-filter">
                <Card.Header className={'flex justify-between flex-wrap items-center'}>
                    <h3> Debitur Baru </h3>
                </Card.Header>
                <Card.Body>
                    <MyDataTable
                        columns={columns}
                        data={getData.data?.data}
                        defaultSortAsc={true}
                        withFilter={true}
                        pagination={true}
                        paginationPerPage={10}
                        responsive={true}
                        progressPending={false}
                        progressComponent={<LoadingTable />}
                    />
                </Card.Body>
            </Card>
        </>
    )
}

export default Page