import React from "react";
import PageTitle from "@/components/PageTitle";
import { REF_STEP  } from "../../Stepper";
import Card from "@/components/Card";
import { cookies } from 'next/headers';
import DataNotFound from "@/components/DataNotFound";
import FormSlik from "./FormSlik";
import ContainerStepper from "../../ContainerStepper";
import InfoDebitur from "./InfoDebitur";


const getBICheckDebitur = async (id) => {
  const cookieStore = cookies()
  const {token} = JSON.parse(cookieStore.get('auth').value)
  const headers = {Authorization: "Bearer " + token}
  const res = await fetch(`${process.env.API_BASE_URL}master/bi-check/prospek/${id}`, {headers: headers})
  return res.json()
}

const Slik = async ({ params }) => {

  const { idProspek } = params
  const { rc, rm, data} = await getBICheckDebitur(idProspek)
  if ( rc != 200 ) return <DataNotFound message={rm} />

  console.log(data)

  const storeSlik = (data) => {
      console.log(data)
      onSubmit();
  }

  return (
    <>
        <PageTitle title="Ceklis Dokumen" />
        <ContainerStepper currentStep={REF_STEP.SLIK} />
        <div className='w-full flex gap-8'>
          <InfoDebitur data={data}/>
          <FormSlik dataSlikDebitur={data}/>
        </div>
    </>
  )
}

export default Slik