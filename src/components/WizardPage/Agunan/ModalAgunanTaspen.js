'use client'

import React from 'react'
import Input from '@/components/Form/Input';

const ModalAgunanTaspen = () => {

    return (
        <>
            <div className='mb-5'>
                <label className='block mb-3'> Jenis Agunan </label>
                <Input.Text name="jenisAgunan" id="jenisAgunan" value="Agunan Taspen" disabled />
            </div>
            <div className='mb-5'>
                <label className='block mb-3'> Nama Pemilik </label>
                <Input.Text id="namaPemilikTaspen" name="namaPemilikTaspen" placeholder="Isikan nama pemilik" />
            </div>
            <div className='mb-5'>
                <label className='block mb-3'> Nomor </label>
                <Input.Number id="nomorTaspen" name="nomorTaspen" placeholder="Isikan nomor" />
            </div>
            <div className='mb-5'>
                <label className='block mb-3'> Tanggal </label>
                <Input.Date id="tanggalTaspen" name="tanggalTaspen" placeholder="Isikan tanggal" />
            </div>
            <div className='mb-5'>
                <label className='block mb-6'> Taspen Dokumen (Wajib) </label>
                <Input.File id="fotoDokumenTaspen" name="fotoDokumenTaspen" />
            </div>
        </>
    )

}

export default ModalAgunanTaspen