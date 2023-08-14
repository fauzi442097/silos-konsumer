'use client'

import React, { useState, useEffect, useRef, useMemo } from "react"
import MySelect from "@/components/Form/Select";
import Input from "@/components/Form/Input";
import { API } from "@/config/api";
import MySwal from "@/components/Swal/MySwal";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ModalHasilSimulasi from "../HasilSimulasi/ModalHasilSimulasi";
import ErrorMessageForm from "../Form/ErrorMessageForm";
import TabAction from '@/components/TabAction';
import Button from "../Button";
import FormGroup from "../Form/FormGroup";
import useGet from "@/hooks/useGet";
import { useMySwal } from "@/hooks/useMySwal";

const options = [
    { value: "fox", label: "Fox" },
    { value: "Butterfly", label: "Butterfly" },
    { value: "Honeybee", label: "Honeybee" }
];

export const formSimulasiSchema = yup.object({
    nama_debitur: yup.string().required('Wajib diisi').max('30', 'Maksimal diisi 30 karakter'),
    cif: yup.string().max('15', 'Maksimal diisi 15 digit angka'),
    produk: yup.string().required('Pilih produk'),
    jangka_waktu: yup.string().required('Wajib diisi').max('3', 'Maksimal diisi 3 digit angka'),
    jangka_waktu_promo: yup.string().required('Wajib diisi').max('3', 'Maksimal diisi 3 digit angka'),
    pekerjaan: yup.string().required('Pilih pekerjaan'),
    gaji: yup.string().required('Wajib diisi').max('11', 'Maksimal diisi 11 digit angka'),
    penghasilan_lain: yup.string().required('Wajib diisi').max('11', 'Maksimal diisi 11 digit angka'),
    ulp: yup.string().required('Wajib diisi').max('11', 'Maksimal diisi 11 digit angka'),
    plafon: yup.string().required('Wajib diisi').max('11', 'Maksimal diisi 11 digit angka'),
    tanggal_lahir: yup.string().required('Wajib diisi')
})



