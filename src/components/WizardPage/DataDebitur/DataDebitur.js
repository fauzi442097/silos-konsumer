'use client'

import React from 'react'
import DataNasabah from './DataNasabah'
import DataPasangan from './DataPasangan'
import DataPekerjaan from './DataPekerjaan'
import DataPembiayaan from './DataPembiayaan'
import DataBiaya from './DataBiaya'
import TabAction from '@/components/TabAction'

const DataDebitur = ({ prevAction, onSubmit }) => {

    const storeDataDebitur = (data) => {
        console.log(data)
        onSubmit();
    }

    return (
        <>
            <DataNasabah />
            <DataPasangan />
            <DataPekerjaan />
            <DataPembiayaan />
            <DataBiaya />
            <TabAction onSubmit={storeDataDebitur} prevAction={prevAction}/>
        </>
    )
}

export default DataDebitur