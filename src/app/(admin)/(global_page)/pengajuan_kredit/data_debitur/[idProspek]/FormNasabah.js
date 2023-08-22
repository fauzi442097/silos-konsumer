'use client'

import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
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
import { useGetWilayah } from "@/hooks/useRefData";
import { set } from "lodash";

const formValidation = {
    produk: { required: FormRules.Required('Pilih produk') },
    nama_debitur: { required: FormRules.Required(), maxLength: FormRules.MaxLength(50), pattern: FormRules.OnlyLetter('Hanya boleh diisi huruf') },
    tempat_lahir: { required: FormRules.Required(), pattern: FormRules.OnlyLetter('Hanya boleh diisi huruf') },
    tanggal_lahir: { required: FormRules.Required() },
    ibu_kandung: { required: FormRules.Required() },
    no_ktp: { required: FormRules.Required(), minLength: FormRules.MinLength(16), maxLength: FormRules.MaxLength(16) },
    status_ktp: { required: FormRules.Required() },
    status_debitur: { required: FormRules.Required() },
    no_handphone: { required: FormRules.Required(), minLength: FormRules.MinLength(11), maxLength: FormRules.MaxLength(13) },
    no_telepon: { minLength: FormRules.MinLength(10), maxLength: FormRules.MaxLength(13) },
    alamat_ktp: { required: FormRules.Required() },
    alamat_domisili: { required: FormRules.Required() },
    wilayah_debitur: { required: FormRules.Required() },
}

const statusKTP = [
    { value: "true", label: "Expired" },
    { value: "false", label: "Seumur Hidup" }
];

const useGetProduk = () => {
    const mySwal = useMySwal();
    const getProduk = useGet(['refProdukDebitur'], '/master/list/product', { retry: false, refetchOnWindowFokus: false });
    let arrProduk = [];
    if (getProduk.isSuccess) {
        let dataProduk = getProduk.data?.data.data;
        dataProduk.map((item) => {
            return arrProduk.push({ value: item.id, label: item.prodName })
        })
    }

    useEffect(() => {
        if (getProduk.isError) mySwal.error(getProduk.error)
    }, [getProduk.isError]);

    return { arrProduk, getProduk }
}

const useGetMenikah = () => {
    const mySwal = useMySwal();
    const getMenikah = useGet(['refStatusMenikah'], '/master/list/status-kawin', { retry: false, refetchOnWindowFokus: false });
    let arrMenikah = [];
    if(getMenikah.isSuccess){
        let dataMenikah = getMenikah.data?.data.data;
        dataMenikah.map((item) => {
            return arrMenikah.push({ value: item.idStatusKawin, label: item.nmStatusKawin })
        })
    }

    useEffect(() => {
        if (getMenikah.isError) mySwal.error(getMenikah.error);
    }, [getMenikah.isError]);

    return { arrMenikah, getMenikah }
}

