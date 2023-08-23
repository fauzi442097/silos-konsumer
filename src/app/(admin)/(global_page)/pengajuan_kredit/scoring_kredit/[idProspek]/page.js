import React from 'react'
import { cookies } from 'next/headers'
import DataNotFound from '@/components/DataNotFound'
import PageTitle from '@/components/PageTitle'
import { REF_STEP } from '../../Stepper'
import ContainerStepper from '../../ContainerStepper'
import FormScoring from './FormScoring'
import InfoScoring from './InfoScoring'

const getDataPembiayaanDebitur = async (idProspek) => {
    const cookieStore = cookies()
    const {token} = JSON.parse(cookieStore.get('auth').value)
    const headers = {Authorization: "Bearer " + token}
    const res = await fetch(`${process.env.API_BASE_URL}master/pembiayaan/analisis/${idProspek}`, {headers: headers})
    return res.json()
}

const ScoringKredit = async ({ params }) => {

  const { idProspek } = params
  const { rc, rm, data} = await getDataPembiayaanDebitur(idProspek)
    if ( rc != 200 ) return <DataNotFound message={rm} />

  console.log(data)

  return (
    <>
      <PageTitle title="Scoring Kredit" />
      <ContainerStepper currentStep={REF_STEP.SCORING_KREDIT} />

      <div className='w-full flex gap-8'>
        <InfoScoring data={data}/>
        <FormScoring data={data}/>
      </div>
    </>
  )
}

export default ScoringKredit