'use client'

import React, { useState } from "react"
import MySelect from "@/components/Form/Select"
import Input from "@/components/Form/Input"
import TabAction from "../../TabAction";
import { formDataPasangan } from "../../formValidation";
import { useForm } from "react-hook-form";

const pekerjaanPasangan = [
    { value: "Pegawai Swasta", label: "Pegawai Swasta"},
    { value: "PNS", label: "PNS"},
    { value: "TNI", label: "TNI"}
];

const DataPasangan = () => {
    const [pekerjaan, setPekerjaan] = useState(null);

    const handlePekerjaan = value => {
        setPekerjaan(value)
    }

    return (
        <>
            <hr className="h-px my-4 bg-gray-400 border-0 dark:bg-gray-700"></hr>
            <p className="text-xl text-muted font-inter-medium mb-8 mt-6"> Data Pasangan </p>

            
            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Nama </label>
                    <Input.Text placeholder="Isikan nama pasangan" name="nama_pasangan"/>
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Nomor KTP </label>
                    <Input.Number placeholder="Isikan nomor KTP" id="noKTPPasangan" name="noKTPPasangan"></Input.Number>
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Jenis Pekerjaan </label>
                    <MySelect withSearch placeholder="Isikan jenis pekerjaan" name="jenisPekerjaanPasangan" id="jenisPekerjaanPasangan" options={pekerjaanPasangan} value={pekerjaan} onChange={handlePekerjaan} />
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Tempat Lahir </label>
                    <Input.Text placeholder="Isikan tempat lahir" id="templatLahirPasangan" name="templatLahirPasangan"/>
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Tanggal Lahir </label>
                    <Input.Date placeholder="Isikan tanggal lahir" id="tanggalLahirPasangan" name="tanggalLahirPasangan"></Input.Date>
                </div>
                <div style={{ width: "450px" }}>
                </div>
            </div>
        </>
    )
} 

export default DataPasangan