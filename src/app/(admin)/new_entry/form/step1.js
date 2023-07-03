'use client'
import Input from "@/components/Form/Input";
import MySelect from "@/components/Form/Select";
import Detail from "@/components/Detail";
import React from "react"

const options = [
    { value: "fox", label: "Fox" },
    { value: "Butterfly", label: "Butterfly" },
    { value: "Honeybee", label: "Honeybee" }
 ];

const Step1 = () => {
    return (
        <>
            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{gap: "30px"}}>
                <div style={{ width: "250px" }}>
                    <label className='block mb-3'> Produk </label>
                    <MySelect withSearch options={options} />
                </div>
                <div style={{ width: "250px" }}>
                    <label className='block mb-3'> Pekerjaan </label>
                    <MySelect withSearch options={options}/>
                </div>
                <div style={{ width: "250px" }}>
                </div>
            </div>
            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{gap: "30px"}}>
                <div style={{ width: "250px" }}>
                    <label className='block mb-3'> Status Menikah </label>
                    <MySelect withSearch options={options}/>
                </div>
                <div style={{ width: "250px" }}>
                    <label className='block mb-3'> Tanggal Lahir </label>
                    <Input.Date />
                </div>
                <div style={{ width: "250px" }}>
                    <label className='block mb-3'> Usia </label>
                    <Input.Text></Input.Text>
                </div>
            </div>
            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{gap: "30px"}}>
                <div style={{ width: "250px" }}>
                    <label className='block mb-3'> Suku Bunga (dalam %) </label>
                    <Input.Text readOnly></Input.Text>
                </div>
                <div style={{ width: "250px" }}>
                    <label className='block mb-3'> Jangka Waktu (bulan) </label>
                    <Input.Text></Input.Text>
                </div>
                <div style={{ width: "250px" }}>
                    <p className="italic text-sm font-bold text-red-500 font-inter-extralight dark:text-white mt-7 mb-1 ">Maks Tenor pekerjaan: 120</p>
                    <p className="italic text-sm font-bold text-red-500 font-inter-extralight dark:text-white">Jangka waktu melebihi maksimal tenor pekerjaan</p>
                </div>
            </div>
            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{gap: "30px"}}>
                <div style={{ width: "250px" }}>
                    <label className='block mb-3'> Bunga Promo (%) </label>
                    <Input.Text></Input.Text>
                </div>
                <div style={{ width: "250px" }}>
                    <label className='block mb-3'> Jangka Waktu Promo (bulan) </label>
                    <Input.Text></Input.Text>
                </div>
                <div style={{ width: "250px" }}>
                </div>
            </div>
            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{gap: "30px"}}>
                <div style={{ width: "250px" }}>
                    <label className='block mb-3'> Asuransi </label>
                    <MySelect withSearch options={options}/>
                </div>
                <div style={{ width: "250px" }}>
                    <label className='block mb-3'> Rate Asuransi </label>
                    <Input.Text></Input.Text>
                </div>
                <div style={{ width: "250px" }}>
                </div>
            </div>
            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{gap: "30px"}}>
                <div style={{ width: "250px" }}>
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
                <div style={{ width: "250px" }}>
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
                <div style={{ width: "250px" }}>
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
            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{gap: "30px"}}>
                <div style={{ width: "250px" }}>
                    <label className='block mb-3'> Total Penghasilan </label>
                    <Input.Text readOnly></Input.Text>
                </div>
                <div style={{ width: "250px" }}>
                </div>
                <div style={{ width: "250px" }}>
                </div>
            </div>
            <div className='flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7' style={{gap: "30px"}}>
                <div style={{ width: "250px" }}>
                    <label className='block mb-3'> Plafon Kredit yang diberikan </label>
                    <Input.Text></Input.Text>
                </div>
                <div style={{ width: "250px" }}>
                </div>
                <div style={{ width: "250px" }}>
                </div>
            </div>
        </>
    )
};

export default Step1