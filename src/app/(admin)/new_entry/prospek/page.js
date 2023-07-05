'use client'
import React, { useState } from "react"
import { useRouter } from "next/navigation"

import PageTitle from "@/components/PageTitle"
import Card from "@/components/Card"
import Button from "@/components/Button"
import DataNasabah from "./dataNasabah"
import DataPasangan from "./dataPasangan"
import DataPekerjaan from "./dataPekerjaan"

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
                <Card.Header>
                    <ul className="flex flex-wrap items-center justify-center text-sm font-medium text-center text-gray-500 dark:text-gray-400" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                        <li className="mr-2" role="presentation">
                            <a href="#dataNasabah" className={`inline-flex p-4 border-b-2 border-transparent rounded-t-lg ${step === 1 ? "text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} group`}>
                                <svg aria-hidden="true" className={`w-5 h-5 mr-2 ${step === 1 ? "text-blue-600 dark:text-blue-500" : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"} `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
                                Data Nasabah
                            </a>
                        </li>
                        <li className="mr-2">
                            <a href="#dataPasangan" className={`inline-flex p-4 border-b-2 border-transparent rounded-t-lg ${step === 2 ? "text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} group`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 mr-2 ${step === 2 ? "text-blue-600 dark:text-blue-500" : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"} `} width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M8 9a4 4 0 1 1 4-4a4 4 0 0 1-4 4zm0-6a2 2 0 1 0 2 2a2 2 0 0 0-2-2zm16 6a4 4 0 1 1 4-4a4 4 0 0 1-4 4zm0-6a2 2 0 1 0 2 2a2 2 0 0 0-2-2zm2 27h-4a2 2 0 0 1-2-2v-7h2v7h4v-9h2v-6a1 1 0 0 0-1-1h-6.42L16 20l-4.58-8H5a1 1 0 0 0-1 1v6h2v9h4v-7h2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1-2-2v-6a3 3 0 0 1 3-3h7.58L16 16l3.42-6H27a3 3 0 0 1 3 3v6a2 2 0 0 1-2 2v7a2 2 0 0 1-2 2z"/></svg>
                                Data Pasangan
                            </a>
                        </li>
                        <li className="mr-2">
                            <a href="#dataPasangan" className={`inline-flex p-4 border-b-2 border-transparent rounded-t-lg ${step === 3 ? "text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} group`}>
                                <svg className={`w-5 h-5 mr-2 ${step === 3 ? "text-blue-600 dark:text-blue-500" : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"} `} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14.96 11.7a1.98 1.98 0 0 0-.8-1.3l-5-3.57c-.7-.5-1.63-.5-2.32 0l-5 3.57c-.53.38-.84.98-.84 1.63V19c0 1.1.9 2 2 2h3v-6h4v6h1.68c-.43-.91-.68-1.92-.68-3a6.99 6.99 0 0 1 3.96-6.3zM23 13.11V4.97C23 3.88 22.12 3 21.03 3h-9.06C10.88 3 10 3.88 10 4.97l.02.05c.1.06.21.11.3.18l5 3.57c.79.56 1.34 1.4 1.56 2.32c.37-.05.74-.09 1.12-.09c1.96 0 3.73.81 5 2.11zM17 7h2v2h-2V7z"/><path fill="currentColor" d="M23 18c0-2.76-2.24-5-5-5s-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5zm-5.5 3v-2.5H15v-1h2.5V15h1v2.5H21v1h-2.5V21h-1z"/></svg>
                                Data Pekerjaan
                            </a>
                        </li>
                        <li className="mr-2">
                            <a href="#dataPasangan" className={`inline-flex p-4 border-b-2 border-transparent rounded-t-lg ${step === 4 ? "text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} group`}>
                                <svg aria-hidden="true" className={`w-5 h-5 mr-2 ${step === 4 ? "text-blue-600 dark:text-blue-500" : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"} `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path></svg>
                                Data Pembiayaan
                            </a>
                        </li>
                        <li>
                            <a href="#dataPasangan" className={`inline-flex p-4 border-b-2 border-transparent rounded-t-lg ${step === 5 ? "text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} group`}>
                                <svg aria-hidden="true" className={`w-5 h-5 mr-2 ${step === 5 ? "text-blue-600 dark:text-blue-500" : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"} `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path></svg>
                                Data Biaya
                            </a>
                        </li>
                    </ul>
                </Card.Header>
                <Card.Body>

                    <div className="row-span-6 col-span-3 mt-10">
                        {
                            step === 1 ? <DataNasabah /> : 
                            step === 2 ? <DataPasangan /> : 
                            step === 3 ? <DataPekerjaan/> :
                            step === 4 ? <DataPasangan/> : 
                            <DataNasabah/>
                        }
                    </div>

                </Card.Body>
                <Card.Footer>
                    <div className="flex justify-end border-t mt-15 pt-10">
                        <div className="mr-2">
                            {step > 1 && (
                                <Button
                                    className="bg-blue-700 w-[100px] px-15 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-5 mb-2"
                                    onClick={handleBack}
                                >
                                    <svg className="w-4 h-4 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><path fill="currentColor" d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0z" /></svg>
                                    Kembali
                                </Button>
                            )}
                        </div>
                        <div>
                            {step == 5 && (
                                <Button
                                className="bg-primary px-15 py-2.5 w-[100px] text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-5 mb-2"
                                    onClick={handleNext}
                                >
                                    <svg className="w-4 h-4 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M20 13V5.749a.6.6 0 0 0-.176-.425l-3.148-3.148A.6.6 0 0 0 16.252 2H4.6a.6.6 0 0 0-.6.6v18.8a.6.6 0 0 0 .6.6H14"/><path d="M16 2v3.4a.6.6 0 0 0 .6.6H20m-4 13h6m0 0l-3-3m3 3l-3 3"/></g></svg>
                                    Simpan
                                </Button >
                            )}
                            {step < 5 && (
                                <Button
                                    className="bg-primary px-15 py-2.5 w-[100px] text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-5 mb-2"
                                    onClick={handleNext}
                                >
                                    <svg className="w-4 h-4 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><g transform="rotate(180 512 512)"><path fill="currentColor" d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0z" /></g></svg>
                                    Lanjutkan
                                </Button>
                            )}
                        </div>
                    </div>
                </Card.Footer>
            </Card>
        </>
    )
}

export default FormProspek