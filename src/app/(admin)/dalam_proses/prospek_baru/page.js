'use client'

import React, { useState, useEffect } from "react"
import Card from "@/components/Card";
import MyDataTable from "@/components/Datatable/MyDatatable";
import LoadingTable from "@/components/Datatable/LoadingTable";
import PageTitle from "@/components/PageTitle";
import useDataTable from "@/hooks/useDataTable";
import Dropdown, { DropdownItem } from "@/components/Dropdown";
import ModalRejectProspek from "./modalReject";
import { formatRupiah } from "@/lib/utils";

const Page = () => {

    const [ page, setPage ] = useState(1)
    const [ showModalReject, setShowModalReject] = useState(false)
    const [ idProspectSelected, setIdProspectSelected ] = useState(null)

    const { data, isLoading, isFetching, isError, error } = useDataTable(['getProspectBaru', page], `/master/prospek/ao?param=new&page=${page}`)
    const handlePageChange = async (page) => setPage(page);
    if ( isError) throw new Error(error.message)
    if ( data && data?.rc != 200 ) throw new FetchingDataError(data?.rm)

    const handleShowModalReject = (id) => {
        setShowModalReject(true)
        setIdProspectSelected(id)
    } 

    const DropdownAction = (row) => {
        return (
            <Dropdown>
                <DropdownItem href="/lanjutkan"> Lanjutkan </DropdownItem>
                <button className="dropdown-item" onClick={() => handleShowModalReject(row.id)}> Batalkan Pengajuan </button>
            </Dropdown>
        )
    }
    
    const columns = [
        {
            name: 'ID',
            selector: (row) => row.id,
            sortable: true,
            center: true,
            wrap: true,
            omit: true
        },
        {
            name: 'Aksi',
            cell: (row, index, column, id) => <DropdownAction row={row}/>,
            ignoreRowClick: false,
            allowOverflow: true,
            button: true,
        },
        {
            name: 'Nama Nasabah',
            selector: (row) => row.nmProspek,
            cellExport: row => row.nmProspek,
            sortable: true,
            center: false,
            wrap: true,
        },
        {
            name: 'Produk',
            selector: (row) => row.productName,
            cellExport: row => row.productName,
            sortable: true,
            center: false,
            wrap: true,
        },
        {
            name: 'Cabang',
            selector: (row) => row.branchName,
            cellExport: row => row.branchName,
            sortable: true,
            center: false,
            wrap: true,
        },
        {
            name: 'Plafon',
            selector: (row) => formatRupiah(row.plafon),
            cellExport: row => formatRupiah(row.plafon),
            sortable: true,
            center: false,
            wrap: true,
        },
        {
            name: 'Jangka Waktu (Bulan)',
            selector: (row) => row.jangkaWaktu,
            cellExport: row => row.jangkaWaktu,
            sortable: true,
            center: false,
            wrap: true,
        },
        {
            name: 'Angsuran',
            selector: (row) => row.promo ? formatRupiah(row.promo.angsuranNormal) : formatRupiah(row.totalAngsuran),
            cellExport: row => row.promo ? formatRupiah(row.promo.angsuranNormal) : formatRupiah(row.totalAngsuran),
            sortable: true,
            center: false,
            wrap: true,
        },
        {
            name: 'Angsuran Promo',
            selector: (row) => row.promo ? formatRupiah(row.promo.angsuranPromo) : '',
            cellExport: row => row.promo ? formatRupiah(row.promo.angsuranPromo) : '',
            sortable: true,
            center: false,
            wrap: true,
        },
    ];

    return (
        <>
            <PageTitle title="Prospek Baru" />
                { showModalReject && <ModalRejectProspek idProspect={idProspectSelected} showModal={showModalReject} setShowModal={setShowModalReject} />}
            <Card>
                <Card.Header className={'flex justify-between flex-wrap items-center'}>
                    <h3> Prospek Baru </h3>
                </Card.Header>
                <Card.Body className={'without-filter'}>
                    <MyDataTable
                        withFilter={true}
                        fixedHeader={true}
                        columns={columns}
                        data={data?.data}
                        pagination={true}
                        paginationComponentOptions={{ noRowsPerPage: true }}
                        paginationPerPage={10}
                        paginationServer
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