import React from "react"
import PageTitle from "@/components/PageTitle";
import Card from "@/components/Card";
import Simulasi from "@/components/WizardPage/Simulasi";

const FormNewEntry = () => {
    return (
        <>
            <PageTitle title="Simulasi" />
            <Card className={'overflow-x-auto'}>
                <Card.Header className={'flex justify-between flex-wrap items-center'}>
                    <h2> Simulasi </h2>
                </Card.Header>
                <Card.Body>
                    <Simulasi />
                </Card.Body>
            </Card>
        </>
    );
}

export default FormNewEntry