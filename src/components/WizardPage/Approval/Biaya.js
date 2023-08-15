'use client'

import React, { useState, useEffect } from "react"
import Input from "@/components/Form/Input";

const Biaya = () => {
    return (
        <>
            <hr className="h-px my-8 bg-gray-400 border-0 dark:bg-gray-700"></hr>

            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Biaya Asuransi </label>
                    <Input.Currency id="biayaAsuransi" name="biayaAsuransi" placeholder="Isikan biaya asuransi" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Biaya Administrasi </label>
                    <Input.Currency id="biayaAdministrasi" name="biayaAdministrasi" placeholder="Isikan biaya administrasi" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Biaya Provisi </label>
                    <Input.Currency id="biayaProvisi" name="biayaProvisi" placeholder="Isikan biaya provisi" />
                </div>
            </div>

            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Biaya Notaris </label>
                    <Input.Currency id="biayaNotaris" name="biayaNotaris" placeholder="Isikan biaya notaris" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Saldo Efektif </label>
                    <Input.Currency id="saldoEfektif" name="saldoEfektif" placeholder="Isikan saldo efektif" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Bunga Berjalan </label>
                    <Input.Number id="bungaBerjalan" name="bungaBerjalan" placeholder="Isikan bunga berjalan" />
                </div>
            </div>

            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Biaya </label>
                    <Input.Currency id="biaya" name="biaya" placeholder="Isikan biaya" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Rekomendasi </label>
                    <Input.Text id="rekomendasi" name="rekomendasi" placeholder="Isikan rekomendasi" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Level Risiko </label>
                    <Input.Text id="levelRisiko" name="levelRisiko" placeholder="Isikan level risiko" />
                </div>
            </div>

            <div className='flex flex-row justify-left gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Nomor Rekening Afiliasi </label>
                    <Input.Number id="noRekAfiliasi" name="noRekAfiliasi" placeholder="Isikan nomor rekening afiliasi" />
                </div>
                <div style={{ width: "450px" }}>
                </div>
                <div style={{ width: "450px" }}>
                </div>
            </div>
        </>
    )
}

export default Biaya