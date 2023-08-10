'use client'

import React, { useState, useEffect, useRef } from "react"
import moment from 'moment';
import MySelect from "@/components/Form/Select";
import Input from "@/components/Form/Input";
import { API } from "@/config/api";
import MySwal from "@/components/Swal/MySwal";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "./Button";
import ModalHasilSimulasi from "./HasilSimulasi/ModalHasilSimulasi";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessageForm from "./Form/ErrorMessageForm";

const options = [
    { value: "fox", label: "Fox" },
    { value: "Butterfly", label: "Butterfly" },
    { value: "Honeybee", label: "Honeybee" }
];

export const formSimulasiSchema = yup.object({
    nama_debitur: yup.string().required('Wajib diisi').max('30', 'Maksimal 30 karakter'),
    cif: yup.string().max('15', 'Maksimal diisi 15 digit angka'),
    produk: yup.string().required('Pilih produk'),
    jangka_waktu: yup.string().required('Wajib diisi').max('3', 'Maksimal diisi 3 digit angka'),
    pekerjaan: yup.string().required('Pilih pekerjaan'),
    tanggal_lahir: yup.string().required('Wajib diisi')
})

const Simulasi = () => {
    
    const [ showModal, setShowModal ] = useState(false)

    const [dataProduk, setDataProduk] = useState([]);
    const [produk, setProduk] = useState(null);

    const suku_bunga = useRef(null)
    console.log(suku_bunga)
    
    const [dataPekerjaan, setDataPekerjaan] = useState([]);
    const [loadingPekerjaan, setLoadingPekerjaan] = useState(false)
    const [pekerjaan, setPekerjaan] = useState(null);

    const [maxTenor, setMaxTenor] = useState(false);

    const [dataMenikah, setDataMenikah] = useState([]);
    const [menikah, setMenikah] = useState(null);

    const [tanggalLahir, setTanggalLahir] = useState(null);
    const [usia, setUsia] = useState(null);

    const { register, control, handleSubmit, reset, watch, formState: { errors }  } = useForm({
        resolver: yupResolver(formSimulasiSchema),
        mode: 'all'
    });

    const closeModal = () => {
        setShowModal((prev) => !prev)
    }

    const processSimulation = (data) => {
        setShowModal(true)
    }

    const handleChange = (e, type, onChange) => {
        let value = e.value   
        switch (type)  {
            case 'produk': 
                let produkSelected = dataProduk.find((item, i) => item.value == value)
                suku_bunga.current = produkSelected.eqRate
                setProduk(produkSelected)
                getPekerjaan(value);
                onChange(value)
            break;
            case 'pekerjaan' :
                let pekerjaanSelected = dataPekerjaan.find((item, i) => item.value == value)
                setPekerjaan(pekerjaanSelected)
                onChange(value)
            break;
            case 'tglLahir' :
                setTanggalLahir(e)
                onChange(e.startDate)
            break;
        }
    };

    const getProduk = async () => {
        const arr = [];
        const response = await API.GET(`/master/list/product`);
        if (response.status != 200) return MySwal.error(response.data.error)
        let result = response.data.data;
        result.map((item) => {
            return arr.push({ 
                value: item.id, 
                label: item.prodName + ' - (Bunga: ' + item.eqRate + '%)',
                eqRate: item.eqRate,
                eqRateReal: item.eqRateReal
            })
        })
        
        setDataProduk(arr)
    }

    const getPekerjaan = async (idProduk) => {
        setLoadingPekerjaan(true)
        const arrPekerjaan = [];
        const response = await API.GET(`master/list/pekerjaan?idProduct=${idProduk}`)
        setLoadingPekerjaan(false)
            
        let getDataPekerjaan = response.data.data;
        getDataPekerjaan.map((item) => {
            return arrPekerjaan.push({ 
                value: item.idPekerjaan, 
                label: item.nmPekerjaan + ' - Max Tenor. ' + item.tenor + ' Bln', 
                tenor: item.tenor, 
                masaKerja: item.masaKerjaUmur
            })
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

    const handleChangeMenikah = value => {
        setMenikah(value);
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
                    <Input.Currency 
                        disableGroupSeparators
                        allowNegativeValue={false}
                        allowDecimals={false}
                        maxLength={15}
                        register={register} 
                        name='cif'
                        errors={errors.cif} 
                    />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Nama Debitur </label>
                    <Input.Text name="nama_debitur" register={register} errors={errors.nama_debitur} maxLength={30}/>
                </div>
            </div>
            
            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Produk </label>
                    <Controller
                        control={control}
                        name="produk"
                        render={({ field: { onChange } }) => (
                                <MySelect
                                    withSearch
                                    name={'produk'} 
                                    register={register} 
                                    errors={errors.produk} 
                                    options={dataProduk} 
                                    value={produk} 
                                    onChange={(e) => handleChange(e, 'produk', onChange)}
                                />
                            )}
                    />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Pekerjaan </label>
                    <Controller
                        control={control}
                        name="pekerjaan"
                        render={({ field: { onChange } }) => (
                                <MySelect
                                    withSearch
                                    loading={loadingPekerjaan}
                                    isDisabled={loadingPekerjaan}
                                    name={'pekerjaan'} 
                                    register={register} 
                                    errors={errors.pekerjaan} 
                                    options={dataPekerjaan} 
                                    value={pekerjaan} 
                                    onChange={(e) => handleChange(e, 'pekerjaan', onChange)}
                                />
                            )}
                    />

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
                    <Controller
                        control={control}
                        name="tanggal_lahir"
                        render={({ field: { onChange } }) => (
                                <Input.Date
                                    name={'tanggal_lahir'} 
                                    register={register} 
                                    errors={errors.tanggal_lahir} 
                                    value={tanggalLahir} 
                                    onChange={(e) => handleChange(e, 'tglLahir', onChange)}
                                />
                            )}
                    />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Usia </label>
                    <Input.Text id="usia" name="usia" value={usia} placeholder="Isikan usia"/>
                </div>
            </div>
            
            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Suku Bunga </label>
                    <Input.Group
                        append
                        inputGroupText={'%'}
                        inputElement={<Input.Text name='suku_bunga' ref={suku_bunga} value={suku_bunga.current} readOnly/>}
                    />

                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Jangka Waktu </label>
                    <Input.Group
                        append
                        inputGroupText={'Bulan'}
                        inputElement={<Input.Currency 
                            disableGroupSeparators
                            allowNegativeValue={false}
                            allowDecimals={false}
                            maxLength={3}
                            hideError 
                            register={register} 
                            name='jangka_waktu'
                            errors={errors.jangka_waktu} 
                        />}
                    />
                    {errors.jangka_waktu && <ErrorMessageForm>{errors.jangka_waktu.message}</ErrorMessageForm>}                    
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

            <div className="my-8 text-right">
                <Button onClick={handleSubmit(processSimulation)}> Simulasi </Button>
            </div>

            
            {showModal && <ModalHasilSimulasi setShowModal={setShowModal} closeModal={closeModal}/>}

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