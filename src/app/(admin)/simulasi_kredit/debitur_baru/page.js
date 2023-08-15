'use client'
import React, { useState } from "react"
import { useRouter } from 'next/navigation';
import PageTitle from "@/components/PageTitle";
import Card from "@/components/Card";
import Simulasi from "@/components/WizardPage/Simulasi";

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
            <Card className={'overflow-x-auto'}>
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