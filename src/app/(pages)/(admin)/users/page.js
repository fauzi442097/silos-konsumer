import React, { Suspense, use } from 'react'
import Datatable from './datatable';

// Server Side
const getData = async() => {
    const res = await fetch('https://dummyjson.com/users');
    if ( !res.ok ) throw new Error('Terjadi kesalahan');
    return res.json();
}

const page = () => {
    const data = use(getData());
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Datatable data={data.users} /> 
            </Suspense>
        </>
    )
}

export default page

