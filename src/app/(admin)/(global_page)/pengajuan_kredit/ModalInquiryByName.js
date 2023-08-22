
import React, { useState } from 'react'
import Button, { ButtonCloseModal } from '@/components/Button'

import dynamic from 'next/dynamic';
import Preloader from '@/components/Layout/Admin/Header/Preloader';
import Modal from "@/components/Modal/ModalSection";
import MyDataTable from '@/components/Datatable/MyDatatable';
import LoadingTable from '@/components/Datatable/LoadingTable';


const MyModal = dynamic(() => import('../../../../components/Modal'), { ssr: false, loading: () => <Preloader type={'toggleSidebar'} /> })

const ModalInquiryByName = ({ data, setShowModal, closeModal, setMaksimalPlafon }) => {
    let response = data ? data.data.data : null;
    console.log(response);

    const columns = [
        {
            name: 'Aksi',
            cell: (row, index, column, id) => <Button className="btn-sm" onClick={() => router.push(`/users/${row.id}`)}> Pilih Rekening </Button>,
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
                {/* <div className="relative overflow-x-auto shadow max-h-[45rem]"> */}
                    {/* <table className="w-full text-left">
                        <thead className="bg-gray-100 dark:bg-dark-depth2 sticky top-0">
                            <tr>
                                <td scope="col" className="px-6 py-4 font-inter-medium rounded-tl-lg rounded-bl-lg w-[25%]">
                                    CIF
                                </td>
                                <td scope="col" className="px-6 py-4 font-inter-medium text-center">
                                    Nama Debitur
                                </td>
                                <td scope="col" className="px-6 py-4 font-inter-medium w-[25%] text-center">
                                    Alamat
                                </td>
                                <td scope="col" className="px-6 py-4 font-inter-medium w-[25%] text-center">
                                    Nomor KTP
                                </td>
                                <td scope="col" className="px-6 py-4 font-inter-medium w-[25%] text-center">
                                    Aksi
                                </td>
                            </tr>
                        </thead>
                        <tbody className="overflow-y-auto">
                            {
                                response.map((item, i) => (
                                    <tr className="bg-white dark:bg-dark-depth1 border-b border-dashed  dark:border-[#2f3237]" key={i}>
                                        <td className="px-4 py-2" align='center'>{item.cifid}</td>
                                        <td className="px-4 py-2" align='center'>{item.surenm}</td>
                                        <td className="px-4 py-2" align='center'>{item.addr}</td>
                                        <td className="px-4 py-2" align='center'>{item.idnbr}</td>
                                        <td className="px-4 py-2" align='center'><Button size={'sm'} onClick={() => setMaksimalPlafon(item.cifid)}> Pilih </Button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table> */}
                    <MyDataTable
                        columns={columns}
                        data={response}
                        withFilter={true}
                        fixedHeader={true}
                        pagination={true}
                        paginationPerPage={10}
                        paginationServer
                        progressComponent={<LoadingTable/>}
                    />
                {/* </div> */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'clean'} onClick={() => setShowModal(prev => !prev)}> Tutup </Button>
            </Modal.Footer>
        </MyModal>
    )
}

export default ModalInquiryByName