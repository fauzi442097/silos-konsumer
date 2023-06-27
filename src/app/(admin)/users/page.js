import React from 'react'
import Datatable from './datatable';
import { API_URL } from '@/config/env';

// Server Side
const getData = async() => {
    const res = await fetch(`${API_URL}/users`);
    return res.json();
}

const page = async () => {
    const data = await getData();
    return (
        <Datatable data={data.users} />    
    )
}

export default page

