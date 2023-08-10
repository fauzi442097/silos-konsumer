'use client'

import React, { useState } from 'react'
import Input from '@/components/Form/Input';
import MySelect from '@/components/Form/Select';
import Textarea from '@/components/Form/Textarea';

const ModalAgunanSK = () => {

    return (
        <>
            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div className='mb-5' style={{ width: "250px" }}>
                    <label className='block mb-3'> Jenis Agunan </label>
                    <Input.Text name="jenisAgunan" id="jenisAgunan" value="Agunan SK" disabled />
                </div>  
            </div>
            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div className='mb-5' style={{ width: "250px" }}>
                    <label className='block mb-3'> Tanggal Permohonan </label>
                    <Input.Date id="tanggalPermohonan" name="tanggalPermohonan" placeholder="Isikan tanggal permohonan" />
                </div>
                <div className='mb-5' style={{ width: "250px" }}>
                    <label className='block mb-3'> Tanggal Survey </label>
                    <Input.Date id="tanggalSurvey" name="tanggalSurvey" placeholder="Isikan tanggal survey" />
                </div>
                <div className='mb-5' style={{ width: "250px" }}>
                    <label className='block mb-3'> Tanggal Laporan </label>
                    <Input.Date id="tanggalLaporan" name="tanggalLaporan" placeholder="Isikan tanggal laporan" />
                </div>
            </div>
            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div className='mb-5' style={{ width: "250px" }}>
                    <label className='block mb-3'> Nama Instansi </label>
                    <Input.Text id="namaInstansi" name="namaInstansi" placeholder="Isikan nama instansi" />
                </div>
                <div className='mb-5' style={{ width: "250px" }}>
                    <label className='block mb-3'> Golongan </label>
                    <Input.Text id="golongan" name="golongan" placeholder="Isikan golongan" />
                </div>
                <div className='mb-5' style={{ width: "250px" }}>
                    <label className='block mb-3'> Pangkat </label>
                    <Input.Text id="pangkat" name="pangkat" placeholder="Isikan pangkat" />
                </div>
            </div>
            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div className='mb-5' style={{ width: "250px" }}>
                    <label className='block mb-3'> Nomor SK </label>
                    <Input.Text id="nomorSK" name="nomorSK" placeholder="Isikan nomor SK" />
                </div>
                <div className='mb-5' style={{ width: "250px" }}>
                    <label className='block mb-3'> Tanggal SK </label>
                    <Input.Date id="tanggalSK" name="tanggalSK" placeholder="Isikan tanggal SK" />
                </div>
                <div className='mb-5' style={{ width: "250px" }}>
                    <label className='block mb-3'> Jenis SK </label>
                    <MySelect withSearch id="jenisSK" name="jenisSK" placeholder="Isikan jenis SK" />
                </div>
            </div>
            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div className='mb-5' style={{ width: "250px" }}>
                    <label className='block mb-6'> SK PEGAWAI Dokumen (Wajib) </label>
                    <Input.File id="fotoRumahSamping" name="fotoRumahSamping" />
                </div>
            </div>
        </>
    )

}

export default ModalAgunanSK