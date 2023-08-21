'use client'

import React, { useEffect, useState } from 'react'
import Button from '@/components/Button'
import Checkbox from '@/components/Form/Checkbox'
import useGet from '@/hooks/useGet'
import { useMySwal } from '@/hooks/useMySwal'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'


const useGetDocuments = (data) => {
    const mySwal = useMySwal()
    const result = useGet(['documents'], `master/list/jdoc?statusPembiayaan=0&tipeAgunan=&idProduct=${data.idProduct}&isMenikah=${data.isMenikah}`, { retry: false, refetchOnWindowFocus: false });
    useEffect(() => {
        if ( result.isError ) mySwal.error(result.error)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.isError])
    return result
}

const FormUploadDokumen = ({ dataDebitur }) => {

    const router = useRouter()
    const mySwal = useMySwal()
    const { isLoading, isSuccess, data } = useGetDocuments(dataDebitur)
    const documents = data?.data?.data

    const [ multipleCheckbox, setMultipleCheckbox ] = useState(undefined)

    useEffect(() => {
        if ( documents ) setMultipleCheckbox(documents.map((item) => ({id: item.id, checked: item.isMandatory})))
    }, [documents])

    const storeDocs = () => {
        const unCheckDocRequired = documents.filter((item, index) => item.isMandatory && item.id == multipleCheckbox[index].id && !multipleCheckbox[index].checked)
        if ( unCheckDocRequired.length > 0 ) {
            const docName = unCheckDocRequired.map((item) => (`- ${item.description} <br/>`))
            mySwal.warning(`Dokumen wajib berikut belum dipilih: <br/>${docName.join("")}`)
        }
        router.push('/pengajuan_kredit/slik/4201')
    }

    const handleChange = (i) => {
        const newValue = {id: multipleCheckbox[i].id, checked: !multipleCheckbox[i].checked}
        let newObj = {...multipleCheckbox, [i]: newValue}
        setMultipleCheckbox(newObj)
    }


    return (
    <div className='my-10 w-[60%] border-l px-10 shadow rounded-xl py-5 '> 
            <div className='mb-8'>
                <p className='font-inter-medium text-xl text-gray-500 mb-1'> Ceklis dokumen debitur </p>
                <span className='text-sm'> (<span className='text-red-500'>*</span>) Dokumen wajib </span>
            </div>
            { isLoading && <p> loading ... </p>}
            { isSuccess && (<table className='table-document-debitur'>
                <tbody>
                    {documents.map((item, i) => (
                        <tr key={item.id}>
                            <td className='py-2 w-[8%] border-b border-dashed' align='center'> 
                                <Checkbox 
                                    name={item.description} 
                                    value={item.id} 
                                    id={item.description} 
                                    checked={multipleCheckbox ? multipleCheckbox[i]?.checked : false} 
                                    onChange={() => handleChange(i)}/>
                            </td>
                            <td valign='top' className='py-2 border-b border-dashed'> <label htmlFor={item.description} className={cn(['select-none', item.isMandatory && 'after:content-["*"] after:text-red-500'])}> {item.description} </label> </td>
                        </tr>
                    ))}
                </tbody>
            </table>)}
            
            <div className='mt-8 flex flex-wrap justify-between'>
                <Button variant={'secondary'}> Kembali </Button>
                <Button onClick={storeDocs}> Simpan & Lanjutkan </Button>
            </div>  
    </div>
    )
}

export default FormUploadDokumen