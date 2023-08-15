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

import { cn, getKeyOfObject } from "@/lib/utils"
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

const Stepper = ({icon, label, active = false, visited = false}) => {
    return (
        <div className={cn(["flex flex-col gap-1 items-center hover:cursor-pointer", active && 'scale-125'])}> 
            <i className={cn(["text-gray-400", (active || visited) && "text-primary"])} dangerouslySetInnerHTML={{ __html: icon }} />
            <p className={cn("mb-0 text-lg font-inter-medium text-gray-400", active && "font-inter-semibold", (active || visited) && "text-primary")}> {label} </p>
        </div>
    )
}


const RefStepper = [
    {
        id: REF_STEP.SIMULASI_KREDIT,
        name: REF_TAB_GROUP.SIMULASI_KREDIT,
        label: 'Simulasi Kredit',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M22 3H2c-1.09.04-1.96.91-2 2v14c.04 1.09.91 1.96 2 2h20c1.09-.04 1.96-.91 2-2V5a2.074 2.074 0 0 0-2-2m0 16H2V5h20v14m-8-2v-1.25c0-1.66-3.34-2.5-5-2.5c-1.66 0-5 .84-5 2.5V17h10M9 7a2.5 2.5 0 0 0-2.5 2.5A2.5 2.5 0 0 0 9 12a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 9 7m5 0v1h6V7h-6m0 2v1h6V9h-6m0 2v1h4v-1h-4"/></svg>'
    },
    {
        id: REF_STEP.DATA_DEBITUR,
        name: REF_TAB_GROUP.DATA_DEBITUR,
        label: 'Data Debitur',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M22 3H2c-1.09.04-1.96.91-2 2v14c.04 1.09.91 1.96 2 2h20c1.09-.04 1.96-.91 2-2V5a2.074 2.074 0 0 0-2-2m0 16H2V5h20v14m-8-2v-1.25c0-1.66-3.34-2.5-5-2.5c-1.66 0-5 .84-5 2.5V17h10M9 7a2.5 2.5 0 0 0-2.5 2.5A2.5 2.5 0 0 0 9 12a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 9 7m5 0v1h6V7h-6m0 2v1h6V9h-6m0 2v1h4v-1h-4"/></svg>`
    },
    {
        id: REF_STEP.CEKLIS_DOKUMEN,
        name: REF_TAB_GROUP.CEKLIS_DOKUMEN,
        label: 'Ceklis Dokumen',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M3.5 3.75a.25.25 0 0 1 .25-.25h13.5a.25.25 0 0 1 .25.25v10a.75.75 0 0 0 1.5 0v-10A1.75 1.75 0 0 0 17.25 2H3.75A1.75 1.75 0 0 0 2 3.75v16.5c0 .966.784 1.75 1.75 1.75h7a.75.75 0 0 0 0-1.5h-7a.25.25 0 0 1-.25-.25V3.75Z"/><path fill="currentColor" d="M6.25 7a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Zm-.75 4.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Zm16.28 4.53a.75.75 0 1 0-1.06-1.06l-4.97 4.97l-1.97-1.97a.75.75 0 1 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l5.5-5.5Z"/></svg>`
    },
    {
        id: REF_STEP.SLIK,
        name: REF_TAB_GROUP.SLIK,
        label: 'Slik',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M13 8V2H7a2 2 0 0 0-2 2v5.303a6 6 0 0 1 8.207 8.18l3.53 3.53c.278.277.443.626.495.987H19a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2Zm1.97 14.78a.75.75 0 1 0 1.06-1.06l-4.112-4.113A4.978 4.978 0 0 0 13 14.5a4.984 4.984 0 0 0-1.43-3.5A4.985 4.985 0 0 0 8 9.5a4.978 4.978 0 0 0-3 1a5 5 0 0 0 5.82 8.13l4.15 4.15ZM8 11a3.5 3.5 0 1 1 0 7a3.5 3.5 0 0 1 0-7Zm6.5-3V2.5l6 6H15a.5.5 0 0 1-.5-.5Z"/></svg>`
    },
    {
        id: REF_STEP.DOKUMEN_AGUNAN,
        name: REF_TAB_GROUP.DOKUMEN_AGUNAN,
        label: 'Dokumen Agunan',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="4"><path stroke-linejoin="round" d="M24 44H10a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v18m-4.5 20V31"/><path stroke-linejoin="round" d="m31 34.5l1.5-1.5l3-3l3 3l1.5 1.5"/><path d="M16 16h16m-16 8h8"/></g></svg>`
    },
    {
        id: REF_STEP.SCORING_KREDIT,
        name: REF_TAB_GROUP.SCORING_KREDIT,
        label: 'Scoring Kredit',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 256 256"><path fill="currentColor" d="M207.06 80.67A111.24 111.24 0 0 0 128 48h-.4C66.07 48.21 16 99 16 161.13V184a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16v-24a111.25 111.25 0 0 0-32.94-79.33ZM224 184H119.71l54.76-75.3a8 8 0 0 0-12.94-9.42L99.92 184H32v-22.87c0-3.08.15-6.12.43-9.13H56a8 8 0 0 0 0-16H35.27c10.32-38.86 44-68.24 84.73-71.66V88a8 8 0 0 0 16 0V64.33A96.14 96.14 0 0 1 221 136h-21a8 8 0 0 0 0 16h23.67c.21 2.65.33 5.31.33 8Z"/></svg>`
    },
    {
        id: REF_STEP.APPROVAL,
        name: REF_TAB_GROUP.APPROVAL,
        label: 'Approval',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m16 11l2 2l4-4"/></g></svg>`
    },
    {
        id: REF_STEP.UPDATE_PENCAIRAN,
        name: REF_TAB_GROUP.UPDATE_PENCAIRAN,
        label: 'Update Pencairan',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><path d="m24 4l5.253 3.832l6.503-.012l1.997 6.188l5.268 3.812L41 24l2.021 6.18l-5.268 3.812l-1.997 6.188l-6.503-.012L24 44l-5.253-3.832l-6.503.012l-1.997-6.188l-5.268-3.812L7 24l-2.021-6.18l5.268-3.812l1.997-6.188l6.503.012L24 4Z"/><path d="m17 24l5 5l10-10"/></g></svg>`
    },
]

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

            <div className="my-6">
                <div className="flex justify-between items-center gap-20 py-4 w-10/12 m-auto">

                    {RefStepper.map((item, i) => (
                        <Stepper
                            key={i}
                            visited={i < REF_STEP.SLIK}
                            active={item.id == REF_STEP.SLIK}
                            icon={item.icon} 
                            label={item.label}
                        />
                    ))}
                    
                    
                    {/* <Stepper 
                        visited
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M22 3H2c-1.09.04-1.96.91-2 2v14c.04 1.09.91 1.96 2 2h20c1.09-.04 1.96-.91 2-2V5a2.074 2.074 0 0 0-2-2m0 16H2V5h20v14m-8-2v-1.25c0-1.66-3.34-2.5-5-2.5c-1.66 0-5 .84-5 2.5V17h10M9 7a2.5 2.5 0 0 0-2.5 2.5A2.5 2.5 0 0 0 9 12a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 9 7m5 0v1h6V7h-6m0 2v1h6V9h-6m0 2v1h4v-1h-4"/></svg>} 
                        label={'Data Debitur'}
                    />

                    <Stepper 
                        visited
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M3.5 3.75a.25.25 0 0 1 .25-.25h13.5a.25.25 0 0 1 .25.25v10a.75.75 0 0 0 1.5 0v-10A1.75 1.75 0 0 0 17.25 2H3.75A1.75 1.75 0 0 0 2 3.75v16.5c0 .966.784 1.75 1.75 1.75h7a.75.75 0 0 0 0-1.5h-7a.25.25 0 0 1-.25-.25V3.75Z"/><path fill="currentColor" d="M6.25 7a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Zm-.75 4.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Zm16.28 4.53a.75.75 0 1 0-1.06-1.06l-4.97 4.97l-1.97-1.97a.75.75 0 1 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06 0l5.5-5.5Z"/></svg>} 
                        label={'Ceklis Dokumen'}
                    />

                    <Stepper 
                        active
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M13 8V2H7a2 2 0 0 0-2 2v5.303a6 6 0 0 1 8.207 8.18l3.53 3.53c.278.277.443.626.495.987H19a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2Zm1.97 14.78a.75.75 0 1 0 1.06-1.06l-4.112-4.113A4.978 4.978 0 0 0 13 14.5a4.984 4.984 0 0 0-1.43-3.5A4.985 4.985 0 0 0 8 9.5a4.978 4.978 0 0 0-3 1a5 5 0 0 0 5.82 8.13l4.15 4.15ZM8 11a3.5 3.5 0 1 1 0 7a3.5 3.5 0 0 1 0-7Zm6.5-3V2.5l6 6H15a.5.5 0 0 1-.5-.5Z"/></svg>} 
                        label={'Slik'}
                    />

                    <Stepper 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="4"><path stroke-linejoin="round" d="M24 44H10a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v18m-4.5 20V31"/><path stroke-linejoin="round" d="m31 34.5l1.5-1.5l3-3l3 3l1.5 1.5"/><path d="M16 16h16m-16 8h8"/></g></svg>} 
                        label={'Dokumen Agunan'}
                    />

                    <Stepper 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 256 256"><path fill="currentColor" d="M207.06 80.67A111.24 111.24 0 0 0 128 48h-.4C66.07 48.21 16 99 16 161.13V184a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16v-24a111.25 111.25 0 0 0-32.94-79.33ZM224 184H119.71l54.76-75.3a8 8 0 0 0-12.94-9.42L99.92 184H32v-22.87c0-3.08.15-6.12.43-9.13H56a8 8 0 0 0 0-16H35.27c10.32-38.86 44-68.24 84.73-71.66V88a8 8 0 0 0 16 0V64.33A96.14 96.14 0 0 1 221 136h-21a8 8 0 0 0 0 16h23.67c.21 2.65.33 5.31.33 8Z"/></svg>} 
                        label={'Scoring Kredit'}
                    />

                    <Stepper 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m16 11l2 2l4-4"/></g></svg>} 
                        label={'Approval'}
                    />

                    <Stepper 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><path d="m24 4l5.253 3.832l6.503-.012l1.997 6.188l5.268 3.812L41 24l2.021 6.18l-5.268 3.812l-1.997 6.188l-6.503-.012L24 44l-5.253-3.832l-6.503.012l-1.997-6.188l-5.268-3.812L7 24l-2.021-6.18l5.268-3.812l1.997-6.188l6.503.012L24 4Z"/><path d="m17 24l5 5l10-10"/></g></svg>} 
                        label={'Update Pencairan'}
                    /> */}

                </div>

                
                <div className="w-10/12 bg-gray-200 m-auto my-2 h-4 rounded-xl"> 
                    <div className="h-4 bg-primary w-[50%] rounded-xl"> </div>
                </div>  
            </div>

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

            {/* <div className={'my-5 flex bg-transparent overflow-hidden'}>
                <div className="bg-primary text-primary flex-[1] p-8 rounded-tl-xl rounded-bl-xl"> 
                    <h4 className="text-white font-inter-medium"> Data Debitur </h4>
                </div>
                <div className="bg-white flex-[2] rounded-tr-xl rounded-br-xl p-8"> 456 </div>
            </div> */}
        </>
    )
}

export default FormProspek