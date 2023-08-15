import React, { useEffect } from 'react'
import Button from '../Button'
import usePost from '@/hooks/usePost';
import { formatRupiah } from '@/lib/utils';

const JadwalAngsur = ({ dataSimulasi }) => {

    const hitJadwalAngsur = usePost(['simulasi'], 'master/jadwal-angsur', [], {
        refetchOnWindowFocus: false,
        retry: false,
        onError: (error, variables, context) => {
            console.log('tes')
            mySwal.warning(error.rm)
        },
    });
    
    let payloadPromo = null
    if ( dataSimulasi.promo ) {
        const { angsuranPromo, plafonPromo, tenorPromo, ratePromo, bulanPromo, angsuranNormal, plafonNormal, tenorNormal, rateNormal } = dataSimulasi.promo
        payloadPromo = { angsuranPromo, plafonPromo, tenorPromo, ratePromo, bulanPromo, angsuranNormal, plafonNormal, tenorNormal, rateNormal }
    }


    const payload = {
        idProduct: dataSimulasi.product.id,
        totalAngsuran: dataSimulasi.angsuranBulan,
        plafon: dataSimulasi.plafon,
        jangkaWaktu: dataSimulasi.input.jangkaWaktu,
        rate: dataSimulasi.input.rate,
        typeJadwalId: !dataSimulasi.promo ? 1 : 2,
        promo: payloadPromo
    }

    console.log(payload)

    useEffect(() => {
        hitJadwalAngsur.mutate(payload)
    }, [])

    let jadwalAngsur = []
    if ( hitJadwalAngsur.isSuccess ) {
        jadwalAngsur = hitJadwalAngsur.data.data.data.jadwalAngsur
        console.log({jadwalAngsur})
    }

  return (
    <div>
        <div className='flex flex-wrap justify-between items-center mb-6 flex-row-reverse'>
            {/* <h3 className="text-center font-inter-medium mb-0"> Jadwal Angsur </h3> */}
            <Button className="mr-3">
                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path fill="currentColor" d="M408 112H106a58 58 0 0 0-58 58v158a56 56 0 0 0 56 56h8v39.68A40.32 40.32 0 0 0 152.32 464h207.36A40.32 40.32 0 0 0 400 423.68V384h8a56 56 0 0 0 56-56V168a56 56 0 0 0-56-56Zm-40 311.68a8.35 8.35 0 0 1-8.32 8.32H152.32a8.35 8.35 0 0 1-8.32-8.32V264.32a8.35 8.35 0 0 1 8.32-8.32h207.36a8.35 8.35 0 0 1 8.32 8.32Zm26-215.76a24 24 0 1 1 22-22a24 24 0 0 1-22 22ZM344 48H168a56.09 56.09 0 0 0-55.42 48h286.84A56.09 56.09 0 0 0 344 48Z" /></svg>
                Cetak Jadwal Angsur
            </Button>
        </div>
        
        <div className="relative overflow-x-auto shadow max-h-[45rem]">
            <table className="w-full text-left">
                <thead className="bg-gray-100 dark:bg-dark-depth2 sticky top-0">
                    <tr>
                        <td scope="col" className="px-6 py-4 font-inter-medium rounded-tl-lg rounded-bl-lg">
                            Angsuran Ke
                        </td>
                        <td scope="col" className="px-6 py-4 font-inter-medium">
                            Sisa Pokok 
                        </td>
                        <td scope="col" className="px-6 py-4 font-inter-medium">
                            Angsuran Pokok
                        </td>
                        <td scope="col" className="px-6 py-4 font-inter-medium">
                            Angsuran Bunga
                        </td>
                        <td scope="col" className="px-6 py-4 font-inter-medium rounded-tr-lg rounded-br-lg">
                            Angsuran
                        </td>
                    </tr>
                </thead>
                <tbody className="overflow-y-auto">
                    {hitJadwalAngsur.isLoading && (
                        <tr className="bg-white dark:bg-dark-depth1 border-b border-dashed  dark:border-[#2f3237]"> 
                            <td colSpan={6} align='center' className='px-6 py-4 text-lg'> Loading ... </td>
                        </tr>
                    )}

                    {hitJadwalAngsur.isSuccess && (
                        jadwalAngsur.map((item, i) => (
                            <tr className="bg-white dark:bg-dark-depth1 border-b border-dashed  dark:border-[#2f3237]" key={i}>
                                <td className="px-6 py-4" align='center'>{item.angsuranKe}</td>
                                <td className="px-6 py-4">{formatRupiah(item.sisaPokok)}</td>
                                <td className="px-6 py-4">{formatRupiah(item.angsuranPokok)}</td>
                                <td className="px-6 py-4">{formatRupiah(item.angsuranBunga)}</td>
                                <td className="px-6 py-4">{formatRupiah(item.angsuran)}</td>
                            </tr>
                        ))
                    )}
                    
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default JadwalAngsur