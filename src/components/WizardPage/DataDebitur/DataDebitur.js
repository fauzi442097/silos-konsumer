'use client'

import React, { useState } from 'react'
import useGet from '@/hooks/useGet';
import { FormRules } from "@/lib/formRules";
import { Controller, useForm } from "react-hook-form";

import DataNasabah from './DataNasabah'
import DataPasangan from './DataPasangan'
import DataPekerjaan from './DataPekerjaan'
import DataPembiayaan from './DataPembiayaan'
import DataBiaya from './DataBiaya'
import TabAction from '@/components/TabAction'

const statusKTP = [
    { value: "true", label: "Expired" },
    { value: "false", label: "Seumur Hidup" }
];

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
    nama_pasangan: { required: FormRules.Required() },
    no_ktp_pasangan: { required: FormRules.Required(), minLength: FormRules.MinLength(16), maxLength: FormRules.MaxLength(16) },
    jenis_pekerjaan_pasangan: { required: FormRules.Required() },
    tempat_lahir_pasangan: { required: FormRules.Required() },
    tanggal_lahir_pasangan: { required: FormRules.Required() },
    tempat_kerja_pasangan: { required: FormRules.Required() },
    pekerjaan: { required: FormRules.Required() },
    nama_kantor: { required: FormRules.Required() },
    jabatan: { required: FormRules.Required() },
    alamat_kantor: { required: FormRules.Required() },
}

