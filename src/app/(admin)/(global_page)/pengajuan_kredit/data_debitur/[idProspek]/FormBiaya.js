'use client'

import React, { useEffect, useState } from "react"
import { FormRules } from "@/lib/formRules";
import { Controller } from "react-hook-form";

import Input from "@/components/Form/Input"

const formValidation = {
    biayaProvisi: { required: FormRules.Required() },
    biayaNotaris: { required: FormRules.Required() },
    biayaAsuransi: { required: FormRules.Required() },
    biayaAdmKredit: { required: FormRules.Required() },
}

const FormBiaya = ({ data, register, errors, control, setValue }) => {
    let dataNasabah = data ? data.data.data : data;
    console.log(dataNasabah);

    const [biayaNotaris, setBiayaNotaris] = useState(0);
    const [biayaProvisi, setBiayaProvisi] = useState(0);
    const [biayaAsuransi, setBiayaAsuransi] = useState(0);
    const [biayaAdmKredit, setBiayaAdmKredit] = useState(0);

    useEffect(() => {
        if (dataNasabah) {
            // setBiayaNotaris(dataNasabah.)
            setValue('biaya_provisi', dataNasabah.byProvisi);
            setValue('biaya_asuransi', dataNasabah.byAsuransi);
            setValue('biaya_admnistrasi_kredit', dataNasabah.byAdministrasi);
        }
    }, [dataNasabah]);


    return (
        <>
            <hr className="h-px my-4 bg-gray-400 border-0 dark:bg-gray-700"></hr>
            <p className="text-xl text-muted font-inter-medium mb-8 mt-6"> Data Biaya - Biaya </p>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Biaya Notaris </label>
                    <Input.Currency
                        placeholder="Isikan suku bunga promo"
                        id="biaya_notaris"
                        name="biaya_notaris"
                        // value={biayaNotaris}
                        allowDecimals={true}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        register={register}
                        errors={errors.biayaNotaris}
                        validation={formValidation.biayaNotaris}
                        onChange={(value, name) => console.log(value, name)} />
                </div>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Biaya Provisi </label>
                    <Input.Currency
                        placeholder="Isikan biaya provisi"
                        id="biaya_provisi"
                        name="biaya_provisi"
                        // value={biayaProvisi}
                        allowDecimals={true}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        register={register}
                        errors={errors.biayaProvisi}
                        validation={formValidation.biayaProvisi}
                        onChange={(value, name) => console.log(value, name)} />
                </div>
            </div>
            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Biaya Asuransi </label>
                    <Input.Currency
                        placeholder="Isikan biaya asuransi"
                        id="biaya_asuransi"
                        name="biaya_asuransi"
                        // value={biayaAsuransi}
                        allowDecimals={true}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        register={register}
                        errors={errors.biayaAsuransi}
                        validation={formValidation.biayaAsuransi}
                        onChange={(value, name) => console.log(value, name)} />
                </div>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Biaya Administrasi Kredit </label>
                    <Input.Currency
                        placeholder="Isikan jangka waktu promo"
                        id="biaya_administrasi_kredit"
                        name="biaya_administrasi_kredit"
                        // value={biayaAdmKredit}
                        allowDecimals={true}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        register={register}
                        errors={errors.biayaAdmKredit}
                        validation={formValidation.biayaAdmKredit}
                        onChange={(value, name) => console.log(value, name)} />
                </div>
            </div>
        </>
    )
}

export default FormBiaya