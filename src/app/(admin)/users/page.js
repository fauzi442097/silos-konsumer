import React, { Suspense, use } from 'react'
import Datatable from './datatable';
import { API_URL } from '@/config/env';

// Server Side
const getData = async() => {
    const res = await fetch(`${API_URL}/users`);
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

