'use client'

import React, { useState } from "react"
import Input from "@/components/Form/Input"
import MySelect from "@/components/Form/Select"
import { useGetPenggunaanDana, useGetAsuransi } from "@/hooks/useRefData"
import { Controller } from "react-hook-form"

const asuransiOptions = [
    { value: "PT. BANGUN ASKRIDA", label: "PT. BANGUN ASKRIDA" },
    { value: "PT. JAMKRIDA", label: "PT. JAMKRIDA" }
]

const FormPembiayaan = ({statePembiayaan, register, errors, control, getValues}) => {
    let idProduct = statePembiayaan.produk ? statePembiayaan.produk.value : null;
    let tglLahir = statePembiayaan.tglLahir ? statePembiayaan.tglLahir.startDate : null;
    let idPekerjaan = statePembiayaan.idPekerjaan ? statePembiayaan.idPekerjaan.value : null;
    
    const [penggunaanDana, setPenggunaanDana] = useState(null);
    const [dataAsuransi, setDataAsuransi] = useState([]);
    const [asuransi, setAsuransi] = useState(null);
    const [jangkaWaktu, setJangkaWaktu] = useState(null);
    const [loadingAsuransi, setLoadingAsuransi] = useState(false);
    const [rateAsuransi, setRateAsuransi] = useState(undefined);
    
    const {arrPenggunaanDana, getPenggunaanDana} = useGetPenggunaanDana();    
    const {arrAsuransi, getAsuransi} = useGetAsuransi(idProduct, tglLahir, idPekerjaan, jangkaWaktu);

    const handleChange = async (e, type, onChange) => {
        let value = e.value;
    
        switch (type) {
            case 'penggunaanDana':
                onChange(value);
                let penggunaanDanaSelected = arrPenggunaanDana.find((item, i) => item.value === value);
                setPenggunaanDana(penggunaanDanaSelected);
    
                break;
            case 'asuransi':
                onChange(value);
                let asuransiSelected = arrAsuransi.find((item, i) => item.value === value);
                setAsuransi(asuransiSelected);
    
                if (idProduct && tglLahir && idPekerjaan && asuransiSelected) {
                    let rateAsuransi = await getRateAsuransi(asuransiSelected, jangkaWaktu, idProduct, tglLahir, idPekerjaan, 'rate-asuransi')
                    setRateAsuransi(rateAsuransi);
                }
                break;
            default:
                break;
        }
    }
    
    const getRateAsuransi = async (asuransiId = null, jangkaWaktu, idProduct, tglLahir, idPekerjaan, type = 'list-asuransi') => {
        if (type == 'list-asuransi') setLoadingAsuransi(true)
        const response = await API.POST(`v2/master/calc-asuransi-list/${asuransiId}?jangkaWaktu=${jangkaWaktu}&idProduct=${idProduct}&${tglLahir}&idPekerjaan=${idPekerjaan}`);
        console.log(response);
        if (response.status != 200) return mySwal.error(response.data.error)
        if (type == 'list-asuransi') setLoadingAsuransi(false)
        const refAsuransi = response.data.data.list
        if (type == 'rate-asuransi') return response.data.data.rate
        const arrAsuransi = []
    }

    const setValueJangkaWaktu = (value) => {
        setJangkaWaktu(value);
    }

    const handleAsuransi = value => {
        setAsuransi(value);
    }

    return (
        <>
            <hr className="h-px my-4 bg-gray-400 border-0 dark:bg-gray-700"></hr>
            <p className="text-xl text-muted font-inter-medium mb-8 mt-6"> Data Pembiayaan </p>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Tujuan Penggunaan Dana </label>
                    <Controller
                        control={control}
                        name="produk"
                        id="produk"
                        render={({ field: { onChange } }) => (
                            <MySelect 
                                withSearch 
                                placeholder="Isikan tujuan penggunaan dana" 
                                name="penggunaan_dana" 
                                id="penggunaan_dana" 
                                options={arrPenggunaanDana} 
                                value={penggunaanDana} 
                                onChange={(e) => handleChange(e, 'penggunaanDana', onChange)}
                            />
                        )}
                    />
                </div>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Plafon </label>
                    <Input.Currency placeholder="Isikan plafon" id="plafon" name="plafon" />
                </div>
            </div>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Suku Bunga (%) </label>
                    <Input.Currency
                        placeholder="Isikan suku bunga"
                        id="sukuBunga"
                        name="sukuBunga"
                        allowDecimals={true}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        onChange={(value, name) => console.log(value, name)} />
                </div>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Jangka Waktu (Bulan) </label>
                    <Controller
                        control={control}
                        name="produk"
                        id="produk"
                        render={({ field: { onChange } }) => (
                            <Input.Currency
                                placeholder="Isikan jangka waktu"
                                id="jangka_waktu"
                                name="jangka_waktu"
                                allowDecimals={true}
                                decimalSeparator={','}
                                groupSeparator={'.'}
                                onChange={(value) => setValueJangkaWaktu(value)}/>
                        )} 
                    />
                </div>
            </div>
            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Suku Bunga Promo (%) </label>
                    <Input.Currency
                        placeholder="Isikan suku bunga promo"
                        id="sukuBungaPromo"
                        name="sukuBungaPromo"
                        allowDecimals={true}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        onChange={(value, name) => console.log(value, name)} />
                </div>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Jangka Waktu Promo (Bulan) </label>
                    <Input.Currency
                        placeholder="Isikan jangka waktu promo"
                        id="jangkaWaktuPromo"
                        name="jangkaWaktuPromo"
                        allowDecimals={true}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        onChange={(value, name) => console.log(value, name)} />
                </div>
            </div>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Asuransi </label>
                    <Controller
                        control={control}
                        name="status_debitur"
                        id="status_debitur"
                        render={({ field: { onChange } }) => (
                            <MySelect 
                                withSearch 
                                placeholder="Isikan asuransi" 
                                name="asuransi" 
                                id="asuransi" 
                                options={arrAsuransi} 
                                value={asuransi} 
                                onChange={(e) => handleChange(e, 'asuransi', onChange)}
                    />
                        )} 
                    />
                    
                </div>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Rate Asuransi </label>
                    <Input.Currency
                        placeholder="Isikan rate asuransi"
                        id="rateAsuransi"
                        name="rateAsuransi"
                        allowDecimals={true}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        onChange={(value, name) => console.log(value, name)} />
                </div>
            </div>
            
            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Angsuran Promo / Bulan </label>
                    <Input.Currency
                        placeholder="Isikan angsuran"
                        id="angsuran"
                        name="angsuran"
                        allowDecimals={true}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        onChange={(value, name) => console.log(value, name)} />
                </div>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Angsuran Normal Setelah Promo / Bulan </label>
                    <Input.Currency
                        placeholder="Isikan angsuran setelah promo"
                        id="angsuranSetelahPromo"
                        name="angsuranSetelahPromo"
                        allowDecimals={true}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        onChange={(value, name) => console.log(value, name)} />
                </div>

            </div>

        </>
    )
}

export default FormPembiayaan