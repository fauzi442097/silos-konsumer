'use client'

import React from "react"
import TabAction from "../../TabAction";
import Analis from "./Analis";
import Biaya from "./Biaya";
import SimulasiUlang from "./SimulasiUlang";

const Approval = ({ prevAction, onSubmit }) => {

    const storeScoringKredit = (data) => {
        console.log(data);
        onSubmit();
    }

    return (
        <>
            <Analis />
            <Biaya />
            <SimulasiUlang />
            <TabAction onSubmit={storeScoringKredit} prevAction={prevAction} />
        </>
    )
}

export default Approval