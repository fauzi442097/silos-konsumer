'use client'

import React from "react"
import Input from "@/components/Form/Input";
import MySelect from "@/components/Form/Select";
import Textarea from "@/components/Form/Textarea";

const DetailScoring = () => {
    return (
        <>
            <div className="mt-20">
                <strong className="text-3xl text-primary font-sans"> Detail Scoring </strong>
                <hr className="h-px my-8 bg-gray-400 border-0 dark:bg-gray-700"></hr>
            </div>

            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Track Record Pinjaman </label>
                    <MySelect withSearch id="trackRecordPinjaman" name="trackRecordPinjaman" placeholder="Isikan track record pinjaman" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Karakter Calon Debitur </label>
                    <MySelect withSearch id="karakterCalonDebitur" name="karakterCalonDebitur" placeholder="Isikan karakter calon debitur" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Kelengkapan Dokumen Mandatory </label>
                    <Input.Number id="kelengkapanDokumenMandatory" name="kelengkapanDokumenMandatory" placeholder="Isikan kelengkapan dokumen mandatory" />
                </div>
            </div>

            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> RITI </label>
                    <Input.Text id="riti" name="riti" placeholder="Isikan riti" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Collateral Coverage </label>
                    <Input.Currency id="collateralCoverage" name="collateralCoverage" placeholder="Isikan collateral coverage" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Catatan Analis </label>
                    <Textarea id="catatanAnalis" name="catatanAnalis" placeholder="Isikan catatan analis" />
                </div>
            </div>
        </>
    )
}

export default DetailScoring