const Simulasi = ({ onSubmit }) => {

    // const mySwal = useMySwal();

    const [dataProduk, setDataProduk] = useState([]);
    const [produk, setProduk] = useState(null);

    const [ showModal, setShowModal ] = useState(false)
    const suku_bunga = useRef(null)
    
    const [dataPekerjaan, setDataPekerjaan] = useState([]);
    const [loadingPekerjaan, setLoadingPekerjaan] = useState(false)
    const [pekerjaan, setPekerjaan] = useState(null);

    const [maxTenor, setMaxTenor] = useState(false);

    const [dataMenikah, setDataMenikah] = useState([]);
    const [menikah, setMenikah] = useState(null);

    const [tanggalLahir, setTanggalLahir] = useState(null);
    const [usia, setUsia] = useState(null);

    const { register, control, handleSubmit, reset, watch, getValues, formState: { errors }  } = useForm({
        resolver: yupResolver(formSimulasiSchema),
        mode: "all"
    });

    const [ totalPenghasilan, setTotalPenghasilan ] = useState()
    const refGaji = useRef(0)
    const refULP = useRef(0)
    const refPenghasilanLain = useRef(0)

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

    // const id = 4;
    // const refAgunan = useGet(['refJenisAgunan', id], `master/list/tipe-agunan/${id}/?idPekerjaan=8`, { retry: 1, refetchOnWindowFocus: false, enabled: id != null });
    const refDataProduk = useGet(['refProduct'], `master/list/product`, { retry: 1, refetchOnWindowFocus: false });
    // console.log(refDataProduk.data);
    // console.log(refAgunan.data);

    // const getProduk = async () => {
    //     const arr = [];
    //     const response = await API.GET(`master/list/product`);
    //     console.log(response)
    //     if (response.status != 200) return MySwal.error(response.data.error)
    //     let result = response.data.data;
    //     result.map((item) => {
    //         return arr.push({ 
    //             value: item.id, 
    //             label: item.prodName + ' - (Bunga: ' + item.eqRate + '%)',
    //             eqRate: item.eqRate,
    //             eqRateReal: item.eqRateReal
    //         })
    //     })
        
    //     setDataProduk(arr)
    // }

    // const getPekerjaan = async (idProduk) => {
    //     setLoadingPekerjaan(true)
    //     const arrPekerjaan = [];
    //     const response = await API.GET(`master/list/pekerjaan?idProduct=${idProduk}`)
    //     setLoadingPekerjaan(false)
            
    //     let getDataPekerjaan = response.data.data;
    //     getDataPekerjaan.map((item) => {
    //         return arrPekerjaan.push({ 
    //             value: item.idPekerjaan, 
    //             label: item.nmPekerjaan + ' - Max Tenor. ' + item.tenor + ' Bln', 
    //             tenor: item.tenor, 
    //             masaKerja: item.masaKerjaUmur
    //         })
    //     })

    //     setDataPekerjaan(arrPekerjaan);
    // }

    // const getMenikah = async () => {
    //     const arrMenikah = [];
    //     const response = await API.GET(`master/list/status-kawin`);
    //     let getDataMenikah = response.data.data;
    //     getDataMenikah.map((item) => {
    //         return arrMenikah.push({ value: item.idStatusKawin, label: item.nmStatusKawin })
    //     })

    //     setDataMenikah(arrMenikah);
    // }

    const handleChangeMenikah = value => {
        // setMenikah(value);
    }


    const storeDataSimulasi = (data) => {
        // onSubmit();
        setShowModal(true)
    }

    const calculateTotalPenghasilan = (value, name) => {
        if ( name == 'gaji' ) refGaji.current = value || 0
        if ( name == 'ulp' ) refULP.current = value || 0
        if ( name == 'penghasilan_lain' ) refPenghasilanLain.current = value || 0
        let total = Number(refGaji.current) + Number(refULP.current) + Number(refPenghasilanLain.current)
        setTotalPenghasilan(total)
    }    

    useEffect(() => {
        // getProduk();
        // getMenikah();
    }, []);

    return (
        <>
            <div className='grid grid-cols-3 gap-8 my-8'>
                <div>
                    <label className='block mb-3'> Jenis Debitur </label>
                    <Input.Text value="Debitur Baru" disabled/>
                </div>
                <div>
                    <label className='block mb-3'> CIF </label>

                    <Input.Group
                        append
                        useButton
                        inputElement={<Input.Currency 
                            disableGroupSeparators
                            allowNegativeValue={false}
                            allowDecimals={false}
                            maxLength={15}
                            register={register} 
                            name='cif'
                            errors={errors.cif} 
                        />}
                        inputGroupText={<Button className={'rounded-tl-none rounded-bl-none py-2'}> Inquiry </Button>}
                    />
                </div>

                <div>
                    <label className='block mb-3'> Nama Debitur </label>
                    <Input.Text name="nama_debitur" register={register} errors={errors.nama_debitur} maxLength={30}/>
                </div>
            </div>
            
            <div className='grid grid-cols-3 gap-8 my-8'>
                <div>
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
                <div>
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
                <div className="flex gap-8">

                    <FormGroup
                        className={'mb-2 flex-col gap-2'}
                        label={<label className='dark:text-grey'> Suku Bunga </label>} 
                        input={
                            <>
                                <Input.Group
                                    append
                                    inputGroupText={'%'}
                                    inputElement={<Input.Text name='suku_bunga' ref={suku_bunga} value={suku_bunga.current} readOnly/>}
                                />
                            </>
                        }
                    />

                    <FormGroup
                        className={'mb-2 flex-col gap-2'}
                        label={<label className='dark:text-grey'> Jangka Waktu </label>} 
                        input={
                            <>
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
                            </>
                        }
                    />
                </div>
            </div>
            
            <div className='grid grid-cols-3 gap-8 my-8'>
                <div>
                    <label className='block mb-3'> Status Debitur </label>
                    <MySelect withSearch id="statusDebitur" name="statusDebitur" placeholder="Isikan status debitur" options={dataMenikah} value={menikah} onChange={handleChangeMenikah}/>
                </div>
                <div>
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

                <div className="flex gap-8">
                    <FormGroup
                        className={'mb-2 flex-col gap-2'}
                        label={<label className='dark:text-grey'> Bunga Promo </label>} 
                        input={
                            <>
                            <Input.Group
                                append
                                inputGroupText={'%'}
                                inputElement={<Input.Text name="bunga_promo" />}
                            />
                            </>
                        }
                    />

                    <FormGroup
                        className={'mb-2 flex-col gap-2'}
                        label={<label className='dark:text-grey'> Jangka Waktu Promo </label>} 
                        input={
                            <>
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
                                        name='jangka_waktu_promo'
                                        errors={errors.jangka_waktu_promo} 
                                    />}
                                />
                                {errors.jangka_waktu_promo && <ErrorMessageForm>{errors.jangka_waktu_promo.message}</ErrorMessageForm>}                    
                            </>
                        }
                    />
                </div>
                
            </div>

            <div className="grid grid-cols-3 gap-8">
                <div>
                    <label className='block mb-3'> Asuransi </label>
                    <MySelect withSearch id="asuransi" name="asuransi" options={options} placeholder="Isikan Asuransi"/>
                </div>
                <div>
                    <label className='block mb-3'> Rate Asuransi </label>
                    <Input.Text id="rateAsuransi" name="rateAsuransi" placeholder="Isikan rate asuransi" />
                </div>

                <div>
                    <label className='block mb-3'> Usia </label>
                    <Input.Text id="usia" name="usia" value={usia} readOnly/>
                </div>
            </div>

            
            {/* <div className='flex flex-row gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7'>
                <div>
                    <p className="italic text-sm font-bold text-red-500 font-inter-extralight dark:text-red-500 mt-7 mb-1 ">Maks tenor pekerjaan: {maxTenor} bulan</p>
                    <p className="italic text-sm font-bold text-red-500 font-inter-extralight dark:text-red-500">Jangka waktu melebihi maksimal tenor pekerjaan</p>
                </div>
            </div>
           
            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                </div>
            </div> */}

            
            <div className="grid grid-cols-3 gap-8 my-8">

                <div>
                    <FormGroup
                        className={'mb-2 flex-col gap-2'}
                        label={<label className='dark:text-grey'> Gaji </label>} 
                        input={
                            <>
                                <Input.Group
                                    inputGroupText={'Rp'}
                                    inputElement={<Input.Currency
                                        name="gaji"
                                        ref={refGaji}
                                        allowDecimals={true}
                                        register={register}
                                        errors={errors.gaji}
                                        maxLength={11} 
                                        hideError
                                        allowNegativeValue={false}
                                        decimalSeparator={','}
                                        groupSeparator={'.'}
                                        onChange={(value, name) => calculateTotalPenghasilan(value, name)}
                                    />}
                                />     
                                {errors.gaji && <ErrorMessageForm>{errors.gaji.message}</ErrorMessageForm>}                    
                            </>
                        }
                    />
                </div>

                <div>
                    <FormGroup
                        className={'mb-2 flex-col gap-2'}
                        label={<label className='dark:text-grey'> Penghasilan Lain </label>} 
                        input={
                            <>
                                <Input.Group
                                    inputGroupText={'Rp'}
                                    inputElement={<Input.Currency
                                        name="penghasilan_lain"
                                        allowDecimals={true}
                                        register={register}
                                        errors={errors.penghasilan_lain}
                                        maxLength={11} 
                                        hideError
                                        allowNegativeValue={false}
                                        decimalSeparator={','}
                                        groupSeparator={'.'}
                                        onChange={(value, name) => calculateTotalPenghasilan(value, name)}
                                    />}
                                />     
                                {errors.penghasilan_lain && <ErrorMessageForm>{errors.penghasilan_lain.message}</ErrorMessageForm>}                    
                            </>
                        }
                    />
                </div>

                <div>
                    <FormGroup
                        className={'mb-2 flex-col gap-2'}
                        label={<label className='dark:text-grey'> ULP </label>} 
                        input={
                            <>
                                <Input.Group
                                    inputGroupText={'Rp'}
                                    inputElement={<Input.Currency
                                        name="ulp"
                                        allowDecimals={true}
                                        register={register}
                                        errors={errors.ulp}
                                        maxLength={11} 
                                        hideError
                                        allowNegativeValue={false}
                                        decimalSeparator={','}
                                        groupSeparator={'.'}
                                        onChange={(value, name) => calculateTotalPenghasilan(value, name)}
                                    />}
                                />     
                                {errors.ulp && <ErrorMessageForm>{errors.ulp.message}</ErrorMessageForm>}                    
                            </>
                        }
                    />     
                </div>
            </div>

            <div className="grid grid-cols-3 gap-8">
                <div>
                    <label className='block mb-3'> Total Penghasilan </label>
                    <Input.Group
                        inputGroupText={'Rp'}
                        inputElement={<Input.Currency
                            name="total_penghasilan"
                            readOnly
                            allowDecimals={true}
                            allowNegativeValue={false}
                            decimalSeparator={','}
                            groupSeparator={'.'}
                            value={totalPenghasilan}
                            onChange={(value, name) => console.log(value, name)}
                        />}
                    />     
                </div>
                <div>
                    <label className='block mb-3'> Plafon</label>
                    <Input.Group
                        inputGroupText={'Rp'}
                        inputElement={<Input.Currency
                            name="plafon"
                            allowDecimals={true}
                            allowNegativeValue={false}
                            decimalSeparator={','}
                            groupSeparator={'.'}
                            onChange={(value, name) => console.log(value, name)}
                        />}
                    />     
                </div>
                <div style={{ width: "450px" }}>
                    
                </div>
            </div>

            {showModal && <ModalHasilSimulasi setShowModal={setShowModal} closeModal={() => setShowModal((prev) => !prev)}/>}


            <div className="my-8 text-right">
                <TabAction onSubmit={handleSubmit(storeDataSimulasi)}/>
            </div>
        </>
    )
};

export default Simulasi