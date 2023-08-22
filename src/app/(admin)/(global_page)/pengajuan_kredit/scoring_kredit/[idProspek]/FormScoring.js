'use client'

import Button from '@/components/Button'
import FormGroup from '@/components/Form/FormGroup'
import Input from '@/components/Form/Input'
import React from 'react'
import { useForm } from 'react-hook-form'

const FormScoring = ({ data }) => {

   const { register, control, handleSubmit, formState: { errors }  } = useForm({
      mode: 'all'
  });

   const onSubmit = () => {
      alert('tes')
   }

   
  return (
   <div className='bg-white w-[75%] shadow rounded-2xl p-8 self-start dark:bg-dark-depth1'> 
      <p className='font-inter-medium text-xl text-gray-500 mb-1'> Form Pembiayaan </p>

      <div className='my-8 grid grid-cols-4 gap-8'>
         <FormGroup
            className={'gap-2'}
            label={<label> Nama Nasabah</label>}
            input={<Input.Text name='nama_nasabah' id="nama_nasabah" value={data.namaNasabah} readOnly />}
         />
  
         <FormGroup
            className={'flex-col gap-2 w-full'}
            label={<label className='dark:text-grey' htmlFor="gaji"> Plafon </label>}
            input={
                  <>
                     <Input.Group
                        inputGroupText={'Rp'}
                        inputElement={<Input.Currency
                              name="plafon"
                              id="plafon"
                              allowDecimals={true}
                              maxLength={9}
                              hideError
                              allowNegativeValue={false}
                              decimalSeparator={','}
                              groupSeparator={'.'}
                        />}
                     />
                  </>
            }
         />

         <FormGroup
            className={'flex-col gap-2 w-full'}
            label={<label className='dark:text-grey' htmlFor="gaji_bulanan"> Gaji bulanan </label>}
            input={
                  <>
                     <Input.Group
                        inputGroupText={'Rp'}
                        inputElement={<Input.Currency
                              name="gaji_bulanan"
                              id="gaji_bulanan"
                              allowDecimals={true}
                              maxLength={9}
                              hideError
                              allowNegativeValue={false}
                              decimalSeparator={','}
                              groupSeparator={'.'}
                        />}
                     />
                  </>
            }
         />

         <FormGroup
            className={'flex-col gap-2 w-full'}
            label={<label className='dark:text-grey' htmlFor="penghasilan"> Penghasilan </label>}
            input={
                  <>
                     <Input.Group
                        inputGroupText={'Rp'}
                        inputElement={<Input.Currency
                              name="penghasilan"
                              id="penghasilan"
                              allowDecimals={true}
                              maxLength={9}
                              hideError
                              allowNegativeValue={false}
                              decimalSeparator={','}
                              groupSeparator={'.'}
                        />}
                     />
                  </>
            }
         />

         <FormGroup
            className={'flex-col gap-2 w-full'}
            label={<label className='dark:text-grey' htmlFor="ulp"> ULP </label>}
            input={
                  <>
                     <Input.Group
                        inputGroupText={'Rp'}
                        inputElement={<Input.Currency
                              name="ulp"
                              id="ulp"
                              allowDecimals={true}
                              maxLength={9}
                              hideError
                              allowNegativeValue={false}
                              decimalSeparator={','}
                              groupSeparator={'.'}
                        />}
                     />
                  </>
            }
         />

         <FormGroup
            className={'flex-col gap-2 w-full'}
            label={<label className='dark:text-grey' htmlFor="angsuran"> Angsuran </label>}
            input={
                  <>
                     <Input.Group
                        inputGroupText={'Rp'}
                        inputElement={<Input.Currency
                              name="angsuran"
                              id="angsuran"
                              allowDecimals={true}
                              maxLength={9}
                              hideError
                              allowNegativeValue={false}
                              decimalSeparator={','}
                              groupSeparator={'.'}
                        />}
                     />
                  </>
            }
         />

         <div className='flex gap-4'>
            <FormGroup
               className={'mb-2 flex-col gap-2 w-full'}
               label={<label className='dark:text-grey' htmlFor="suku_bunga"> Suku Bunga </label>}
               input={
                     <>
                        <Input.Group
                           append
                           inputGroupText={'%'}
                           inputElement={<Input.Text name='suku_bunga' id="suku_bunga" defaultValue={Number(data.rate)} readOnly />}
                        />
                     </>
               }
            />

            <FormGroup
               className={'mb-2 flex-col gap-2 w-full'}
               label={<label className='dark:text-grey' htmlFor="jangka_waktu"> Jangka Waktu </label>}
               input={
                     <>
                        <Input.Group
                           append
                           inputGroupText={'Bulan'}
                           inputElement={<Input.Currency
                                 disableGroupSeparators
                                 allowNegativeValue={false}
                                 allowDecimals={false}
                                 id="jangka_waktu"
                                 maxLength={3}
                                 hideError
                                 name='jangka_waktu'
                           />}
                        />
                     </>
               }
            />
         </div>

      

         <FormGroup
            className={'flex-col gap-2 w-full'}
            label={<label className='dark:text-grey' htmlFor="angsuran_promo"> Angsuran Promo </label>}
            input={
                  <>
                     <Input.Group
                        inputGroupText={'Rp'}
                        inputElement={<Input.Currency
                              name="angsuran_promo"
                              id="angsuran_promo"
                              allowDecimals={true}
                              maxLength={9}
                              hideError
                              allowNegativeValue={false}
                              decimalSeparator={','}
                              groupSeparator={'.'}
                        />}
                     />
                  </>
            }
         />

         <FormGroup
            className={'flex-col gap-2 w-full'}
            label={<label className='dark:text-grey' htmlFor="baki_debet"> Baki debet setelah efektif </label>}
            input={
                  <>
                     <Input.Group
                        inputGroupText={'Rp'}
                        inputElement={<Input.Currency
                              name="baki_debet"
                              id="baki_debet"
                              allowDecimals={true}
                              maxLength={9}
                              hideError
                              allowNegativeValue={false}
                              decimalSeparator={','}
                              groupSeparator={'.'}
                        />}
                     />
                  </>
            }
         />

         <FormGroup
            className={'flex-col gap-2 w-full'}
            label={<label className='dark:text-grey' htmlFor="denda_pokok"> Denda pokok </label>}
            input={
                  <>
                     <Input.Group
                        inputGroupText={'Rp'}
                        inputElement={<Input.Currency
                              name="denda_pokok"
                              id="denda_pokok"
                              allowDecimals={true}
                              maxLength={9}
                              hideError
                              allowNegativeValue={false}
                              decimalSeparator={','}
                              groupSeparator={'.'}
                        />}
                     />
                  </>
            }
         />

         <FormGroup
            className={'flex-col gap-2 w-full'}
            label={<label className='dark:text-grey' htmlFor="denda_bunga"> Denda bunga </label>}
            input={
                  <>
                     <Input.Group
                        inputGroupText={'Rp'}
                        inputElement={<Input.Currency
                              name="denda_bunga"
                              id="denda_bunga"
                              allowDecimals={true}
                              maxLength={9}
                              hideError
                              allowNegativeValue={false}
                              decimalSeparator={','}
                              groupSeparator={'.'}
                        />}
                     />
                  </>
            }
         />

         <FormGroup
            className={'flex-col gap-2 w-full'}
            label={<label className='dark:text-grey' htmlFor="bunga_berjalan"> Bunga berjalan</label>}
            input={
                  <>
                     <Input.Group
                        inputGroupText={'Rp'}
                        inputElement={<Input.Currency
                              name="bunga_berjalan"
                              id="bunga_berjalan"
                              allowDecimals={true}
                              maxLength={9}
                              hideError
                              allowNegativeValue={false}
                              decimalSeparator={','}
                              groupSeparator={'.'}
                        />}
                     />
                  </>
            }
         />

         <FormGroup
            className={'flex-col gap-2 w-full'}
            label={<label className='dark:text-grey' htmlFor="bunga_pelunasan"> Bunga pelunasan</label>}
            input={
                  <>
                     <Input.Group
                        inputGroupText={'Rp'}
                        inputElement={<Input.Currency
                              name="bunga_pelunasan"
                              id="bunga_pelunasan"
                              allowDecimals={true}
                              maxLength={9}
                              hideError
                              allowNegativeValue={false}
                              decimalSeparator={','}
                              groupSeparator={'.'}
                        />}
                     />
                  </>
            }
         />

         <FormGroup
            className={'gap-2'}
            label={<label> Jangka Waktu </label>}
            input={<Input.Text name='nama_nasabah' id="nama_nasabah" value={'Ahmad Fauzi'}  />}
         />
      </div>

      <div className='mt-8 flex flex-wrap justify-between'>
            <Button variant={'secondary'} onClick={() => router.push('/pengajuan_kredit/ceklis_dokumen/4201')}> Kembali </Button>
            <Button onClick={handleSubmit(onSubmit)}> Simpan & Lanjutkan </Button>
        </div> 
   </div>
  )
}

export default FormScoring