const FormNasabah = ({ stateNasabah, register, errors, control, setValue }) => {
    // const mySwal = useMySwal();
    const minAge = moment().subtract(21, 'years');
    const { arrProduk, getProduk } = useGetProduk();
    const { arrMenikah, getMenikah } = useGetMenikah();
    const { arrWilayah, getWilayah} = useGetWilayah();

    console.log(arrWilayah);

    const [statKtp, setStatKtp] = useState(false);
    const [alamatDomisili, setAlamatDomisili] = useState(null);

    const [tglExpKtp, setTglExpKtp] = useState(undefined);
    const [tanggalLahir, setTanggalLahir] = useState(undefined);

    const [wilayah, setWilayah] = useState([]);

    const handleChange = async (e, type, onChange) => {
        let value = e.value;

        switch (type) {
            case 'produk':
                onChange(value);
                let produkSelected = arrProduk.find((item, i) => item.value === value);
                stateNasabah.setProduk(produkSelected);

                break;
            case 'tglLahir':
                onChange(e.startDate);
                setTanggalLahir(e);
                stateNasabah.setTglLahir(e);
                
                break;
            case 'ktp':
                onChange(e.startDate);
                let ktpSelected = statusKTP.find((item, i) => item.value === value);
                setStatKtp(ktpSelected);

                break;
            case 'tglExpKTP':
                onChange(e.startDate);
                setTglExpKtp(e);

                break;
            case 'statusDebitur':
                onChange(value);
                let menikahSelected = arrMenikah.find((item, i) => item.value === value);
                stateNasabah.setStatusMenikah(menikahSelected);

                break;
            default:
                break;
        }
    }

    const setDomisili = (alamatKtp) => {
        setValue.setValue('alamat_domisili', alamatKtp);
        setAlamatDomisili(alamatKtp);
    }

    useEffect(() => {
        setWilayah(arrWilayah);
    }, []);

    return (
        <>
            <p className="text-xl text-muted font-inter-medium mb-8 mt-6"> Data Debitur </p>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Produk </label>
                    <Controller
                        control={control}
                        name="produk"
                        id="produk"
                        render={({ field: { onChange } }) => (
                            <MySelect
                                withSearch
                                id="produk"
                                name='produk'
                                register={register}
                                errors={errors.produk}
                                validation={formValidation.produk}
                                options={arrProduk}
                                value={stateNasabah.produk}
                                isLoading={getProduk.isLoading}
                                disabled={getProduk.isLoading}
                                onChange={(e) => handleChange(e, 'produk', onChange)} />
                        )}
                    />
                </div>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Nama Debitur </label>
                    <Input.Text
                        maxLength={50}
                        placeholder="Isikan nama nasabah"
                        id="nama_debitur"
                        name="nama_debitur"
                        register={register}
                        errors={errors.nama_debitur}
                        validation={formValidation.nama_debitur} />
                </div>
                <div className="mt-10" style={{ width: "325px" }}>
                    <div className='flex gap-2'>
                        <Radio label="Laki - laki" name="jenisKelamin" value="laki" />
                        <Radio label="Perempuan" name="jenisKelamin" value="perempuan" className="mr-3" />
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className="block mb-3">Tempat Lahir</label>
                    <Input.Text
                        placeholder="Isikan tempat lahir"
                        id="tempat_lahir"
                        name="tempat_lahir"
                        register={register}
                        errors={errors.tempat_lahir}
                        validation={formValidation.tempat_lahir} />
                </div>
                <div style={{ width: "325px" }}>
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
                                value={tanggalLahir}
                                validation={formValidation.tanggal_lahir}
                                onChange={(e) => handleChange(e, 'tglLahir', onChange)} />
                        )}
                    />
                </div>
                <div style={{ width: "325px" }}>
                    <label className="block mb-3">Nama Ibu Kandung</label>
                    <Input.Text
                        placeholder="Isikan nama ibu kandung"
                        id="ibu_kandung"
                        name="ibu_kandung"
                        register={register}
                        errors={errors.ibu_kandung}
                        validation={formValidation.ibu_kandung} />
                </div>
            </div>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
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
                            validation={formValidation.no_ktp} />}
                        inputGroupText={<Button className={'rounded-tl-none rounded-bl-none'}> Inquiry </Button>}
                    />
                    {errors.no_ktp && <ErrorMessageForm>{errors.no_ktp.message}</ErrorMessageForm>}
                </div>
                <div style={{ width: "325px" }}>
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
                                options={statusKTP}
                                value={statKtp}
                                register={register}
                                errors={errors.status_ktp}
                                validation={formValidation.status_ktp}
                                onChange={(e) => handleChange(e, 'ktp', onChange)}
                            />
                        )} />
                </div>
                {
                    statKtp.value === "true" ?
                        <div style={{ width: "325px" }}>
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
                                        value={tglExpKtp}
                                        onChange={(e) => handleChange(e, 'tglExpKTP', onChange)}
                                    />
                                )} />
                        </div>
                        :
                        <div style={{ width: "325px" }}>

                        </div>
                }


            </div>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
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
                                value={stateNasabah.statusMenikah}
                                options={arrMenikah}
                                register={register}
                                errors={errors.status_debitur}
                                isLoading={getMenikah.isLoading}
                                disabled={getMenikah.isLoading}
                                validation={formValidation.status_debitur}
                                onChange={(e) => handleChange(e, 'statusDebitur', onChange)} />
                        )} />
                </div>
                <div style={{ width: "325px" }}>
                    <label className="block mb-3">Nomor Handphone</label>
                    <Input.Number
                        minLength={11}
                        maxLength={13}
                        placeholder="Isikan nomor handphone"
                        id="no_handphone"
                        name="no_handphone"
                        register={register}
                        errors={errors.no_handphone}
                        validation={formValidation.no_handphone} />
                </div>
                <div style={{ width: "325px" }}>
                    <label className="block mb-3">Nomor Telepon</label>
                    <Input.Number
                        minLength={11}
                        maxLength={13}
                        placeholder="Isikan nomor telepon"
                        id="no_telepon"
                        name="no_telepon"
                        register={register}
                        errors={errors.no_telepon}
                        validation={formValidation.no_telepon} />
                </div>
            </div>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className="block mb-3">Alamat Sesuai KTP</label>
                    <Textarea
                        placeholder="Isikan alamat sesuai KTP"
                        id="alamat_ktp"
                        name="alamat_ktp"
                        register={register}
                        errors={errors.alamat_ktp}
                        validation={formValidation.alamat_ktp} />
                </div>
                <div style={{ width: "325px" }}>
                    <label className="block mb-3">Alamat Domisili</label>
                    <Textarea
                        placeholder="Isikan alamat domisili"
                        id="alamat_domisili"
                        name="alamat_domisili"
                        register={register}
                        errors={errors.alamat_domisili}
                        validation={formValidation.alamat_domisili} />
                    <Checkbox
                        label={'Klik jika alamat sama dengan KTP'}
                        name={'domisili'}
                        id="domisili"
                        onChange={() => setDomisili(alamat_ktp.value)} />
                </div>
            </div>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "685px" }}>
                    <label className="block mb-3">Cari Kelurahan Debitur</label>
                    <Textarea
                        placeholder="Isikan cari kelurahan debitur"
                        id="wilayah_debitur"
                        name="wilayah_debitur"
                        value={wilayah}
                        register={register}
                        errors={errors.wilayah_debitur}
                        validation={formValidation.wilayah_debitur} />
                </div>
            </div>
        </>
    )
}

export default FormNasabah