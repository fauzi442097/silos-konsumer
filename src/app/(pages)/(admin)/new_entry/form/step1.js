'use client'
import React from "react"
import { MySelect, Input } from '@/app/components';

const options = [
    { value: "fox", label: "Fox" },
    { value: "Butterfly", label: "Butterfly" },
    { value: "Honeybee", label: "Honeybee" }
 ];

const Step1 = () => {
    return (
        <>
            {/* <h3 className="font-medium leading-tight mb-10">Form Simulasi</h3> */}
            <div className='flex flex-row gap-4 w-full md:flex-nowrap flex-wrap my-4'>
                <div className='w-1/2'>
                    <label className='block mb-3'> Produk </label>
                    <MySelect withSearch options={options} />
                </div>
                <div className='w-1/2'>
                    <label className='block mb-3'> Pekerjaan </label>
                    <MySelect withSearch options={options}/>
                </div>
                <div className='w-1/2'>
                    <label className='block mb-3'> Status Menikah </label>
                    <MySelect withSearch options={options}/>
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
                    <Input.Currency
                        id="penghasilan"
                        name="penghasilan"
                        placeholder="Isikan gaji"
                        allowDecimals={true}
                        allowNegativeValue={false}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        onChange={(value, name) => console.log(value, name)}
                    />
                </div>
                <div className='w-1/2'>
                    <label className='block mb-3'> Penghasilan Lain </label>
                    <Input.Currency
                        id="penghasilanLain"
                        name="penghasilanLain"
                        placeholder="Isikan penghasilan lain"
                        allowDecimals={true}
                        allowNegativeValue={false}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        onChange={(value, name) => console.log(value, name)}
                    />
                </div>
                <div className='w-1/2'>
                    <label className='block mb-3'> ULP </label>
                    <Input.Currency
                        id="ulp"
                        name="ulp"
                        placeholder="Isikan ULP"
                        allowDecimals={true}
                        allowNegativeValue={false}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        onChange={(value, name) => console.log(value, name)}
                    />
                </div>
            </div>
            <div className='flex flex-row gap-4 w-full md:flex-nowrap flex-wrap my-4'>
                <div className='w-1/2'>
                    <label className='block mb-3'> Total Penghasilan </label>
                    <Input.Text readOnly></Input.Text>
                </div>
                <div className='w-1/2'>
                    <label className='block mb-3'> Asuransi </label>
                    <MySelect withSearch options={options}/>
                </div>
                <div className='w-1/2'>
                    <label className='block mb-3'> Rate Asuransi </label>
                    <Input.Text></Input.Text>
                </div>
            </div>
            <div className='flex flex-row gap-4 w-full md:flex-nowrap flex-wrap my-4'>
                <div style={{ width: "257px" }}>
                    <label className='block mb-3'> Plafon Kredit yang diberikan </label>
                    <Input.Text></Input.Text>
                </div>
            </div>
        </>
    )
};

export default Step1