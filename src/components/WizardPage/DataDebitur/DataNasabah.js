'use client'

import React, { useState } from "react"
import MySelect from "@/components/Form/Select"
import Input from "@/components/Form/Input"
import Button from "@/components/Button";
import Radio from "@/components/Form/Radio";
import Textarea from "@/components/Form/Textarea";
import Checkbox from "@/components/Form/Checkbox";
import { formDataNasabahSchema } from "../../formValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


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

const DataNasabah = ({ onSubmit }) => {
    const [statKTP, setStatKTP] = useState(null);
    const [produk, setProduk] = useState(null);
    const [menikah, setMenikah] = useState(null);

    const [dataNikah, setDataNikah] = useState([]);
    // const [menikah, setMenikah] = useState(null);

    const { register, control, handleSubmit, reset, watch, formState: { errors }  } = useForm({
        resolver: yupResolver(formDataNasabahSchema),
        mode: 'all'
    });
    
    const handleChangeKTP = value => {
        setStatKTP(value);
    };

    const handleChangeProduk = value => {
        setProduk(value);
    }

    const handleChangeMenikah = value => {
        setMenikah(value);
    }

    const storeDataNasabah = (data) => {
        console.log(data)
        onSubmit()
    }

    // const getMenikah = async () => {
    //     const arrMenikah = [];
    //     const response = await API.GET(`/master/list/status-kawin`);

    //     let getDataMenikah = response.data.data;
    //     getDataMenikah.map((item) => {
    //         return arrMenikah.push({ value: item.idPekerjaan, label: item.nmPekerjaan })
    //     })

    //     setDataNikah(arrMenikah);
    // }

    // const handleChangeMenikah = value => {
    //     setMenikah(value);
    // };

    // useEffect(() => {
    //     getMenikah();
    // }, []);

    return (
        <>
            <p className="text-xl text-muted font-inter-medium mb-8 mt-6"> Data Debitur </p>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Produk </label>
                    <MySelect withSearch placeholder="Isikan produk" name="produk" id="produk" options={options} value={produk} onChange={handleChangeProduk} />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Nama Nasabah </label>
                    <Input.Text register={register}
                        errors={errors.namaNasabah}
                        maxLength={50}
                        placeholder="Isikan nama nasabah" id="namaNasabah" name="namaNasabah" />
                </div>
                <div className="mt-10" style={{ width: "450px" }}>
                    <div className='flex gap-2'>
                        <Radio label="Laki - laki" name="jenisKelamin" value="laki" />
                        <Radio label="Perempuan" name="jenisKelamin" value="perempuan" className="mr-3" />
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className="block mb-3">Tempat Lahir</label>
                    <Input.Text placeholder="Isikan tempat lahir" id="tempatLahir" name="tempatLahir" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className="block mb-3">Tanggal Lahir</label>
                    <Input.Date placeholder="Isikan tanggal lahir" id="tanggalLahir" name="tanggalLahir" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className="block mb-3">Nama Ibu Kandung</label>
                    <Input.Text placeholder="Isikan nama ibu kandung" id="ibuKandung" name="ibuKandung" />
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Nomor KTP </label>
                    <Input.Group
                        append
                        useButton
                        inputElement={<Input.Text name='noKTP' placeholder='Isikan nomor KTP' />}
                        inputGroupText={<Button className={'rounded-tl-none rounded-bl-none'}> Inquiry </Button>}
                    />
                </div>
                <div style={{ width: "450px" }}>
                    <label className='block mb-3'> Status KTP </label>
                    <MySelect withSearch placeholder="Isikan status KTP" name="statusKTP" id="statusKtp" options={statusKTP} value={statKTP} onChange={handleChangeKTP}></MySelect>
                </div>
                <div style={{ width: "450px" }}>
                    <label className="block mb-3">Status Menikah</label>
                    <MySelect withSearch placeholder="Isikan Status Menikah" id="statusMenikah" name="statusMenikah" value={menikah} onChange={handleChangeMenikah} options={statusMenikah}></MySelect>
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className="block mb-3">Nomor Handphone</label>
                    <Input.Number placeholder="Isikan nomor handphone" id="noHandphone" name="noHandphone" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className="block mb-3">Nomor Telepon</label>
                    <Input.Number placeholder="Isikan nomor telepon" id="noTelepon" name="noTelepon" />
                </div>
                <div style={{ width: "450px" }}>
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "450px" }}>
                    <label className="block mb-3">Alamat Sesuai KTP</label>
                    <Textarea placeholder="Isikan alamat sesuai KTP" id="alamatKTP" name="alamatKTP" />
                </div>
                <div style={{ width: "450px" }}>
                    <label className="block mb-3">Alamat Domisili</label>
                    <Textarea placeholder="Isikan alamat domisili" id="alamatDomisili" name="alamatDomisili" />
                    <Checkbox label={'Klik jika alamat sama dengan KTP'} name={'domisili'} id="domisili" />
                </div>
                <div style={{ width: "450px" }}>
                </div>
            </div>

            <div className="flex flex-row justify-center gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "950px" }}>
                    <label className="block mb-3">Cari Kelurahan Nasabah</label>
                    <Textarea placeholder="Isikan cari kelurahan nasabah" id="wilayahNasabah" name="wilayahNasabah" />
                </div>
                <div style={{ width: "450px" }}>
                </div>
            </div>
        </>
    )
}

export default DataNasabah