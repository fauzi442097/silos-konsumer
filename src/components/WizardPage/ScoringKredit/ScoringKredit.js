'use client'

import React from "react"
import TabAction from "../../TabAction";
import StrukturPembiayaan from "./StrukturPembiayaan";
import Scoring from "./Scoring";
import DetailScoring from "./DetailScoring";

const ScoringKredit = ({ prevAction, onSubmit }) => {

    const storeScoringKredit = (data) => {
        console.log(data);
        onSubmit();
    }

    return (
        <>
            <StrukturPembiayaan />
            <Scoring />
            <DetailScoring />
            <TabAction onSubmit={storeScoringKredit} prevAction={prevAction} />
        </>
    )
}

export default ScoringKredit