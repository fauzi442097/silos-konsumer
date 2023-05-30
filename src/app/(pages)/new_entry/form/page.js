"use client"

import Card from '@/app/components/Card'
import React, { useState } from 'react';
import InputText from '@/app/components/Form/Input_Text'
import InputSelect from '@/app/components/Form/Input_Select';
import InputFile from '@/app/components/Form/Input_File';
import Textarea from '@/app/components/Form/Textarea';
import InputTypeahead from '@/app/components/Form/Input_Typeahead';
import InputCheckbox from '@/app/components/Form/Input_Checkbox';
import InputDate from '@/app/components/Form/Input_Date';

const formNewEntry = () => {
    return (
        <>
            <Card>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                        <InputDate name={'Contoh'} tittle="Cari Lokasi"></InputDate>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default formNewEntry