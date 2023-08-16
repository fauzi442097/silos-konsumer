'use client'

import FormGroup from '@/components/Form/FormGroup'
import Input from '@/components/Form/Input'
import MySelect from '@/components/Form/Select'
import React, { useState } from 'react'
import ListPinjaman from './ListPinjaman'
import Button from '@/components/Button'
import { statusPinjamanOptions, statusSlikOptions, valueStatusPinjaman } from './OptionList'
import { Controller, useFieldArray, useForm } from 'react-hook-form'

 
const FormSlik = () => {

    const { register, control, handleSubmit, reset, watch, formState: { errors }  } = useForm({
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
    const [statusSlik, setStatusSlik] = useState(null)
    const [statusPinjaman, setStatusPinjaman] = useState(null)

    const handleChange = (e, type, onChange) => {
        let value = e.value   
        onChange(value)
        if ( type == 'status_pinjaman' ) {
            let itemSelected = statusPinjamanOptions.find((item, i) => item.value == value)
            setStatusPinjaman(itemSelected)
        } else {
            let itemSelected = statusSlikOptions.find((item, i) => item.value == value)
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
    <form onSubmit={handleSubmit(onSubmit)}>
        <h4 className='mb-8'> Update Hasil SLIK Checking </h4>
        <div className='grid grid-cols-3 gap-6'>
        
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
                                // register={register} 
                                // errors={errors.status_slik} 
                                options={statusSlikOptions} 
                                value={statusSlik} 
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
                            // ref={register} 
                            // errors={errors.status_pinjaman} 
                            options={statusPinjamanOptions} 
                            value={statusPinjaman} 
                            onChange={(e) => handleChange(e, 'status_pinjaman', onChange)}
                        />
                    )}
                    />
                }
            />

            <FormGroup
                className={'mb-2 flex-col gap-2'}
                label={<label className='dark:text-grey'> Catatan </label>} 
                input={<Input.Text maxLength={30} name='catatan' register={register} errors={errors.catatan}/>}
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

        {/* <div className='my-4'>
            <Button type="submit"> Simpan </Button>
        </div> */}
    </form>
  )
}

export default FormSlik