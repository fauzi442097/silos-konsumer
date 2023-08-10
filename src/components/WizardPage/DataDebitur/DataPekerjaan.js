'use client'

import React, { useState } from "react"
import MySelect from "@/components/Form/Select"
import Input from "@/components/Form/Input"
import Textarea from "@/components/Form/Textarea"

const pekerjaanOptions = [
    { value: "Pegawai Swasta", label: "Pegawai Swasta"},
    { value: "PNS", label: "PNS"},
    { value: "TNI", label: "TNI"}
];

const sumberPendapatan = [
    { value: "Gaji", label: "Gaji"},
    { value: "Usaha", label: "Usaha"},
    { value: "Investasi", label: "Investasi"},
    { value: "Lainnya", label: "Lainnya"},
]

const DataPekerjaan = () => {
    const [pekerjaan, setPekerjaan] = useState(null);
    const [pendapatan, setPendapatan] = useState(null);

    const handlePekerjaan = value => {
        setPekerjaan(value);
    }

    const handlePendapatan = value => {
        setPendapatan(value);
    }

    return (
        <>
            <hr class="h-px my-4 bg-gray-400 border-0 dark:bg-gray-700"></hr>
            <p className="text-xl text-muted font-inter-medium mb-8 mt-6"> Data Pekerjaan </p>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Pekerjaan </label>
                    <MySelect withSearch placeholder="Isikan pekerjaan" name="pekerjaan" id="pekerjaan" options={pekerjaanOptions} value={pekerjaan} onChange={handlePekerjaan} />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Nama Kantor </label>
                    <Input.Text placeholder="Isikan nama kantor" id="namaKantor" name="namaKantor"/>
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Nomor Telepon Kantor </label>
                    <Input.Number placeholder="Isikan nomor telepon kantor" id="noTelpKantor" name="noTelpKantor" />
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Jabatan </label>
                    <Input.Text placeholder="Isikan jabatan" id="jabatan" name="jabatan"/>
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Nama Pimpinan </label>
                    <Input.Text placeholder="Isikan nama pimpinan" id="namaPimpinan" name="namaPimpinan"/>
                </div>
                <div style={{ width: "450px" }}>
                    <label className="block mb-3"> TUK/NRP/NIP/NPP/NOTAS </label>
                    <Input.Text placeholder="Isikan TUK/NRP/NIP/NPP/NOTAS" id="tuk" name="tuk" />
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className="block mb-3">Alamat Kantor</label>
                    <Textarea placeholder="Isikan alamat kantor" id="alamatKantor" name="wilayahKantor" />
                </div>
                <div style={{ width: "950px" }}>
                    <label className="block mb-3">Cari Wilayah Kantor</label>
                    <Textarea placeholder="Isikan cari wilayah kantor" id="wilayahKantor" name="wilayahKantor"/>
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Sumber Pendapatan </label>
                    <MySelect withSearch placeholder="Isikan sumber pendapatan" name="sumberPendapatan" id="sumberPendapatan" options={sumberPendapatan} value={pendapatan} onChange={handlePendapatan} />
                </div>
                <div style={{ width: "450px" }}>
                </div>
                <div style={{ width: "450px" }}>
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Pendapatan Bulanan Pokok </label>
                    <Input.Currency 
                        placeholder="Isikan pendapatan bulanan pokok"
                        id="pendapatanBulanan" 
                        name="pendapatanBulanan" 
                        allowDecimals={false}
                        onChange={(value, name) => console.log(value, name)}/>
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Penghasilan Lain </label>
                    <Input.Currency 
                        placeholder="Isikan penghasilan lain" 
                        id="penghasilanLain" 
                        name="penghasilanLain"
                        allowDecimals={false}
                        onChange={(value, name) => console.log(value, name)}/>
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> ULP </label>
                    <Input.Currency 
                        placeholder="Isikan ULP" 
                        id="ulp" 
                        name="ulp" 
                        allowDecimals={false}
                        onChange={(value, name) => console.log(value, name)}/>
                </div>
            </div>
            
        </>
    )
} 

export default DataPekerjaan