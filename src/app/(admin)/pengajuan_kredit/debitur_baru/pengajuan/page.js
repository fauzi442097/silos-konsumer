'use client'
import React, { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

import PageTitle from "@/components/PageTitle"
import Card from "@/components/Card"
import Button from "@/components/Button"
import DataNasabah, { formDataNasabahSchema } from "./data_debitur/DataNasabah"
import DataPasangan from "./data_debitur/DataPasangan"
import DataPekerjaan from "./data_debitur/DataPekerjaan"
import DataBiaya from "./data_debitur/DataBiaya"
import DataDokumen from "./data_debitur/DataDokumen"
import DataPembiayaan from "./data_debitur/DataPembiayaan"
import { useSearchParams } from "next/navigation"
import DataNotFound from "@/components/DataNotFound"
import { getKeyOfObject } from "@/lib/utils"


export const REF_STEP = {
    SIMULASI_KREDIT : 1,
    DATA_DEBITUR: 2,
    CEKLIS_DOKUMEN: 3,
    SLIK: 4,
    DOKUMEN_KREDIT: 5,
    SCORING_KREDIT: 6
}

export const REF_TAB_GROUP = {
    SIMULASI_KREDIT: 'simulasi_kredit',
    DATA_DEBITUR : 'data_debitur',
    CEKLIS_DOKUMEN : 'data_pasangan',
    SLIK: 'slik',
    DOKUMEN_KREDIT: 'dokumen_kredit',
    SCORING_KREDIT: 'scoring_kredit'
}

const FormProspek = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [step, setStep] = useState(null);
    const [currentTab, setCurrentTab] = useState(searchParams.get('tab') || REF_TAB_GROUP.DATA_DEBITUR)

    useEffect(() => {
        router.replace(`${pathname}?tab=${currentTab}`)
        let keyTabGroup = getKeyOfObject(REF_TAB_GROUP, currentTab)
        setStep(REF_STEP[keyTabGroup])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTab])

    let tabExists = Object.values(REF_TAB_GROUP).includes(currentTab);
    if ( !tabExists ) return <DataNotFound message={'Halaman tidak ditemukan'}/>

    const handleNext = () => {
        let nextStep = step + 1;
        let key = getKeyOfObject(REF_STEP, nextStep)
        setCurrentTab(REF_TAB_GROUP[key])
        setStep(nextStep);
    };

    const handleBack = () => {
        let prevStep = step - 1;
        let key = getKeyOfObject(REF_STEP, prevStep)
        setCurrentTab(REF_TAB_GROUP[key])
        setStep(prevStep);
    };

    return (
        <>
            <PageTitle title="Pengajuan Kredit" />
            <Card>
                <Card.Header>
                    <ul className="flex flex-wrap items-center justify-center font-medium text-center text-gray-500 dark:text-gray-400" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                        <li className="mr-2" role="presentation">
                            <div className={`inline-flex p-4 border-b-2 rounded-t-lg ${step === 1 ? "text-primary border-b-2 border-primary rounded-t-lg active dark:text-white dark:border-primary" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} group`}>
                                <svg aria-hidden="true" className={`w-5 h-5 mr-2 ${step === 1 ? "text-primary dark:text-white" : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"} `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>
                                Data Debitur
                            </div>
                        </li>
                        <li className="mr-2">
                            <div className={`inline-flex p-4 border-b-2 rounded-t-lg ${step === 2 ? "text-primary border-b-2 border-primary rounded-t-lg active dark:text-white dark:border-primary" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} group`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 mr-2 ${step === 2 ? "text-primary dark:text-white" : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"} `} width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M8 9a4 4 0 1 1 4-4a4 4 0 0 1-4 4zm0-6a2 2 0 1 0 2 2a2 2 0 0 0-2-2zm16 6a4 4 0 1 1 4-4a4 4 0 0 1-4 4zm0-6a2 2 0 1 0 2 2a2 2 0 0 0-2-2zm2 27h-4a2 2 0 0 1-2-2v-7h2v7h4v-9h2v-6a1 1 0 0 0-1-1h-6.42L16 20l-4.58-8H5a1 1 0 0 0-1 1v6h2v9h4v-7h2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1-2-2v-6a3 3 0 0 1 3-3h7.58L16 16l3.42-6H27a3 3 0 0 1 3 3v6a2 2 0 0 1-2 2v7a2 2 0 0 1-2 2z" /></svg>
                                Data Pasangan
                            </div>
                        </li>
                        <li className="mr-2">
                            <div className={`inline-flex p-4 border-b-2 rounded-t-lg ${step === 3 ? "text-primary border-b-2 border-primary rounded-t-lg active dark:text-white dark:border-primary" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} group`}>
                                <svg className={`w-5 h-5 mr-2 ${step === 3 ? "text-primary dark:text-white" : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"} `} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14.96 11.7a1.98 1.98 0 0 0-.8-1.3l-5-3.57c-.7-.5-1.63-.5-2.32 0l-5 3.57c-.53.38-.84.98-.84 1.63V19c0 1.1.9 2 2 2h3v-6h4v6h1.68c-.43-.91-.68-1.92-.68-3a6.99 6.99 0 0 1 3.96-6.3zM23 13.11V4.97C23 3.88 22.12 3 21.03 3h-9.06C10.88 3 10 3.88 10 4.97l.02.05c.1.06.21.11.3.18l5 3.57c.79.56 1.34 1.4 1.56 2.32c.37-.05.74-.09 1.12-.09c1.96 0 3.73.81 5 2.11zM17 7h2v2h-2V7z" /><path fill="currentColor" d="M23 18c0-2.76-2.24-5-5-5s-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5zm-5.5 3v-2.5H15v-1h2.5V15h1v2.5H21v1h-2.5V21h-1z" /></svg>
                                Data Pekerjaan
                            </div>
                        </li>
                        <li className="mr-2">
                            <div className={`inline-flex p-4 border-b-2 rounded-t-lg ${step === 4 ? "text-primary border-b-2 border-primary rounded-t-lg active dark:text-white dark:border-primary" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} group`}>
                                <svg aria-hidden="true" className={`w-5 h-5 mr-2 ${step === 4 ? "text-primary dark:text-white" : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"} `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path></svg>
                                Data Pembiayaan
                            </div>
                        </li>
                        <li>
                            <div className={`inline-flex p-4 border-b-2 rounded-t-lg ${step === 5 ? "text-primary border-b-2 border-primary rounded-t-lg active dark:text-white dark:border-primary" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} group`}>
                                <svg aria-hidden="true" className={`w-5 h-5 mr-2 ${step === 5 ? "text-primary dark:text-white" : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"} `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path></svg>
                                Data Biaya
                            </div>
                        </li>
                        <li>
                            <div className={`inline-flex p-4 border-b-2 rounded-t-lg ${step === 5 ? "text-primary border-b-2 border-primary rounded-t-lg active dark:text-white dark:border-primary" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} group`}>
                                <svg aria-hidden="true" className={`w-5 h-5 mr-2 ${step === 5 ? "text-primary dark:text-white" : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"} `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path></svg>
                                Slik
                            </div>
                        </li>
                        <li>
                            <div className={`inline-flex p-4 border-b-2 rounded-t-lg ${step === 6 ? "text-primary border-b-2 border-primary rounded-t-lg active dark:text-white dark:border-primary" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} group`}>
                                <svg aria-hidden="true" className={`w-5 h-5 mr-2 ${step === 6 ? "text-primary dark:text-white" : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"} `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path></svg>
                                Checklist Dokumen
                            </div>
                        </li>
                    </ul>
                </Card.Header>
                <Card.Body>

                    <div className="row-span-6 col-span-3 mt-10">
                        { step == REF_STEP.SIMULASI_KREDIT && <DataNasabah onSubmit={handleNext}/> }
                        { step == REF_STEP.DATA_DEBITUR && <DataPasangan prevAction={handleBack} onSubmit={handleNext} /> }
                        { step == REF_STEP.CEKLIS_DOKUMEN && <DataPekerjaan /> }
                        { step == REF_STEP.SLIK && <DataPembiayaan /> }
                        { step == REF_STEP.DOKUMEN_KREDIT && <DataBiaya /> }
                        { step == REF_STEP.SCORING_KREDIT && <DataDokumen /> }
                    </div>

                </Card.Body>
                
            </Card>
        </>
    )
}

export default FormProspek