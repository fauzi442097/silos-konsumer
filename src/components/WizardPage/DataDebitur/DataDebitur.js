'use client'

import React, { useState, useEffect } from 'react'
import useGet from '@/hooks/useGet';
import { useForm } from "react-hook-form";
import { useMySwal } from "@/hooks/useMySwal";
import { API } from '@/config/api';

import TabAction from '@/components/TabAction'

import DataNasabah from './DataNasabah'
import DataPasangan from './DataPasangan'
import DataPekerjaan from './DataPekerjaan'
import DataPembiayaan from './DataPembiayaan'
import DataBiaya from './DataBiaya'

const DataDebitur = ({ prevAction, onSubmit }) => {
    const { register, control, handleSubmit, getValues, setValue, formState: { errors } } = useForm({ mode: "all" });
    const [produk, setProduk] = useState(null);
    const [statusMenikah, setStatusMenikah] = useState(null);
    let statusDebitur = statusMenikah ? statusMenikah.value : null;

    const stateNasabah = {
        produk, setProduk,
        statusMenikah, setStatusMenikah
    }

    const statePekerjaan = {
        produk, setProduk
    }

    const storeDataDebitur = (data) => {
        console.log(data)
        onSubmit();
    }

    return (
        <>
            <DataNasabah stateNasabah={stateNasabah} register={register} errors={errors} control={control} setValue={setValue} />
            {statusDebitur === 1 ? <DataPasangan /> : ''}
            <DataPekerjaan statePekerjaan={statePekerjaan} register={register} errors={errors} control={control} />
            <DataPembiayaan />
            <DataBiaya />
            <TabAction onSubmit={storeDataDebitur} prevAction={prevAction} />
        </>
    )
}

export default DataDebitur