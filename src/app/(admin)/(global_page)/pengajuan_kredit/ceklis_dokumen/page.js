import PageTitle from '@/components/PageTitle'
import React from 'react'
import { REF_STEP, RefStepper, Stepper } from '../Stepper'
import Card from '@/components/Card'
import Checkbox from '@/components/Form/Checkbox'
import Button from '@/components/Button'
import { cn } from '@/lib/utils'

const listDocuments = [
    {
        id: 1,
        name: 'KTP',
        required: true
    },
    {
        id: 2,
        name: 'Pas Foto',
        required: false
    },
    {
        id: 3,
        name: 'KK',
        required: true
    },
    {
        id: 4,
        name: 'KTP Pasangan',
        required: false
    },
    {
        id: 5,
        name: 'Akta Cerai/Surat Kematian',
        required: false
    },
    {
        id: 6,
        name: 'Akta Nikah',
        required: false
    },
    {
        id: 7,
        name: 'Surat Gaji Kolektif Terakhir',
        required: false
    },
    {
        id: 8,
        name: 'Mutasi 3 bulan terakhir',
        required: false
    },
    {
        id: 9,
        name: 'Kartu ATM',
        required: false
    },
]

const CeklisDokumen = () => {
  return (
    <>
        <PageTitle title="Ceklis Dokumen" />
        <div className="my-6">
            <div className="flex justify-between items-center gap-20 py-4 w-full m-auto">
                {RefStepper.map((item, i) => (
                    <Stepper
                        key={i}
                        id={item.id}
                        visited={i < REF_STEP.CEKLIS_DOKUMEN}
                        active={item.id == REF_STEP.CEKLIS_DOKUMEN}
                        icon={item.icon} 
                        label={item.label}
                    />
                ))}
            </div>
        </div>

        <Card>
            <Card.Body className={'flex gap-4'}>
                <div className='my-10 w-[40%] '> 
                    <p className='font-inter-medium text-xl mb-8 text-gray-500'> Informasi debitur </p>
                    <p className='text-lg font-inter-medium'> Ahmad Fauzi </p>

                    <table className='w-full'>
                        <tr>
                            <td className='py-2 text-muted w-[20%]'> NIK </td>
                            <td className='py-2'> 32730310210192012 </td>
                        </tr>
                        <tr>
                            <td className='py-2 text-muted'> Jenis Kelamin </td>
                            <td className='py-2'> Laki-laki </td>
                        </tr>
                        <tr>
                            <td className='py-2 text-muted'> Status Menikah </td>
                            <td className='py-2'> Belum Menikah </td>
                        </tr>
                        <tr>
                            <td className='py-2 text-muted'> Umur </td>
                            <td className='py-2'> 25 Tahun </td>
                        </tr>
                    </table>
                    
                </div>

                <div className='my-10 w-[60%] border-l px-10 shadow rounded-xl py-5 '> 
                    <div className='mb-8'>
                        <p className='font-inter-medium text-xl text-gray-500 mb-1'> Ceklis dokumen debitur </p>
                        <span className='text-sm'> (<span className='text-red-500'>*</span>) Dokumen wajib </span>
                    </div>

                        <table className='table-document-debitur'>
                            {listDocuments.map((item, index) => (
                                <tr key={item.id}>
                                    <td className='py-2 w-[8%] border-b border-dashed' align='center'> 
                                        <Checkbox name={'setuju'} id={item.name}/>
                                    </td>
                                    <td valign='top' className='py-2 border-b border-dashed'> <label htmlFor={item.name} className={cn(['select-none', item.required && 'after:content-["*"] after:text-red-500'])}> {item.name} </label> </td>
                                </tr>
                            ))}
                            
            
                        </table>
                    

                    <div className='mt-8 flex flex-wrap justify-between'>
                        <Button variant={'secondary'}> Kembali </Button>
                        <Button> Simpan & Lanjutkan </Button>
                    </div>  
                </div>
            </Card.Body>
        </Card>
    </>
  )
}

export default CeklisDokumen