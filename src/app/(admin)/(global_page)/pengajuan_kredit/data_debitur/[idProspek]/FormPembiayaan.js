'use client'

import React, { useState, useEffect } from "react";
import { useGetPenggunaanDana, useGetAsuransi } from "@/hooks/useRefData";
import { Controller } from "react-hook-form";
import { FormRules } from "@/lib/formRules";

import Input from "@/components/Form/Input"
import MySelect from "@/components/Form/Select"

const formValidation = {
    plafon: { required: FormRules.Required(), maxLength: FormRules.MaxLength(12) },
    penggunaan_dana: { required: FormRules.Required() },
    suku_bunga: { required: FormRules.Required() },
    jangka_waktu: { required: FormRules.Required() },
    angsuran: { required: FormRules.Required() },
    asuransi: { required: FormRules.Required() },
    rate_asuransi: { required: FormRules.Required() },
}

const FormPembiayaan = ({ data, statePembiayaan, register, errors, control, setValue, reset }) => {
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
            setValue('plafon', dataNasabah.plafon, { shouldDirty: true, shouldValidate: true, shouldTouched: true });
            setValue('suku_bunga', dataNasabah.rate, { shouldDirty: true, shouldValidate: true, shouldTouched: true });
            setValue('jangka_waktu', dataNasabah.jangkaWaktu, { shouldDirty: true, shouldValidate: true, shouldTouched: true });
            setValue('suku_bunga_promo', dataNasabah.promo ? dataNasabah.promo.ratePromo : 0, { shouldDirty: true, shouldValidate: true, shouldTouched: true });
            setValue('jangka_waktu_promo', dataNasabah.promo ? dataNasabah.promo.bulanPromo : 0, { shouldDirty: true, shouldValidate: true, shouldTouched: true });
            setAsuransi({ value: dataNasabah.asuransi.asuransiId, label: dataNasabah.asuransi.definition });
            setValue('rate_asuransi', dataNasabah.rateAsuransi, { shouldDirty: true, shouldValidate: true, shouldTouched: true });
            setValue('angsuran', dataNasabah.promo ? dataNasabah.promo.angsuranNormal : dataNasabah.totalAngsuran, { shouldDirty: true, shouldValidate: true, shouldTouched: true });
            setValue('angsuran_setalah_promo', dataNasabah.promo ? dataNasabah.promo.angsuranPromo : 0, { shouldDirty: true, shouldValidate: true, shouldTouched: true });
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
                                errors={errors.penggunaan_dana}
                                validation={formValidation.penggunaan_dana}
                                onChange={(e) => handleChange(e, 'penggunaanDana', onChange)}
                            />
                        )}
                    />
                </div>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Plafon </label>
                    <Controller
                        control={control}
                        name="plafon"
                        id="plafon"
                        render={({ field: { value } }) => (
                            <Input.Group
                                inputGroupText={'Rp'}
                                inputElement={
                                    <Input.Currency
                                        placeholder="Isikan plafon"
                                        id="plafon"
                                        name="plafon"
                                        value={value}
                                        allowDecimals={false}
                                        allowNegativeValue={false}
                                        decimalSeparator={','}
                                        groupSeparator={'.'}
                                        register={register}
                                        errors={errors.plafon}
                                        onChange={(value) => setValue('plafon', value, { shouldDirty: true, shouldValidate: true, shouldTouched: true })}
                                    />
                                }
                            />
                        )}
                    />
                </div>
            </div>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Suku Bunga (%) </label>
                    <Controller
                        control={control}
                        name="suku_bunga"
                        id="suku_bunga"
                        render={({ field: { value } }) => (
                            <Input.Currency
                                placeholder="Isikan suku bunga"
                                id="suku_bunga"
                                name="suku_bunga"
                                value={value}
                                allowNegativeValue={false}
                                allowDecimals={true}
                                maxLength={4}
                                decimalsLimit={1}
                                register={register}
                                errors={errors.suku_bunga}
                                validation={formValidation.suku_bunga}
                                onChange={(value) => setValue('suku_bunga', value, { shouldDirty: true, shouldValidate: true, shouldTouched: true })}
                            />
                        )}
                    />
                </div>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Jangka Waktu (Bulan) </label>
                    <Controller
                        control={control}
                        name="jangka_waktu"
                        id="jangka_waktu"
                        render={({ field: { value } }) => (
                            <Input.Currency
                                placeholder="Isikan jangka waktu"
                                id="jangka_waktu"
                                name="jangka_waktu"
                                value={value}
                                allowDecimals={true}
                                decimalSeparator={','}
                                groupSeparator={'.'}
                                register={register}
                                errors={errors.jangka_waktu}
                                validation={formValidation.jangka_waktu}
                                onChange={(value) => setValue('jangka_waktu', value, { shouldDirty: true, shouldValidate: true, shouldTouched: true })}
                            />
                        )}
                    />
                </div>
            </div>
            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Suku Bunga Promo (%) </label>
                    <Controller
                        control={control}
                        name="suku_bunga_promo"
                        id="suku_bunga_promo"
                        render={({ field: { value } }) => (
                            <Input.Currency
                                placeholder="Isikan suku bunga promo"
                                id="suku_bunga_promo"
                                name="suku_bunga_promo"
                                value={value}
                                allowDecimals={true}
                                decimalSeparator={','}
                                groupSeparator={'.'}
                                onChange={(value) => setValue('suku_bunga_promo', value, { shouldDirty: true, shouldValidate: true, shouldTouched: true })}
                            />
                        )}
                    />

                </div>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Jangka Waktu Promo (Bulan) </label>
                    <Controller
                        control={control}
                        name="jangka_waktu_promo"
                        id="jangka_waktu_promo"
                        render={({ field: { value } }) => (
                            <Input.Currency
                                placeholder="Isikan jangka waktu promo"
                                id="jangka_waktu_promo"
                                name="jangka_waktu_promo"
                                value={value}
                                allowDecimals={true}
                                decimalSeparator={','}
                                groupSeparator={'.'}
                                onChange={(value) => setValue('jangka_waktu_promo', value, { shouldDirty: true, shouldValidate: true, shouldTouched: true })}
                            />
                        )}
                    />

                </div>
            </div>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Asuransi </label>
                    <Controller
                        control={control}
                        name="asuransi"
                        id="asuransi"
                        render={({ field: { onChange } }) => (
                            <MySelect
                                withSearch
                                placeholder="Isikan asuransi"
                                name="asuransi"
                                id="asuransi"
                                options={arrAsuransi}
                                value={asuransi}
                                register={register}
                                errors={errors.asuransi}
                                validation={formValidation.asuransi}
                                onChange={(e) => handleChange(e, 'asuransi', onChange)}
                            />
                        )}
                    />

                </div>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Rate Asuransi </label>
                    <Controller
                        control={control}
                        name="rate_asuransi"
                        id="rate_asuransi"
                        render={({ field: { value } }) => (
                            <Input.Currency
                                placeholder="Isikan rate asuransi"
                                id="rate_asuransi"
                                name="rate_asuransi"
                                value={value}
                                allowDecimals={true}
                                decimalSeparator={','}
                                groupSeparator={'.'}
                                register={register}
                                errors={errors.rate_asuransi}
                                validation={formValidation.rate_asuransi}
                                onChange={(value) => setValue('rate_asuransi', value, { shouldDirty: true, shouldValidate: true, shouldTouched: true })}
                            />
                        )}
                    />
                </div>
            </div>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Angsuran Promo / Bulan </label>
                    <Controller
                        control={control}
                        name="angsuran"
                        id="angsuran"
                        render={({ field: { value } }) => (
                            <Input.Group
                                inputGroupText={'Rp'}
                                inputElement={
                                    <Input.Currency
                                        placeholder="Isikan angsuran"
                                        id="angsuran"
                                        name="angsuran"
                                        value={value}
                                        allowDecimals={true}
                                        decimalSeparator={','}
                                        groupSeparator={'.'}
                                        register={register}
                                        errors={errors.angsuran}
                                        validation={formValidation.angsuran}
                                        onChange={(value) => setValue('angsuran', value, { shouldDirty: true, shouldValidate: true, shouldTouched: true })}
                                    />
                                }
                            />
                        )}
                    />

                </div>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Angsuran Normal Setelah Promo / Bulan </label>
                    <Controller
                        control={control}
                        name="angsuran_setalah_promo"
                        id="angsuran_setalah_promo"
                        render={({ field: { value } }) => (
                            <Input.Group
                                inputGroupText={'Rp'}
                                inputElement={
                                    <Input.Currency
                                        placeholder="Isikan angsuran setelah promo"
                                        id="angsuran_setalah_promo"
                                        name="angsuran_setalah_promo"
                                        value={value}
                                        allowDecimals={true}
                                        decimalSeparator={','}
                                        groupSeparator={'.'}
                                        onChange={(value) => setValue('angsuran_setalah_promo', value, { shouldDirty: true, shouldValidate: true, shouldTouched: true })}
                                    />
                                }
                            />
                        )}
                    />

                </div>

            </div>

        </>
    )
}

export default FormPembiayaan