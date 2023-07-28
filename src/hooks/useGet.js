import { API } from '@/config/api';
import { useQuery } from '@tanstack/react-query';

const useGet = (key, url, config) => {
    const result = useQuery({
        queryKey: key,
        queryFn: async () => {
            const res = await API.GET(url)
            if ( res.data.rc != 200 ) return Promise.reject(res.data.rm)
            if ( res.status != 200 )  return Promise.reject(new Error(res.statusText))
            return res
        },
        ...config
    })
    return result
}

export default useGet