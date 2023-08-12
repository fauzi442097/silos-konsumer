'use client'
import React, { useState, useEffect } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

import PageTitle from "@/components/PageTitle"
import Card from "@/components/Card"
import Simulasi from "@/components/WizardPage/Simulasi"
import DataDebitur from "@/components/WizardPage/DataDebitur/DataDebitur"
import ChecklistDokumen from "@/components/WizardPage/ChecklistDokumen"
import Slik from "@/components/WizardPage/Slik/Slik"
import Agunan from "@/components/WizardPage/Agunan/Agunan"
import ScoringKredit from "@/components/WizardPage/ScoringKredit/ScoringKredit"
import Approval from "@/components/WizardPage/Approval/Approval"

import { getKeyOfObject } from "@/lib/utils"
import DataNotFound from "@/components/DataNotFound"

export const REF_STEP = {
    SIMULASI_KREDIT: 1,
    DATA_DEBITUR: 2,
    CEKLIS_DOKUMEN: 3,
    SLIK: 4,
    DOKUMEN_AGUNAN: 5,
    SCORING_KREDIT: 6,
    APPROVAL: 7,
}

export const REF_TAB_GROUP = {
    SIMULASI_KREDIT: 'simulasi_kredit',
    DATA_DEBITUR: 'data_debitur',
    CEKLIS_DOKUMEN: 'checklist_dokumen',
    SLIK: 'slik',
    DOKUMEN_AGUNAN: 'dokumen_agunan',
    SCORING_KREDIT: 'scoring_kredit',
    APPROVAL: 'approval'
}

