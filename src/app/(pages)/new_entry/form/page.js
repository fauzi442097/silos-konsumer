"use client"

import Card from '@/app/components/Card'
import React, { useState } from 'react';
import InputText from '@/app/components/form/Input_Text'
import InputSelect from '@/app/components/form/Input_Select';
import InputFile from '@/app/components/form/Input_File';
import Textarea from '@/app/components/form/Textarea';
import InputTypeahead from '@/app/components/form/Input_Typeahead';
import InputCheckbox from '@/app/components/form/Input_Checkbox';
import InputDate from '@/app/components/form/Input_Date';
import Currency from '@/app/components/form/Currency';

const formNewEntry = () => {
    return (
        <>
            <Card>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                        <InputText name={'Contoh'} tittle="Contoh"></InputText>
                    </div>
                    <div>
                        <InputSelect name={'Produk'} tittle="Produk"></InputSelect>
                    </div>
                    <div>
                        <InputFile name={'File'} tittle="File"></InputFile>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                        <Textarea name={'Contoh'} tittle="Contoh"></Textarea>
                    </div>
                    <div>
                        <InputTypeahead name={'Contoh'} tittle="Cari Lokasi"></InputTypeahead>
                    </div>
                    <div>
                        <InputCheckbox name={'Contoh'} tittle="Contoh"></InputCheckbox>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                        <InputDate name={'Dead Time'} tittle="Dead Time"></InputDate>
                    </div>
                    <div>
                        <Currency name={'uang'} tittle="Uang" maxLength={'10'}></Currency>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default formNewEntry