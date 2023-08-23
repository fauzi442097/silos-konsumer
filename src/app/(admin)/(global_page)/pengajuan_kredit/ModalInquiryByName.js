
import React, { useState } from 'react'
import Button, { ButtonCloseModal } from '@/components/Button'

import dynamic from 'next/dynamic';
import Preloader from '@/components/Layout/Admin/Header/Preloader';
import Modal from "@/components/Modal/ModalSection";
import MyDataTable from '@/components/Datatable/MyDatatable';
import LoadingTable from '@/components/Datatable/LoadingTable';


const MyModal = dynamic(() => import('../../../../components/Modal'), { ssr: false, loading: () => <Preloader type={'toggleSidebar'} /> })

const ModalInquiryByName = ({ data, setShowModal, closeModal }) => {
    let response = data ? data.data.data : null;

    const [ page, setPage ] = useState(0)
    const handlePageChange = (numPage) => setPage((numPage * 10) - 10)

    const columns = [
        {
            name: 'Aksi',
            cell: (row, index, column, id) => <Button size={'sm'} onClick={() => router.push(`/users/${row.id}`)}> Pilih Rekening </Button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: 'CIF',
            selector: (row) => row.cifid,
            cellExport: row => row.cifid,
            sortable: true,
            center: true,
        },
        {
            name: 'Nama Debitur',
            selector: (row) => row.fullnm,
            cellExport: row => row.fullnm,
            sortable: true,
            center: false
        },
        {
            name: 'Alamat',
            selector: (row) => row.addr,
            cellExport: row => row.addr,
            sortable: true,
            center: false
        },
        {
            name: 'Nomor KTP',
            selector: (row) => row.idnbr,
            cellExport: row => row.idnbr,
            sortable: true,
            center: false
        }
      ];

    return (
        <MyModal size='xl' closeOutside={true} setShowModal={setShowModal}>
            <Modal.Header>
                <div>
                    <h2 className='font-bold mb-1'> Inquiry </h2>
                    <span> Inquiry by nama debitur </span>
                </div>
                <ButtonCloseModal onClick={closeModal} />
            </Modal.Header>
            <Modal.Body>
                    <MyDataTable
                        columns={columns}
                        data={response}
                        defaultSortAsc={true}
                        withFilter={true}
                        pagination={true}
                        paginationComponentOptions={{ noRowsPerPage: true }}
                        paginationPerPage={10}
                        paginationServer
                        noRowsPerPage={true}
                        paginationTotalRows={data?.total}
                        onChangePage={handlePageChange}
                        progressComponent={<LoadingTable/>}
                    />
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'clean'} onClick={() => setShowModal(prev => !prev)}> Tutup </Button>
            </Modal.Footer>
        </MyModal>
    )
}

export default ModalInquiryByName