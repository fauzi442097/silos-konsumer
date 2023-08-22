'use client'

import React, { useState } from 'react'
import FormGroup from '@/components/Form/FormGroup'
import Input from '@/components/Form/Input'
import MySelect from '@/components/Form/Select'
import { statusPinjamanOptions, statusSlikOptions, valueStatusPinjaman } from './OptionList'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import ListPinjaman from './ListPinjaman'
import Button from '@/components/Button'
import { useRouter } from 'next/navigation'
import { FormRules } from '@/lib/formRules'
import { useGetBiCheckStatus, useGetListPinjamanByProductId } from '@/hooks/useRefData'


const formValidation = {
    status_slik: {required: FormRules.Required()},
    status_pinjaman: {required: FormRules.Required()},
    catatan: {maxLength: FormRules.MaxLength(30)},
}

 
const FormSlik = ({ dataSlikDebitur }) => {

    const router = useRouter()
    const {dataBiCheck, query: queryBiCheck} = useGetBiCheckStatus()
    const {dataListPinjaman, query: queryListPinjaman} = useGetListPinjamanByProductId(dataSlikDebitur.idProduct)


    const { register, control, handleSubmit, formState: { errors }  } = useForm({
        mode: 'all',
        defaultValues: {
            loan: {
                lembaga_keuangan: '',
                baki_debet: '',
                kolektibilitas: '',
                keterangan: '',
                status: ''
            }
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "loan", // unique name for your Field Array
    });

    const [hasLoan, setHasLoan] = useState(false)
    const [statusSlik, setStatusSlik] = useState({value: -1, label: 'Pilih status slik', disabled: true})
    const [statusPinjaman, setStatusPinjaman] = useState({value: -1, label: 'Pilih status pinjaman', disabled: true})

    const handleChange = (e, type, onChange) => {
        let value = e.value   
        onChange(value)
        if ( type == 'status_pinjaman' ) {
            let itemSelected = dataListPinjaman.find((item, i) => item.value == value)
            setStatusPinjaman(itemSelected)
        } else {
            let itemSelected = dataBiCheck.find((item, i) => item.value == value)
            setStatusSlik(itemSelected)
        }

        let isHasLoan 
        if ( type == 'status_pinjaman' && e.value !== valueStatusPinjaman.TiDAK_ADA_PINJAMAN ) {
            isHasLoan = true
        } else {
            isHasLoan = false
            remove() // reset all field
        }
        
        setHasLoan(isHasLoan)
    };

    const onSubmit = async (formData) => {
        console.log(formData)
    }

  return (
    <div className='bg-white w-[75%] shadow rounded-2xl p-8 self-start dark:bg-dark-depth1'> 

        <p className='font-inter-medium text-xl text-gray-500 mb-1'> Update Hasil Slik Checking </p>
     
        <div className='grid grid-cols-3 gap-4 my-8'>
                <FormGroup
                    className={'mb-2 flex-col gap-2'}
                    label={<label className='dark:text-grey'> Status Slik </label>} 
                    input={
                        <Controller
                        control={control}
                        name="status_slik"
                        render={({ field: { onChange } }) => (
                                <MySelect
                                    name={'status_slik'} 
                                    register={register} 
                                    errors={errors.status_slik} 
                                    options={dataBiCheck} 
                                    isDisabled={queryBiCheck.isLoading}
                                    loading={queryBiCheck.isLoading}
                                    value={statusSlik} 
                                    validation={formValidation.status_slik}
                                    onChange={(e) => handleChange(e, 'status_slik', onChange)}
                                />
                            )}
                    />
                    }
                />

                <FormGroup 
                    className={'mb-2 flex-col gap-2'}
                    label={<label className='dark:text-grey'> Status Pinjaman </label>} 
                    input={
                        <Controller
                        control={control}
                        name="status_pinjaman"
                        render={({ field: { onChange } }) => (
                            <MySelect 
                                name={'status_pinjaman'} 
                                register={register} 
                                errors={errors.status_pinjaman} 
                                options={dataListPinjaman} 
                                isDisabled={queryListPinjaman.isLoading}
                                loading={queryListPinjaman.isLoading}
                                value={statusPinjaman} 
                                validation={formValidation.status_pinjaman}
                                onChange={(e) => handleChange(e, 'status_pinjaman', onChange)}
                            />
                        )}
                        />
                    }
                />

                <FormGroup
                    className={'mb-2 flex-col gap-2'}
                    label={<label className='dark:text-grey'> Catatan </label>} 
                    input={<Input.Text name='catatan' maxLength={30} register={register} errors={errors.catatan} validation={formValidation.catatan}/>}
                />
        </div>
        

        { hasLoan && <ListPinjaman 
            fields={fields} 
            append={append} 
            remove={remove} 
            register={register}
            errors={errors}
            control={control}
        />}

        <div className='mt-8 flex flex-wrap justify-between'>
            <Button variant={'secondary'} onClick={() => router.push('/pengajuan_kredit/ceklis_dokumen/4201')}> Kembali </Button>
            <Button onClick={handleSubmit(onSubmit)}> Simpan & Lanjutkan </Button>
        </div> 
    </div>
  )
}

export default FormSlik