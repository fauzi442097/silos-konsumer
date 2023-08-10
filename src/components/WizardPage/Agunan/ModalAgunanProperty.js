'use client'

import React, { useState } from 'react'
import Input from '@/components/Form/Input';
import MySelect from '@/components/Form/Select';
import Textarea from '@/components/Form/Textarea';

const ModalAgunanProperty = () => {

    return (
        <>
            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div className='mb-5' style={{ width: "250px" }}>
                    <label className='block mb-3'> Jenis Agunan </label>
                    <Input.Text name="jenisAgunan" id="jenisAgunan" value="Agunan Property" disabled />
                </div>
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
                    <label className='block mb-3'> Petugas Pendamping </label>
                    <MySelect withSearch id="petugasPendamping" name="petugasPendamping" placeholder="Isikan petugas pendamping" />
                </div>
                <div className='mb-5' style={{ width: "250px" }}>
                    <label className='block mb-3'> Jenis Sertifikat </label>
                    <MySelect withSearch id="jenisSertifikat" name="jenisSertifikat" placeholder="Isikan jenis sertifikat" />
                </div>
                <div className='mb-5' style={{ width: "250px" }}>
                    <label className='block mb-3'> Nomor Sertifikat </label>
                    <Input.Text id="nomorSertifikat" name="nomorSertifikat" placeholder="Isikan nomor sertifikat" />
                </div>
                <div className='mb-5' style={{ width: "250px" }}>
                    <label className='block mb-3'> Nama Pemilik </label>
                    <Input.Text id="namaPemilik" name="namaPemilik" placeholder="Isikan nama pemilik" />
                </div>
            </div>
            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div className='mb-5' style={{ width: "250px" }}>
                    <label className='block mb-3'> Luas Tanah Sertifikat M2 </label>
                    <Input.Text id="luasTanah" name="luasTanah" placeholder="Isikan luas tanah sertifikat M2" />
                </div>
                <div className='mb-5' style={{ width: "250px" }}>
                    <label className='block mb-3'> Nomor IMB </label>
                    <Input.Text id="nomorIMB" name="nomorIMB" placeholder="Isikan nomor IMB" />
                </div>
                <div className='mb-5' style={{ width: "250px" }}>
                    <label className='block mb-3'> Luas IMB m2 </label>
                    <Input.Text id="luasIMB" name="luasIMB" placeholder="Isikan luas IMB" />
                </div>
                <div className='mb-5' style={{ width: "250px" }}>
                    <label className='block mb-3'> Luas Fisik Bangunan / Rumah M2 </label>
                    <Input.Text id="luasFisik" name="luasFisik" placeholder="Isikan luas fisik bangunan / rumah M2" />
                </div>
            </div>
            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div className='mb-5' style={{ width: "250px" }}>
                    <label className='block mb-3'> Luas Tanah Fisik M2 </label>
                    <Input.Text id="luasTanahFisik" name="luasTanahFisik" placeholder="Isikan luas tanah fisik M2" />
                </div>
                <div className='mb-5' style={{ width: "250px" }}>
                    <label className='block mb-3'> Nilai Appraisal </label>
                    <Input.Currency id="nilaiAppraisal" name="nilaiAppraisal" placeholder="Isikan nilai appraisal" />
                </div>
                <div className='mb-5' style={{ width: "530px" }}>
                    <label className='block mb-3'> Alamat Objek </label>
                    <Textarea id="alamatObjek" name="alamatObjek" placeholder="Isikan alamat objek" />
                </div>
            </div>
            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div className='mb-5' style={{ width: "250px" }}>
                    <label className='block mb-6'> FOTO RUMAH TAMPAK SAMPING Dokumen (Wajib) </label>
                    <Input.File id="fotoRumahSamping" name="fotoRumahSamping" />
                </div>
                <div className='mb-5' style={{ width: "250px" }}>
                    <label className='block mb-6'> FOTO JALAN DEPAN RUMAH Dokumen (Wajib) </label>
                    <Input.File id="fotoJalanDepanRumah" name="fotoJalanDepanRumah" />
                </div>
                <div className='mb-5' style={{ width: "250px" }}>
                    <label className='block mb-12'> FOTO NOMOR RUMAH Dokumen (Wajib) </label>
                    <Input.File id="fotoNomorRumah" name="fotoNomorRumah" />
                </div>
                <div className='mb-5' style={{ width: "250px" }}>
                    <label className='block mb-6'> FOTO RUMAH TAMPAK DEPAN Dokumen (Wajib) </label>
                    <Input.File id="fotoRumahDepan" name="fotoRumahDepan" />
                </div>
            </div>
        </>
    )

}

export default ModalAgunanProperty