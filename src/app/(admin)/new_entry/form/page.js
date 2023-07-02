'use client'
import React, { useState } from "react"
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

import Step1 from './step1'
import Step2 from "./step2"

import PageTitle from "@/components/PageTitle";
import Button, { ButtonCloseModal } from "@/components/Button";
import Card from "@/components/Card";
import Modal from "@/components/Modal/ModalSection";
import Detail from "@/components/Detail";
import Preloader from "@/components/Layout/Admin/Header/Preloader";


const MyModal = dynamic(() => import('../../../../components/Modal'), { ssr: false, loading: () => <Preloader type={'toggleSidebar'} /> })

const FormNewEntry = () => {
    const [step, setStep] = useState(1);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const router = useRouter();

    const [showModal, setShowModal] = useState({
        lg: false,
    });

    const showModalDialog = (type) => {
        setShowModal((prev) => ({ ...prev, [type]: true }))
    }

    return (
        <>
            <PageTitle title="Form New Entry" />
            <Card>
                <div dir="rtl">
                    <div class="relative h-12 w-full ...">
                        <div class="absolute h-14 w-[120px] top-0 start-0 ...">
                            <Button
                                className="btn-white bg-red-700 text-white text-sm px-15 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-5 mb-2"
                                onClick={() => router.push(`/new_entry`)}> Kembali </Button>
                        </div>
                    </div>
                </div>
                <Step1></Step1>
                <div dir="rtl">
                    <div class="relative h-12 w-full ...">
                        <div class="absolute h-14 w-[120px] top-0 start-0 ...">
                            <Button
                                className="btn-primary text-white text-sm px-15 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-5 mb-2"
                                onClick={() => showModalDialog('xl')}> Simulasi </Button>
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
                        <ButtonCloseModal onClick={() =>
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

                        <div className="flex flex-row">
                            <div className="basis-full">
                                <span>Cicilanmu ini setara dengan <strong className="font-semibold text-gray-900 dark:text-white">50%</strong> dari penghasilan bulanan <br></br> dan <strong className="font-semibold text-gray-900 dark:text-white">sisa gaji</strong> yang dimiliki sebesar Rp. 5.000.000</span>
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant={'clean'}> Batal </Button>
                        <Button> Simpan </Button>
                    </Modal.Footer>
                </MyModal>
            )}
        </>
    );
}

export default FormNewEntry