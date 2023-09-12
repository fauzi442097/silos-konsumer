'use client'

import React, { useEffect, useState } from 'react'
import Button from '@/components/Button'
import Checkbox from '@/components/Form/Checkbox'
import useGet from '@/hooks/useGet'
import usePost from '@/hooks/usePost'
import { useMySwal } from '@/hooks/useMySwal'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'


const useGetDocuments = (data) => {
    const mySwal = useMySwal()
    const result = useGet(['documents'], `master/list/jdoc?statusPembiayaan=0&tipeAgunan=&idProduct=${data[0].product.id}&isMenikah=${data[0].nasabah.is_menikah}`, { retry: false, refetchOnWindowFocus: false });
    useEffect(() => {
        if (result.isError) mySwal.error(result.error)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.isError])
    return result
}

const usePostCeklisDokumen = (mySwal, id, router) => {
    return usePost(['chelist-dokumen'], '/v2/prospek/checklist-dokumen', [], {
        refetchOnWindowFocus: false,
        retry: false,
        onError: (error, variables, context) => {
            if (error.rc === 4001) {
                mySwal.warning('Terjadi kesalahan !')
            }

            mySwal.warning(error.rm);
        },
        onSuccess: (data, variables, context) => {
            mySwal.success(data.data.rm);

            router.push(`/pengajuan_kredit/slik/${id}`);
        }
    })
}

const FormUploadDokumen = ({ dataDebitur }) => {
    let id = dataDebitur[0].id;
    const router = useRouter()
    const mySwal = useMySwal()
    const { isLoading, isSuccess, data } = useGetDocuments(dataDebitur);
    const documents = data?.data?.data
    const documentsChecklist = dataDebitur[0].checklist_persyaratan;
    
    const [multipleCheckbox, setMultipleCheckbox] = useState([]);
    const hitCeklisDokumen = usePostCeklisDokumen(mySwal, id, router);

    useEffect(() => {
        // if(documentsChecklist){
        //     setMultipleCheckbox(documentsChecklist.map((item) => {
        //         let upload = item.is_upload;
        //         return { id: item.id, checked: upload }
        //     }))
        // } 
        
        if (documents) setMultipleCheckbox(documents.map((item) => ({ id: item.id, checked: item.isMandatory })));
        
    }, [documents])

    const storeDocs = () => {
        const unCheckDocRequired = documents.filter((item, index) => item.isMandatory && item.id == multipleCheckbox[index].id && !multipleCheckbox[index].checked)
        if (unCheckDocRequired.length > 0) {
            const docName = unCheckDocRequired.map((item) => (`- ${item.description} <br/>`))
            mySwal.warning(`Dokumen wajib berikut belum dipilih: <br/>${docName.join("")}`)
            return
        }

        let idProspek = dataDebitur[0].id_prospek;
        let data = multipleCheckbox.map((value) => {
            return {
                idJenisDok: value.id,
                isUpload: value.checked,
            }
        });

        let body = {
            idProspek: idProspek,
            data: data
        }

        console.log(body);
        hitCeklisDokumen.mutate(body);
    }

    const handleChange = (i) => {
        setMultipleCheckbox(multipleCheckbox.map(value => {
            if (value.id === multipleCheckbox[i].id) {
                const newValue = { id: multipleCheckbox[i].id, checked: !multipleCheckbox[i].checked };
            
                return newValue;
            } else {
                // No changes
                return value;
            }
        }));
    }


    return (
        <div className='bg-white w-[75%] shadow rounded-2xl p-8 self-start dark:bg-dark-depth1'>
            <div className='mb-8'>
                <p className='font-inter-medium text-xl text-gray-500 mb-1'> Update Hasil Slik Checking </p>
                <span className='text-sm'> (<span className='text-red-500'>*</span>) Dokumen wajib </span>
            </div>
            {isLoading && <p> loading ... </p>}
            {isSuccess && (<table className='table-document-debitur'>
                <tbody>
                    {documents.map((item, i) => (
                        <tr key={item.id}>
                            <td className='py-2 w-[8%] border-b border-dashed' align='center'>
                                <Checkbox
                                    name={item.description}
                                    value={item.id}
                                    id={item.description}
                                    checked={multipleCheckbox ? multipleCheckbox[i]?.checked : false}
                                    onChange={() => handleChange(i)} />
                            </td>
                            <td valign='top' className='py-2 border-b border-dashed'> <label htmlFor={item.description} className={cn(['select-none', item.isMandatory && 'after:content-["*"] after:text-red-500'])}> {item.description} </label> </td>
                        </tr>
                    ))}
                </tbody>
            </table>)}

            <div className='mt-8 flex flex-wrap justify-between'>
                <Button variant={'secondary'} onClick={() => router.push(`/pengajuan_kredit/data_debitur_pembiayaan/${id}`)}> Kembali </Button>
                <Button onClick={storeDocs}> Simpan & Lanjutkan </Button>
            </div>
        </div>
    )
}

export default FormUploadDokumen