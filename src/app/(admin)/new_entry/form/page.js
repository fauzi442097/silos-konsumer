'use client'
import React, { useState, useRef } from "react"
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

import Step1 from './step1';

import PageTitle from "@/components/PageTitle";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Modal from '@/components/Modal/ModalSection';
import Preloader from "@/components/Layout/Admin/Header/Preloader";
import Detail from "@/components/Detail";


const MyModal = dynamic(() => import('../../../../components/Modal'), { ssr: false, loading: () => <Preloader type={'toggleSidebar'} /> })

const FormNewEntry = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [showModal, setShowModal] = useState({
        lg: false,
    });
    
    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const showModalDialog = (type) => {
        setShowModal((prev) => ({ ...prev, [type]: true }))
    }

    const closeModal = () => {
        setShowModal((prev) => !prev)
    }

    return (
        <>
            <PageTitle title="Form New Entry" />
            <Card>
                <div dir="rtl">
                    <div class="relative h-12 w-full ...">
                        <div class="absolute h-14 w-[120px] top-0 start-0 ...">
                            <Button.Icon
                                className="btn-white bg-red-700 text-white text-sm px-15 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-5 mb-2"
                                onClick={() => router.push(`/new_entry`)}> Kembali
                                <svg className="w-4 h-4 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M88.49 143.51a12 12 0 0 1-17 17l-48-48a12 12 0 0 1 0-17l48-48a12 12 0 0 1 17 17L49 104ZM128 92h-11l27.52-27.52a12 12 0 0 0-17-17l-48 48a12 12 0 0 0 0 17l48 48a12 12 0 0 0 17-17L117 116h11a84.09 84.09 0 0 1 84 84a12 12 0 0 0 24 0A108.12 108.12 0 0 0 128 92Z" /></svg>
                            </Button.Icon>
                        </div>
                    </div>
                </div>

                <Step1 />

                <div dir="rtl">
                    <div class="relative h-12 w-full ...">
                        <div class="absolute h-14 w-[120px] top-0 start-0 ...">
                            <Button.Icon
                                className="btn-primary text-white text-sm px-15 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-5 mb-2"
                                onClick={() => showModalDialog('xl')}> Simulasi
                                <svg className="w-4 h-4 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path fill="currentColor" d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" /></svg>
                            </Button.Icon>
                        </div>
                    </div>
                </div>
            </Card>

            {showModal.xl && (
                <MyModal size='lg' closeOutside={true} setShowModal={setShowModal}>
                    <Modal.Header>
                        <div>
                            <h3 className='font-bold mb-1'> Biaya - biaya </h3>
                            <span> Preview biaya - biaya </span>
                        </div>
                        <Button.CloseModal onClick={() =>
                            setShowModal((prev) => ({
                                ...prev,
                                xl: false,
                            }))
                        } />
                    </Modal.Header>
                    <Modal.Body>
                        <div className="flex flex-row">
                            <div className="basis-1/2">
                                <Detail>Angsuran Per Bulan</Detail>
                                <span>Rp. 4.000.000</span>
                            </div>
                            <div className="basis-1/2">
                                <Detail>Angsuran Per Bulan Setelah Promo</Detail>
                                <span>Rp. 4.500.000</span>
                            </div>
                        </div>

                        <hr class="h-px my-8 bg-gray-400 border-0 dark:bg-gray-700"></hr>

                        <div className="flex flex-row mb-10">
                            <div className="basis-1/2">
                                <Detail>Total Biaya Lainnya</Detail>
                                <span>Rp. 8.000.000</span>
                            </div>
                        </div>

                        <div className="flex flex-row">
                            <div className="basis-1/2">
                                <Detail>Biaya Notaris</Detail>
                            </div>
                            <div className="basis-1/2">
                                <Detail>Rp. 2.000.000</Detail>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="basis-1/2">
                                <Detail>Biaya Asuransi</Detail>
                            </div>
                            <div className="basis-1/2">
                                <Detail>Rp. 2.000.000</Detail>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="basis-1/2">
                                <Detail>Biaya Provisi</Detail>
                            </div>
                            <div className="basis-1/2">
                                <Detail>Rp. 2.000.000</Detail>
                            </div>
                        </div>
                        <div className="flex flex-row">
                            <div className="basis-1/2">
                                <Detail>Biaya Administrasi</Detail>
                            </div>
                            <div className="basis-1/2">
                                <Detail>Rp. 2.000.000</Detail>
                            </div>
                        </div>

                        <hr class="h-px my-8 bg-gray-400 border-0 dark:bg-gray-700"></hr>

                        <div className="flex flex-row mb-10">
                            <div className="basis-full">
                                <span>Cicilanmu ini setara dengan <strong className="font-bold text-gray-900 dark:text-white">50%</strong> dari penghasilan bulanan <br></br> dan <strong className="font-semibold text-gray-900 dark:text-white">sisa gaji</strong> yang dimiliki sebesar Rp. 5.000.000</span>
                            </div>
                        </div>

                        <div className="flex flex-row">
                            <div className="basis-full">
                                <span>Rasio ini sudah <strong className="font-semibold text-red-600 dark:text-white">berbahaya</strong>, berpotensi mengganggu cash flow mu dimasa depan. <br></br> Karena angsuran perbulan telah melebihi 90% gaji</span>
                            </div>
                        </div>

                        <hr class="h-px my-8 bg-gray-400 border-0 dark:bg-gray-700"></hr>

                        <Button.Icon
                            className="btn-primary text-white text-sm px-15 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-5 mb-2">
                            <svg className="w-4 h-4 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path fill="currentColor" d="M408 112H106a58 58 0 0 0-58 58v158a56 56 0 0 0 56 56h8v39.68A40.32 40.32 0 0 0 152.32 464h207.36A40.32 40.32 0 0 0 400 423.68V384h8a56 56 0 0 0 56-56V168a56 56 0 0 0-56-56Zm-40 311.68a8.35 8.35 0 0 1-8.32 8.32H152.32a8.35 8.35 0 0 1-8.32-8.32V264.32a8.35 8.35 0 0 1 8.32-8.32h207.36a8.35 8.35 0 0 1 8.32 8.32Zm26-215.76a24 24 0 1 1 22-22a24 24 0 0 1-22 22ZM344 48H168a56.09 56.09 0 0 0-55.42 48h286.84A56.09 56.09 0 0 0 344 48Z" /></svg>
                            Cetak Jadwal Angsur
                        </Button.Icon>

                        <Button.Icon
                            className="btn-primary text-white text-sm px-15 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-5 mb-2">
                            <svg className="w-4 h-4 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path fill="currentColor" d="M408 112H106a58 58 0 0 0-58 58v158a56 56 0 0 0 56 56h8v39.68A40.32 40.32 0 0 0 152.32 464h207.36A40.32 40.32 0 0 0 400 423.68V384h8a56 56 0 0 0 56-56V168a56 56 0 0 0-56-56Zm-40 311.68a8.35 8.35 0 0 1-8.32 8.32H152.32a8.35 8.35 0 0 1-8.32-8.32V264.32a8.35 8.35 0 0 1 8.32-8.32h207.36a8.35 8.35 0 0 1 8.32 8.32Zm26-215.76a24 24 0 1 1 22-22a24 24 0 0 1-22 22ZM344 48H168a56.09 56.09 0 0 0-55.42 48h286.84A56.09 56.09 0 0 0 344 48Z" /></svg>
                            Cetak Estimasi Biaya
                        </Button.Icon>

                        <Button.Icon
                            className="btn-primary text-white text-sm px-15 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-5 mb-2">
                            <svg className="w-4 h-4 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path fill="currentColor" d="M408 112H106a58 58 0 0 0-58 58v158a56 56 0 0 0 56 56h8v39.68A40.32 40.32 0 0 0 152.32 464h207.36A40.32 40.32 0 0 0 400 423.68V384h8a56 56 0 0 0 56-56V168a56 56 0 0 0-56-56Zm-40 311.68a8.35 8.35 0 0 1-8.32 8.32H152.32a8.35 8.35 0 0 1-8.32-8.32V264.32a8.35 8.35 0 0 1 8.32-8.32h207.36a8.35 8.35 0 0 1 8.32 8.32Zm26-215.76a24 24 0 1 1 22-22a24 24 0 0 1-22 22ZM344 48H168a56.09 56.09 0 0 0-55.42 48h286.84A56.09 56.09 0 0 0 344 48Z" /></svg>
                            Cetak Formulir Permohonan
                        </Button.Icon>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Icon 
                            className="bg-red-700 text-white text-sm px-15 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mb-2"
                            onClick={closeModal}>
                            <svg className="w-4 h-4 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"/></svg>
                            Batal 
                        </Button.Icon>
                        <Button.Icon 
                            className="btn-primary text-white text-sm px-15 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-5 mb-2"
                            onClick={() => router.push(`/new_entry/prospek`)}>
                            <svg className="w-4 h-4 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M20 13V5.749a.6.6 0 0 0-.176-.425l-3.148-3.148A.6.6 0 0 0 16.252 2H4.6a.6.6 0 0 0-.6.6v18.8a.6.6 0 0 0 .6.6H14"/><path d="M16 2v3.4a.6.6 0 0 0 .6.6H20m-4 13h6m0 0l-3-3m3 3l-3 3"/></g></svg>
                            Ajukan 
                        </Button.Icon>
                    </Modal.Footer>
                </MyModal>
            )}
        </>
    );
}

export default FormNewEntry