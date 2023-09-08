'use client'

import React, { useState, useEffect } from "react"
import { Controller, useForm } from "react-hook-form";
import { FormRules } from "@/lib/formRules";
import { useMySwal } from "@/hooks/useMySwal";
import useGet from '@/hooks/useGet';
import moment from "moment";

import MySelect from "@/components/Form/Select"
import Input from "@/components/Form/Input"

const formValidation = {
    nama_pasangan: { required: FormRules.Required(), maxLength: FormRules.MaxLength(50), pattern: FormRules.OnlyLetter('Hanya boleh diisi huruf') },
    no_ktp_pasangan: { required: FormRules.Required(), minLength: FormRules.MinLength(16), maxLength: FormRules.MaxLength(16) },
    jenis_pekerjaan_pasangan: { required: FormRules.Required() },
    tempat_lahir_pasangan: { required: FormRules.Required() },
    tanggal_lahir_pasangan: { required: FormRules.Required() },
    tempat_kerja_pasangan: { required: FormRules.Required() },
}

const useGetPekerjaanPasangan = () => {
    const mySwal = useMySwal();
    const getPekerjaanPasangan = useGet(['refPekerjaanPasangan'], '/master/list/pekerjaan?idProduct=0', { retry: false, refetchOnWindowFokus: false });
    let arrPekerjaanPasangan = [];
    if (getPekerjaanPasangan.isSuccess) {
        let dataPekerjaanPasangan = getPekerjaanPasangan.data?.data.data;
        dataPekerjaanPasangan.map((item) => {
            return arrPekerjaanPasangan.push({ value: item.idPekerjaan, label: item.nmPekerjaan })
        })
    }

    useEffect(() => {
        if (getPekerjaanPasangan.isError) mySwal.error(getPekerjaanPasangan.error);
    }, [getPekerjaanPasangan.isError]);

    return { arrPekerjaanPasangan, getPekerjaanPasangan }
}

const FormPasangan = ({ register, errors, control, setValue, getValue }) => {
    // const { register, control, handleSubmit, getValues, setValue, formState: { errors } } = useForm({ mode: "all" });

    const { arrPekerjaanPasangan, getPekerjaanPasangan } = useGetPekerjaanPasangan();

    const [pekerjaanPasangan, setPekerjaanPasangan] = useState(null);
    const [tanggalLahirPasangan, setTanggalLahirPasangan] = useState(undefined);
    const minAge = moment().subtract(21, 'years');

    const handleChange = async (e, type, onChange) => {
        let value = e.value;
        switch (type) {
            case 'pekerjaanPasangan':
                onChange(value);
                let pekerjaanPasanganSelected = arrPekerjaanPasangan.find((item, i) => item.value === value);
                setPekerjaanPasangan(pekerjaanPasanganSelected);

                break;
            case 'tglLahirPasangan':
                onChange(e.startDate);
                setTanggalLahirPasangan(e);

                break;
            default:
                break;
        }
    }

    return (
        <>
            <hr className="h-px my-4 bg-gray-400 border-0 dark:bg-gray-700"></hr>
            <p className="text-xl text-muted font-inter-medium mb-8 mt-6"> Data Pasangan </p>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Nama </label>
                    <Controller
                        control={control}
                        name="nama_pasangan"
                        id="nama_pasangan"
                        render={({ field: { value } }) => (
                            <Input.Text
                                placeholder="Isikan nama pasangan"
                                name="nama_pasangan"
                                id="nama_pasangan"
                                value={value}
                                register={register}
                                errors={errors.nama_pasangan}
                                validation={formValidation.nama_pasangan}
                            />
                        )}
                    />
                </div>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Nomor KTP </label>
                    <Controller
                        control={control}
                        name="no_ktp_pasangan"
                        id="no_ktp_pasangan"
                        render={({ field: { value } }) => (
                            <Input.Number
                                placeholder="Isikan nomor KTP"
                                id="no_ktp_pasangan"
                                name="no_ktp_pasangan"
                                value={value}
                                minLength={16}
                                maxLength={16}
                                register={register}
                                errors={errors.no_ktp_pasangan}
                                validation={formValidation.no_ktp_pasangan}
                            />
                        )}
                    />
                </div>
                <div style={{ width: "325px" }}>
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
                                options={arrPekerjaanPasangan}
                                value={pekerjaanPasangan}
                                register={register}
                                errors={errors.jenis_pekerjaan_pasangan}
                                validation={formValidation.jenis_pekerjaan_pasangan}
                                isLoading={getPekerjaanPasangan.isLoading}
                                disabled={getPekerjaanPasangan.isLoading}
                                onChange={(e) => handleChange(e, 'pekerjaanPasangan', onChange)} />
                        )} />
                </div>
            </div>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Tempat Lahir </label>
                    <Controller
                        control={control}
                        name="tempat_lahir_pasangan"
                        id="tempat_lahir_pasangan"
                        render={({ field: { value } }) => (
                            <Input.Text
                                placeholder="Isikan tempat lahir"
                                id="tempat_lahir_pasangan"
                                name="tempat_lahir_pasangan"
                                value={value}
                                register={register}
                                errors={errors.tempat_lahir_pasangan}
                                validation={formValidation.tempat_lahir_pasangan} 
                            />
                        )}
                    />
                </div>
                <div style={{ width: "325px" }}>
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
                                value={tanggalLahirPasangan}
                                register={register}
                                errors={errors.tanggal_lahir_pasangan}
                                validation={formValidation.tanggal_lahir_pasangan}
                                onChange={(e) => handleChange(e, 'tglLahirPasangan', onChange)}
                            />
                        )} />
                </div>
                <div style={{ width: "325px" }}>
                </div>
            </div>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Pendapatan </label>
                    <Controller
                        control={control}
                        name="pendapatan_pasangan"
                        id="pendapatan_pasangan"
                        render={({ field: { value } }) => (
                            <Input.Group
                                inputGroupText={'Rp'}
                                inputElement={
                                    <Input.Text
                                        placeholder="Isikan pendapatan pasangan"
                                        name="pendapatan_pasangan"
                                        id="pendapatan_pasangan"
                                        value={0}
                                        readOnly
                                    />
                                }
                            />
                        )}
                    />
                </div>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Tempat Kerja Pasangan </label>
                    <Controller
                        control={control}
                        name="pendapatan_pasangan"
                        id="pendapatan_pasangan"
                        render={({ field: { value } }) => (
                            <Input.Text
                                placeholder="Isikan tempat kerja pasangan"
                                id="tempat_kerja_pasangan"
                                name="tempat_kerja_pasangan"
                                value={value}
                                register={register}
                                errors={errors.tempat_kerja_pasangan}
                                validation={formValidation.tempat_kerja_pasangan}
                            />
                        )}
                    />
                </div>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Nomor Akta Nikah </label>
                    <Controller
                        control={control}
                        name="pendapatan_pasangan"
                        id="pendapatan_pasangan"
                        render={({ field: { value } }) => (
                            <Input.Text
                                placeholder="Isikan nomor akta nikah"
                                name="nomor_akta_nikah"
                                id="nomor_akta_nikah"
                                register={register} 
                                value={value}
                            />
                        )}
                    />
                </div>
            </div>
        </>
    )
}

export default FormPasangan