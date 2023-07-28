import { API } from '@/config/api';
import { useMutation } from '@tanstack/react-query';

const usePost = (key, url, payload, config) => {
    console.log(payload)
    const result = useMutation({
        mutationKey: key,
        mutationFn: async () => {
            const res = await API.POST(url, payload)
            if ( res.data.rc != 200 ) return Promise.reject(res.data)
            if ( res.status != 200 )  return Promise.reject(new Error(res.statusText))
            return res
        },
        ...config
    })
    return result
}

export default usePost