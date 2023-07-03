'use client'

import React, { useEffect, useState } from "react"

import Breadcrumbs from "@/components/Breadcrumbs";
import CheckboxTable from '@/components/Datatable/CheckboxTable';
import LoadingTable from '@/components/Datatable/LoadingTable';
import MyDataTable from '@/components/Datatable/MyDatatable';
import columns from './columns';

const Datatable = ({data}) =>  {
    return (
        <>
            <Breadcrumbs/>
            <MyDataTable
                    fixedHeaderScrollHeight="500px"
                    columns={columns}
                    data={data}
                    selectableRows={true}
                    pagination={true}
                    paginationPerPage={10}
                    responsive={true}
                    progressPending={false}
                    selectableRowsComponent={CheckboxTable}
                    progressComponent={<LoadingTable />}
                >
                </MyDataTable>
        </>
    )
}

export default Datatable