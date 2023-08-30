'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { REF_STEP } from "../../Stepper";
import Card from '@/components/Card';
import Button from '@/components/Button';

import FormNasabah from './FormNasabah'
import FormPasangan from './FormPasangan'
import FormPekerjaan from './FormPekerjaan'
import FormPembiayaan from './FormPembiayaan'
import FormBiaya from './FormBiaya'
import ContainerStepper from '../../ContainerStepper';
import { useMySwal } from '@/hooks/useMySwal';
import useGet from '@/hooks/useGet';

const DataDebitur = ({ params }) => {
    const useGetDataNasabah = () => {
        const mySwal = useMySwal();
        const { idProspek } = params;
        const getDataNasabah = useGet(['getSimulasi', idProspek], `/master/prospek/${idProspek}/show`, { retry: false, refetchOnWindowFokus: false, enable: idProspek !== null });
        let dataNasabah = null;
        if (getDataNasabah.isSuccess) {
            dataNasabah = getDataNasabah.data;
        }

        useEffect(() => {
            if (getDataNasabah.isError) mySwal.error(getDataNasabah.error);
        }, [getDataNasabah.isError]);

        return { dataNasabah, getDataNasabah }
    }

    const { register, control, handleSubmit, getValues, setValue, formState: { errors } } = useForm({ 
        mode: "all"
    });



    const [produk, setProduk] = useState(null);
    const [idPekerjaan, setIdPekerjaan] = useState(null);
    const [statusMenikah, setStatusMenikah] = useState(null);
    const [tglLahir, setTglLahir] = useState(undefined);

    const { dataNasabah, getDataNasabah } = useGetDataNasabah();
    
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
            <ContainerStepper currentStep={REF_STEP.DATA_DEBITUR} />
            <Card>
                <Card.Body className={'flex gap-4'}>
                    <div className="row-span-6 col-span-3">
                        <FormNasabah data={dataNasabah} stateNasabah={stateNasabah} register={register} errors={errors} control={control} setValue={setValue} getValues={getValues} />
                        {statusDebitur === 1 ? <FormPasangan /> : ''}
                        <FormPekerjaan data={dataNasabah}  statePekerjaan={statePekerjaan} register={register} errors={errors} control={control} />
                        <FormPembiayaan data={dataNasabah} statePembiayaan={statePembiayaan} register={register} errors={errors} control={control} setValue={setValue} getValues={getValues} />
                        <FormBiaya data={dataNasabah} register={register} errors={errors} control={control} setValue={setValue}/>
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