'use client'

import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form";

import MySelect from "@/components/Form/Select"
import Input from "@/components/Form/Input"
import Textarea from "@/components/Form/Textarea"


// const sumberPendapatan = [
//     { value: "Gaji", label: "Gaji"},
//     { value: "Usaha", label: "Usaha"},
//     { value: "Investasi", label: "Investasi"},
//     { value: "Lainnya", label: "Lainnya"},
// ];

const DataPekerjaan = ({dataPekerjaan, register, errors, control}) => {
    console.log(dataPekerjaan);
    // const { register, control, handleSubmit, getValues, setValue, formState: { errors } } = useForm({ mode: "all" });
    // const [pendapatan, setPendapatan] = useState(null);

    // const handlePendapatan = value => {
    //     setPendapatan(value);
    // }

    return (
        <>
            <hr className="h-px my-4 bg-gray-400 border-0 dark:bg-gray-700"></hr>
            <p className="text-xl text-muted font-inter-medium mb-8 mt-6"> Data Pekerjaan </p>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Pekerjaan </label>
                    <Controller
                        control={control}
                        name="pekerjaan"
                        id="pekerjaan"
                        render={({ field: { onChange } }) => (
                            <MySelect 
                                withSearch 
                                placeholder="Isikan pekerjaan" 
                                name="pekerjaan" 
                                id="pekerjaan" 
                                options={dataPekerjaan.arrPekerjaan} 
                                value={dataPekerjaan.listPekerjaan} 
                                register={register}
                                errors={errors.pekerjaan}
                                // isLoading={dataPekerjaan.refPekerjaan.isLoading}
                                // disabled={dataPekerjaan.refPekerjaan.isLoading}
                                validation={dataPekerjaan.formValidation.pekerjaan}
                                onChange={(e) => dataPekerjaan.handleChange(e, 'pekerjaan', onChange)}
                                />
                        )} />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Nama Kantor </label>
                    <Input.Text 
                        placeholder="Isikan nama kantor" 
                        id="nama_kantor" 
                        name="nama_kantor"
                        register={register}
                        errors={errors.nama_kantor}
                        validation={dataPekerjaan.formValidation.nama_kantor} />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Nomor Telepon Kantor </label>
                    <Input.Number 
                        placeholder="Isikan nomor telepon kantor" 
                        id="no_telp_kantor" 
                        name="no_telp_kantor" />
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Jabatan </label>
                    <Input.Text 
                        placeholder="Isikan jabatan" 
                        id="jabatan" 
                        name="jabatan"
                        register={register}
                        errors={errors.jabatan}
                        validation={dataPekerjaan.formValidation.jabatan} />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Nama Pimpinan </label>
                    <Input.Text 
                        placeholder="Isikan nama pimpinan" 
                        id="nama_pimpinan" 
                        name="nama_pimpinan" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className="block mb-3"> TUK/NRP/NIP/NPP/NOTAS </label>
                    <Input.Text 
                        placeholder="Isikan TUK/NRP/NIP/NPP/NOTAS" 
                        id="tuk" 
                        name="tuk" />
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className="block mb-3">Alamat Kantor</label>
                    <Textarea 
                        placeholder="Isikan alamat kantor" 
                        id="alamat_kantor" 
                        name="alamat_kantor"
                        register={register}
                        errors={errors.alamat_kantor}
                        validation={dataPekerjaan.formValidation.alamat_kantor} />
                </div>
                <div style={{ width: "950px" }}>
                    <label className="block mb-3">Cari Wilayah Kantor</label>
                    <Textarea 
                        placeholder="Isikan cari wilayah kantor" 
                        id="wilayah_kantor" 
                        name="wilayah_kantor"
                        register={register}
                        errors={errors.wilayah_kantor}
                        validation={dataPekerjaan.formValidation.wilayah_kantor} />
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Sumber Pendapatan </label>
                    <MySelect 
                        withSearch 
                        placeholder="Isikan sumber pendapatan" 
                        name="sumberPendapatan" 
                        id="sumberPendapatan" 
                        // options={dataPekerjaan.arrPendapatan} 
                        // value={dataPekerjaan.listPendapatan} 
                        />
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