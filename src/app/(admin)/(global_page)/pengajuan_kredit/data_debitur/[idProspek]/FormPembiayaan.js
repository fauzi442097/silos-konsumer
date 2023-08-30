'use client'

import React, { useState, useEffect } from "react";
import { useGetPenggunaanDana, useGetAsuransi } from "@/hooks/useRefData";
import { Controller } from "react-hook-form";
import { FormRules } from "@/lib/formRules";

import Input from "@/components/Form/Input"
import MySelect from "@/components/Form/Select"

const formValidation = {
    plafon: { required: FormRules.Required(), maxLength: FormRules.MaxLength(12) },
    penggunaanDana: { required: FormRules.Required() },
    sukuBunga: { required: FormRules.Required() },
    jangkaWaktu: { required: FormRules.Required() },
    angsuran: { required: FormRules.Required() },
}

const FormPembiayaan = ({ data, statePembiayaan, register, errors, control }) => {
    let idProduct = statePembiayaan.produk ? statePembiayaan.produk.value : null;
    let tglLahir = statePembiayaan.tglLahir ? statePembiayaan.tglLahir.startDate : null;
    let idPekerjaan = statePembiayaan.idPekerjaan ? statePembiayaan.idPekerjaan.value : null;
    let dataNasabah = data ? data.data.data : data;

    const [penggunaanDana, setPenggunaanDana] = useState(null);
    const [dataAsuransi, setDataAsuransi] = useState([]);
    const [asuransi, setAsuransi] = useState(null);
    const [jangkaWaktu, setJangkaWaktu] = useState(null);
    const [loadingAsuransi, setLoadingAsuransi] = useState(false);
    const [rateAsuransi, setRateAsuransi] = useState(undefined);
    const [plafon, setPlafon] = useState(null);
    const [sukuBunga, setSukuBunga] = useState(null);
    const [sukuBungaPromo, setSukuBungaPromo] = useState(null);
    const [jangkaWaktuPromo, setjangkaWaktuPromo] = useState(null);
    const [angsuran, setAngsuran] = useState(null);
    const [angsuranPromo, setAngsuranPromo] = useState(null);

    const { arrPenggunaanDana, getPenggunaanDana } = useGetPenggunaanDana();
    const { arrAsuransi, getAsuransi } = useGetAsuransi(idProduct, tglLahir, idPekerjaan, jangkaWaktu);

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
        if (response.status != 200) return mySwal.error(response.data.error)
        if (type == 'list-asuransi') setLoadingAsuransi(false)
        const refAsuransi = response.data.data.list
        if (type == 'rate-asuransi') return response.data.data.rate
        const arrAsuransi = []
    }

    const setValueJangkaWaktu = (value) => {
        setJangkaWaktu(value);
    }

    useEffect(() => {
        if (dataNasabah) {
            setPlafon(dataNasabah.plafon)
            setSukuBunga(dataNasabah.rate);
            setJangkaWaktu(dataNasabah.jangkaWaktu);
            setSukuBungaPromo(dataNasabah.promo ? dataNasabah.promo.ratePromo : 0);
            setjangkaWaktuPromo(dataNasabah.promo ? dataNasabah.promo.bulanPromo : 0);
            // setAsuransi({ value:dataNasabah. })
            setAngsuran(dataNasabah.promo ? dataNasabah.promo.angsuranNormal : dataNasabah.totalAngsuran);
            setAngsuranPromo(dataNasabah.promo ? dataNasabah.promo.angsuranPromo : 0);
        }
    }, [dataNasabah]);

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
                                register={register}
                                errors={errors.penggunaanDana}
                                validation={formValidation.penggunaanDana}
                                onChange={(e) => handleChange(e, 'penggunaanDana', onChange)}
                            />
                        )}
                    />
                </div>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Plafon </label>
                    <Input.Currency
                        placeholder="Isikan plafon"
                        id="plafon"
                        name="plafon"
                        value={plafon}
                        allowDecimals={false}
                        allowNegativeValue={false}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        register={register}
                        errors={errors.plafon}
                        validation={formValidation.plafon}
                    />
                </div>
            </div>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Suku Bunga (%) </label>
                    <Input.Currency
                        placeholder="Isikan suku bunga"
                        id="sukuBunga"
                        name="sukuBunga"
                        value={sukuBunga}
                        allowNegativeValue={false}
                        allowDecimals={true}
                        maxLength={4}
                        decimalsLimit={1}
                        register={register}
                        errors={errors.sukuBunga}
                        validation={formValidation.sukuBunga}
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
                                value={jangkaWaktu}
                                allowDecimals={true}
                                decimalSeparator={','}
                                groupSeparator={'.'}
                                register={register}
                                errors={errors.jangkaWaktu}
                                validation={formValidation.jangkaWaktu}
                                onChange={(value) => setValueJangkaWaktu(value)} />
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
                        value={sukuBungaPromo}
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
                        value={jangkaWaktuPromo}
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
                        value={angsuran}
                        allowDecimals={true}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        register={register}
                        errors={errors.angsuran}
                        validation={formValidation.angsuran}
                        onChange={(value, name) => console.log(value, name)} />
                </div>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Angsuran Normal Setelah Promo / Bulan </label>
                    <Input.Currency
                        placeholder="Isikan angsuran setelah promo"
                        id="angsuranSetelahPromo"
                        name="angsuranSetelahPromo"
                        value={angsuranPromo}
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