'use client'
import React, { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';

import Card from "@/components/Card";
import Button from "@/components/Button";
import MyDataTable from "@/components/Datatable/MyDatatable";
import LoadingTable from "@/components/Datatable/LoadingTable";
import { API } from "@/config/api";
import PageTitle from "@/components/PageTitle";
import { useMySwal } from "@/hooks/useMySwal";
import { columns } from "./columns";
import useDataTable from "@/hooks/useDataTable";
import { FetchingDataError } from "@/lib/exceptions";
import ModalKirimProspek from "./modal";
import Dropdown, { DropdownItem } from "@/components/Dropdown";
import { formatRupiah } from "@/lib/utils";
import useGet from "@/hooks/useGet";
import useAuth from "@/hooks/useAuth";


const Page = () => {

    const router = useRouter();
    
    const [ page, setPage ] = useState(1)
    const [ showModalProspek, setShowModalProspek ] = useState(false)
    const [ idProspectSelected, setIdProspectSelected ] = useState(null)

    const handleShowModalProspek = (id) => {
        setShowModalProspek(true)
        setIdProspectSelected(id)
    }


    const DropdownAction = ({row}) => {
        return (
            <Dropdown>
                <button className="dropdown-item" onClick={() => handleShowModalProspek(row.id)}> Kirim Prospek </button>
                <DropdownItem href={`/profile/${row.id}?type=prospect`}> Lihat Data </DropdownItem>
                <DropdownItem href="/form"> Ubah Data </DropdownItem>
                <DropdownItem href="/form"> Slik </DropdownItem>
                <DropdownItem href="/form"> Upload Dokumen Slik </DropdownItem>
                <DropdownItem href="/form"> Checklist Dokumen </DropdownItem>
                <DropdownItem href="/form"> Edit Biaya Lainnya </DropdownItem>
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
            name: 'NIK',
            selector: (row) => row.noIdentitas,
            cellExport: row => row.noIdentitas,
            sortable: true,
            center: false,
            wrap: true
        },
        {
            name: 'Produk',
            selector: (row) => row.productName,
            cellExport: row => row.productName,
            sortable: true,
            center: false,
            wrap: true
        },
        {
            name: 'Plafon',
            selector: (row) => formatRupiah(row.plafon),
            cellExport: row => row.plafon,
            sortable: true,
            right: true,
            wrap: true
        },
        {
            name: 'Jangka Waktu (Bulan)',
            selector: (row) => row.jangkaWaktu,
            cellExport: row => row.jangkaWaktu,
            sortable: true,
            right: true,
            wrap: true,
        },
        {
            name: 'Angsuran',
            selector: (row) => formatRupiah(row.totalAngsuran),
            cellExport: row => row.totalAngsuran,
            sortable: true,
            right: true,
            wrap: true
        }
    ];


    const { data, isLoading, isFetching, isError, error } = useDataTable(['getNewEntry', page], `/master/prospek?page=${page}`)
    const handlePageChange = async (page) => setPage(page);
    if ( isError) throw new Error(error.message)
    if ( data && data?.rc != 200 ) throw new FetchingDataError(data?.rm)

    // Get List Branch
    const { auth } = useAuth()
    const urlListBranch = auth.user.userGroupId == 1 ? `master/list/branch?idBranch=${auth.user.idBranch}` : 'master/list/branch'
    const branchQuery = useGet(['branch'], urlListBranch, {retry: 1,refetchOnWindowFocus: false})

    return (
        <>
            <PageTitle title={'New Entry'}/>
            { showModalProspek && <ModalKirimProspek idProspect={idProspectSelected} branchQuery={branchQuery} showModal={showModalProspek} setShowModal={setShowModalProspek} />}
            <Card>
                <Card.Header className={'flex justify-between flex-wrap items-center'}> 
                    <h3> New Entry </h3>
                    <Button 
                        variant="primary"
                        onClick={() => router.push(`/dalam_proses/new_entry/form`)}
                    > 
                        Tambah Data 
                    </Button>
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