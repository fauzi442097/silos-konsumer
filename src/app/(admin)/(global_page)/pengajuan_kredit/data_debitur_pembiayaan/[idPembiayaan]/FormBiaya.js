'use client'

import React, { useEffect, useState } from "react"
import { FormRules } from "@/lib/formRules";
import { Controller } from "react-hook-form";

import Input from "@/components/Form/Input"

const formValidation = {
    biaya_provisi: { required: FormRules.Required() },
    biaya_notaris: { required: FormRules.Required() },
    biaya_asuransi: { required: FormRules.Required() },
    biaya_adm_kredit: { required: FormRules.Required() },
}

const FormBiaya = ({ data, register, errors, control, setValue }) => {
    let dataNasabah = data ? data.data.data : data;

    useEffect(() => {
        if (dataNasabah) {
            setValue('biaya_notaris', 0, { shouldDirty: true, shouldValidate: true, shouldTouched: true });
            setValue('biaya_provisi', dataNasabah[0].by_provisi ? dataNasabah[0].by_provisi : 0, { shouldDirty: true, shouldValidate: true, shouldTouched: true });
            setValue('biaya_asuransi', dataNasabah[0].by_asuransi ? dataNasabah[0].by_asuransi : 0, { shouldDirty: true, shouldValidate: true, shouldTouched: true });
            setValue('biaya_administrasi_kredit', dataNasabah[0].by_adm_kredit ? dataNasabah[0].by_adm_kredit : 0, { shouldDirty: true, shouldValidate: true, shouldTouched: true });
        }
    }, [dataNasabah]);

    return (
        <>
            <hr className="h-px my-4 bg-gray-400 border-0 dark:bg-gray-700"></hr>
            <p className="text-xl text-muted font-inter-medium mb-8 mt-6"> Data Biaya - Biaya </p>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Biaya Notaris </label>
                    <Controller
                        control={control}
                        name="biaya_notaris"
                        id="biaya_notaris"
                        render={({ field: { value } }) => (
                            <Input.Group
                                inputGroupText={'Rp'}
                                inputElement={
                                    <Input.Currency
                                        placeholder="Isikan suku bunga promo"
                                        id="biaya_notaris"
                                        name="biaya_notaris"
                                        value={value}
                                        allowDecimals={true}
                                        decimalSeparator={','}
                                        groupSeparator={'.'}
                                        register={register}
                                        errors={errors.biaya_notaris}
                                        validation={formValidation.biaya_notaris}
                                        onChange={(value) => setValue('biaya_notaris', value, { shouldDirty: true, shouldValidate: true, shouldTouched: true })}
                                    />
                                }
                            />

                        )}
                    />
                </div>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Biaya Provisi </label>
                    <Controller
                        control={control}
                        name="biaya_provisi"
                        id="biaya_provisi"
                        render={({ field: { value } }) => (
                            <Input.Group
                                inputGroupText={'Rp'}
                                inputElement={
                                    <Input.Currency
                                        placeholder="Isikan biaya provisi"
                                        id="biaya_provisi"
                                        name="biaya_provisi"
                                        value={value}
                                        allowDecimals={true}
                                        decimalSeparator={','}
                                        groupSeparator={'.'}
                                        register={register}
                                        errors={errors.biaya_provisi}
                                        validation={formValidation.biaya_provisi}
                                        onChange={(value) => setValue('biaya_provisi', value, { shouldDirty: true, shouldValidate: true, shouldTouched: true })}
                                    />
                                }
                            />
                        )}
                    />
                </div>
            </div>
            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Biaya Asuransi </label>
                    <Controller
                        control={control}
                        name="biaya_asuransi"
                        id="biaya_asuransi"
                        render={({ field: { value } }) => (
                            <Input.Group
                                inputGroupText={'Rp'}
                                inputElement={
                                    <Input.Currency
                                        placeholder="Isikan biaya asuransi"
                                        id="biaya_asuransi"
                                        name="biaya_asuransi"
                                        value={value}
                                        allowDecimals={true}
                                        decimalSeparator={','}
                                        groupSeparator={'.'}
                                        register={register}
                                        errors={errors.biaya_asuransi}
                                        validation={formValidation.biaya_asuransi}
                                        onChange={(value) => setValue('biaya_asuransi', value, { shouldDirty: true, shouldValidate: true, shouldTouched: true })}
                                    />
                                }
                            />
                        )}
                    />
                </div>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Biaya Administrasi Kredit </label>
                    <Controller
                        control={control}
                        name="biaya_administrasi_kredit"
                        id="biaya_administrasi_kredit"
                        render={({ field: { value } }) => (
                            <Input.Group
                                inputGroupText={'Rp'}
                                inputElement={
                                    <Input.Currency
                                        placeholder="Isikan biaya administrasi kredit"
                                        id="biaya_administrasi_kredit"
                                        name="biaya_administrasi_kredit"
                                        value={value}
                                        allowDecimals={true}
                                        decimalSeparator={','}
                                        groupSeparator={'.'}
                                        register={register}
                                        errors={errors.biaya_adm_kredit}
                                        validation={formValidation.biaya_adm_kredit}
                                        onChange={(value) => setValue('biaya_administrasi_kredit', value, { shouldDirty: true, shouldValidate: true, shouldTouched: true })}
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

export default FormBiaya