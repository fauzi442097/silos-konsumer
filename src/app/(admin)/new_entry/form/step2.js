'use client'

import Input from "@/components/Form/Input";
import MySelect from "@/components/Form/Select";
import React from "react"

const Step2 = () => {
    return (
        <>
            <h3 className="font-medium leading-tight mb-10">Form Biaya - biaya</h3>
            <div className='flex flex-row gap-4 w-full md:flex-nowrap flex-wrap my-4'>
                <div className='w-1/2'>
                    <label className='block mb-3'> Produk </label>
                    <MySelect withSearch />
                </div>
                <div className='w-1/2'>
                    <label className='block mb-3'> Pekerjaan </label>
                    <MySelect withSearch />
                </div>
                <div className='w-1/2'>
                    <label className='block mb-3'> Status Menikah </label>
                    <MySelect withSearch />
                </div>
            </div>
            <div className='flex flex-row gap-4 w-full md:flex-nowrap flex-wrap my-4'>
                <div className='w-1/2'>
                    <label className='block mb-3'> Suku Bunga (dalam %) </label>
                    <Input.Text readOnly></Input.Text>
                </div>
                <div className='w-1/2'>
                    <label className='block mb-3'> Jangka Waktu (bulan) </label>
                    <Input.Text></Input.Text>
                </div>
                <div className='w-1/2'>
                    <label className='block mb-3'> Bunga Promo (%) </label>
                    <Input.Text></Input.Text>
                </div>
            </div>
            <div className='flex flex-row gap-4 w-full md:flex-nowrap flex-wrap my-4'>
                <div className='w-1/2'>
                    <label className='block mb-3'> Jangka Waktu Promo (bulan) </label>
                    <Input.Text></Input.Text>
                </div>
                <div className='w-1/2'>
                    <label className='block mb-3'> Tanggal Lahir </label>
                    <Input.Date />
                </div>
                <div className='w-1/2'>
                    <label className='block mb-3'> Usia </label>
                    <Input.Text></Input.Text>
                </div>
            </div>
            <div className='flex flex-row gap-4 w-full md:flex-nowrap flex-wrap my-4'>
                <div className='w-1/2'>
                    <label className='block mb-3'> Gaji </label>
                    <Input.Text></Input.Text>
                </div>
                <div className='w-1/2'>
                    <label className='block mb-3'> Penghasilan Lain </label>
                    <Input.Text></Input.Text>
                </div>
                <div className='w-1/2'>
                    <label className='block mb-3'> ULP </label>
                    <Input.Text></Input.Text>
                </div>
            </div>
            <div className='flex flex-row gap-4 w-full md:flex-nowrap flex-wrap my-4'>
                <div className='w-1/2'>
                    <label className='block mb-3'> Total Penghasilan </label>
                    <Input.Text readOnly></Input.Text>
                </div>
                <div className='w-1/2'>
                    <label className='block mb-3'> Asuransi </label>
                    <MySelect withSearch />
                </div>
                <div className='w-1/2'>
                    <label className='block mb-3'> Rate Asuransi </label>
                    <Input.Text></Input.Text>
                </div>
            </div>
            <div className='flex flex-row gap-4 w-full md:flex-nowrap flex-wrap my-4'>
                <div style={{width: "257px"}}>
                    <label className='block mb-3'> Plafon Kredit yang diberikan </label>
                    <Input.Text></Input.Text>
                </div>
            </div>
        </>
    )
};

export default Step2