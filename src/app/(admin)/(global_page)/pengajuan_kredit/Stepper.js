import { cn } from "@/lib/utils"

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

export const RefStepper = [
    {
        id: REF_STEP.SIMULASI_KREDIT,
        name: REF_TAB_GROUP.SIMULASI_KREDIT,
        label: 'Simulasi Kredit',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M22 3H2c-1.09.04-1.96.91-2 2v14c.04 1.09.91 1.96 2 2h20c1.09-.04 1.96-.91 2-2V5a2.074 2.074 0 0 0-2-2m0 16H2V5h20v14m-8-2v-1.25c0-1.66-3.34-2.5-5-2.5c-1.66 0-5 .84-5 2.5V17h10M9 7a2.5 2.5 0 0 0-2.5 2.5A2.5 2.5 0 0 0 9 12a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 9 7m5 0v1h6V7h-6m0 2v1h6V9h-6m0 2v1h4v-1h-4"/></svg>'
    },
    {
        id: REF_STEP.DATA_DEBITUR,
        name: REF_TAB_GROUP.DATA_DEBITUR,
        label: 'Data Debitur',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M22 3H2c-1.09.04-1.96.91-2 2v14c.04 1.09.91 1.96 2 2h20c1.09-.04 1.96-.91 2-2V5a2.074 2.074 0 0 0-2-2m0 16H2V5h20v14m-8-2v-1.25c0-1.66-3.34-2.5-5-2.5c-1.66 0-5 .84-5 2.5V17h10M9 7a2.5 2.5 0 0 0-2.5 2.5A2.5 2.5 0 0 0 9 12a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 9 7m5 0v1h6V7h-6m0 2v1h6V9h-6m0 2v1h4v-1h-4"/></svg>`
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
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 256 256"><path fill="currentColor" d="M207.06 80.67A111.24 111.24 0 0 0 128 48h-.4C66.07 48.21 16 99 16 161.13V184a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16v-24a111.25 111.25 0 0 0-32.94-79.33ZM224 184H119.71l54.76-75.3a8 8 0 0 0-12.94-9.42L99.92 184H32v-22.87c0-3.08.15-6.12.43-9.13H56a8 8 0 0 0 0-16H35.27c10.32-38.86 44-68.24 84.73-71.66V88a8 8 0 0 0 16 0V64.33A96.14 96.14 0 0 1 221 136h-21a8 8 0 0 0 0 16h23.67c.21 2.65.33 5.31.33 8Z"/></svg>`
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

export const Stepper = ({icon, label, active = false, visited = false, id}) => {
    return (
        <div className={cn([
            "flex flex-col gap-1 items-center hover:cursor-pointer mt-0 min-h-[1rem] relative text-center flex-[1_1_0]", 
            // id != 1 && "stepper-pengajuan",
            id != 1 && "before:content-[''] before:h-[2px] before:rounded-lg before:-left-[80%] before:absolute before:top-[30%] before:w-full before:bg-[#cbcbcb]",
            visited && "before:bg-primary"
        ])}> 
            <i className={cn(["text-gray-400", (active || visited) && "text-primary"])} dangerouslySetInnerHTML={{ __html: icon }} />
            <p className={cn("mb-0 font-inter-medium text-gray-400", active && "font-inter-semibold", (active || visited) && "text-primary")}> {label} </p>
        </div>
    )
}