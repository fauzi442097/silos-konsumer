"use client"

import Card from '@/app/components/Card'
import React, { useState } from 'react';
import InputText from '@/app/components/layout/Form/Input_Text'
import Select from 'react-select';
import InputSelect from '@/app/components/layout/Form/Input_Select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const formNewEntry = () => {
    const [selectedOption, setSelectedOption] = useState(null);


    return (
        <>
            <Card>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                        <InputText name={'Contoh'} tittle="Contoh"></InputText>
                    </div>
                    <div className="App">
                        {/* <label for="produk" class="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Produk</label> */}
                        <InputSelect name={'Produk'} tittle="Produk"></InputSelect>
                    </div>
                    <div>
                        <InputText name={'Contoh'} tittle="Contoh"></InputText>
                    </div>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                        <InputText name={'Contoh'} tittle="Contoh"></InputText>
                    </div>
                    <div>
                        <InputText name={'Contoh'} tittle="Contoh"></InputText>
                    </div>
                    <div>
                        <InputText name={'Contoh'} tittle="Contoh"></InputText>
                    </div>
                </div>
            </Card>
        </>
    )
}

export default formNewEntry