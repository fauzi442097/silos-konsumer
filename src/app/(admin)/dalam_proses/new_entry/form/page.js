'use client'
import React, { useState } from "react"
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

import Simulasi from './simulasi';

import PageTitle from "@/components/PageTitle";
import Button, { ButtonCloseModal } from "@/components/Button";
import Card from "@/components/Card";
import Modal from "@/components/Modal/ModalSection";
import Detail from "@/components/Detail";
import Preloader from "@/components/Layout/Admin/Header/Preloader";


const MyModal = dynamic(() => import('../../../../../components/Modal'), { ssr: false, loading: () => <Preloader type={'toggleSidebar'} /> })

const FormNewEntry = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [showModal, setShowModal] = useState({
        lg: false,
    });

    const showModalDialog = (type) => {
        setShowModal((prev) => ({ ...prev, [type]: true }))
    }

    const closeModal = () => {
        setShowModal((prev) => !prev)
    }

    return (
        <>
            <PageTitle title="Simulasi" />
            <Card>
                <Card.Header className={'flex justify-between flex-wrap items-center'}>
                    <h3> Simulasi </h3>
                    <div dir="rtl">
                        <div class="relative h-12 w-full ...">
                            <div class="absolute h-14 w-[130px] top-0 start-0 ...">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => router.push(`/dalam_proses/new_entry`)}> Kembali
                                    <svg className="w-4 h-4 mr-3" xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M88.49 143.51a12 12 0 0 1-17 17l-48-48a12 12 0 0 1 0-17l48-48a12 12 0 0 1 17 17L49 104ZM128 92h-11l27.52-27.52a12 12 0 0 0-17-17l-48 48a12 12 0 0 0 0 17l48 48a12 12 0 0 0 17-17L117 116h11a84.09 84.09 0 0 1 84 84a12 12 0 0 0 24 0A108.12 108.12 0 0 0 128 92Z" /></svg>
                                </Button>
                            </div>
                        </div>
                    </div>

                </Card.Header>
                <Card.Body>
                    <Simulasi />
                </Card.Body>
                <Card.Footer>
                    <div dir="rtl">
                        <div class="relative h-12 w-full ...">
                            <div class="absolute h-14 w-[120px] top-0 start-0 ...">
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => showModalDialog('xl')}> Simulasi
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card.Footer>
            </Card>

            {showModal.xl && (
                <MyModal size='lg' closeOutside={true} setShowModal={setShowModal}>
                    <Modal.Header>
                        <div>
                            <h3 className='font-bold mb-1'> Hasil Simulasi Pinjaman </h3>
                        </div>
                        <ButtonCloseModal onClick={() =>
                            setShowModal((prev) => ({
                                ...prev,
                                xl: false,
                            }))
                        } />
                    </Modal.Header>
                    <Modal.Body>
                        {/* <div className='card rounded-xl bg-white p-3 ring-offset-2 ring-4 ring-primary w-full dark:bg-dark-depth1 dark:text-grey dark:shadow-none '> */}
                            <div className="flex flex-row">
                                <div className="basis-1/2">
                                    <p className="text-semibold mb-2">Jumlah angsuran sebesar</p>
                                    <strong className="text-3xl text-primary font-sans">Rp. 4.000.000</strong> <strong className="font-semibold text-primary"> per bulan</strong>
                                    <p className="text-primary mt-2">dari total pinjaman Rp. 200.000.000</p>
                                </div>
                                <div className="basis-1/2">
                                    <p className="text-semibold mb-2">Jumlah angsuran setelah promo sebesar</p>
                                    <strong className="text-3xl text-primary font-sans">Rp. 4.000.000</strong> <strong className="font-semibold text-primary"> per bulan</strong>
                                    <p className="text-primary mt-2">dari total pinjaman Rp. 200.000.000</p>
                                </div>
                            </div>

                            <hr class="h-px my-8 bg-gray-400 border-0 dark:bg-gray-700"></hr>

                            <div className="flex flex-row">
                                <div className="basis-1/2">
                                    <p className="text-semibold mb-2">Biaya Notaris : </p>
                                    <strong className="text-xl text-primary font-sans">Rp. 2.000.000</strong>
                                </div>
                                <div className="basis-1/2">
                                    <p className="text-semibold mb-2">Biaya Asuransi : </p>
                                    <strong className="text-xl text-primary font-sans">Rp. 2.000.000</strong>
                                </div>
                            </div>
                            <div className="flex flex-row mt-5">
                                <div className="basis-1/2">
                                    <p className="text-semibold mb-2">Biaya Provisi : </p>
                                    <strong className="text-xl text-primary font-sans">Rp. 2.000.000</strong>
                                </div>
                                <div className="basis-1/2">
                                    <p className="text-semibold mb-2">Biaya Administrasi : </p>
                                    <strong className="text-xl text-primary font-sans">Rp. 2.000.000</strong>
                                </div>
                            </div>

                            <div className="flex flex-row mt-7">
                                <div className="basis-1/2">
                                    <p className="text-semibold text-xl mb-2">Total Biaya Lainnya : </p>
                                    <strong className="text-2xl text-primary font-sans">Rp. 8.000.000</strong>
                                </div>
                            </div>

                            <div className="flex flex-row justify-end mt-7">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mr-3"
                                    onClick={closeModal}>
                                    Hitung Ulang
                                </Button>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => router.push(`/dalam_proses/new_entry/prospek`)}>
                                    Ajukan Pinjaman
                                </Button>
                            </div>
                        {/* </div> */}


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

                        <Button
                            variant="primary"
                            size="sm"
                            className="mr-3"
                        >
                            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path fill="currentColor" d="M408 112H106a58 58 0 0 0-58 58v158a56 56 0 0 0 56 56h8v39.68A40.32 40.32 0 0 0 152.32 464h207.36A40.32 40.32 0 0 0 400 423.68V384h8a56 56 0 0 0 56-56V168a56 56 0 0 0-56-56Zm-40 311.68a8.35 8.35 0 0 1-8.32 8.32H152.32a8.35 8.35 0 0 1-8.32-8.32V264.32a8.35 8.35 0 0 1 8.32-8.32h207.36a8.35 8.35 0 0 1 8.32 8.32Zm26-215.76a24 24 0 1 1 22-22a24 24 0 0 1-22 22ZM344 48H168a56.09 56.09 0 0 0-55.42 48h286.84A56.09 56.09 0 0 0 344 48Z" /></svg>
                            Cetak Jadwal Angsur
                        </Button>

                        <Button
                            variant="primary"
                            size="sm"
                            className="mr-3"
                        >
                            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path fill="currentColor" d="M408 112H106a58 58 0 0 0-58 58v158a56 56 0 0 0 56 56h8v39.68A40.32 40.32 0 0 0 152.32 464h207.36A40.32 40.32 0 0 0 400 423.68V384h8a56 56 0 0 0 56-56V168a56 56 0 0 0-56-56Zm-40 311.68a8.35 8.35 0 0 1-8.32 8.32H152.32a8.35 8.35 0 0 1-8.32-8.32V264.32a8.35 8.35 0 0 1 8.32-8.32h207.36a8.35 8.35 0 0 1 8.32 8.32Zm26-215.76a24 24 0 1 1 22-22a24 24 0 0 1-22 22ZM344 48H168a56.09 56.09 0 0 0-55.42 48h286.84A56.09 56.09 0 0 0 344 48Z" /></svg>
                            Cetak Estimasi Biaya
                        </Button>

                        <Button
                            variant="primary"
                            size="sm"
                        >
                            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path fill="currentColor" d="M408 112H106a58 58 0 0 0-58 58v158a56 56 0 0 0 56 56h8v39.68A40.32 40.32 0 0 0 152.32 464h207.36A40.32 40.32 0 0 0 400 423.68V384h8a56 56 0 0 0 56-56V168a56 56 0 0 0-56-56Zm-40 311.68a8.35 8.35 0 0 1-8.32 8.32H152.32a8.35 8.35 0 0 1-8.32-8.32V264.32a8.35 8.35 0 0 1 8.32-8.32h207.36a8.35 8.35 0 0 1 8.32 8.32Zm26-215.76a24 24 0 1 1 22-22a24 24 0 0 1-22 22ZM344 48H168a56.09 56.09 0 0 0-55.42 48h286.84A56.09 56.09 0 0 0 344 48Z" /></svg>
                            Cetak Formulir Permohonan
                        </Button>

                    </Modal.Body>
                </MyModal>
            )}
        </>
    );
}

export default FormNewEntry