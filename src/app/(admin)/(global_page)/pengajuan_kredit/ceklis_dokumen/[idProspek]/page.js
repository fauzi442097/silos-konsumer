import React from 'react'
import PageTitle from '@/components/PageTitle'
import Card from '@/components/Card'
import { cookies } from 'next/headers'
import DataNotFound from '@/components/DataNotFound'
import FormUploadDokumen from './FormUploadDokumen'
import { REF_STEP } from '../../Stepper'
import InfoDebitur from './InfoDebitur'
import ContainerStepper from '../../ContainerStepper'

const getDataDebitur = async (id) => {
    const cookieStore = cookies()
    const {token} = JSON.parse(cookieStore.get('auth').value)
    const headers = {Authorization: "Bearer " + token}
    const res = await fetch(`${process.env.API_BASE_URL}master/prospek/${id}/show`, {headers: headers})
    return res.json()
}

const CeklisDokumen = async ({ params }) => {

    const { idProspek } = params
    const { rc, rm, data} = await getDataDebitur(idProspek)
    if ( rc != 200 ) return <DataNotFound message={rm} />

    return (
        <>
            <PageTitle title="Ceklis Dokumen" />
            <ContainerStepper currentStep={REF_STEP.CEKLIS_DOKUMEN} />

            <Card>
                <Card.Body className={'flex gap-4'}>
                    <InfoDebitur data={data}/>
                    <FormUploadDokumen dataDebitur={data}/>
                </Card.Body>
            </Card>
        </>
    )
}

export default CeklisDokumen