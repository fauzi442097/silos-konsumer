'use client'

import React, { useEffect, useState, useRef } from "react";
import { API } from "@/config/api";
import { Controller, useForm } from "react-hook-form";
import useGet from '@/hooks/useGet';
import { FormRules } from "@/lib/formRules";

import MySelect from "@/components/Form/Select"
import Input from "@/components/Form/Input"
import Button from "@/components/Button";
import Radio from "@/components/Form/Radio";
import Textarea from "@/components/Form/Textarea";
import Checkbox from "@/components/Form/Checkbox";

const statusKTP = [
    { value: "1", label: "Expired" },
    { value: "2", label: "Seumur Hidup" }
];

const statusMenikah = [
    { value: "1", label: "Belum Menikah" },
    { value: "2", label: "Menikah" },
    { value: "3", label: "Duda / Janda" }
];

const formValidation = {
    produk: { required: FormRules.Required('Pilih produk') }
}

const DataNasabah = () => {
    const { register, control, handleSubmit, getValues, setValue, formState: { errors } } = useForm({ mode: "all" });

    const [listProduk, setListProduk] = useState([]);
    const [produk, setProduk] = useState({ value: -1, label: 'Pilih produk', disabled: true });

    const [statKTP, setStatKTP] = useState(null);
    const [menikah, setMenikah] = useState(null);

    const suku_bunga = useRef(undefined)
    const handleChange = async (e, type, onChange) => {
        let value = e.value;
        switch (type) {
            case 'produk':
                onChange(value);
                let produkSelected = listProduk.find((item, i) => item.value == value);
                setProduk(produkSelected);
                suku_bunga.current = produkSelected.eqRate
                console.log(produkSelected);
                break;

            default:
                break;
        }
        // setProduk(value);
    };

    const refDataProduk = useGet(['refProduk'], `/master/list/product`, { retry: 1, refetchOnWindowFocus: false })
    console.log(refDataProduk.data);

    let arrProduk = [];
    if (!refDataProduk.isLoading) {
        let dataProduk = refDataProduk.data?.data.data;

        dataProduk.map((item) => {
            return arrProduk.push({ value: item.id, label: item.prodName })
        });
    }


    // const refDataPekerjaan = useGet(['refPekerjaan'], `/master/list/pekerjaan?idProduct=`, { retry: 1, refetchOnWindowFocus: false });

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
                                options={arrProduk}
                                value={produk}
                                isLoading={refDataProduk.isLoading}
                                disabled={refDataProduk.isLoading}
                                validation={formValidation.produk}
                                onChange={(e) => handleChange(e, 'produk', onChange)} />
                        )}
                    />
                    {/* <MySelect withSearch placeholder="Isikan produk" name="produk" id="produk" options={listProduk} value={produk} onChange={(e) => handleChange(e, 'produk', onChange)} /> */}
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Nama Debitur </label>
                    <Input.Text
                        maxLength={50}
                        placeholder="Isikan nama nasabah" id="namaDebitur" name="namaDebitur" />
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
                    <Input.Text placeholder="Isikan tempat lahir" id="tempatLahir" name="tempatLahir" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className="block mb-3">Tanggal Lahir</label>
                    <Input.Date placeholder="Isikan tanggal lahir" id="tanggalLahir" name="tanggalLahir" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className="block mb-3">Nama Ibu Kandung</label>
                    <Input.Text placeholder="Isikan nama ibu kandung" id="ibuKandung" name="ibuKandung" />
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Nomor KTP </label>
                    <Input.Group
                        append
                        useButton
                        inputElement={<Input.Text name='noKTP' placeholder='Isikan nomor KTP' />}
                        inputGroupText={<Button className={'rounded-tl-none rounded-bl-none'}> Inquiry </Button>}
                    />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Status KTP </label>
                    <MySelect withSearch placeholder="Isikan status KTP" name="statusKTP" id="statusKtp" options={statusKTP} value={statKTP} onChange={(e) => handleChange(e, 'ktp', onChange)}></MySelect>
                </div>
                <div style={{ width: "450px" }}>
                    <label className="block mb-3">Status Menikah</label>
                    <MySelect withSearch placeholder="Isikan Status Menikah" id="statusMenikah" name="statusMenikah" value={menikah} options={statusMenikah} onChange={(e) => handleChange(e, 'menikah', onChange)}></MySelect>
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className="block mb-3">Nomor Handphone</label>
                    <Input.Number placeholder="Isikan nomor handphone" id="noHandphone" name="noHandphone" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className="block mb-3">Nomor Telepon</label>
                    <Input.Number placeholder="Isikan nomor telepon" id="noTelepon" name="noTelepon" />
                </div>
                <div style={{ width: "450px" }}>
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className="block mb-3">Alamat Sesuai KTP</label>
                    <Textarea placeholder="Isikan alamat sesuai KTP" id="alamatKTP" name="alamatKTP" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className="block mb-3">Alamat Domisili</label>
                    <Textarea placeholder="Isikan alamat domisili" id="alamatDomisili" name="alamatDomisili" />
                    <Checkbox label={'Klik jika alamat sama dengan KTP'} name={'domisili'} id="domisili" />
                </div>
                <div style={{ width: "450px" }}>
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "950px" }}>
                    <label className="block mb-3">Cari Kelurahan Nasabah</label>
                    <Textarea placeholder="Isikan cari kelurahan nasabah" id="wilayahNasabah" name="wilayahNasabah" />
                </div>
                <div style={{ width: "450px" }}>
                </div>
            </div>
        </>
    )
}

export default DataNasabah