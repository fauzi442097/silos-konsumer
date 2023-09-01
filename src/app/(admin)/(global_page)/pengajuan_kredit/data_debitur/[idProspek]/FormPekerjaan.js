'use client'

import React, { useEffect, useState } from "react"
import { Controller } from "react-hook-form";
import { FormRules } from "@/lib/formRules";
import { useMySwal } from "@/hooks/useMySwal";
import { useGetWilayah } from "@/hooks/useRefData";
import useGet from '@/hooks/useGet';

import MySelect from "@/components/Form/Select"
import Input from "@/components/Form/Input"
import Textarea from "@/components/Form/Textarea"
import { isError } from "lodash";

const formValidation = {
    sumber_pendapatan: { required: FormRules.Required() },
    pekerjaan: { required: FormRules.Required() },
    nama_kantor: { required: FormRules.Required() },
    jabatan: { required: FormRules.Required() },
    alamat_kantor: { required: FormRules.Required() },
    wilayah_kantor: { required: FormRules.Required() },
    pendapatan_bulanan: { required: FormRules.Required(), maxLength: FormRules.MaxLength(12) }
}

const FormPekerjaan = ({ data, statePekerjaan, register, errors, control, setValue, getValue }) => {

    const useGetPekerjaan = () => {
        let idProduk = statePekerjaan.produk ? statePekerjaan.produk.value : 0;
        const mySwal = useMySwal();
        const getPekerjaan = useGet(['refDataPekerjaan', idProduk], `master/list/pekerjaan?idProduct=${idProduk}`, { retry: false, refetchOnWindowFokus: false, enable: idProduk !== null })
        let arrPekerjaan = [];

        if (getPekerjaan.isSuccess) {
            let dataPekerjaan = getPekerjaan.data?.data.data;
            dataPekerjaan.map((item) => {
                return arrPekerjaan.push({ value: item.idPekerjaan, label: item.nmPekerjaan })
            })
        }

        useEffect(() => {
            if (getPekerjaan.isError) mySwal.error(getPekerjaan.error);
        }, [getPekerjaan, isError]);

        return { arrPekerjaan, getPekerjaan };
    }

    const useGetSumberPendapatan = () => {
        let idProduk = statePekerjaan.produk ? statePekerjaan.produk.value : 0;
        const mySwal = useMySwal();
        const getSumberPendapatan = useGet(['refSumberPendapatan', idProduk], `/master/list/pendapatan?idProduct=${idProduk}`, { retry: false, refetchOnWindowFokus: false, enable: idProduk !== null })
        let arrSumberPendapatan = [];
        if (getSumberPendapatan.isSuccess) {
            let dataSumberPendapatan = getSumberPendapatan.data?.data.data;
            dataSumberPendapatan.map((item) => {
                return arrSumberPendapatan.push({ label: item.idSumber, label: item.keterangan })
            })
        }

        useEffect(() => {
            if (getSumberPendapatan.isError) mySwal.error(getSumberPendapatan.error);
        }, [getSumberPendapatan.isError]);

        return { arrSumberPendapatan, getSumberPendapatan };
    }

    const { arrSumberPendapatan, getSumberPendapatan } = useGetSumberPendapatan();
    const { arrPekerjaan, getPekerjaan } = useGetPekerjaan();
    const { arrWilayah, getWilayah } = useGetWilayah();

    const [pendapatan, setPendapatan] = useState(null);
    const [pekerjaan, setPekerjaan] = useState(null);
    const [gaji, setGaji] = useState(null);
    const [pendapatanLainnya, setPendapatanLainnya] = useState(null);
    const [ulp, setUlp] = useState(null);

    const [dataWilayahKantor, setDataWilayahKantor] = useState([]);
    const [wilayahKantor, setWilayahKantor] = useState('');
    const [suggestionsKantor, setSuggestionsKantor] = useState([]);

    let dataNasabah = data ? data.data.data : data;

    const handleWilayahKantor = (text) => {
        let matches = [];

        if (text.length > 0) {
            matches = dataWilayahKantor.filter(dataWilayahKantor => {
                const regex = new RegExp(`${text}`, "gi")
                return dataWilayahKantor.label.match(regex);
            })
        }

        setSuggestionsKantor(matches);
        setWilayahKantor(text);
    }

    const onSuggestHandlerKantor = (text) => {
        setWilayahKantor(text);
        setSuggestionsKantor([]);
    }

    const handleChange = async (e, type, onChange) => {
        let value = e.value;
        switch (type) {
            case 'changePekerjaan':
                onChange(value);
                let pekerjaan = arrPekerjaan.find((item, i) => item.value === value);
                setPekerjaan(pekerjaan);
                statePekerjaan.setIdPekerjaan(pekerjaan);

                break;
            case 'changeSumberPendapatan':
                onChange(value);
                let sumberPendapatanSelected = arrSumberPendapatan.find((item, i) => item.value === value);
                setPendapatan(sumberPendapatanSelected);

                break;
            default:
                break;
        }
    }

    useEffect(() => {
        setDataWilayahKantor(arrWilayah);
        if (dataNasabah) {
            setPekerjaan({ value: dataNasabah.pekerjaan.idPekerjaan, label: dataNasabah.pekerjaan.nmPekerjaan + ' - Max.Umur (' + dataNasabah.pekerjaan.masaKerjaUmur + ' Tahun)' })
            setGaji(dataNasabah.pendapatanBulan);
            setPendapatanLainnya(dataNasabah.pendapatanLainnya);
            setUlp(dataNasabah.pendapatanLainnya2);
        }
    }, [dataNasabah]);

    return (
        <>
            <hr className="h-px my-4 bg-gray-400 border-0 dark:bg-gray-700"></hr>
            <p className="text-xl text-muted font-inter-medium mb-8 mt-6"> Data Pekerjaan </p>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Pekerjaan </label>
                    <Controller
                        control={control}
                        name="pekerjaan"
                        id="pekerjaan"
                        render={({ field: { onChange } }) => (
                            <MySelect
                                withSearch
                                placeholder="Isikan pekerjaan"
                                name="pekerjaan"
                                id="pekerjaan"
                                options={arrPekerjaan}
                                value={pekerjaan}
                                register={register}
                                errors={errors.pekerjaan}
                                isLoading={getPekerjaan.isLoading}
                                disabled={getPekerjaan.isLoading}
                                validation={formValidation.pekerjaan}
                                onChange={(e) => handleChange(e, 'changePekerjaan', onChange)}
                            />
                        )} />
                </div>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Nama Kantor </label>
                    <Input.Text
                        placeholder="Isikan nama kantor"
                        id="nama_kantor"
                        name="nama_kantor"
                        register={register}
                        errors={errors.nama_kantor}
                        validation={formValidation.nama_kantor}
                    />
                </div>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Nomor Telepon Kantor </label>
                    <Input.Number
                        placeholder="Isikan nomor telepon kantor"
                        id="no_telp_kantor"
                        name="no_telp_kantor" />
                </div>
            </div>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Jabatan </label>
                    <Input.Text
                        placeholder="Isikan jabatan"
                        id="jabatan"
                        name="jabatan"
                        register={register}
                        errors={errors.jabatan}
                        validation={formValidation.jabatan}
                    />
                </div>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Nama Pimpinan </label>
                    <Input.Text
                        placeholder="Isikan nama pimpinan"
                        id="nama_pimpinan"
                        name="nama_pimpinan" />
                </div>
                <div style={{ width: "325px" }}>
                    <label className="block mb-3"> TUK/NRP/NIP/NPP/NOTAS </label>
                    <Input.Text
                        placeholder="Isikan TUK/NRP/NIP/NPP/NOTAS"
                        id="tuk"
                        name="tuk" />
                </div>
            </div>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className="block mb-3">Alamat Kantor</label>
                    <Textarea
                        placeholder="Isikan alamat kantor"
                        id="alamat_kantor"
                        name="alamat_kantor"
                        register={register}
                        errors={errors.alamat_kantor}
                        validation={formValidation.alamat_kantor}
                    />
                </div>
                <div style={{ width: "680px" }}>
                    <label className="block mb-3">Cari Wilayah Kantor</label>
                    <Input.Text
                        placeholder="Isikan cari kelurahan debitur"
                        id="wilayah_kantor"
                        name="wilayah_kantor"
                        value={wilayahKantor}
                        register={register}
                        errors={errors.wilayah_kantor}
                        validation={formValidation.wilayah_kantor}
                        onChange={e => handleWilayahKantor(e.target.value)} />

                    {suggestionsKantor && suggestionsKantor.map((item, i) =>
                        <div key={i}
                            className="form-control-auto bg-slate-50 block transition duration-200 px-2 py-2 cursor-pointer my-2 truncate rounded-lg"
                            onClick={() => onSuggestHandlerKantor(item.label)}>
                            {item.label}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Sumber Pendapatan </label>
                    <Controller
                        control={control}
                        name="sumber_pendapatan"
                        id="sumber_pendapatan"
                        render={({ field: { onChange } }) => (
                            <MySelect
                                withSearch
                                name="sumber_pendapatan"
                                id="sumber_pendapatan"
                                options={arrSumberPendapatan}
                                value={pendapatan}
                                register={register}
                                errors={errors.sumber_pendapatan}
                                validation={formValidation.sumber_pendapatan}
                                isLoading={getSumberPendapatan.isLoading}
                                disabled={getSumberPendapatan.isLoading}
                                onChange={(e) => handleChange(e, 'changeSumberPendapatan', onChange)}
                            />
                        )}
                    />
                </div>
            </div>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Pendapatan Bulanan Pokok </label>
                    <Input.Group
                        inputGroupText={'Rp'}
                        inputElement={
                            <Input.Currency
                                placeholder="Isikan pendapatan bulanan pokok"
                                id="pendapatan_bulanan"
                                name="pendapatan_bulanan"
                                value={gaji}
                                register={register}
                                errors={errors.pendapatan_bulanan}
                                validation={formValidation.pendapatan_bulanan}
                                allowDecimals={false}
                                allowNegativeValue={false}
                                decimalSeparator={','}
                                groupSeparator={'.'}
                                onChange={(value, name) => setGaji(value)}
                            />
                        } 
                    />
                    
                </div>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Penghasilan Lain </label>
                    <Input.Group
                        inputGroupText={'Rp'}
                        inputElement={
                            <Input.Currency
                                placeholder="Isikan penghasilan lain"
                                id="penghasilan_lain"
                                name="penghasilan_lain"
                                value={pendapatanLainnya}
                                defaultValue={dataNasabah?.pendapatanLainnya}
                                register={register}
                                allowDecimals={false}
                                allowNegativeValue={false}
                                decimalSeparator={','}
                                groupSeparator={'.'}
                                onChange={(value, name) => setPendapatanLainnya(value)} 
                            />
                        }
                    />
                </div>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> ULP </label>
                    <Input.Group
                        inputGroupText={'Rp'}
                        inputElement={
                            <Input.Currency
                                placeholder="Isikan ULP"
                                id="ulp"
                                name="ulp"
                                value={ulp}
                                allowDecimals={false}
                                allowNegativeValue={false}
                                decimalSeparator={','}
                                groupSeparator={'.'}
                                onChange={(value, name) => setUlp(value)} />
                        }
                    />

                </div>
            </div>

        </>
    )
}

export default FormPekerjaan