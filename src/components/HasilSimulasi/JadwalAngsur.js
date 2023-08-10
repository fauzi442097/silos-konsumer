import React from 'react'
import Button from '../Button'
import dataAngsuran from './dataAngsuran.json';

const JadwalAngsur = () => {
  return (
    <div>
        <div className='flex flex-wrap justify-between items-center mb-6 flex-row-reverse'>
            {/* <h3 className="text-center font-inter-medium mb-0"> Jadwal Angsur </h3> */}
            <Button className="mr-3">
                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path fill="currentColor" d="M408 112H106a58 58 0 0 0-58 58v158a56 56 0 0 0 56 56h8v39.68A40.32 40.32 0 0 0 152.32 464h207.36A40.32 40.32 0 0 0 400 423.68V384h8a56 56 0 0 0 56-56V168a56 56 0 0 0-56-56Zm-40 311.68a8.35 8.35 0 0 1-8.32 8.32H152.32a8.35 8.35 0 0 1-8.32-8.32V264.32a8.35 8.35 0 0 1 8.32-8.32h207.36a8.35 8.35 0 0 1 8.32 8.32Zm26-215.76a24 24 0 1 1 22-22a24 24 0 0 1-22 22ZM344 48H168a56.09 56.09 0 0 0-55.42 48h286.84A56.09 56.09 0 0 0 344 48Z" /></svg>
                Cetak Jadwal Angsur
            </Button>
        </div>
        
        <div className="relative overflow-x-auto shadow rounded-lg max-h-[45rem]">
            <table className="w-full text-left">
                <thead className="bg-gray-100 sticky top-0">
                    <tr>
                        <th scope="col" className="px-6 py-4 font-inter-medium">
                            Angsuran Ke
                        </th>
                        <th scope="col" className="px-6 py-4 font-inter-medium">
                            Sisa Pokok 
                        </th>
                        <th scope="col" className="px-6 py-4 font-inter-medium">
                            Angsuran Pokok
                        </th>
                        <th scope="col" className="px-6 py-4 font-inter-medium">
                            Angsuran Bunga
                        </th>
                        <th scope="col" className="px-6 py-4 font-inter-medium">
                            Angsuran
                        </th>
                    </tr>
                </thead>
                <tbody class="overflow-y-auto">
                    {dataAngsuran.map((item, i) => (
                        <tr className="bg-white border-b border-dashed dark:bg-gray-900 dark:border-gray-700" key={i}>
                            <td className="px-6 py-4">{item.angsuranKe}</td>
                            <td className="px-6 py-4">{item.sisaPokok}</td>
                            <td className="px-6 py-4">{item.angsuranPokok}</td>
                            <td className="px-6 py-4">{item.angsuranBunga}</td>
                            <td className="px-6 py-4">{item.angsuran}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default JadwalAngsur