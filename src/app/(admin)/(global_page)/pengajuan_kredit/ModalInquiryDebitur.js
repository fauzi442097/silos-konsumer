
import React, { useState } from 'react'
import Button, { ButtonCloseModal } from '@/components/Button'
import { Controller } from "react-hook-form";

import dynamic from 'next/dynamic';
import Preloader from '@/components/Layout/Admin/Header/Preloader';
import Modal from "@/components/Modal/ModalSection";
import Input from '@/components/Form/Input';
import Radio from '@/components/Form/Radio';
import LoadingSpinner from '@/components/LoadingSpinner';
import MyDataTable from '@/components/Datatable/MyDatatable';
import LoadingTable from '@/components/Datatable/LoadingTable';


const MyModal = dynamic(() => import('../../../../components/Modal'), { ssr: false, loading: () => <Preloader type={'toggleSidebar'} /> })

const ModalInquiryDebitur = ({ hitInquiryByName, hitInquiryByTanggalLahir, hitInquiryRekening, register, getValues, control, setShowModalInquiry, closeModal }) => {
    const [selectedOption, setSelectedOption] = useState("Nama")
    const [tanggalLahir, setTanggalLahir] = useState(undefined);

    const [page, setPage] = useState(0)
    const handlePageChange = (numPage) => setPage((numPage * 10) - 10)

    function onValueChange(event) {
        setSelectedOption(event.target.value)
    }

    const handleInquiryDebitur = () => {
        let namaDebitur = getValues('nama_debitur_inq');
        let tanggalLahirInq = tanggalLahir ? tanggalLahir.startDate : tanggalLahir;

        const bodyInqByName = {
            name: namaDebitur
        }

        const bodyInqByTanggalLahir = {
            tgl_lahir: tanggalLahirInq
        }

        if (namaDebitur && tanggalLahir) {
            hitInquiryByName.mutate(bodyInqByName);
        }

        if (namaDebitur && !tanggalLahir) {
            hitInquiryByName.mutate(bodyInqByName);
        }

        if (tanggalLahir && !namaDebitur) {
            hitInquiryByTanggalLahir.mutate(bodyInqByTanggalLahir);
        }
    }

    const handleModalInqRekening = (cifid) => {
        const bodyInqRekening = {
            cifid: cifid
        };

        hitInquiryRekening.mutate(bodyInqRekening);
        setShowModalInquiry(prev => !prev);
    }

    const handleChange = async (e, type, onChange) => {
        let value = e.value;
        switch (type) {
            case 'tglLahir':
                onChange(e.startDate);
                setTanggalLahir(e);

                break;
        }
    }

    let responseInqName = hitInquiryByName.data ? hitInquiryByName.data.data.data : hitInquiryByName.data;
    let responseInqTanggal = hitInquiryByTanggalLahir.data ? hitInquiryByTanggalLahir.data.data.data : hitInquiryByTanggalLahir.data;
    let response = responseInqName ? responseInqName : responseInqTanggal;

    const columns = [
        {
            name: 'Aksi',
            cell: (row, index, column, id) => <Button 
                                                    size={'sm'} 
                                                    className={`${(hitInquiryRekening.isLoading) && 'cursor-not-allowed'}`}
                                                    onClick={() => handleModalInqRekening(row.cifid)}>
                                                    {(hitInquiryRekening.isLoading) && <LoadingSpinner />}
                                                    {(hitInquiryRekening.isLoading) ? 'Processing' : 'Pilih Rekening'}
                                                </Button>,
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
            name: 'Nomor KTP',
            selector: (row) => row.idnbr,
            cellExport: row => row.idnbr,
            sortable: true,
            center: false
        }
    ];

    return (
        <MyModal size='xl' closeOutside={true} setShowModalInquiry={setShowModalInquiry}>
            <Modal.Header>
                <div>
                    <h3 className='font-bold mb-1'> Inquiry </h3>
                    <span> Inquiry Debitur </span>
                </div>
                <ButtonCloseModal onClick={closeModal} />
            </Modal.Header>
            <Modal.Body>

                <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap">
                    <div style={{ width: "250px" }}>
                        <label className='block mb-3'> Inquiry Berdasarkan </label>
                        <Radio label="Nama Debitur" name="nama_debitur" value="Nama" onChange={onValueChange} checked={selectedOption === "Nama"} />
                    </div>

                    {selectedOption === "Nama" ?
                        <div style={{ width: "250px" }}>
                            <label className='block mb-3'> Nama Debitur </label>
                            <Input.Text
                                placeholder="Isikan nama debitur"
                                name="nama_debitur_inq"
                                id="nama_debitur_inq"
                                register={register}
                            />
                        </div>
                        :
                        <div style={{ width: "250px" }}>
                            <label className='block mb-3'> Tanggal Lahir </label>
                            <Controller
                            control={control}
                            name="tanggal_lahir"
                            id="tanggal_lahir"
                            render={({ field: { onChange } }) => (
                                <Input.Date
                                    placeholder="Isikan tanggal lahir"
                                    name="tanggal_lahir_inq"
                                    id="tanggal_lahir_inq"
                                    register={register}
                                    value={tanggalLahir}
                                    onChange={(e) => handleChange(e, 'tglLahir', onChange)}
                                />
                            )} />
                            
                        </div>
                    }

                    <div className="self-end">
                        <Button
                            onClick={handleInquiryDebitur}
                            className={`${(hitInquiryByName.isLoading || hitInquiryByTanggalLahir.isLoading) && 'cursor-not-allowed'}`}>
                            {(hitInquiryByName.isLoading || hitInquiryByTanggalLahir.isLoading) && <LoadingSpinner />}
                            {(hitInquiryByName.isLoading || hitInquiryByTanggalLahir.isLoading) ? 'Processing' : 'Inquiry'}
                        </Button>
                    </div>

                </div>

                <div className="justify-start w-1/4">
                    <Radio label="Tanggal Lahir" name="tanggal_lahir" value="Tanggal" onChange={onValueChange} checked={selectedOption === "Tanggal"} />
                </div>

                <hr className="h-px my-4 bg-gray-400 border-0 dark:bg-gray-700"></hr>

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
                <Button variant={'clean'} onClick={() => setShowModalInquiry(prev => !prev)}> Tutup </Button>
            </Modal.Footer>
        </MyModal>
    )
}

export default ModalInquiryDebitur