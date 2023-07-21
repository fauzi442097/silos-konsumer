import { API } from '@/config/api';
import { useQuery } from '@tanstack/react-query';

const useDataTable = (key, url) => {
    return useQuery({
        queryKey: key,
        queryFn: async () => {
            const res = await API.GET(url, true)
            if ( res.status != 200 )  return Promise.reject(new Error(res.statusText))
            return res
        },
        keepPreviousData : true
    })
}

export default useDataTable