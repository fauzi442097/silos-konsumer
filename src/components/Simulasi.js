'use client'

import React, { useState, useEffect } from "react"
import moment from 'moment';
import MySelect from "@/components/Form/Select";
import Input from "@/components/Form/Input";
import { API } from "@/config/api";
import MySwal from "@/components/Swal/MySwal";

const options = [
    { value: "fox", label: "Fox" },
    { value: "Butterfly", label: "Butterfly" },
    { value: "Honeybee", label: "Honeybee" }
];

const Simulasi = () => {
    const [dataProduk, setDataProduk] = useState([]);
    const [produk, setProduk] = useState(null);

    const [dataPekerjaan, setDataPekerjaan] = useState([]);
    const [pekerjaan, setPekerjaan] = useState(null);
    const [maxTenor, setMaxTenor] = useState(false);

    const [dataMenikah, setDataMenikah] = useState([]);
    const [menikah, setMenikah] = useState(null);

    const [tanggalLahir, setTanggalLahir] = useState(null);
    const [usia, setUsia] = useState(null);

    const getProduk = async () => {
        const arr = [];
        const response = await API.GET(`/master/list/product`);
        if (response.status != 200) return MySwal.error(response.data.error)

        let result = response.data.data;
        result.map((item) => {
            return arr.push({ value: item.id, label: item.prodName })
        })
        
        setDataProduk(arr)
    }

    const getPekerjaan = async (idProduk) => {
        const arrPekerjaan = [];
        const response = await API.GET(`master/list/pekerjaan?idProduct=${idProduk}`)
            
        let getDataPekerjaan = response.data.data;
        getDataPekerjaan.map((item) => {
            return arrPekerjaan.push({ value: item.idPekerjaan, label: item.nmPekerjaan, tenor: item.tenor, masaKerja: item.masaKerjaUmur})
        })

        setDataPekerjaan(arrPekerjaan);
    }

    const getMenikah = async () => {
        const arrMenikah = [];
        const response = await API.GET(`/master/list/status-kawin`);
        let getDataMenikah = response.data.data;
        getDataMenikah.map((item) => {
            return arrMenikah.push({ value: item.idStatusKawin, label: item.nmStatusKawin })
        })

        setDataMenikah(arrMenikah);
    }

    const handleChangeProduk = value => {
        setProduk(value);
        getPekerjaan(value.value);
    };

    const handleChangePekerjaan = value => {
        setPekerjaan(value);
        setMaxTenor(value.tenor);
    }

    const handleChangeMenikah = value => {
        setMenikah(value);
    }

    const handleTanggalLahir = value => {
        setTanggalLahir(value);
    }

    useEffect(() => {
        getProduk();
        getMenikah();
    }, []);

    return (
        <>
            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Jenis Debitur </label>
                    <Input.Text value="Debitur Baru" disabled/>
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> CIF </label>
                    <Input.Number id="cif" name="cif" placeholder="Isikan nomor cif" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Nama Debitur </label>
                    <Input.Text id="namaDebitur" name="namaDebitur" placeholder="Isikan nama Debitur" />
                </div>
            </div>
            
            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Produk </label>
                    <MySelect withSearch id="pruduk" name="produk" placeholder="Isikan produk" options={dataProduk} value={produk} onChange={handleChangeProduk} />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Pekerjaan </label>
                    <MySelect withSearch id="pekerjaan" name="pekerjaan" placeholder="Isikan Pekerjaan" options={dataPekerjaan} value={pekerjaan} onChange={handleChangePekerjaan} />
                </div>
                <div style={{ width: "450px" }}>
                    
                </div>
            </div>
            
            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Status Debitur </label>
                    <MySelect withSearch id="statusDebitur" name="statusDebitur" placeholder="Isikan status debitur" options={dataMenikah} value={menikah} onChange={handleChangeMenikah}/>
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Tanggal Lahir </label>
                    <Input.Date id="tanggalLahir" name="tanggalLahir" placeholder="Isikan tanggal lahir" onChange={handleTanggalLahir} value={tanggalLahir} />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Usia </label>
                    <Input.Text id="usia" name="usia" value={usia} placeholder="Isikan usia"/>
                </div>
            </div>
            
            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Suku Bunga (dalam %) </label>
                    <Input.Text id="sukuBunga" name="sukaBunga" readOnly />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Jangka Waktu (bulan) </label>
                    <Input.Text id="jangkaWaktu" name="jangkaWaktu" placeholder="Isikan jangka waktu"/>
                </div>
                <div style={{ width: "450px" }}>
                    <p className="italic text-sm font-bold text-red-500 font-inter-extralight dark:text-red-500 mt-7 mb-1 ">Maks tenor pekerjaan: {maxTenor} bulan</p>
                    <p className="italic text-sm font-bold text-red-500 font-inter-extralight dark:text-red-500">Jangka waktu melebihi maksimal tenor pekerjaan</p>
                </div>
            </div>
           
            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Bunga Promo (%) </label>
                    <Input.Text id="bungaPromo" name="bungaPromo" placeholder="Isukan bunga promo" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Jangka Waktu Promo (bulan) </label>
                    <Input.Text id="tanggalLahir" name="tanggalLahir" placeholder="Isikan jangka waktu promo" />
                </div>
                <div style={{ width: "450px" }}>
                </div>
            </div>
            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Asuransi </label>
                    <MySelect withSearch id="asuransi" name="asuransi" options={options} placeholder="Isikan Asuransi"/>
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Rate Asuransi </label>
                    <Input.Text id="rateAsuransi" name="rateAsuransi" placeholder="Isikan rate asuransi" />
                </div>
                <div style={{ width: "450px" }}>
                </div>
            </div>
            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Gaji </label>
                    <Input.Currency
                        id="penghasilan"
                        name="penghasilan"
                        placeholder="Isikan gaji"
                        allowDecimals={true}
                        allowNegativeValue={false}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        onChange={(value, name) => console.log(value, name)}
                    />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Penghasilan Lain </label>
                    <Input.Currency
                        id="penghasilanLain"
                        name="penghasilanLain"
                        placeholder="Isikan penghasilan lain"
                        allowDecimals={true}
                        allowNegativeValue={false}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        onChange={(value, name) => console.log(value, name)}
                    />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> ULP </label>
                    <Input.Currency
                        id="ulp"
                        name="ulp"
                        placeholder="Isikan ULP"
                        allowDecimals={true}
                        allowNegativeValue={false}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        onChange={(value, name) => console.log(value, name)}
                    />
                </div>
            </div>
            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Total Penghasilan </label>
                    <Input.Text readOnly/>
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Plafon</label>
                    <Input.Text id="plafon" name="plafon" placeholder="Isikan plafon" />
                </div>
                <div style={{ width: "450px" }}>
                </div>
            </div>
            {/* <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Plafon</label>
                    <Input.Text id="plafon" name="plafon" placeholder="Isikan plafon" />
                </div>
                <div style={{ width: "450px" }}>
                </div>
                <div style={{ width: "450px" }}>
                </div>
            </div> */}
        </>
    )
};

export default Simulasi