const DataDebitur = ({ prevAction, onSubmit }) => {
    const { register, control, handleSubmit, getValues, setValue, formState: { errors } } = useForm({ mode: "all" });

    const [listProduk, setListProduk] = useState([]);
    const [produk, setProduk] = useState({ value: -1, label: 'Pilih produk', disabled: true });

    const [statKTP, setStatKTP] = useState(null);
    const [tglExpKtp, setTglExpKtp] = useState(false);

    const [menikah, setMenikah] = useState(null);
    const [statusMenikah, setStatusMenikah] = useState();

    const [pekerjaanPasangan, setPekerjaanPasangan] = useState([]);
    const [listPekerjaanPasangan, setListPekerjaanPasangan] = useState({ value: -1, label: 'Pilih pekerjaan', disabled: true })

    const [pekerjaan, setPekerjaan] = useState([]);
    const [listPekerjaan, setListPekerjaan] = useState({ value: -1, label: 'Pilih pekerjaan', disabled: true });

    const [pendapatan, setPendapatan] = useState([]);
    const [listPendapatan, setListPendapatan] = useState({ value: -1, label: 'Pilih pendapatan', disabled: true });

    const [tanggalLahir, setTanggalLahir] = useState(undefined);
    const [tanggalLahirPasangan, setTanggalLahirPasangan] = useState(undefined);
    const [tglExp, setTglExp] = useState(undefined);

    const handleChange = async (e, type, onChange) => {
        let value = e.value;
        switch (type) {
            case 'produk':
                onChange(value);
                let produkSelected = arrProduk.find((item, i) => item.value == value);
                setProduk(produkSelected);
                // setListPekerjaan(produkSelected);

                break;
            case 'ktp':
                onChange(value);
                let ktpSelected = statusKTP.find((item, i) => item.value == value);
                setStatKTP(ktpSelected);
                setTglExpKtp(value);

                break;
            case 'tglLahir':
                setTanggalLahir(e);
                onChange(e.startDate);

                break;
            case 'tglExpKTP':
                setTglExp(e);
                onChange(e.startDate);

                break;
            case 'statusDebitur':
                onChange(value);
                let status = arrMenikah.find((item, i) => item.value == value);
                setMenikah(status);
                setStatusMenikah(value);

                break;
            case 'pekerjaanPasangan':
                onChange(value);
                let pekerjaanPasanganSelected = arrPekerjaanPasangan.find((item, i) => item.value == value);
                setListPekerjaanPasangan(pekerjaanPasanganSelected);

                break;
            case 'tglLahirPasangan':
                setTanggalLahirPasangan(e);
                onChange(e.startDate);

                break;
            case 'pekerjaan':
                onChange(value);
                let pekerjaanSelected = arrPekerjaan.find((item, i) => item.value == value);
                setListPekerjaan(pekerjaanSelected);

                break;
            case 'pendapatan':
                onchange(value);
                let pendapatanSelected = arrPendapatan.find((item, i) => item.value == value);
                setListPendapatan(pendapatanSelected);

                break;
        }
    };

    const refDataProduk = useGet(['refProduk'], `/master/list/product`, { retry: 1, refetchOnWindowFocus: false });
    let arrProduk = [];
    if (!refDataProduk.isLoading) {
        let dataProduk = refDataProduk.data?.data.data;
        dataProduk.map((item) => {
            return arrProduk.push({ value: item.id, label: item.prodName })
        });
    }

    const refDataNikah = useGet(['refMenikah'], `/master/list/status-kawin`, { retry: 1, refetchOnWindowFocus: false });
    let arrMenikah = [];
    if (!refDataNikah.isLoading) {
        let dataMenikah = refDataNikah.data?.data.data;
        dataMenikah.map((item) => {
            return arrMenikah.push({ value: item.idStatusKawin, label: item.nmStatusKawin })
        });
    }

    const refPekerjaanPasangan = useGet(['refPekerjaanPasangan'], `/master/list/pekerjaan?idProduct=0`, { retry: 1, refetchOnWindowFocus: false });
    let arrPekerjaanPasangan = [];
    if (!refPekerjaanPasangan.isLoading) {
        let dataPekerjaanPasangan = refPekerjaanPasangan.data?.data.data;
        dataPekerjaanPasangan.map((item) => {
            return arrPekerjaanPasangan.push({ value: item.idPekerjaan, label: item.nmPekerjaan });
        });
    }
    console.log(listPekerjaan);
    let idProduk = 0;
    const refPekerjaan = useGet(['refPekerjaan', idProduk], `/master/list/pekerjaan?idProduct=${idProduk}`, { retry: 1, refetchOnWindowFocus: false, enabled: idProduk != null });
    let arrPekerjaan = [];
    if (!refPekerjaan.isLoading) {
        let refDataPekerjaan = refPekerjaan.data?.data.data;
        refDataPekerjaan.map((item) => {
            return arrPekerjaan.push({ value: item.idPekerjaan, label: item.nmPekerjaan })
        });
    }
    
    // const refPendapatan = useGet(['refPendapatan', idProduk], `master/list/pendapatan?idProduct=${idProduk}`, { retry: 1, refetchOnWindowFocus: false, enabled: idProduk != null });
    // let arrPendapatan = [];
    // if(!refPendapatan.isLoading){
    //     let refDataPendapatan = refPendapatan.data?.data.data;
    //     refDataPendapatan.map((item) => {
    //         return arrPendapatan.push({ value: item.idSumber, label: item.keterangan });
    //     });
    // }

    const dataNasabah = {
        listProduk, setListProduk,
        produk, setProduk,
        statKTP, setStatKTP,
        menikah, setMenikah,
        tglExp, setTglExp,
        tglExpKtp, setTglExpKtp,
        tanggalLahir, setTanggalLahir,
        arrProduk, refDataProduk, statusKTP,
        arrMenikah, refDataNikah, formValidation,
        handleChange
    }

    const dataPasangan = {
        pekerjaanPasangan, setPekerjaanPasangan,
        listPekerjaanPasangan, setListPekerjaanPasangan,
        tanggalLahirPasangan, setTanggalLahir,
        refPekerjaanPasangan, arrPekerjaanPasangan,
        formValidation, handleChange
    }

    const dataPekerjaan = {
        // pekerjaan, 
        // setPekerjaan,
        // listPekerjaan, 
        // setListPekerjaan,
        arrPekerjaan, 
        // refPekerjaan, 
        formValidation, handleChange,
    }
    console.log(dataPekerjaan);
    
    const storeDataDebitur = (data) => {
        console.log(data)
        onSubmit();
    }

    return (
        <>
            <DataNasabah dataNasabah={dataNasabah} />
            {statusMenikah === 1 ? <DataPasangan dataPasangan={dataPasangan} /> : ''}
            <DataPekerjaan dataPekerjaan={dataPekerjaan} register={register} errors={errors} control={control} />
            <DataPembiayaan />
            <DataBiaya />
            <TabAction onSubmit={storeDataDebitur} prevAction={prevAction} />
        </>
    )
}

export default DataDebitur