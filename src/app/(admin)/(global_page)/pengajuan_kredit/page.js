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
import PencairanKredit from "@/components/WizardPage/PencairanKredit"

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
    UPDATE_PENCAIRAN: 8,
}

export const REF_TAB_GROUP = {
    SIMULASI_KREDIT: 'simulasi_kredit',
    DATA_DEBITUR: 'data_debitur',
    CEKLIS_DOKUMEN: 'checklist_dokumen',
    SLIK: 'slik',
    DOKUMEN_AGUNAN: 'dokumen_agunan',
    SCORING_KREDIT: 'scoring_kredit',
    APPROVAL: 'approval',
    UPDATE_PENCAIRAN: 'update_pencairan'
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
                                {step === 1 ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 12 12"><path fill="currentColor" d="M2 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm2-.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5H4Z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M7 2a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5H7Zm8.73 8.684a1 1 0 1 0-1.46-1.368l-3.083 3.29l-1.523-1.353a1 1 0 0 0-1.328 1.494l2.25 2a1 1 0 0 0 1.393-.063l3.75-4Z" clipRule="evenodd" /></svg>
                                }
                                Simulasi Kredit
                            </a>
                        </li>
                        <li className="mr-2">
                            <a href="#dataDebitur" className={`inline-flex p-4 border-b-2 rounded-t-lg ${step === 2 ? "text-primary border-b-2 border-primary rounded-t-lg active dark:text-white dark:border-primary" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} group`}>
                                {step === 2 ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 12 12"><path fill="currentColor" d="M2 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm2-.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5H4Z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M7 2a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5H7Zm8.73 8.684a1 1 0 1 0-1.46-1.368l-3.083 3.29l-1.523-1.353a1 1 0 0 0-1.328 1.494l2.25 2a1 1 0 0 0 1.393-.063l3.75-4Z" clipRule="evenodd" /></svg>
                                }
                                Data Debitur
                            </a>
                        </li>
                        <li className="mr-2">
                            <a href="#checklistDokumen" className={`inline-flex p-4 border-b-2 rounded-t-lg ${step === 3 ? "text-primary border-b-2 border-primary rounded-t-lg active dark:text-white dark:border-primary" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} group`}>
                                {step === 3 ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 12 12"><path fill="currentColor" d="M2 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm2-.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5H4Z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M7 2a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5H7Zm8.73 8.684a1 1 0 1 0-1.46-1.368l-3.083 3.29l-1.523-1.353a1 1 0 0 0-1.328 1.494l2.25 2a1 1 0 0 0 1.393-.063l3.75-4Z" clipRule="evenodd" /></svg>
                                }
                                Checklist Dokumen
                            </a>
                        </li>
                        <li className="mr-2">
                            <a href="#slik" className={`inline-flex p-4 border-b-2 rounded-t-lg ${step === 4 ? "text-primary border-b-2 border-primary rounded-t-lg active dark:text-white dark:border-primary" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} group`}>
                                {step === 4 ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 12 12"><path fill="currentColor" d="M2 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm2-.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5H4Z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M7 2a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5H7Zm8.73 8.684a1 1 0 1 0-1.46-1.368l-3.083 3.29l-1.523-1.353a1 1 0 0 0-1.328 1.494l2.25 2a1 1 0 0 0 1.393-.063l3.75-4Z" clipRule="evenodd" /></svg>
                                }
                                Slik
                            </a>
                        </li>
                        <li>
                            <a href="#dokumenAgunan" className={`inline-flex p-4 border-b-2 rounded-t-lg ${step === 5 ? "text-primary border-b-2 border-primary rounded-t-lg active dark:text-white dark:border-primary" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} group`}>
                                {step === 5 ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 12 12"><path fill="currentColor" d="M2 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm2-.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5H4Z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M7 2a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5H7Zm8.73 8.684a1 1 0 1 0-1.46-1.368l-3.083 3.29l-1.523-1.353a1 1 0 0 0-1.328 1.494l2.25 2a1 1 0 0 0 1.393-.063l3.75-4Z" clipRule="evenodd" /></svg>
                                }
                                Dokumen Agunan
                            </a>
                        </li>
                        <li>
                            <a href="#scoringKredit" className={`inline-flex p-4 border-b-2 rounded-t-lg ${step === 6 ? "text-primary border-b-2 border-primary rounded-t-lg active dark:text-white dark:border-primary" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} group`}>
                                {step === 6 ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 12 12"><path fill="currentColor" d="M2 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm2-.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5H4Z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M7 2a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5H7Zm8.73 8.684a1 1 0 1 0-1.46-1.368l-3.083 3.29l-1.523-1.353a1 1 0 0 0-1.328 1.494l2.25 2a1 1 0 0 0 1.393-.063l3.75-4Z" clipRule="evenodd" /></svg>
                                }
                                Scoring Kredit
                            </a>
                        </li>
                        <li>
                            <a href="#approval" className={`inline-flex p-4 border-b-2 rounded-t-lg ${step === 7 ? "text-primary border-b-2 border-primary rounded-t-lg active dark:text-white dark:border-primary" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} group`}>
                                {step === 7 ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 12 12"><path fill="currentColor" d="M2 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm2-.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5H4Z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M7 2a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5H7Zm8.73 8.684a1 1 0 1 0-1.46-1.368l-3.083 3.29l-1.523-1.353a1 1 0 0 0-1.328 1.494l2.25 2a1 1 0 0 0 1.393-.063l3.75-4Z" clipRule="evenodd" /></svg>
                                }
                                Approval
                            </a>
                        </li>
                        <li>
                            <a href="#updatePencairan" className={`inline-flex p-4 border-b-2 rounded-t-lg ${step === 7 ? "text-primary border-b-2 border-primary rounded-t-lg active dark:text-white dark:border-primary" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} group`}>
                                {step === 8 ? <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 12 12"><path fill="currentColor" d="M2 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm2-.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5H4Z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-primary dark:text-white" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M7 2a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5H7Zm8.73 8.684a1 1 0 1 0-1.46-1.368l-3.083 3.29l-1.523-1.353a1 1 0 0 0-1.328 1.494l2.25 2a1 1 0 0 0 1.393-.063l3.75-4Z" clipRule="evenodd" /></svg>
                                }
                                Pencairan
                            </a>
                        </li>
                    </ul>
                </Card.Header>
                <Card.Body>

                    <div className="row-span-6 col-span-3">
                        {step == REF_STEP.SIMULASI_KREDIT && <Simulasi onSubmit={handleNext} />}
                        {step == REF_STEP.DATA_DEBITUR && <DataDebitur prevAction={handleBack} onSubmit={handleNext} />}
                        {step == REF_STEP.CEKLIS_DOKUMEN && <ChecklistDokumen prevAction={handleBack} onSubmit={handleNext} />}
                        {step == REF_STEP.SLIK && <Slik prevAction={handleBack} onSubmit={handleNext} />}
                        {step == REF_STEP.DOKUMEN_AGUNAN && <Agunan prevAction={handleBack} onSubmit={handleNext} />}
                        {step == REF_STEP.SCORING_KREDIT && <ScoringKredit prevAction={handleBack} onSubmit={handleNext} />}
                        {step == REF_STEP.APPROVAL && <Approval prevAction={handleBack} onSubmit={handleNext} />}
                        {step == REF_STEP.UPDATE_PENCAIRAN && <PencairanKredit prevAction={handleBack} onSubmit={handleNext} />}
                    </div>

                </Card.Body>
            </Card>
        </>
    )
}

export default FormProspek