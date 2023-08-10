'use client'

import React, { useState, useEffect } from "react"
import Input from "@/components/Form/Input";
import Button from "../../Button";
import MySelect from "@/components/Form/Select";
import Textarea from "@/components/Form/Textarea";

const Analis = () => {
    return (
        <>
            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Nama Debitur </label>
                    <Input.Text id="namaDebitur" name="namaDebitur" placeholder="Isikan nama debitur" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Nama Analis </label>
                    <Input.Text id="namaAnalis" name="namaAnalis" placeholder="Isikan nama analis" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> BI Checking </label>
                    <Input.Text id="biChecking" name="biChecking" placeholder="Isikan BI checking" />
                </div>
            </div>

            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Skor Analisa </label>
                    <Input.Number id="sukuBunga" name="sukuBunga" placeholder="Isikan suku bunga" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Track Record Pinjaman </label>
                    <MySelect withSearch id="trackRecordPinjaman" name="trackRecordPinjaman" placeholder="Isikan track record pinjaman" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Karakter Calon Debitur </label>
                    <MySelect id="karakterCalonDebitur" name="karakterCalonDebitur" placeholder="Isikan karakter calon debitur" />
                </div>
            </div>

            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Kelengkapan Dokumen Mandatory </label>
                    <Input.Number id="kelengkapanDokumen" name="kelengkapanDokumen" placeholder="Isikan kelengkapan dokumen mandatory" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> RITI </label>
                    <Input.Number id="riti" name="riti" placeholder="Isikan RITI" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Collateral Coverage </label>
                    <Input.Number id="collateralCoverage" name="collateralCoverage" placeholder="Isikan collateral coverage" />
                </div>
            </div>

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

            <div className='flex flex-row justify-left gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> ULP </label>
                    <Input.Number id="ulp" name="ulp" placeholder="Isikan ULP" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Catatan Analis </label>
                    <Textarea id="catatanAnalis" name="catatanAnalis" placeholder="Isikan catatan analis" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Catatan </label>
                    <Textarea id="catatan" name="catatan" placeholder="Isikan catatan" />
                </div>
            </div>
        </>
    )
}

export default Analis