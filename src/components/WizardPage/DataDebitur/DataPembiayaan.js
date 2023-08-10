'use client'

import React, { useState } from "react"
import Input from "@/components/Form/Input"
import MySelect from "@/components/Form/Select"
import TabAction from "../../TabAction"

const penggunaanData = [
    { value: "Biaya Pendidikan", label: "Biaya Pendidikan" },
    { value: "Biaya Berobat", label: "Biaya Berobat" },
    { value: "Membeli Kendaraan", label: "Membeli Kendaraan" }
];

const asuransiOptions = [
    { value: "PT. BANGUN ASKRIDA", label: "PT. BANGUN ASKRIDA" },
    { value: "PT. JAMKRIDA", label: "PT. JAMKRIDA" }
]

const DataPembiayaan = ({onSubmit}) => {
    const [penggunaan, setPenggunaan] = useState(null);
    const [asuransi, setAsuransi] = useState(null);

    const handlePenggunaan = value => {
        setPenggunaan(value);
    }

    const handleAsuransi = value => {
        setAsuransi(value);
    }

    return (
        <>
            <div className="mt-20">
                <strong className="text-3xl text-primary font-sans">Data Pembiayaan</strong>
                <hr class="h-px my-8 bg-gray-400 border-0 dark:bg-gray-700"></hr>
            </div>

            <div className="flex flex-row justify-left gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Tujuan Penggunaan Dana </label>
                    <MySelect withSearch placeholder="Isikan tujuan penggunaan dana" name="penggunaanDana" id="penggunaanDana" options={penggunaanData} value={penggunaan} onChange={handlePenggunaan} />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Plafon </label>
                    <Input.Currency placeholder="Isikan plafon" id="plafon" name="plafon" />
                </div>
                <div style={{ width: "450px" }}>
                </div>
            </div>

            <div className="flex flex-row justify-left gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Asuransi </label>
                    <MySelect withSearch placeholder="Isikan asuransi" name="asuransi" id="asuransi" options={asuransiOptions} value={asuransi} onChange={handleAsuransi} />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Rate Asuransi </label>
                    <Input.Currency
                        placeholder="Isikan rate asuransi"
                        id="rateAsuransi"
                        name="rateAsuransi"
                        allowDecimals={true}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        onChange={(value, name) => console.log(value, name)} />
                </div>
                <div style={{ width: "450px" }}>
                </div>
            </div>

            <div className="flex flex-row justify-left gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Suku Bunga (%) </label>
                    <Input.Currency
                        placeholder="Isikan suku bunga"
                        id="sukuBunga"
                        name="sukuBunga"
                        allowDecimals={true}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        onChange={(value, name) => console.log(value, name)} />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Jangka Waktu (Bulan) </label>
                    <Input.Currency
                        placeholder="Isikan jangka waktu"
                        id="jangkaWaktu"
                        name="jangkaWaktu"
                        allowDecimals={true}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        onChange={(value, name) => console.log(value, name)} />
                </div>
                <div style={{ width: "450px" }}>
                </div>
            </div>
            <div className="flex flex-row justify-left gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Suku Bunga Promo (%) </label>
                    <Input.Currency
                        placeholder="Isikan suku bunga promo"
                        id="sukuBungaPromo"
                        name="sukuBungaPromo"
                        allowDecimals={true}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        onChange={(value, name) => console.log(value, name)} />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Jangka Waktu Promo (Bulan) </label>
                    <Input.Currency
                        placeholder="Isikan jangka waktu promo"
                        id="jangkaWaktuPromo"
                        name="jangkaWaktuPromo"
                        allowDecimals={true}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        onChange={(value, name) => console.log(value, name)} />
                </div>
                <div style={{ width: "450px" }}>
                </div>
            </div>

            <div className="flex flex-row justify-left gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Angsuran Promo / Bulan </label>
                    <Input.Currency
                        placeholder="Isikan angsuran"
                        id="angsuran"
                        name="angsuran"
                        allowDecimals={true}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        onChange={(value, name) => console.log(value, name)} />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Angsuran Normal Setelah Promo / Bulan </label>
                    <Input.Currency
                        placeholder="Isikan angsuran setelah promo"
                        id="angsuranSetelahPromo"
                        name="angsuranSetelahPromo"
                        allowDecimals={true}
                        decimalSeparator={','}
                        groupSeparator={'.'}
                        onChange={(value, name) => console.log(value, name)} />
                </div>
                <div style={{ width: "450px" }}>
                </div>

            </div>

        </>
    )
}

export default DataPembiayaan