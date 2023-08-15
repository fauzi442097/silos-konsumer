'use client'

import React from "react"
import Input from "@/components/Form/Input";
import Button from "../../Button";

const Scoring = () => {
    return (
        <>
            <div className="mt-20">
                <strong className="text-3xl text-primary font-sans">Scoring</strong>
                <hr className="h-px my-8 bg-gray-400 border-0 dark:bg-gray-700"></hr>
            </div>

            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Hasil Slik </label>
                    <Input.Text id="hasilSlik" name="hasilSlik" placeholder="Isikan hasil slik" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Nama Analis </label>
                    <Input.Text id="namaAnalis" name="namaAnalis" placeholder="Isikan nama analis" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Skor Analisa </label>
                    <Input.Number id="skorAnalisa" name="skorAnalisa" placeholder="Isikan skor analisa" />
                </div>
            </div>

            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Rekomendasi </label>
                    <Input.Text id="rekomendasi" name="rekomendasi" placeholder="Isikan rekomendasi" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Level Risiko </label>
                    <Input.Currency id="levelRisiko" name="levelRisiko" placeholder="Isikan level risiko" />
                </div>
                <div style={{ width: "450px" }}>
                </div>
            </div>
        </>
    )
}

export default Scoring