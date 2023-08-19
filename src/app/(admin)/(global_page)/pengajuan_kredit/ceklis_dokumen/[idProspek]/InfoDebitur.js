import React from 'react'

const InfoDebitur = ({ data }) => {
  return (
      <div className='my-10 w-[40%] '> 
         <p className='font-inter-medium text-xl mb-8 text-gray-500'> Informasi debitur </p>
         <p className='text-lg font-inter-medium'> {data.nmProspek} </p>

         <table className='w-full'>
            <tbody>
               <tr>
                  <td className='py-2 text-muted w-[20%]'> No.Identitas </td>
                  <td className='py-2'> {data.noIdentitas} </td>
               </tr>
               <tr>
                  <td className='py-2 text-muted'> Jenis Kelamin </td>
                  <td className='py-2'> {data.jenisKelamin} </td>
               </tr>
               <tr>
                  <td className='py-2 text-muted'> Status Menikah </td>
                  <td className='py-2'> {data.menikahDesc} </td>
               </tr>
               <tr>
                  <td className='py-2 text-muted'> Umur </td>
                  <td className='py-2'> 25 Tahun </td>
               </tr>
            </tbody>
         </table>
      </div>
  )
}

export default InfoDebitur