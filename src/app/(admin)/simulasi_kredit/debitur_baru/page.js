'use client'
import React, { useState } from "react"
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

import Simulasi from './form/simulasi';
import Columns from './columns'

import PageTitle from "@/components/PageTitle";
import Button, { ButtonCloseModal } from "@/components/Button";
import Card from "@/components/Card";
import Modal from "@/components/Modal/ModalSection";
import Preloader from "@/components/Layout/Admin/Header/Preloader";
// import MyDataTable from '@/components/Datatable/MyDatatable'
// import LoadingTable from "@/components/Datatable/LoadingTable";
// import useDataTable from '@/hooks/useDataTable'
// import { PUBLIC_DUMMY_API } from '@/config/env'

const MyModal = dynamic(() => import('../../../../components/Modal'), { ssr: false, loading: () => <Preloader type={'toggleSidebar'} /> })

const FormNewEntry = () => {
    const router = useRouter();
    const [showModal, setShowModal] = useState({
        lg: false,
    });

    const showModalDialog = (type) => {
        setShowModal((prev) => ({ ...prev, [type]: true }))
    }

    const closeModal = () => {
        setShowModal((prev) => !prev)
    }

    // const [page, setPage] = useState(0)
    // const { data, isLoading, isError, error } = useDataTable(['getJadwalAngsur', page], `${PUBLIC_DUMMY_API}/products?limit=10&skip=${page}`)
    // const handlePageChange = (numPage) => setPage((numPage * 10) - 10)

    return (
        <>
            <PageTitle title="Simulasi" />
            <Card>
                <Card.Header className={'flex justify-between flex-wrap items-center'}>
                    <h3> Simulasi </h3>
                </Card.Header>
                <Card.Body>
                    <Simulasi />
                </Card.Body>
                <Card.Footer>
                    <div dir="rtl">
                        <div class="relative h-12 w-full ...">
                            <div class="absolute h-14 w-[120px] top-0 start-0 ...">
                                <Button onClick={() => showModalDialog('lg')}> Simulasi
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card.Footer>
            </Card>

            {showModal.lg && (
                <MyModal size='lg' closeOutside={true} setShowModal={setShowModal}>
                    <Modal.Header>
                        <div>
                            <h3 className='font-bold mb-1'> Hasil Simulasi Pinjaman </h3>
                        </div>
                        <ButtonCloseModal onClick={() =>
                            setShowModal((prev) => ({
                                ...prev,
                                lg: false,
                            }))
                        } />
                    </Modal.Header>
                    <Modal.Body>
                        {/* <div className="flex flex-row">
                            <div className="basis-1/2"> */}
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
                                        className="mr-3">
                                        Simpan Simulasi
                                    </Button>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => router.push(`/simulasi_kredit/debitur_baru/prospek`)}>
                                        Ajukan Pinjaman
                                    </Button>
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
                            {/* </div>
                            <div className="basis-1/2">
                                <div className="flex flex-row justify-center">
                                    <strong className="text-3xl text-primary font-sans">Jadwal Angsur</strong>
                                </div>
                                <div>
                                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">
                                                        Product name
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Color
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Category
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Price
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                                    <th
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        Apple MacBook Pro 17"
                                                    </th>
                                                    <td className="px-6 py-4">Silver</td>
                                                    <td className="px-6 py-4">Laptop</td>
                                                    <td className="px-6 py-4">$2999</td>
                                                    <td className="px-6 py-4">
                                                        <a
                                                            href="#"
                                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                        >
                                                            Edit
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                                    <th
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        Microsoft Surface Pro
                                                    </th>
                                                    <td className="px-6 py-4">White</td>
                                                    <td className="px-6 py-4">Laptop PC</td>
                                                    <td className="px-6 py-4">$1999</td>
                                                    <td className="px-6 py-4">
                                                        <a
                                                            href="#"
                                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                        >
                                                            Edit
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                                    <th
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        Magic Mouse 2
                                                    </th>
                                                    <td className="px-6 py-4">Black</td>
                                                    <td className="px-6 py-4">Accessories</td>
                                                    <td className="px-6 py-4">$99</td>
                                                    <td className="px-6 py-4">
                                                        <a
                                                            href="#"
                                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                        >
                                                            Edit
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                                    <th
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        Google Pixel Phone
                                                    </th>
                                                    <td className="px-6 py-4">Gray</td>
                                                    <td className="px-6 py-4">Phone</td>
                                                    <td className="px-6 py-4">$799</td>
                                                    <td className="px-6 py-4">
                                                        <a
                                                            href="#"
                                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                        >
                                                            Edit
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        Apple Watch 5
                                                    </th>
                                                    <td className="px-6 py-4">Red</td>
                                                    <td className="px-6 py-4">Wearables</td>
                                                    <td className="px-6 py-4">$999</td>
                                                    <td className="px-6 py-4">
                                                        <a
                                                            href="#"
                                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                        >
                                                            Edit
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div> */}
                        {/* </div> */}
                    </Modal.Body>
                </MyModal>
            )}
        </>
    );
}

export default FormNewEntry