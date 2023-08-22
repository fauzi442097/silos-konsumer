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

export const useGetPenggunaanDana = () => {
    const mySwal = useMySwal();
    const getPenggunaanDana = useGet(['refPenggunaanDana'], '/master/list/tujuan-penggunaan', { retry: false, refetchOnWindowFokus: false });
    let arrPenggunaanDana = [];
    if (getPenggunaanDana.isSuccess){
        let dataPenggunaanDana = getPenggunaanDana.data?.data.data;
        dataPenggunaanDana.map((item) => {
            return arrPenggunaanDana.push({ value: item.parmid, label: item.parmnm })
        }) 
    }

    useEffect(() => {
        if ( getPenggunaanDana.isError ) mySwal.error(getPenggunaanDana.error)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getPenggunaanDana.isError])
    return {arrPenggunaanDana, getPenggunaanDana}
};

export const useGetAsuransi = (idProduct = null, tglLahir = null, idPekerjaan = null, jangkaWaktu = null) => {
    const getAsuransi = useGet(['refAsuransi', idProduct], `/master/list/asuransi/${idProduct}?tglLahir=${tglLahir}&idPekerjaan=${idPekerjaan}&jangkaWaktu=${jangkaWaktu}`, { retry: false, refetchOnWindowFocus: false, enabled: idProduct != null });
    let arrAsuransi = [];
    if(getAsuransi.isSuccess){
        let dataAsuransi = getAsuransi.data?.data.data;
        dataAsuransi.map((item) => {
            return arrAsuransi.push({ value: item.asuransiId, label: item.definition });
        });
    }

    useEffect(() => {
        if( getAsuransi.isError ) arrAsuransi;
    }, [getAsuransi.isError])

    return {arrAsuransi, getAsuransi}
}

export const useGetWilayah = (q = null) => {
    const mySwal = useMySwal();
    const getWilayah = useGet(['refWilayan', q], `/master/list/location?q=cimahi`, { retry: false, refetchOnWindowFocus: false, enabled: q != null });
    console.log(getWilayah.data);
    let arrWilayah = [];
    if(getWilayah.isSuccess){
        let dataWilayah = getWilayah.data?.data.data;
        dataWilayah.map((item) => {
            return arrWilayah.push({ value: item.id, label: item.wilayah });
        })
    }

    useEffect(() => {
        if ( getWilayah.isError ) mySwal.error('Wilayah tidak ditemukan')
    }, [getWilayah.isError]);
    
    return {arrWilayah, getWilayah}
}