const FormProspek = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [step, setStep] = useState(null);
    const [currentTab, setCurrentTab] = useState(searchParams.get('tab') || REF_TAB_GROUP.DATA_DEBITUR)

    useEffect(() => {
        router.replace(`${pathname}?tab=${currentTab}`)
        let keyTabGroup = getKeyOfObject(REF_TAB_GROUP, currentTab)
        setStep(REF_STEP[keyTabGroup])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTab])

    let tabExists = Object.values(REF_TAB_GROUP).includes(currentTab);
    if (!tabExists) return <DataNotFound message={'Halaman tidak ditemukan'} />

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
            <PageTitle title="Form Prospek" />
            <Card>
                <Card.Header>
                    <ul className="flex flex-wrap items-center justify-center text-sm font-medium text-center text-gray-500 dark:text-gray-400" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                        <li className="mr-2" role="presentation">
                            <a href="#simulasiKredit" className={`inline-flex p-4 border-b-2 rounded-t-lg ${step === 1 ? "text-primary border-b-2 border-primary rounded-t-lg active dark:text-white dark:border-primary" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} group`}>
                                {step === 1 ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 12 12"><path fill="currentColor" d="M2 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm2-.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5H4Z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M7 2a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5H7Zm8.73 8.684a1 1 0 1 0-1.46-1.368l-3.083 3.29l-1.523-1.353a1 1 0 0 0-1.328 1.494l2.25 2a1 1 0 0 0 1.393-.063l3.75-4Z" clip-rule="evenodd" /></svg>
                                }
                                Simulasi Kredit
                            </a>
                        </li>
                        <li className="mr-2">
                            <a href="#dataDebitur" className={`inline-flex p-4 border-b-2 rounded-t-lg ${step === 2 ? "text-primary border-b-2 border-primary rounded-t-lg active dark:text-white dark:border-primary" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} group`}>
                                {step === 2 ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 12 12"><path fill="currentColor" d="M2 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm2-.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5H4Z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M7 2a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5H7Zm8.73 8.684a1 1 0 1 0-1.46-1.368l-3.083 3.29l-1.523-1.353a1 1 0 0 0-1.328 1.494l2.25 2a1 1 0 0 0 1.393-.063l3.75-4Z" clip-rule="evenodd" /></svg>
                                }
                                Data Debitur
                            </a>
                        </li>
                        <li className="mr-2">
                            <a href="#checklistDokumen" className={`inline-flex p-4 border-b-2 rounded-t-lg ${step === 3 ? "text-primary border-b-2 border-primary rounded-t-lg active dark:text-white dark:border-primary" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} group`}>
                                {step === 3 ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 12 12"><path fill="currentColor" d="M2 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm2-.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5H4Z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M7 2a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5H7Zm8.73 8.684a1 1 0 1 0-1.46-1.368l-3.083 3.29l-1.523-1.353a1 1 0 0 0-1.328 1.494l2.25 2a1 1 0 0 0 1.393-.063l3.75-4Z" clip-rule="evenodd" /></svg>
                                }
                                Checklist Dokumen
                            </a>
                        </li>
                        <li className="mr-2">
                            <a href="#slik" className={`inline-flex p-4 border-b-2 rounded-t-lg ${step === 4 ? "text-primary border-b-2 border-primary rounded-t-lg active dark:text-white dark:border-primary" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} group`}>
                                {step === 4 ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 12 12"><path fill="currentColor" d="M2 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm2-.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5H4Z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M7 2a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5H7Zm8.73 8.684a1 1 0 1 0-1.46-1.368l-3.083 3.29l-1.523-1.353a1 1 0 0 0-1.328 1.494l2.25 2a1 1 0 0 0 1.393-.063l3.75-4Z" clip-rule="evenodd" /></svg>
                                }
                                Slik
                            </a>
                        </li>
                        <li>
                            <a href="#dokumenAgunan" className={`inline-flex p-4 border-b-2 rounded-t-lg ${step === 5 ? "text-primary border-b-2 border-primary rounded-t-lg active dark:text-white dark:border-primary" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} group`}>
                                {step === 5 ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 12 12"><path fill="currentColor" d="M2 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm2-.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5H4Z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M7 2a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5H7Zm8.73 8.684a1 1 0 1 0-1.46-1.368l-3.083 3.29l-1.523-1.353a1 1 0 0 0-1.328 1.494l2.25 2a1 1 0 0 0 1.393-.063l3.75-4Z" clip-rule="evenodd" /></svg>
                                }
                                Dokumen Agunan
                            </a>
                        </li>
                        <li>
                            <a href="#scoringKredit" className={`inline-flex p-4 border-b-2 rounded-t-lg ${step === 6 ? "text-primary border-b-2 border-primary rounded-t-lg active dark:text-white dark:border-primary" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} group`}>
                                {step === 6 ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 12 12"><path fill="currentColor" d="M2 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm2-.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5H4Z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M7 2a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5H7Zm8.73 8.684a1 1 0 1 0-1.46-1.368l-3.083 3.29l-1.523-1.353a1 1 0 0 0-1.328 1.494l2.25 2a1 1 0 0 0 1.393-.063l3.75-4Z" clip-rule="evenodd" /></svg>
                                }
                                Scoring Kredit
                            </a>
                        </li>
                        <li>
                            <a href="#approval" className={`inline-flex p-4 border-b-2 rounded-t-lg ${step === 7 ? "text-primary border-b-2 border-primary rounded-t-lg active dark:text-white dark:border-primary" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} group`}>
                                {step === 7 ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 12 12"><path fill="currentColor" d="M2 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm2-.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5H4Z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M7 2a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5H7Zm8.73 8.684a1 1 0 1 0-1.46-1.368l-3.083 3.29l-1.523-1.353a1 1 0 0 0-1.328 1.494l2.25 2a1 1 0 0 0 1.393-.063l3.75-4Z" clip-rule="evenodd" /></svg>
                                }
                                Approval
                            </a>
                        </li>
                    </ul>
                </Card.Header>
                <Card.Body>

                    <div className="row-span-6 col-span-3 mt-10">
                        {/* {
                            step === 1 ? <DataNasabah /> :
                                step === 2 ? <DataPasangan /> :
                                    step === 3 ? <DataPekerjaan /> :
                                        step === 4 ? <DataPembiayaan /> :
                                            step === 5 ? <DataBiaya /> :
                                            <DataDokumen />
                        } */}
                        {step == REF_STEP.SIMULASI_KREDIT && <Simulasi onSubmit={handleNext} />}
                        {step == REF_STEP.DATA_DEBITUR && <DataDebitur prevAction={handleBack} onSubmit={handleNext} />}
                        {step == REF_STEP.CEKLIS_DOKUMEN && <ChecklistDokumen prevAction={handleBack} onSubmit={handleNext} />}
                        {step == REF_STEP.SLIK && <Slik prevAction={handleBack} onSubmit={handleNext} />}
                        {step == REF_STEP.DOKUMEN_AGUNAN && <Agunan prevAction={handleBack} onSubmit={handleNext} />}
                        {step == REF_STEP.SCORING_KREDIT && <ScoringKredit prevAction={handleBack} onSubmit={handleNext} />}
                        {step == REF_STEP.APPROVAL && <Approval prevAction={handleBack} onSubmit={handleNext} />}
                    </div>

                </Card.Body>
                {/* <Card.Footer>
                    <div className="flex justify-between border-t mt-15 pt-10">
                        <div className="order-first">
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => router.push(`/dalam_proses/new_entry/form`)}>
                                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M88.49 143.51a12 12 0 0 1-17 17l-48-48a12 12 0 0 1 0-17l48-48a12 12 0 0 1 17 17L49 104ZM128 92h-11l27.52-27.52a12 12 0 0 0-17-17l-48 48a12 12 0 0 0 0 17l48 48a12 12 0 0 0 17-17L117 116h11a84.09 84.09 0 0 1 84 84a12 12 0 0 0 24 0A108.12 108.12 0 0 0 128 92Z" /></svg>
                                Kembali
                            </Button>
                        </div>
                        <div className="order-last">
                            {step > 1 && (
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="mr-3"
                                    onClick={handleBack}
                                >
                                    Previous
                                </Button>
                            )}
                            {step == 6 && (
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => router.push(`/dalam_proses/new_entry`)}
                                >
                                    <svg className="w-4 h-4 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M20 13V5.749a.6.6 0 0 0-.176-.425l-3.148-3.148A.6.6 0 0 0 16.252 2H4.6a.6.6 0 0 0-.6.6v18.8a.6.6 0 0 0 .6.6H14" /><path d="M16 2v3.4a.6.6 0 0 0 .6.6H20m-4 13h6m0 0l-3-3m3 3l-3 3" /></g></svg>
                                    Submit
                                </Button >
                            )}
                            {step < 6 && (
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={handleNext}
                                >
                                    Next
                                </Button>
                            )}
                        </div>
                    </div>
                </Card.Footer> */}
            </Card>
        </>
    )
}

export default FormProspek