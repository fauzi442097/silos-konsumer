
import React, { useState } from 'react'
import Button, { ButtonCloseModal } from '@/components/Button'

import dynamic from 'next/dynamic';
import Preloader from '@/components/Layout/Admin/Header/Preloader';
import Modal from "@/components/Modal/ModalSection";
import MyDataTable from '@/components/Datatable/MyDatatable';
import LoadingTable from '@/components/Datatable/LoadingTable';


const MyModal = dynamic(() => import('../../../../components/Modal'), { ssr: false, loading: () => <Preloader type={'toggleSidebar'} /> })

const ModalInquiryByRekening = ({ hitInquiryRekening, setHasilInquiry, setShowModalInquiryRekening, setShowModalInquiry, closeModal }) => {
    let response = hitInquiryRekening.data ? hitInquiryRekening.data.data.data.result : hitInquiryRekening.data;
    
    const handleCloseModal = () => {
        setShowModalInquiryRekening(prev => !prev);
        setShowModalInquiry(true);
    }

    const statusRekening = (row) =>{
        let status = '';

        if(row.ACCSTS === '0' || row.ACCSTS === 0 ){
            status = 'Tidak Aktif';
        } 

        if(row.ACCSTS === 1){
            status = 'Aktif';
        }

        if(row.ACCSTS === 3){
            status = 'Blokir';
        }

        if(row.ACCSTS === 7){
            status = 'Pasif';
        }

        if(row.ACCSTS === 9){
            status = 'Tutup';
        }

        return (status);
    }

    const columns = [
        {
            name: 'Aksi',
            cell: (row, index, column, id) => <Button size={'sm'} onClick={() => setHasilInquiry(row.ACCNBR, row.CIFID)}> Pilih </Button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: 'Nomor Rekening',
            selector: (row) => row.ACCNBR,
            cellExport: row => row.ACCNBR,
            sortable: true,
            center: true,
        },
        {
            name: 'CIF',
            selector: (row) => row.CIFID,
            cellExport: row => row.CIFID,
            sortable: true,
            center: true,
        },
        {
            name: 'Jenis Aplikasi',
            selector: (row) => row.APPLID == '01' ? 'Giro' : 'Tabungan',
            cellExport: row => row.APPLID == '01' ? 'Giro' : 'Tabungan',
            sortable: true,
            center: false
        },
        {
            name: 'Status Rekening',
            selector: (row) => statusRekening(row),
            cellExport: row => row.ACCSTS,
            sortable: true,
            center: false
        },
        {
            name: 'Nick Name Rekening',
            selector: (row) => row.NICKNM,
            cellExport: row => row.NICKNM,
            sortable: true,
            center: false
        },
        {
            name: 'Kode Cabang',
            selector: (row) => row.BRANCHID,
            cellExport: row => row.BRANCHID,
            sortable: true,
            center: false
        }

    ];

    return (
        <MyModal size='xl' closeOutside={true} setShowModalInquiryRekening={setShowModalInquiryRekening}>
            <Modal.Header>
                <div>
                    <h2 className='font-bold mb-1'> Inquiry </h2>
                    <span> Inquiry Rekening </span>
                </div>
                <ButtonCloseModal onClick={closeModal} />
            </Modal.Header>
            <Modal.Body>
                <div className={'without-filter'} >
                    <MyDataTable
                        columns={columns}
                        data={response}
                        defaultSortAsc={true}
                        withFilter={true}
                        pagination={true}
                        paginationPerPage={10}
                        responsive={true}
                        progressPending={false}
                        progressComponent={<LoadingTable />}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'clean'} onClick={handleCloseModal}> Tutup </Button>
            </Modal.Footer>
        </MyModal>
    )
}

export default ModalInquiryByRekening