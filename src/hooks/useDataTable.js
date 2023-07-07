import { API } from '@/config/api';
import React, { useEffect, useState } from 'react'

const useDataTable = (url) => {

    const [ data, setData ] = useState([]);
    const [ totalRows, setTotalRows ] = useState(10)
    const [ loading, setLoading ]  = useState(false)
    const [ error, setError ] = useState(false)

    const getData = async (page) => {        

        let arr_url = url.split('?')
        let end_point = arr_url[0] 
        let params = arr_url[1]
        let full_url = end_point
        if ( params ) {
            let searchParams = new URLSearchParams(arr_url[1])
            searchParams.set("page", page);
            let query_params = searchParams.toString()
            full_url += `?${query_params}`
        }

        setLoading(true);
        const {
            data,
            status,
            statusText,
            meta
        } = await API.GET(full_url, true)
        setLoading(false);

        if(data.rc != 200 || status !== 200) {
            if ( data.rc != 200 ) setError({
                type: 'warning',
                message: data.rm
            })

            if ( status != 200 ) setError({
                type: 'error',
                message: statusText
            })
        } else {
            setData(data.data);
            setTotalRows(meta.total)
        }
    }

    useEffect(() => {
        getData(1)
    }, [url])

    
    return {
        data,
        loading,
        getData,
        totalRows,
        error
    }
}

export default useDataTable