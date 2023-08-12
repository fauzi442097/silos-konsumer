'use client'

import React, { useState } from "react"
import Input from "@/components/Form/Input"
import MySelect from "@/components/Form/Select"
import Button from "../Button"

const penggunaanData = [
    { value: "Biaya Pendidikan", label: "Biaya Pendidikan" },
    { value: "Biaya Berobat", label: "Biaya Berobat" },
    { value: "Membeli Kendaraan", label: "Membeli Kendaraan" }
];

const asuransiOptions = [
    { value: "PT. BANGUN ASKRIDA", label: "PT. BANGUN ASKRIDA" },
    { value: "PT. JAMKRIDA", label: "PT. JAMKRIDA" }
]

const PencairanKredit = () => {
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
            <div className="flex flex-row justify-left gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> CIF </label>
                    <Input.Number placeholder="Isikan cif" name="cif" id="cif" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Nomor SP3K </label>
                    <Input.Text placeholder="Isikan nomor sp3k" id="noSpppk" name="noSpppk" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Tanggal SP3K </label>
                    <Input.Date placeholder="Isikan tanggal sp3k" id="tanggalSpppk" name="tanggalSpppk" />
                </div>
            </div>

            <div className="flex flex-row justify-left gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Nomor Registrasi PK </label>
                    <Input.Text placeholder="Isikan asuransi" name="noRegistrasiPK" id="noRegistrasiPK" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Tanggal PK </label>
                    <Input.Date placeholder="Isikan tanggal pk" id="tanggalPK" name="tanggalPK" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Nomor Rekening Pencairan </label>
                    <Input.Group
                        append
                        useButton
                        inputElement={<Input.Text name="noRekeningPencairan" id="noRekeningPencairan" placeholder="Isikan nomor rekening pencairan"/>}
                        inputGroupText={<Button className={'rounded-tl-none rounded-bl-none'}> Go! </Button>}
                    />
                </div>
            </div>

            <div className="flex flex-row justify-left gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Nomor Rekening Afiliasi </label>
                    <Input.Number placeholder="Isikan nomor rekening afiliasi" id="noRekeningAfiliasi" name="noRekeningAfiliasi"/>
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Pelunasan Pinjaman </label>
                    <MySelect withSearch placeholder="Isikan pelunasan pinjaman" id="pelunasanPinjaman" name="pelunasanPinjaman" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Tempat Pelunasan </label>
                    <Input.Text placeholder="Isikan tempat pelunasan" id="tempatPelunasan" name="tempatPelunasan" />
                </div>
            </div>
        </>
    )
}

export default PencairanKredit