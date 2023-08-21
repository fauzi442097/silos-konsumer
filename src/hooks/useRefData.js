import React, { useEffect } from 'react'
import { useMySwal } from './useMySwal';
import useGet from './useGet';

export const useGetBiCheckStatus = () => {
   const mySwal = useMySwal()
   const query = useGet(['refBiCheckStatus'], '/master/list/bicheck-status', { retry: false, refetchOnWindowFocus: false });
   let dataBiCheck = [];
   if (query.isSuccess) {
       let refData = query.data?.data.data;
       refData.map((item) => {
           return dataBiCheck.push({ 
               value: item.id, 
               label: item.definition
           })
       });
   }

   useEffect(() => {
       if ( query.isError ) mySwal.error(query.error)
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [query.isError])
   return {dataBiCheck, query}
}

export const useGetListPinjamanByProductId = (productId = null) => {
   const mySwal = useMySwal()
   const query = useGet(['refListPinjaman', productId], `/master/list/pinjaman?idProduct=${productId}`, { retry: false, refetchOnWindowFocus: false, enabled: productId != null });
   let dataListPinjaman = [];
   if (query.isSuccess) {
       let refData = query.data?.data.data;
       refData.map((item) => {
           return dataListPinjaman.push({ 
               value: item.value, 
               label: item.desc
           })
       });
   }

   useEffect(() => {
       if ( query.isError ) mySwal.error(query.error)
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [query.isError])
   return {dataListPinjaman, query}
}