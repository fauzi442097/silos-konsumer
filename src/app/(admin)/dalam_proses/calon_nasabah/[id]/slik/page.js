'use client'

import React, { useState} from 'react'
import { InfoProfile } from '@/app/(admin)/(global_page)/profile/[id]/page'
import Badge from '@/components/Badge'
import FormGroup from '@/components/Form/FormGroup'
import MySelect from '@/components/Form/Select'
import { useTheme } from '@/hooks/ThemeContext'
import Skeleton from 'react-loading-skeleton'
import { statusPinjamanOptions, statusSlikOptions, valueStatusPinjaman } from './optionList'
import Input from '@/components/Form/Input'
import ListPinjaman from './listPinjaman'
import Button from '@/components/Button'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";

const formLoanSchema = yup.object({
   lembaga_keuangan: yup.string().required('Wajib diisi'),
   baki_debet: yup.string().required('Wajib diisi'),
   kolektibilitas: yup.string().required('Pilih kolektibilitas'),
   status: yup.string().required('Pilih status'),
   keterangan: yup.string().max('30', 'Maksimal 10 karakter')
})

const formSlikSchema = yup.object({
   status_slik: yup.string().required('Pilih status slik'),
   status_pinjaman: yup.string().required('Pilih status pinjaman'),
   catatan: yup.string().max(30, 'Maksimal 30 karakter'),
   loan: yup.array().of(formLoanSchema)
 })
 

const Slik = ({ params }) => {

  const id = params.id
  const { theme } = useTheme()
  const boxShadowCardStyle = theme == 'light' ? {
    'boxShadow': '#c7cdc969 3px 0px 25px 0px'
  } : {} 

  const [hasLoan, setHasLoan] = useState(false)
  const [statusSlik, setStatusSlik] = useState(null)
  const [statusPinjaman, setStatusPinjaman] = useState(null)


  const isLoadingContent = false

  const { register, control, handleSubmit, reset, watch, formState: { errors }  } = useForm({
      resolver: yupResolver(formSlikSchema),
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

   console.log('tes')


  return (


   <div className='card bg-white dark:bg-dark-depth1 p-6 w-full md:flex-[3] self-start' style={boxShadowCardStyle}> 
      <div className='py-4'>

         <div className='flex flex-wrap justify-between items-center'>
            <div>
               <h2 className='mb-0'> {isLoadingContent ? <Skeleton width={150} height={20} borderRadius={'0.5rem'}/>  : 'Ahmad Fauzi'} </h2>
               <span className='text-muted'> {isLoadingContent ? <Skeleton height={10} borderRadius={'0.5rem'}/>  : '3273032001980821'} </span>
            </div>
            <span> {isLoadingContent ? <Skeleton height={20} width={50} borderRadius={'0.5rem'}/>  :  <Badge variant="danger" className={'text-xs'}> Progress Slik </Badge>  }</span>
         </div>

         <div className='grid grid-cols-3 mt-4'>
            <InfoProfile 
               className={'flex flex-col items-start justify-start'} 
               label={'Tempat / Tanggal Lahir'} 
               labelClass={'mb-1 flex-none'}
               value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/> : `Tahuna / 20-01-1990`}
               valueClass={'flex-none'}/>

            <InfoProfile
               className={'flex flex-col items-start justify-start'} 
               label={'Status Menikah'} 
               labelClass={'mb-1 flex-none'}
               value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : 'Belum Menikah'}
               valueClass={'flex-none'}
            />

            <InfoProfile 
               className={'flex flex-col items-start justify-start'} 
               label={'Alamat'} 
               labelClass={'mb-1 flex-none'}
               value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : 'LINGKUNGAN II RT.000 RW.000'}
               valueClass={'flex-none'}
            />

            <InfoProfile
               className={'flex flex-col items-start justify-start'} 
               label={'No.Identitas Pasangan'} 
               labelClass={'mb-1 flex-none'}
               value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : '1231231231231232'}
               valueClass={'flex-none'}
            />

            <InfoProfile
               className={'flex flex-col items-start justify-start'} 
               label={'Nama Pasangan'} 
               labelClass={'mb-1 flex-none'}
               value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : 'Dewi'}
               valueClass={'flex-none'}
            />
         </div>

         <div className='w-full border-b mb-8 border-dashed'/>

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
                        render={({ field: { onChange, value, name, ref } }) => (
                              <MySelect 
                                 name={'status_slik'} 
                                 register={register} 
                                 errors={errors.status_slik} 
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
                        render={({ field: { onChange, value, name, ref } }) => (
                           <MySelect 
                              name={'status_pinjaman'} 
                              ref={register} 
                              errors={errors.status_pinjaman} 
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


            <div className='my-4'>
               <Button size={'sm'} type="submit"> Simpan </Button>
            </div>
         </form>

      </div>
   </div>
  )
}

export default Slik