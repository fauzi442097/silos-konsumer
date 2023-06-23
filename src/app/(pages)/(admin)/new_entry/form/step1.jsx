'use client'
import React from "react"
import { MySelect, Input } from '@/app/components';

const Step1 = () => {
    return (
        <>
            <h3 className="font-medium leading-tight mb-5">Form Simulasi</h3>

            <div className='card bg-gray-100 dark:bg-dark-depth1 dark:text-grey dark:shadow-none w-full'>
                <div className='flex flex-row w-full md:flex-nowrap flex-wrap my-4' style={{gap: "40px"}}>
                    <div className='w-1/2'>
                        <label className='block mb-3'> Produk </label>
                        <MySelect withSearch />
                    </div>
                    <div className='w-1/2'>
                        <label className='block mb-3'> Pekerjaan </label>
                        <MySelect withSearch />
                    </div>
                    <div className='w-1/2'>
                    </div>
                </div>
                <div className="flex flex-row w-full md:flex-nowrap flex-wrap my-4">
                    <div className="w-1/2"></div>
                    <div className="w-1/2"></div>
                    <div className="w-1/2"></div>
                </div>
                <div className='flex flex-row w-full md:flex-nowrap flex-wrap my-4' style={{gap: "40px"}}>
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
                <div className='flex flex-row w-full md:flex-nowrap flex-wrap my-4' style={{gap: "40px"}}>
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
                <div className='flex flex-row w-full md:flex-nowrap flex-wrap my-4' style={{gap: "40px"}}>
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
                <div className='flex flex-row w-full md:flex-nowrap flex-wrap my-4' style={{gap: "40px"}}>
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
                <div className='flex flex-row w-full md:flex-nowrap flex-wrap my-4' style={{gap: "40px"}}>
                    <div style={{ width: "257px" }}>
                        <label className='block mb-3'> Plafon Kredit yang diberikan </label>
                        <Input.Text></Input.Text>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Step1