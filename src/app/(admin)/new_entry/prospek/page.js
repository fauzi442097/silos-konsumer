'use client'
import React, { useState } from "react"
import { useRouter } from "next/navigation"

import PageTitle from "@/components/PageTitle"
import Card from "@/components/Card"
import Button from "@/components/Button"
import DataNasabah from "./dataNasabah"

const FormProspek = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    return (
        <>
            <PageTitle title="Form Prospek" />
            <Card>
                <div dir="rtl">
                    <div class="relative h-12 w-full ...">
                        <div class="absolute h-14 w-[130px] top-0 start-0 ...">
                            <Button
                                className="btn-white w-[100px] bg-red-700 text-white text-sm px-15 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-5 mb-2"
                                onClick={() => router.push(`/new_entry/form`)}> Kembali
                                <svg className="w-4 h-4 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M88.49 143.51a12 12 0 0 1-17 17l-48-48a12 12 0 0 1 0-17l48-48a12 12 0 0 1 17 17L49 104ZM128 92h-11l27.52-27.52a12 12 0 0 0-17-17l-48 48a12 12 0 0 0 0 17l48 48a12 12 0 0 0 17-17L117 116h11a84.09 84.09 0 0 1 84 84a12 12 0 0 0 24 0A108.12 108.12 0 0 0 128 92Z" /></svg>
                            </Button>
                        </div>
                    </div>
                </div>

                <ol className="flex items-center justify-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4">
                    <li className={`flex items-center ${step === 1 ? "text-primary dark:text-primary" : "text-gray-600 dark:text-gray-500"}`}>
                        <span className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border ${step === 1 ? "border-primary" : "border-gray-500"} rounded-full shrink-0 dark:border-primary`}>
                            1
                        </span>
                        Data Nasabah
                        <svg aria-hidden="true" className="w-4 h-4 ml-2 sm:ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
                    </li>
                    <li className={`flex items-center ${step === 2 ? "text-primary dark:text-primary" : "text-gray-600 dark:text-gray-500"}`}>
                        <span className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border ${step === 2 ? "border-primary" : "border-gray-500"} rounded-full shrink-0 dark:border-primary`}>
                            2
                        </span>
                        Data Pasangan
                        <svg aria-hidden="true" className="w-4 h-4 ml-2 sm:ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
                    </li>
                    <li className={`flex items-center ${step === 3 ? "text-primary dark:text-primary" : "text-gray-600 dark:text-gray-500"}`}>
                        <span className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border ${step === 3 ? "border-primary" : "border-gray-500"} rounded-full shrink-0 dark:border-primary`}>
                            3
                        </span>
                        Data Pekerjaan
                        <svg aria-hidden="true" className="w-4 h-4 ml-2 sm:ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
                    </li>
                    <li className={`flex items-center ${step === 4 ? "text-primary dark:text-primary" : "text-gray-600 dark:text-gray-500"}`}>
                        <span className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border ${step === 4 ? "border-primary" : "border-gray-500"} rounded-full shrink-0 dark:border-primary`}>
                            4
                        </span>
                        Data Pembiayaan
                        <svg aria-hidden="true" className="w-4 h-4 ml-2 sm:ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
                    </li>
                    <li className={`flex items-center ${step === 5 ? "text-primary dark:text-primary" : "text-gray-600 dark:text-gray-500"}`}>
                        <span className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border ${step === 5 ? "border-primary" : "border-gray-500"} rounded-full shrink-0 dark:border-primary`}>
                            5
                        </span>
                        Data Biaya
                    </li>
                </ol>

                <hr class="h-px my-8 bg-gray-400 border-0 dark:bg-gray-700"></hr>

                <div className="row-span-6 col-span-3">
                    {step === 1 ? <DataNasabah /> : <DataNasabah />}
                </div>

                <div className="flex justify-center border-t mt-5 pt-10">
                    <div className="mr-2">
                        {step > 1 && (
                            <Button
                                className="bg-blue-700 w-[100px] px-15 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-5 mb-2"
                                onClick={handleBack}
                            >
                                <svg className="w-4 h-4 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><path fill="currentColor" d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0z"/></svg>
                                Kembali
                            </Button>
                        )}
                    </div>
                    <div>
                        {step == 5 && (
                            <Button
                                onClick={handleNext}
                            >
                                Simpan
                            </Button >
                        )}
                        {step < 5 && (
                            <Button
                                className="bg-primary px-15 py-2.5 w-[100px] text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-5 mb-2"
                                onClick={handleNext}
                            >
                                <svg className="w-4 h-4 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><g transform="rotate(180 512 512)"><path fill="currentColor" d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0z"/></g></svg>
                                Lanjutkan
                            </Button>
                        )}
                    </div>
                </div>


            </Card>
        </>
    )
}

export default FormProspek