import React from 'react'
import PageTitle from '@/components/PageTitle'
import { REF_STEP, RefStepper, Stepper } from '../Stepper'
import Card from '@/components/Card'
import { cookies } from 'next/headers'
import DataNotFound from '@/components/DataNotFound'
import InfoDebitur from './InfoDebitur'
import FormUploadDokumen from './FormUploadDokumen'

const getDataDebitur = async (id) => {
    const cookieStore = cookies()
    const {token} = JSON.parse(cookieStore.get('auth').value)
    const headers = {Authorization: "Bearer " + token}
    const res = await fetch(`${process.env.API_BASE_URL}master/prospek/${id}/show`, {headers: headers})
    return res.json()
}

const CeklisDokumen = async ({ searchParams }) => {

    const { id } = searchParams
    const { rc, rm, data} = await getDataDebitur(id)
    if ( rc != 200 ) return <DataNotFound message={rm} />

    return (
        <>
            <PageTitle title="Ceklis Dokumen" />
            <div className="my-6">
                <div className="flex justify-between items-center gap-20 py-4 w-full m-auto">
                    {RefStepper.map((item, i) => (
                        <Stepper
                            key={i}
                            id={item.id}
                            visited={i < REF_STEP.CEKLIS_DOKUMEN}
                            active={item.id == REF_STEP.CEKLIS_DOKUMEN}
                            icon={item.icon} 
                            label={item.label}
                        />
                    ))}
                </div>
            </div>

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