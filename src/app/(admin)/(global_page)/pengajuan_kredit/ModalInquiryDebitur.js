
import React, { useState } from 'react'
import Button, { ButtonCloseModal } from '@/components/Button'
import { Controller, useForm } from "react-hook-form";

import dynamic from 'next/dynamic';
import Preloader from '@/components/Layout/Admin/Header/Preloader';
import Modal from "@/components/Modal/ModalSection";
import Input from '@/components/Form/Input';


const MyModal = dynamic(() => import('../../../../components/Modal'), { ssr: false, loading: () => <Preloader type={'toggleSidebar'} /> })

const ModalInquiryDebitur = ({ handleInquiryByName, register, getValues, setShowModal, closeModal }) => {

    const handleInquiry = () => {
        let namaDebitur = getValues('nama_debitur_inq');
        let tanggalLahir = getValues('tanggal_lahir_inq');
        console.log(namaDebitur);

        handleInquiryByName(namaDebitur, tanggalLahir);   
    }

    return (
        <MyModal size='sm' closeOutside={true} setShowModal={setShowModal}>
            <Modal.Header>
                <div>
                    <h3 className='font-bold mb-1'> Inquiry </h3>
                    <span> Inquiry debitur </span>
                </div>
                <ButtonCloseModal onClick={closeModal} />
            </Modal.Header>
            <Modal.Body>
                <div className='mb-5'>
                    <label className='block mb-3'> Nama Debitur </label>
                    <Input.Text
                        placeholder="Isikan nama debitur"
                        name="nama_debitur_inq"
                        id="nama_debitur_inq"
                        register={register}
                    />
                </div>
                <div className='mb-5'>
                    <label className='block mb-3'> Tanggal Lahir </label>
                    <Input.Date
                        placeholder="Isikan tanggal lahir"
                        name="tanggal_lahir_inq"
                        id="tanggal_lahir_inq"
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'clean'} onClick={() => setShowModal(prev => !prev)}> Tutup </Button>
                <Button onClick={handleInquiry}> Submit </Button>
            </Modal.Footer>
        </MyModal>
    )
}

export default ModalInquiryDebitur