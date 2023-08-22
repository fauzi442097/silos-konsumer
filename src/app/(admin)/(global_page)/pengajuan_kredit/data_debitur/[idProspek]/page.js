'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { REF_STEP, RefStepper, Stepper } from "../../Stepper";
import Card from '@/components/Card';
import Button from '@/components/Button';

import TabAction from '@/components/TabAction'

import FormNasabah from './FormNasabah'
import FormPasangan from './FormPasangan'
import FormPekerjaan from './FormPekerjaan'
import FormPembiayaan from './FormPembiayaan'
import FormBiaya from './FormBiaya'

const DataDebitur = () => {
    const { register, control, handleSubmit, getValues, setValue, formState: { errors } } = useForm({ mode: "all" });
    const [produk, setProduk] = useState(null);
    const [idPekerjaan, setIdPekerjaan] = useState(null);
    const [statusMenikah, setStatusMenikah] = useState(null);
    const [tglLahir, setTglLahir] = useState(undefined);
    let statusDebitur = statusMenikah ? statusMenikah.value : null;

    const stateNasabah = {
        produk, setProduk,
        statusMenikah, setStatusMenikah,
        tglLahir, setTglLahir
    }

    const statePekerjaan = {
        produk, setProduk, setIdPekerjaan
    }

    const statePembiayaan = {
        produk, tglLahir, idPekerjaan
    }

    const onSubmit = async (formData) => {
        console.log(formData);
    }

    return (
        <>
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
                    <div className="row-span-6 col-span-3">
                        <FormNasabah stateNasabah={stateNasabah} register={register} errors={errors} control={control} setValue={setValue} />
                        {statusDebitur === 1 ? <FormPasangan /> : ''}
                        <FormPekerjaan statePekerjaan={statePekerjaan} register={register} errors={errors} control={control} />
                        <FormPembiayaan statePembiayaan={statePembiayaan} register={register} errors={errors} control={control} getValues={getValues} />
                        <FormBiaya />
                    </div>
                </Card.Body>
                <Card.Footer>
                    <div className='mt-8 flex flex-wrap justify-between'>
                        <Button variant={'secondary'} onClick={() => router.push('/pengajuan_kredit/simulasi/4201')}> Kembali </Button>
                        <Button onClick={handleSubmit(onSubmit)}> Simpan & Lanjutkan </Button>
                    </div>
                </Card.Footer>
            </Card>

        </>
    )
}

export default DataDebitur