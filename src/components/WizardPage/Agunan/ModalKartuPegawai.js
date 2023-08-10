'use client'

import React from 'react'
import Input from '@/components/Form/Input';

const ModalKartuPegawai = () => {

    return (
        <>
            <div className='mb-5'>
                <label className='block mb-3'> Jenis Agunan </label>
                <Input.Text name="jenisAgunan" id="jenisAgunan" value="Agunan Kartu Pegawai" disabled />
            </div>
            <div className='mb-5'>
                <label className='block mb-3'> Nomor </label>
                <Input.Number id="nomor" name="nomor" placeholder="Isikan nomor" />
            </div>
            <div className='mb-5'>
                <label className='block mb-3'> Tanggal </label>
                <Input.Date id="tanggal" name="tanggal" placeholder="Isikan tanggal" />
            </div>
            <div className='mb-5'>
                <label className='block mb-6'> Kartu Pegawai Dokumen (Wajib) </label>
                <Input.File id="fotoKartuPegawai" name="fotoKartuPegawai" />
            </div>
        </>
    )

}

export default ModalKartuPegawai