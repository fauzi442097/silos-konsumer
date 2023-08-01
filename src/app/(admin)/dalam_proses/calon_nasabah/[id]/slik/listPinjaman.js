import Button from '@/components/Button'
import Input from '@/components/Form/Input'
import Radio from '@/components/Form/Radio'
import MySelect from '@/components/Form/Select'
import React from 'react'
import { KolektibilitasOptions } from './optionList'
import { cn, generateId } from '@/lib/utils'
import { Controller } from 'react-hook-form'
import { useState } from 'react'

const TableRows = ({ fields, remove, register, errors, control, handleChange, kol }) => {
   return (
      fields.map((item, index) => {
         return (<tr key={item.id} className={cn(index != 0 && 'border-t')}>
            <td className='px-6 py-3'> 
               <Input.Text 
                  key={item.id}
                  errors={errors.loan?.[index]?.lembaga_keuangan}
                  register={register}
                  name={`loan.${index}.lembaga_keuangan`} 
                  placeholder='OJK'/>
            </td>
            <td className='px-6 py-3'> 
               <Input.Currency 
                  key={item.id}
                  placeholder={'1,000,000'}
                  className={'text-right'}
                  register={register}
                  errors={errors.loan?.[index]?.baki_debet}
                  name={`loan.${index}.baki_debet`} 
                  allowDecimals={false}
                  allowNegativeValue={false}
               />
            </td>
            <td className='px-6 py-3'> 
               <Controller
                  control={control}
                  name={`loan.${index}.kolektibilitas`} 
                  render={({ field: { onChange, value, name, ref } }) => {
                     return (
                     <MySelect 
                        name={`loan.${index}.kolektibilitas`} 
                        register={register} 
                        errors={errors.loan?.[index]?.kolektibilitas}
                        options={KolektibilitasOptions} 
                        value={kol[index].item}
                        onChange={(e) => handleChange(e, kol[index].id, onChange)}
                     />
                  )}}
               />
            </td>
            <td className='px-6 py-3'> 
               <Input.Text 
                  key={item.id}       
                  register={register}
                  errors={errors.loan?.[index]?.keterangan}
                  name={`loan.${index}.keterangan`} 
                  maxLength={30}
               />
            </td>
            <td className='px-6 py-3'> 
               <div className='flex flex-wrap gap-4'>
                  <Radio label="Aktif" name={`loan.${index}.status`} register={register} value="active"/>
                  <Radio label="Non Aktif" name={`loan.${index}.status`} register={register} value="inactive"/>
               </div>
               {errors.loan?.[index]?.status && <span className='mt-1 block text-sm form-invalid-message'>{errors.loan?.[index]?.status.message}</span>}
            </td>
            <td className='px-6 py-3' align='center'>
               <Button variant={'danger'} size={'sm'} onClick={() => remove(index)}>  Hapus </Button>
            </td>
         </tr>)
      })
   )
}

const ListPinjaman = ({ 
   fields, 
   append, 
   remove, 
   register, 
   errors,
   control
}) => {

   const [kol, setKol] = useState([])

   const addLoan = () => {
      append({
         lembaga_keuangan: "", 
         baki_debet: "",
         kolektibilitas: "", 
         keterangan: "",
         status: "",
      })

      const kolInput = {
         id: generateId(),
         item: KolektibilitasOptions[0], 
      } 

      setKol([...kol, kolInput])
   }


   const handleChange = (e, idKol, onChange) => {
      let value = e.value
      let itemSelected = KolektibilitasOptions.find((item, i) => item.value == value)
      let prevKol = kol
      let newCol = prevKol.map((item, i) => {
         if ( item.id == idKol ) {
            return {
               id: item.id,
               item: itemSelected
            }
         } else {
            return item
         }
      })

      onChange(value)
      setKol(newCol)
   }

   return (
      <div className='my-8'> 
         <div className='flex flex-wrap justify-between items-center mb-3'>
            <p className='text-lg font-inter-medium'> List Pinjaman </p>
            <Button size={'sm'} variant={'outline'} onClick={() => addLoan()}> Tambah Pinjaman </Button>
         </div>

         <div>
            <table className='w-full'>
               <thead className=' bg-gray-100  text-gray-600 dark:bg-dark-depth3 dark:text-grey'>
                  <tr>
                     <td className='px-6 py-3 font-inter-medium rounded-tl-xl rounded-bl-xl'> Nama Lembaga Keuangan </td>
                     <td className='px-6 py-3 font-inter-medium'> Baki Debet </td>
                     <td className='px-6 py-3 font-inter-medium' width={300}> Kolektibilitas </td>
                     <td className='px-6 py-3 font-inter-medium'> Keterangan </td>
                     <td className='px-6 py-3 font-inter-medium'> Status </td>
                     <td className='px-6 py-3 font-inter-medium rounded-tr-xl rounded-br-xl'> </td>
                  </tr>
               </thead>
               <tbody>
                  <TableRows 
                     fields={fields} 
                     remove={remove} 
                     register={register} 
                     errors={errors}
                     control={control}
                     handleChange={handleChange}
                     kol={kol}
                  />
               </tbody>
            </table>
         </div>
      </div>
   )
}
export default ListPinjaman