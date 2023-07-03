'use client'

import React, { useState } from "react"
import MySelect from "@/components/Form/Select"
import Input from "@/components/Form/Input"
import Button from "@/components/Button";
import Radio from "@/components/Form/Radio";

const options = [
    { value: "fox", label: "Fox" },
    { value: "Butterfly", label: "Butterfly" },
    { value: "Honeybee", label: "Honeybee" }
];

const statusKTP = [
    { value: "1", label: "Expired" },
    { value: "2", label: "Seumur Hidup" }
];

const statusMenikah = [
    { value: "1", label: "Belum Menikah" },
    { value: "2", label: "Menikah" },
    { value: "3", label: "Duda / Janda" }
]

const dataNasabah = () => {
    const [statKTP, setStatKTP] = useState(null);
    const [produk, setProduk] = useState(null);
    const [menikah, setMenikah] = useState(null);

    const handleChangeKTP = value => {
        setStatKTP(value);
    };

    const handleChangeProduk = value => {
        setProduk(value);
    }

    const handleChangeMenikah = value => {
        setMenikah(value);
    }

    return (
        <>
            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "250px" }}>
                    <label className='block mb-3'> Produk </label>
                    <MySelect withSearch options={options} value={produk} onChange={handleChangeProduk} />
                </div>
                <div style={{ width: "250px" }}>
                    <label className='block mb-3'> Nama Nasabah </label>
                    <Input.Text />
                </div>
                <div style={{ width: "250px" }}>
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "250px" }}>
                    <label className='block mb-3'> Nomor KTP </label>
                    <Input.Text />
                    <Button
                        className="bg-blue-700 w-[100px] px-15 py-2 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-5 mt-1"
                    >Inquiry KTP</Button>
                </div>
                <div style={{ width: "250px" }}>
                    <label className='block mb-3'> Status KTP </label>
                    <MySelect withSearch options={statusKTP} value={statKTP} onChange={handleChangeKTP}></MySelect>
                </div>
                <div style={{ width: "250px" }}>
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "250px" }}>
                    <div className='flex gap-2'>
                        <Radio label="Laki - laki" name="jenisKelamin" value="laki" />
                        <Radio label="Perempuan" name="jenisKelamin" value="perempuan" className="mr-3" />
                    </div>
                </div>
                <div style={{ width: "250px" }}>
                    <label className="block mb-3">Tempat Lahir</label>
                    <Input.Text />
                </div>
                <div style={{ width: "250px" }}>
                    <label className="block mb-3">Tanggal Lahir</label>
                    <Input.Date/>
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "250px" }}>
                    <label className="block mb-3">Nomor Handphone</label>
                    <Input.Number/>
                </div>
                <div style={{ width: "250px" }}>
                    <label className="block mb-3">Nomor Telepon</label>
                    <Input.Number />
                </div>
                <div style={{ width: "250px" }}>
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "250px" }}>
                    <label className="block mb-3">Nama Ibu Kandung</label>
                    <Input.Text/>
                </div>
                <div style={{ width: "250px" }}>
                    <label className="block mb-3">Status Menikah</label>
                    <MySelect withSearch value={menikah} onChange={handleChangeMenikah} options={statusMenikah}></MySelect>
                </div>
                <div style={{ width: "250px" }}>
                </div>
            </div>


        </>
    )
}

export default dataNasabah