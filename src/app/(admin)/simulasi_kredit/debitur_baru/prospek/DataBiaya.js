'use client'

import React, { useState } from "react"
import Input from "@/components/Form/Input"

const DataBiaya = () => {
    return (
        <>
            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Biaya Provisi </label>
                    <Input.Currency
                        placeholder="Isikan biaya provisi"
                        id="biayaProvisi"
                        name="biayaProvisi"
                        allowDecimals={true}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        onChange={(value, name) => console.log(value, name)} />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Biaya Asuransi </label>
                    <Input.Currency
                        placeholder="Isikan biaya asuransi"
                        id="biayaAsuransi"
                        name="biayaAsuransi"
                        allowDecimals={true}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        onChange={(value, name) => console.log(value, name)} />
                </div>
                <div style={{ width: "450px" }}>
                </div>
            </div>
            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Biaya Administrasi </label>
                    <Input.Currency
                        placeholder="Isikan suku bunga promo"
                        id="biayaAdministrasi"
                        name="biayaAdministrasi"
                        allowDecimals={true}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        onChange={(value, name) => console.log(value, name)} />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Biaya Administrasi Kredit </label>
                    <Input.Currency
                        placeholder="Isikan jangka waktu promo"
                        id="biayaAdministrasiKredit"
                        name="biayaAdministrasiKredit"
                        allowDecimals={true}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        onChange={(value, name) => console.log(value, name)} />
                </div>
                <div style={{ width: "450px" }}>
                </div>
            </div>
        </>
    )
}

export default DataBiaya