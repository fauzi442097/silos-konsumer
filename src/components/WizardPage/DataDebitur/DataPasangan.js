'use client'

import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form";
import moment from "moment";

import MySelect from "@/components/Form/Select"
import Input from "@/components/Form/Input"

const pekerjaanPasangan = [
    { value: "Pegawai Swasta", label: "Pegawai Swasta"},
    { value: "PNS", label: "PNS"},
    { value: "TNI", label: "TNI"}
];

const DataPasangan = ({dataPasangan}) => {
    const { register, control, handleSubmit, getValues, setValue, formState: { errors } } = useForm({ mode: "all" });

    const [pekerjaan, setPekerjaan] = useState(null);
    const minAge = moment().subtract(17, 'years');

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
                    <Input.Text 
                        placeholder="Isikan nama pasangan" 
                        name="nama_pasangan" 
                        id="nama_pasangan" 
                        register={register}
                        errors={errors.nama_pasangan}
                        validation={dataPasangan.formValidation.nama_pasangan}/>
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Nomor KTP </label>
                    <Input.Number 
                        placeholder="Isikan nomor KTP" 
                        id="no_ktp_pasangan" 
                        name="no_ktp_pasangan"
                        minLength={16}
                        maxLength={16}
                        register={register}
                        errors={errors.no_ktp_pasangan}
                        validation={dataPasangan.formValidation.no_ktp_pasangan} />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Jenis Pekerjaan </label>
                    <Controller
                        control={control}
                        name="jenis_pekerjaan_pasangan"
                        id="jenis_pekerjaan_pasangan"
                        render={({ field: { onChange } }) => (
                            <MySelect 
                                withSearch 
                                placeholder="Isikan jenis pekerjaan" 
                                name="jenis_pekerjaan_pasangan" 
                                id="jenis_pekerjaan_pasangan" 
                                options={dataPasangan.arrPekerjaanPasangan} 
                                value={dataPasangan.listPekerjaanPasangan} 
                                register={register}
                                errors={errors.produk}
                                isLoading={dataPasangan.refPekerjaanPasangan.isLoading}
                                disabled={dataPasangan.refPekerjaanPasangan.isLoading}
                                validation={dataPasangan.formValidation.produk}
                                onChange={(e) => dataPasangan.handleChange(e, 'pekerjaanPasangan', onChange)} />
                        )} />
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Tempat Lahir </label>
                    <Input.Text 
                        placeholder="Isikan tempat lahir" 
                        id="tempat_lahir_pasangan" 
                        name="tempat_lahir_pasangan"
                        register={register}
                        errors={errors.tempat_lahir_pasangan}
                        validation={dataPasangan.formValidation.tempat_lahir_pasangan}/>
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Tanggal Lahir </label>
                    <Controller
                        control={control}
                        name="tanggal_lahir_pasangan"
                        id="tanggal_lahir_pasangan"
                        render={({ field: { onChange } }) => (
                            <Input.Date 
                                placeholder="Isikan tanggal lahir" 
                                id="tanggal_lahir_pasangan" 
                                name="tanggal_lahir_pasangan"
                                maxDate={minAge}
                                startFrom={minAge}
                                value={dataPasangan.tanggalLahirPasangan} 
                                register={register}
                                errors={errors.tanggal_lahir_pasangan}
                                validation={dataPasangan.formValidation.tanggal_lahir_pasangan} 
                                onChange={(e) => dataPasangan.handleChange(e, 'tglLahirPasangan', onChange)}
                                /> 
                        )} />
                </div>
                <div style={{ width: "450px" }}>
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Pendapatan </label>
                    <Input.Currency 
                        placeholder="Isikan pendapatan pasangan" 
                        name="pendapatan_pasangan" 
                        id="pendapatan_pasangan" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Tempat Kerja Pasangan </label>
                    <Input.Text 
                        placeholder="Isikan tempat kerja pasangan" 
                        id="tempat_kerja_pasangan" 
                        name="tempat_kerja_pasangan" 
                        register={register}
                        errors={errors.tempat_kerja_pasangan}
                        validation={dataPasangan.formValidation.tempat_kerja_pasangan}/>
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Nomor Akta Nikah </label>
                    <Input.Text 
                        placeholder="Isikan nomor akta nikah" 
                        name="nomor_akta_nikah" 
                        id="nomor_akta_nikah" />
                </div>
            </div>
        </>
    )
} 

export default DataPasangan