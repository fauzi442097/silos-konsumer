'use client'

import React, { useState, useEffect } from "react"
import Input from "@/components/Form/Input";
import Button from "@/components/Button";

const SimulasiUlang = () => {
    return (
        <>
            <hr className="h-px my-8 bg-gray-400 border-0 dark:bg-gray-700"></hr>
            
            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Plafon </label>
                    <Input.Currency id="plafon" name="plafon" placeholder="Isikan plafon" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Jangka Waktu (Bulan) </label>
                    <Input.Number id="jangkaWaktu" name="jangkaWaktu" placeholder="Isikan jangka waktu" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Suku Bunga (%) </label>
                    <Input.Number id="sukuBunga" name="sukuBunga" placeholder="Isikan suku bunga" />
                </div>
            </div>

            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Jangka Waktu Promo (Bulan) </label>
                    <Input.Number id="jangkaWaktu" name="jangkaWaktu" placeholder="Isikan jangka waktu" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Bunga Promo (%) </label>
                    <Input.Number id="bungaPromo" name="bungaPromo" placeholder="Isikan bunga promo" />
                </div>
                <div style={{ width: "450px" }}>
                </div>
            </div>

            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Angsuran </label>
                    <Input.Currency id="angsuran" name="angsuran" placeholder="Isikan angsuran" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Angsuran Promo </label>
                    <Input.Currency id="angsuranPromo" name="angsuranPromo" placeholder="Isikan angsuran promo" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Angsuran Normal Setelah Promo </label>
                    <Input.Text id="angsuranNormal" name="angsuranNormal" placeholder="Isikan angsuran normal setelah promo" />
                </div>
            </div>

            <div className='flex flex-row justify-left gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> RITI (%) </label>
                    <Input.Number id="riti" name="riti" placeholder="Isikan RITI" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-8'></label>
                    <Button>Hitung Angsuran</Button>
                </div>
                <div style={{ width: "450px" }}>
                </div>
            </div>
        </>
    )
}

export default SimulasiUlang