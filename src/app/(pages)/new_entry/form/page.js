"use client"

import Card from '@/app/components/Card'
import React, { useState } from 'react';
import InputTypeahead from '@/app/components/form/Input_Typeahead';
import Currency from '@/app/components/form/Currency';

const formNewEntry = () => {
    return (
        <>
            <Card>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                    </div>
                    <div>
                        <InputTypeahead name={'Contoh'} tittle="Cari Lokasi"></InputTypeahead>
                    </div>
                    <div>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
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