'use client'
import React, { useState } from "react"
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

import Columns from './columns'

import PageTitle from "@/components/PageTitle";
import Button, { ButtonCloseModal } from "@/components/Button";
import Card from "@/components/Card";
import ModalHasilSimulasi from "@/components/HasilSimulasi/ModalHasilSimulasi";
import Simulasi from "@/components/Simulasi";

// import MyDataTable from '@/components/Datatable/MyDatatable'
// import LoadingTable from "@/components/Datatable/LoadingTable";
// import useDataTable from '@/hooks/useDataTable'
// import { PUBLIC_DUMMY_API } from '@/config/env'

const FormNewEntry = () => {
    const router = useRouter();
    const [showModal, setShowModal] = useState({
        lg: false,
    });

    const showModalDialog = (type) => {
        setShowModal((prev) => ({ ...prev, [type]: true }))
    }

    const closeModal = () => {
        setShowModal((prev) => !prev)
    }

    return (
        <>
            <PageTitle title="Simulasi" />
            <Card>
                <Card.Header className={'flex justify-between flex-wrap items-center'}>
                    <h3> Simulasi </h3>
                </Card.Header>
                <Card.Body>
                    <Simulasi />
                </Card.Body>
            </Card>
        </>
    );
}

export default FormNewEntry