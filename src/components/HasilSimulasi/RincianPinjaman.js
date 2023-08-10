import React from 'react'
import Button, { buttonVariants } from '../Button'
import Dropdown, { DropdownItem } from '../Dropdown'
import { cn } from '@/lib/utils'

const RincianPinjaman = ({ closeModal }) => {
  return (
    <div className="div">
        <div className="flex flex-row">
            <div className="basis-1/2">
                <p className="text-semibold mb-2">Angsuran promo sebesar</p>
                <p className="text-3xl text-primary font-inter-bold mb-0">Rp 4.000.000 <span className="text-primary font-inter-semibold"> / bulan</span> </p> 
                <p className="mt-0"> dari total pinjaman <span className="text-primary font-inter-bold text-lg"> Rp 200.000.000 </span></p>

                <Button
                    variant="outline"
                    className="mr-3"
                    onClick={closeModal}>
                    Hitung Ulang
                </Button>
            </div>
            <div className="basis-1/2 bg-gray-100 rounded-lg text-sm p-4 italic self-start">
                <p className='mb-1'> Catatan: </p>
                <span>
                    Cicilan ini setara dengan <span className="font-inter-medium"> 50% </span> dari penghasilan bulanan <span className='text-primary font-inter-medium'> Rp 50.0000 </span> dengan  <strong className="font-semibold text-gray-900 dark:text-white"> sisa penghasilan </strong> sebesar 
                    <span className='text-primary font-inter-medium'> Rp 5.000.000 </span>
                </span>
            </div>
        </div>
    
        <hr class="h-px my-4 bg-gray-400 border-0 dark:bg-gray-700"></hr>

        <div className='flex justify-between items-center'> 
            <p className="text-lg font-inter-medium mb-0">Angsuran normal setelah promo </p>
            <p className="text-lg text-primary font-inter-medium mb-0">Rp 10.000.000</p>
        </div>

        <hr class="h-px my-4 bg-gray-400 border-0 dark:bg-gray-700"></hr>

        <p className='text-lg text-muted font-inter-medium dark:text-grey mb-2'> Biaya - Biaya </p>

        <div className='flex justify-between items-center mb-2'> 
            <p className="mb-0">Biaya Notaris </p>
            <p className="text-primary font-inter-medium mb-0">Rp 2.000.000</p>
        </div>

        <div className='flex justify-between items-center mb-2'> 
            <p className="mb-0">Biaya Asuransi </p>
            <p className="text-primary font-inter-medium mb-0">Rp 2.000.000</p>
        </div>

        <div className='flex justify-between items-center mb-2'> 
            <p className="mb-0">Biaya Provisi </p>
            <p className="text-primary font-inter-medium mb-0">Rp 2.000.000</p>
        </div>

        <div className='flex justify-between items-center mb-2'> 
            <p className="mb-0">Biaya Administrasi </p>
            <p className="text-primary font-inter-medium mb-0">Rp 2.000.000</p>
        </div>

        <div className='flex justify-between items-center mb-2'> 
            <p className="text-lg mb-0 font-inter-medium">Total Biaya Lainnya </p>
            <p className="text-lg text-primary font-inter-medium mb-0">Rp 8.000.000</p>
        </div>

        <hr class="h-px my-4 bg-gray-400 border-0 dark:bg-gray-700"></hr>

        <div className="flex flex-row">
            <div className="basis-full">
                <span>Rasio ini sudah <strong className="font-semibold text-red-600 dark:text-white">berbahaya</strong>, berpotensi mengganggu cash flow mu dimasa depan. <br></br> Karena angsuran perbulan telah melebihi 90% gaji</span>
            </div>
        </div>

        <hr class="h-px my-4 bg-gray-400 border-0 dark:bg-gray-700"></hr>

        <div className='flex flex-row justify-end'>

            <Dropdown
                position='top'
                className={cn([buttonVariants({ variant: 'light' })], 'mr-3')}
                text={<><svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path fill="currentColor" d="M408 112H106a58 58 0 0 0-58 58v158a56 56 0 0 0 56 56h8v39.68A40.32 40.32 0 0 0 152.32 464h207.36A40.32 40.32 0 0 0 400 423.68V384h8a56 56 0 0 0 56-56V168a56 56 0 0 0-56-56Zm-40 311.68a8.35 8.35 0 0 1-8.32 8.32H152.32a8.35 8.35 0 0 1-8.32-8.32V264.32a8.35 8.35 0 0 1 8.32-8.32h207.36a8.35 8.35 0 0 1 8.32 8.32Zm26-215.76a24 24 0 1 1 22-22a24 24 0 0 1-22 22ZM344 48H168a56.09 56.09 0 0 0-55.42 48h286.84A56.09 56.09 0 0 0 344 48Z" /></svg> Cetak </>}>
                <button className="dropdown-item" onClick={() => handleShowModalReject(row.id)}> Estimasi Biaya </button>
                <button className="dropdown-item" onClick={() => handleShowModalReject(row.id)}> Formulir Permohonan </button>
            </Dropdown>

            <Button className="mr-3" variant={'outline'}>
                Simpan Simulasi
            </Button>
            <Button onClick={() => router.push(`/simulasi_kredit/debitur_baru/prospek`)}>
                Ajukan Pinjaman
            </Button>
        </div>
    </div>
  )
}

export default RincianPinjaman