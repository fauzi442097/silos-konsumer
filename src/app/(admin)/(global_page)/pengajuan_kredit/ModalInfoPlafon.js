
import React, { useState } from 'react'
import Button, { ButtonCloseModal } from '@/components/Button'

import dynamic from 'next/dynamic';
import { cn, formatRupiah } from '@/lib/utils';
import Preloader from '@/components/Layout/Admin/Header/Preloader';
import Modal from "@/components/Modal/ModalSection";


const MyModal = dynamic(() => import('../../../../components/Modal'), { ssr: false, loading: () => <Preloader type={'toggleSidebar'} /> })

const ModalInfoPlafon = ({ data, setShowModal, closeModal, setMaksimalPlafon }) => {
  let response = data.data.data

  return (
    <MyModal size='lg' closeOutside={true} setShowModal={setShowModal}>
        <Modal.Header>
            <div>
                <h2 className='font-bold mb-1'> Info Maksimal Plafon </h2>
            </div>
            <ButtonCloseModal onClick={closeModal} />
        </Modal.Header>
        <Modal.Body>
        <div className="relative overflow-x-auto shadow max-h-[45rem]">
            <table className="w-full text-left">
                <thead className="bg-gray-100 dark:bg-dark-depth2 sticky top-0">
                    <tr>
                        <td scope="col" className="px-6 py-4 font-inter-medium rounded-tl-lg rounded-bl-lg w-[25%]">
                            Jangka Waktu (Bulan)
                        </td>
                        <td scope="col" className="px-6 py-4 font-inter-medium text-center">
                            Maksimal Plafon
                        </td>
                        <td scope="col" className="px-6 py-4 font-inter-medium w-[25%] text-center">
                            Aksi
                        </td>
                    </tr>
                </thead>
                <tbody className="overflow-y-auto">
                    {
                        response.plafon.map((item, i) => (
                            <tr className="bg-white dark:bg-dark-depth1 border-b border-dashed  dark:border-[#2f3237]" key={i}>
                                <td className="px-4 py-2" align='center'>{item.bulan}</td>
                                <td className="px-4 py-2" align='center'>{formatRupiah(item.maxPlafon)}</td>
                                <td className="px-4 py-2" align='center'><Button size={'sm'} onClick={() => setMaksimalPlafon(item.bulan, item.maxPlafon)}> Pilih plafon </Button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant={'clean'} onClick={() => setShowModal(prev => !prev)}> Tutup </Button>
        </Modal.Footer>
    </MyModal>
  )
}

export default ModalInfoPlafon