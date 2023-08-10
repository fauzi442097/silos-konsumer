'use client'

import React, { useState, useEffect } from "react"
import Input from "@/components/Form/Input";
import Button from "../../Button";

const StrukturPembiayaan = () => {
    return (
        <>
            <strong className="text-3xl text-primary font-sans">Struktur Pembiayaan</strong>
            <hr class="h-px my-8 bg-gray-400 border-0 dark:bg-gray-700"></hr>
            
            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Nama Nasabah </label>
                    <Input.Text id="namaNasabah" name="namaNasabah" placeholder="Isikan nama nasabah" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Plafon </label>
                    <Input.Currency id="plafon" name="plafon" placeholder="Isikan plafon" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Jangka Waktu </label>
                    <Input.Number id="jangkaWaktu" name="jangkaWaktu" placeholder="Isikan jangka waktu" />
                </div>
            </div>

            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Suku Bunga (%) </label>
                    <Input.Number id="sukuBunga" name="sukuBunga" placeholder="Isikan suku bunga" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Angsuran </label>
                    <Input.Currency id="angsuran" name="angsuran" placeholder="Isikan angsuran" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Jangka Waktu Promo (Bulan) </label>
                    <Input.Number id="jangkaWaktuPromo" name="jangkaWaktuPromo" placeholder="Isikan jangka waktu promo" />
                </div>
            </div>

            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Suku Bunga Promo (%) </label>
                    <Input.Number id="sukuBungaPromo" name="sukuBungaPromo" placeholder="Isikan suku bunga promo" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Angsuran Promo </label>
                    <Input.Number id="angsuranPromo" name="angsuranPromo" placeholder="Isikan angsuran promo" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Angsuran Normal Setelah Promo / Bulan </label>
                    <Input.Currency id="angsuranNormalSeteleahPromo" name="angsuranNormalSeteleahPromo" placeholder="Isikan angsuran normal setelah promo" />
                </div>
            </div>

            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Riti </label>
                    <Input.Number id="riti" name="riti" placeholder="Isikan riti" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Gaji Bulanan </label>
                    <Input.Number id="gajiBulanan" name="gajiBulanan" placeholder="Isikan gaji bulanan" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Penghasilan Lain </label>
                    <Input.Currency id="penghasilanLain" name="penghasilanLain" placeholder="Isikan penghasilan lain" />
                </div>
            </div>

            <div className='flex flex-row justify-left gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> ULP </label>
                    <Input.Number id="ulp" name="ulp" placeholder="Isikan ULP" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-8'></label>
                    <Button >Hitung Angsuran</Button>
                </div>
                <div style={{ width: "450px" }}>
                </div>
            </div>
        </>
    )
}

export default StrukturPembiayaan