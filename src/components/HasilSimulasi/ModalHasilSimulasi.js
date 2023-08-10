
import React, { useState } from 'react'
import Button, { ButtonCloseModal } from '@/components/Button'

import Modal from "@/components/Modal/ModalSection";
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import RincianPinjaman from './RincianPinjaman';
import JadwalAngsur from './JadwalAngsur';
import Preloader from '../Layout/Admin/Header/Preloader';

const MyModal = dynamic(() => import('../../components/Modal'), { ssr: false, loading: () => <Preloader type={'toggleSidebar'} /> })

const ModalHasilSimulasi = ({ setShowModal, closeModal }) => {

  const [ showTab, setShowTab ] = useState({
    rincian_pinjaman: true,
    jadwal_angsur: false
  })

  const handleActiveTab = (tabName) => {
    const newObject = Object.keys(setShowTab)
            .filter((key) => !key.includes(clicked))
            .reduce((obj, key) => {
                return Object.assign(obj, {
                    [key]: false
                });
        }, {});

    newObject[tabName] = !showTab[tabName];
    setShowTab(newObject)
  }  

  return (
    <MyModal size='lg' closeOutside={true} setShowModal={setShowModal}>
        <Modal.Header>
            <div>
                <h2 className='font-bold mb-1'> Hasil Simulasi Pinjaman </h2>
            </div>
            <ButtonCloseModal onClick={() =>
                setShowModal((prev) => ({
                    ...prev,
                    lg: false,
                }))
            } />
        </Modal.Header>
        <Modal.Body>

            <div className='flex flex-wrap gap-6 mb-8 border-b'>
                <div onClick={() => handleActiveTab('rincian_pinjaman')} className={cn('py-2 cursor-pointer border-b border-transparent rounded-tl-md rounded-tr-md', showTab.rincian_pinjaman && 'border-primary border-b-2')}> 
                    <p className={cn('mb-0 text-lg', showTab.rincian_pinjaman && 'text-primary font-inter-medium')}> Rincian Pinjaman </p>
                </div>
                <div onClick={() => handleActiveTab('jadwal_angsur')} className={cn('py-2 cursor-pointer border-b border-transparent', showTab.jadwal_angsur && 'border-primary border-b-2')}>
                    <p className={cn('mb-0 text-lg', showTab.jadwal_angsur && 'text-primary font-inter-medium')}> Jadwal Angsur </p>
                </div>
            </div>

            { showTab.rincian_pinjaman && <RincianPinjaman/>}
            { showTab.jadwal_angsur && <JadwalAngsur/>}
            
        </Modal.Body>
    </MyModal>
  )
}

export default ModalHasilSimulasi