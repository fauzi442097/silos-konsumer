import React from "react";
import PageTitle from "@/components/PageTitle";
import { REF_STEP, RefStepper, Stepper } from "../../Stepper";
import Card from "@/components/Card";
import { cookies } from 'next/headers';
import DataNotFound from "@/components/DataNotFound";
import FormSlik from "./FormSlik";


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
            <div className="my-6">
                <div className="flex justify-between items-center gap-20 py-4 w-full m-auto">
                    {RefStepper.map((item, i) => (
                        <Stepper
                            key={i}
                            id={item.id}
                            visited={i < REF_STEP.SLIK}
                            active={item.id == REF_STEP.SLIK}
                            icon={item.icon} 
                            label={item.label}
                        />
                    ))}
                </div>
            </div>

            <Card>
                <Card.Body className={'flex gap-4'}>
                  <div className='my-10 w-[30%] '> 
                    <p className='font-inter-medium text-xl mb-8 text-gray-500'> Informasi debitur </p>
                    <p className='text-lg font-inter-medium'> {data.nmProspek} </p>

                    <table className='w-full'>
                        <tbody>
                          <tr>
                              <td className='py-2 text-muted w-[20%]'> No.Identitas </td>
                              <td className='py-2'> {data.noIdentitas} </td>
                          </tr>
                          <tr>
                              <td className='py-2 text-muted'> Tempat Lahir </td>
                              <td className='py-2'> {data.tempatLahir} </td>
                          </tr>
                          <tr>
                              <td className='py-2 text-muted'> Tanggal Lahir </td>
                              <td className='py-2'> {data.tanggalLahir} </td>
                          </tr>
                          <tr>
                              <td className='py-2 text-muted'> Alamat </td>
                              <td className='py-2'> {data.alamat} </td>
                          </tr>
                        </tbody>
                    </table>
                  </div>

                  <FormSlik dataSlikDebitur={data}/>
                </Card.Body>
            </Card>

      {/* <div className='py-4'>

        <div className='flex flex-wrap justify-between items-center'>
          <div>
            <h2 className='mb-0'> {isLoadingContent ? <Skeleton width={150} height={20} borderRadius={'0.5rem'} /> : 'Ahmad Fauzi'} </h2>
            <span className='text-muted'> {isLoadingContent ? <Skeleton height={10} borderRadius={'0.5rem'} /> : '3273032001980821'} </span>
          </div>
          <span> {isLoadingContent ? <Skeleton height={20} width={50} borderRadius={'0.5rem'} /> : <Badge variant="danger" className={'text-xs'}> Progress Slik </Badge>}</span>
        </div>

        <div className='grid grid-cols-3 mt-4'>
          <InfoProfile
            className={'flex flex-col items-start justify-start'}
            label={'Tempat / Tanggal Lahir'}
            labelClass={'mb-1 flex-none'}
            value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'} /> : `Prindavan / 20-01-1990`}
            valueClass={'flex-none'} />

          <InfoProfile
            className={'flex flex-col items-start justify-start'}
            label={'Status Menikah'}
            labelClass={'mb-1 flex-none'}
            value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'} /> : 'Belum Menikah'}
            valueClass={'flex-none'}
          />

          <InfoProfile
            className={'flex flex-col items-start justify-start'}
            label={'Alamat'}
            labelClass={'mb-1 flex-none'}
            value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'} /> : 'LINGKUNGAN II RT.000 RW.000'}
            valueClass={'flex-none'}
          />

          <InfoProfile
            className={'flex flex-col items-start justify-start'}
            label={'No.Identitas Pasangan'}
            labelClass={'mb-1 flex-none'}
            value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'} /> : '1231231231231232'}
            valueClass={'flex-none'}
          />

          <InfoProfile
            className={'flex flex-col items-start justify-start'}
            label={'Nama Pasangan'}
            labelClass={'mb-1 flex-none'}
            value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'} /> : 'Dewi'}
            valueClass={'flex-none'}
          />
        </div>

        <div className='w-full border-b mb-8 border-dashed' />

        <FormSlik />
      </div> */}

      {/* <TabAction onSubmit={storeSlik} prevAction={prevAction} /> */}


    </>
  )
}

export default Slik