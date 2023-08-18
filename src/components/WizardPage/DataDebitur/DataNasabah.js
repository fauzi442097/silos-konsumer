'use client'

import React, { useEffect, useState, useRef } from "react";
import { API } from "@/config/api";
import { Controller, useForm } from "react-hook-form";
import { FormRules } from "@/lib/formRules";
import { useMySwal } from "@/hooks/useMySwal";
import useGet from '@/hooks/useGet';
import moment from "moment";

import MySelect from "@/components/Form/Select";
import Input from "@/components/Form/Input";
import Button from "@/components/Button";
import Radio from "@/components/Form/Radio";
import Textarea from "@/components/Form/Textarea";
import Checkbox from "@/components/Form/Checkbox";
import ErrorMessageForm from "@/components/Form/ErrorMessageForm";

const DataNasabah = ({ dataNasabah }) => {
    const mySwal = useMySwal()
    const { register, control, handleSubmit, getValues, setValue, formState: { errors } } = useForm({ mode: "all" });

    const [alamatDomisili, setAlamatDomisili] = useState(null);
    const minAge = moment().subtract(17, 'years');

    const setDomisili = (alamatKtp) => {
        setValue('alamat_domisili', alamatKtp);
        setAlamatDomisili(alamatKtp);
    }

    return (
        <>
            <p className="text-xl text-muted font-inter-medium mb-8 mt-6"> Data Debitur </p>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Produk </label>
                    <Controller
                        control={control}
                        name="produk"
                        id="produk"
                        render={({ field: { onChange } }) => (
                            <MySelect
                                withSearch
                                id="produk"
                                name={'produk'}
                                register={register}
                                errors={errors.produk}
                                options={dataNasabah.arrProduk}
                                value={dataNasabah.produk}
                                isLoading={dataNasabah.refDataProduk.isLoading}
                                disabled={dataNasabah.refDataProduk.isLoading}
                                validation={dataNasabah.formValidation.produk}
                                onChange={(e) => dataNasabah.handleChange(e, 'produk', onChange)} />
                        )}
                    />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Nama Debitur </label>
                    <Input.Text
                        maxLength={50}
                        placeholder="Isikan nama nasabah"
                        id="nama_debitur"
                        name="nama_debitur"
                        register={register}
                        errors={errors.nama_debitur}
                        validation={dataNasabah.formValidation.nama_debitur} />
                </div>
                <div className="mt-10" style={{ width: "450px" }}>
                    <div className='flex gap-2'>
                        <Radio label="Laki - laki" name="jenisKelamin" value="laki" />
                        <Radio label="Perempuan" name="jenisKelamin" value="perempuan" className="mr-3" />
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className="block mb-3">Tempat Lahir</label>
                    <Input.Text
                        placeholder="Isikan tempat lahir"
                        id="tempat_lahir"
                        name="tempat_lahir"
                        register={register}
                        errors={errors.tempat_lahir}
                        validation={dataNasabah.formValidation.tempat_lahir} />
                </div>
                <div style={{ width: "450px" }}>
                    <label className="block mb-3">Tanggal Lahir</label>
                    <Controller
                        control={control}
                        name="tanggal_lahir"
                        id="tanggal_lahir"
                        render={({ field: { onChange } }) => (
                            <Input.Date
                                placeholder="Isikan tanggal lahir"
                                id="tanggal_lahir"
                                name="tanggal_lahir"
                                maxDate={minAge}
                                startFrom={minAge}
                                register={register}
                                errors={errors.tanggal_lahir}
                                value={dataNasabah.tanggalLahir}
                                validation={dataNasabah.formValidation.tanggal_lahir}
                                onChange={(e) => dataNasabah.handleChange(e, 'tglLahir', onChange)} />
                        )}
                    />
                </div>
                <div style={{ width: "450px" }}>
                    <label className="block mb-3">Nama Ibu Kandung</label>
                    <Input.Text
                        placeholder="Isikan nama ibu kandung"
                        id="ibu_kandung"
                        name="ibu_kandung"
                        register={register}
                        errors={errors.ibu_kandung}
                        validation={dataNasabah.formValidation.ibu_kandung} />
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Nomor KTP </label>
                    <Input.Group
                        append
                        useButton
                        inputElement={<Input.Number
                            minLength={16}
                            maxLength={16}
                            name='no_ktp'
                            id="no_ktp"
                            placeholder='Isikan nomor KTP'
                            register={register}
                            validation={dataNasabah.formValidation.no_ktp} />}
                        inputGroupText={<Button className={'rounded-tl-none rounded-bl-none'}> Inquiry </Button>}
                    />
                    {errors.no_ktp && <ErrorMessageForm>{errors.no_ktp.message}</ErrorMessageForm>}
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Status KTP </label>
                    <Controller
                        control={control}
                        name="status_ktp"
                        id="status_ktp"
                        render={({ field: { onChange } }) => (
                            <MySelect
                                withSearch
                                placeholder="Isikan status KTP"
                                name="status_ktp"
                                id="status_ktp"
                                options={dataNasabah.statusKTP}
                                value={dataNasabah.statKTP}
                                register={register}
                                errors={errors.status_ktp}
                                validation={dataNasabah.formValidation.status_ktp}
                                onChange={(e) => dataNasabah.handleChange(e, 'ktp', onChange)} />
                        )} />
                </div>
                {
                    dataNasabah.tglExpKtp === "true" ? 
                    <div style={{ width: "450px" }}>
                        <label className='block mb-3'> Tanggal Expired KTP </label>
                        <Controller
                        control={control}
                        name="Tanggal Expired KTP"
                        id="Tanggal Expired KTP"
                        render={({ field: { onChange } }) => (
                            <Input.Date 
                                placeholder="Isikan tanggal expired KTP" 
                                id="Tanggal Expired KTP" 
                                name="Tanggal Expired KTP"
                                maxDate={minAge}
                                startFrom={minAge}
                                value={dataNasabah.tglExp} 
                                onChange={(e) => dataNasabah.handleChange(e, 'tglExpKTP', onChange)}
                                /> 
                        )} />
                    </div>
                :
                    <div style={{ width: "450px" }}>

                    </div>
                }


            </div>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className="block mb-3">Status Debitur</label>
                    <Controller
                        control={control}
                        name="status_debitur"
                        id="status_debitur"
                        render={({ field: { onChange } }) => (
                            <MySelect
                                withSearch
                                placeholder="Isikan status debitur"
                                id="status_debitur"
                                name="status_debitur"
                                value={dataNasabah.menikah}
                                options={dataNasabah.arrMenikah}
                                register={register}
                                errors={errors.status_debitur}
                                isLoading={dataNasabah.refDataNikah.isLoading}
                                disabled={dataNasabah.refDataNikah.isLoading}
                                validation={dataNasabah.formValidation.status_debitur}
                                onChange={(e) => dataNasabah.handleChange(e, 'statusDebitur', onChange)} />
                        )} />
                </div>
                <div style={{ width: "450px" }}>
                    <label className="block mb-3">Nomor Handphone</label>
                    <Input.Number
                        minLength={11}
                        maxLength={13}
                        placeholder="Isikan nomor handphone"
                        id="no_handphone"
                        name="no_handphone"
                        register={register}
                        errors={errors.no_handphone}
                        validation={dataNasabah.formValidation.no_handphone} />
                </div>
                <div style={{ width: "450px" }}>
                    <label className="block mb-3">Nomor Telepon</label>
                    <Input.Number
                        minLength={11}
                        maxLength={13}
                        placeholder="Isikan nomor telepon"
                        id="no_telepon"
                        name="no_telepon"
                        register={register}
                        errors={errors.no_telepon}
                        validation={dataNasabah.formValidation.no_telepon} />
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className="block mb-3">Alamat Sesuai KTP</label>
                    <Textarea
                        placeholder="Isikan alamat sesuai KTP"
                        id="alamat_ktp"
                        name="alamat_ktp"
                        register={register}
                        errors={errors.alamat_ktp}
                        validation={dataNasabah.formValidation.alamat_ktp} />
                </div>
                <div style={{ width: "450px" }}>
                    <label className="block mb-3">Alamat Domisili</label>
                    <Textarea
                        placeholder="Isikan alamat domisili"
                        id="alamat_domisili"
                        name="alamat_domisili"
                        register={register}
                        errors={errors.alamat_domisili}
                        validation={dataNasabah.formValidation.alamat_domisili} />
                    <Checkbox
                        label={'Klik jika alamat sama dengan KTP'}
                        name={'domisili'}
                        id="domisili"
                        onChange={() => setDomisili(alamat_ktp.value)} />
                </div>
                <div style={{ width: "450px" }}>
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "950px" }}>
                    <label className="block mb-3">Cari Kelurahan Debitur</label>
                    <Textarea
                        placeholder="Isikan cari kelurahan debitur"
                        id="wilayah_debitur"
                        name="wilayah_debitur"
                        register={register}
                        errors={errors.wilayah_debitur}
                        validation={dataNasabah.formValidation.wilayah_debitur} />
                </div>
                <div style={{ width: "450px" }}>
                </div>
            </div>
        </>
    )
}

export default DataNasabah