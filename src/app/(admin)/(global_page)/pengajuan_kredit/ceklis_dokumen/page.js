import PageTitle from '@/components/PageTitle'
import React from 'react'
import { REF_STEP, RefStepper, Stepper } from '../Stepper'
import Card from '@/components/Card'

const CeklisDokumen = () => {
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
            <Card.Body>
            </Card.Body>
        </Card>
    </>
  )
}

export default CeklisDokumen