'use client'

import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { FormRules } from "@/lib/formRules";
import { useMySwal } from "@/hooks/useMySwal";
import { useGetWilayah } from "@/hooks/useRefData";
import useGet from '@/hooks/useGet';
import usePost from "@/hooks/usePost";
import moment from "moment";

import MySelect from "@/components/Form/Select";
import Input from "@/components/Form/Input";
import Button from "@/components/Button";
import Radio from "@/components/Form/Radio";
import Textarea from "@/components/Form/Textarea";
import Checkbox from "@/components/Form/Checkbox";
import ErrorMessageForm from "@/components/Form/ErrorMessageForm";
import LoadingSpinner from "@/components/LoadingSpinner";
import { set } from "lodash";
import { formatTanggalDB } from "@/lib/utils";

const formValidation = {
    produk: { required: FormRules.Required('Pilih produk') },
    nama_debitur: { required: FormRules.Required(), maxLength: FormRules.MaxLength(50), pattern: FormRules.OnlyLetter('Hanya boleh diisi huruf') },
    tempat_lahir: { required: FormRules.Required(), pattern: FormRules.OnlyLetter('Hanya boleh diisi huruf') },
    tanggal_lahir: { required: FormRules.Required() },
    ibu_kandung: { required: FormRules.Required() },
    no_ktp: { required: FormRules.Required(), minLength: FormRules.MinLength(16), maxLength: FormRules.MaxLength(16) },
    status_ktp: { required: FormRules.Required() },
    status_debitur: { required: FormRules.Required() },
    no_handphone: { required: FormRules.Required(), minLength: FormRules.MinLength(11), maxLength: FormRules.MaxLength(13) },
    no_telepon: { minLength: FormRules.MinLength(10), maxLength: FormRules.MaxLength(13) },
    kode_pos: { minLength: FormRules.MinLength(5) },
    no_kk: { required: FormRules.Required(), minLength: FormRules.MinLength(16), maxLength: FormRules.MaxLength(16) },
    alamat_ktp: { required: FormRules.Required() },
    alamat_domisili: { required: FormRules.Required() },
    wilayah_debitur: { required: FormRules.Required() },
}

const statusKTP = [
    { value: false, label: "Expired" },
    { value: true, label: "Seumur Hidup" }
];

const useGetProduk = () => {
    const mySwal = useMySwal();
    const getProduk = useGet(['refProdukDebitur'], '/master/list/product', { retry: false, refetchOnWindowFokus: false });
    let arrProduk = [];
    if (getProduk.isSuccess) {
        let dataProduk = getProduk.data?.data.data;
        dataProduk.map((item) => {
            return arrProduk.push({ value: item.id, label: item.prodName })
        })
    }

    useEffect(() => {
        if (getProduk.isError) mySwal.error(getProduk.error)
    }, [getProduk.isError]);

    return { arrProduk, getProduk }
}

const useGetMenikah = () => {
    const mySwal = useMySwal();
    const getMenikah = useGet(['refStatusMenikah'], '/master/list/status-kawin', { retry: false, refetchOnWindowFokus: false });
    let arrMenikah = [];
    if (getMenikah.isSuccess) {
        let dataMenikah = getMenikah.data?.data.data;
        dataMenikah.map((item) => {
            return arrMenikah.push({ value: item.idStatusKawin, label: item.nmStatusKawin })
        })
    }

    useEffect(() => {
        if (getMenikah.isError) mySwal.error(getMenikah.error);
    }, [getMenikah.isError]);

    return { arrMenikah, getMenikah }
}

const usePostInquiryKtp = (mySwal, setValue) => {
    return usePost(['inquiry-by-tanggallahir'], '/cbs/inquiry/cif-criteria/cifidnbr?page=0&size=30', [], {
        refetchOnWindowFocus: false,
        retry: false,
        onError: (error, variables, context) => {
            mySwal.warning('Terjadi kesalahan !')
        },
        onSuccess: (data, variables, context) => {
            setValue('nama_debitur', data.data.data[0].fullnm);
            setValue('tempat_lahir', data.data.data[0].brtplace);
            setValue('tanggal_lahir', data.data.data[0].brtdt);
            setValue('status_ktp', data.data.data[0].marriageid === 1 ? true : false);
            setValue('ibu_kandung', data.data.data[0].mothrnm);
            setValue('alamat_ktp', data.data.data[0].addr + ' RT. ' + data.data.data[0].rt + ' RW. ' + data.data.data[0].rw);
            setValue('alamat_domisili', data.data.data[0].addr + ' RT. ' + data.data.data[0].rt + ' RW. ' + data.data.data[0].rw);
            setValue('npwp', data.data.data[0].npwp);
            setValue('kode_pos', data.data.data[0].postalcode);
        }
    })
}

const FormNasabah = ({ data, stateNasabah, register, errors, control, setValue, getValues }) => {

    const mySwal = useMySwal();
    const minAge = moment().subtract(21, 'years');
    const { arrProduk, getProduk } = useGetProduk();
    const { arrMenikah, getMenikah } = useGetMenikah();
    const { arrWilayah, getWilayah } = useGetWilayah();

    const [statKtp, setStatKtp] = useState(false);
    const [alamatDomisili, setAlamatDomisili] = useState(null);

    const [tglExpKtp, setTglExpKtp] = useState(undefined);
    const [tanggalLahir, setTanggalLahir] = useState(undefined);

    const [dataWilayah, setDataWilayah] = useState([]);
    const [wilayah, setWilayah] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const [selectedOption, setSelectedOption] = useState("");

    const hitInquiryKtp = usePostInquiryKtp(mySwal, setValue);

    let dataNasabah = data ? data.data.data : data;

    const handleInquiryKtp = () => {
        const bodyInqKtp = {
            ktp: getValues('no_ktp')
        };

        hitInquiryKtp.mutate(bodyInqKtp);
    }

    const handleChange = async (e, type, onChange) => {
        let value = e.value;

        switch (type) {
            case 'produk':
                onChange(value);
                let produkSelected = arrProduk.find((item, i) => item.value === value);
                stateNasabah.setProduk(produkSelected);

                break;
            case 'tglLahir':
                onChange(e.startDate);
                setTanggalLahir(e);
                stateNasabah.setTglLahir(e);

                break;
            case 'status_ktp':
                onChange(value);
                let ktpSelected = statusKTP.find((item, i) => item.value === value);
                setStatKtp(ktpSelected);

                break;
            case 'tglExpKTP':
                onChange(e.startDate);
                setTglExpKtp(e);

                break;
            case 'statusDebitur':
                onChange(value);
                let menikahSelected = arrMenikah.find((item, i) => item.value === value);
                stateNasabah.setStatusMenikah(menikahSelected);

                break;
            default:
                break;
        }
    }

    function onValueChange(event) {
        setSelectedOption(event.target.value);
        stateNasabah.setJenisKelamin(event.target.value);
    }

    const handleWilayah = (text) => {
        let matches = [];
        
        if (text.length > 0) {
            matches = dataWilayah.filter(dataWilayah => {
                const regex = new RegExp(`${text}`, 'gi')
                return dataWilayah.label.match(regex);
            })
        }

        setSuggestions(matches);
        setWilayah(text);
    }

    const onSuggestHandler = (item) => {
        setWilayah(item.label);
        stateNasabah.setIdWilayah(item.value);
        setSuggestions([]);
    }

    const setDomisili = (alamatKtp) => {
        setValue('alamat_domisili', alamatKtp);
        setAlamatDomisili(alamatKtp);
    }
    
    useEffect(() => {
        setDataWilayah(arrWilayah);

        if (dataNasabah) {
            let labelStatusKtp = '';
            if (dataNasabah[0].nasabah.is_lifetime === true) {
                labelStatusKtp = "Seumur Hidup";
            } else {
                labelStatusKtp = "Expired";
            }

            setValue('produk', { value: dataNasabah[0].product.id, label: dataNasabah[0].product.prod_name }, { shouldDirty: true, shouldValidate: true, shouldTouched: true });
            setValue('nama_debitur', dataNasabah[0].nasabah.nama_nasabah, { shouldDirty: true, shouldValidate: true, shouldTouched: true });
            setSelectedOption(dataNasabah[0].nasabah.jns_kelamin);
            stateNasabah.setJenisKelamin(dataNasabah[0].nasabah.jns_kelamin);
            setValue('no_ktp', dataNasabah[0].nasabah.no_identitas, { shouldDirty: true, shouldValidate: true, shouldTouched: true });
            setValue('no_kk', dataNasabah[0].nasabah.no_kk, { shouldDirty: true, shouldValidate: true, shouldTouched: true });
            setValue('npwp', dataNasabah[0].nasabah.npwp, { shouldDirty: true, shouldValidate: true, shouldTouched: true });
            setValue('status_ktp', { value: dataNasabah[0].nasabah.is_lifetime, label: labelStatusKtp }, { shouldDirty: true, shouldValidate: true, shouldTouched: true });
            setValue('status_debitur', { value: dataNasabah[0].nasabah.status_kawin.id_status_kawin, label: dataNasabah[0].nasabah.status_kawin.nm_status_kawin }, { shouldDirty: true, shouldValidate: true, shouldTouched: true } )

            let valueTglLahir = { startDate: dataNasabah[0].nasabah.tgl_lahir, endDate: dataNasabah[0].nasabah.tgl_lahir };
            setValue('tempat_lahir', dataNasabah[0].nasabah.tpt_lahir, { shouldDirty: true, shouldValidate: true, shouldTouched: true });
            setValue('tanggal_lahir', valueTglLahir, { shouldDirty: true, shouldValidate: true, shouldTouched: true });
            setValue('ibu_kandung', dataNasabah[0].nasabah.sid_ngik, { shouldDirty: true, shouldValidate: true, shouldTouched: true });
            setValue('no_handphone', dataNasabah[0].nasabah.no_hp, { shouldDirty: true, shouldValidate: true, shouldTouched: true });
            setValue('no_telepon', dataNasabah[0].nasabah.telp, { shouldDirty: true, shouldValidate: true, shouldTouched: true });
            setValue('alamat_ktp', dataNasabah[0].nasabah.alamat, { shouldDirty: true, shouldValidate: true, shouldTouched: true });
            setValue('alamat_domisili', dataNasabah[0].nasabah.alamat_domisili, { shouldDirty: true, shouldValidate: true, shouldTouched: true });
            setValue('kode_pos', dataNasabah[0].nasabah.kode_pos, { shouldDirty: true, shouldValidate: true, shouldTouched: true });
            
            setValue('wilayah_debitur', dataNasabah[0].nasabah.wilayah_nasabah.wilayah, { shouldDirty: true, shouldValidate: true, shouldTouched: true });
            stateNasabah.setIdWilayah(dataNasabah[0].nasabah.wilayah_nasabah.id);

            stateNasabah.setTglLahir(valueTglLahir);
            stateNasabah.setStatusMenikah({ value: dataNasabah[0].nasabah.status_kawin.id_status_kawin, label: dataNasabah[0].nasabah.status_kawin.nm_status_kawin });
        }
    }, [dataNasabah]);

    return (
        <>
            <p className="text-xl text-muted font-inter-medium mb-8 mt-6"> Data Debitur </p>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Produk </label>
                    <Controller
                        control={control}
                        name="produk"
                        id="produk"
                        render={({ field: { value } }) => (
                            <MySelect
                                withSearch
                                placeholder="Pilih produk"
                                id="produk"
                                name='produk'
                                register={register}
                                errors={errors.produk}
                                validation={formValidation.produk}
                                options={arrProduk}
                                value={value}
                                isLoading={getProduk.isLoading}
                                disabled={getProduk.isLoading}
                                onChange={(value) => setValue('produk', value, { shouldDirty: true, shouldValidate: true, shouldTouched: true })}
                            />
                        )}
                    />
                </div>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Nama Debitur </label>
                    <Controller
                        control={control}
                        name="nama_debitur"
                        id="nama_debitur"
                        render={({ field: { value } }) => (
                            <Input.Text
                                maxLength={50}
                                placeholder="Isikan nama debitur"
                                id="nama_debitur"
                                name="nama_debitur"
                                value={value}
                                register={register}
                                errors={errors.nama_debitur}
                                validation={formValidation.nama_debitur}
                            />
                        )}
                    />
                    
                </div>
                <div className="mt-10" style={{ width: "325px" }}>
                    <div className='flex gap-2'>
                        <Radio label="Laki - laki" name="jenis_kelamin" id="jenis_kelamin" value={0} className="mr-3" onChange={onValueChange} checked={selectedOption === 0} />
                        <Radio label="Perempuan" name="jenis_kelamin" id="jenis_kelamin" value={1} className="mr-3" onChange={onValueChange} checked={selectedOption === 1} />
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Nomor KTP </label>
                    <Controller
                        control={control}
                        name="no_ktp"
                        id="no_ktp"
                        render={({ field: { value } }) => (
                            <Input.Group
                                append
                                useButton
                                inputElement={<Input.Number
                                    minLength={16}
                                    maxLength={16}
                                    name='no_ktp'
                                    id="no_ktp"
                                    placeholder='Isikan nomor KTP'
                                    value={value}
                                    register={register}
                                    validation={formValidation.no_ktp}
                                />}
                                inputGroupText={<Button
                                    className={'rounded-tl-none rounded-bl-none'}
                                    onClick={handleInquiryKtp} >
                                    {(hitInquiryKtp.isLoading) && <LoadingSpinner />}
                                    {(hitInquiryKtp.isLoading) ? 'Processing' : 'Inquiry'}
                                </Button>}
                            />
                        )} 
                    />
                    
                    {errors.no_ktp && <ErrorMessageForm>{errors.no_ktp.message}</ErrorMessageForm>}
                </div>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Status KTP </label>
                    <Controller
                        control={control}
                        name="status_ktp"
                        id="status_ktp"
                        render={({ field: { value } }) => (
                            <MySelect
                                withSearch
                                placeholder="Pilih status KTP"
                                name="status_ktp"
                                id="status_ktp"
                                options={statusKTP}
                                value={value}
                                register={register}
                                errors={errors.status_ktp}
                                validation={formValidation.status_ktp}
                                onChange={(e) => setValue('status_ktp', e)}
                            />
                        )}
                    />
                </div>
                {
                    statKtp.value === false ?
                        <div style={{ width: "325px" }}>
                            <label className='block mb-3'> Tanggal Expired KTP </label>
                            <Controller
                                control={control}
                                name="tanggal_expired_ktp"
                                id="tanggal_expired_ktp"
                                render={({ field: { onChange } }) => (
                                    <Input.Date
                                        placeholder="Isikan tanggal expired KTP"
                                        id="tanggal_expired_ktp"
                                        name="tanggal_expired_ktp"
                                        value={tglExpKtp}
                                        onChange={(e) => handleChange(e, 'tglExpKTP', onChange)}
                                    />
                                )} />
                        </div>
                        :
                        <div style={{ width: "325px" }}>

                        </div>
                }
            </div>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> Nomor Kartu Keluarga </label>
                    <Controller
                        control={control}
                        name="no_kk"
                        id="no_kk"
                        render={({ field: { value } }) => (
                            <Input.Number
                                minLength={16}
                                maxLength={16}
                                name='no_kk'
                                id="no_kk"
                                placeholder='Isikan nomor Kartu Keluarga'
                                register={register}
                                errors={errors.no_kk}
                                validation={formValidation.no_kk}
                                onChange={(e) => setValue('no_kk', e)}
                            />
                        )} 
                    />
                </div>
                <div style={{ width: "325px" }}>
                    <label className='block mb-3'> NPWP </label>
                    <Controller
                        control={control}
                        name="npwp"
                        id="npwp"
                        render={({ field: { value } }) => (
                            <Input.Number
                                name='npwp'
                                id="npwp"
                                placeholder='Isikan nomor Kartu Keluarga'
                                register={register}
                                value={value}
                            />
                        )} 
                    />
                    
                </div>
            </div>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className="block mb-3">Tempat Lahir</label>
                    <Controller
                        control={control}
                        name="tempat_lahir"
                        id="tempat_lahir"
                        render={({ field: { value } }) => (
                            <Input.Text
                                placeholder="Isikan tempat lahir"
                                id="tempat_lahir"
                                name="tempat_lahir"
                                value={value}
                                register={register}
                                errors={errors.tempat_lahir}
                                validation={formValidation.tempat_lahir} 
                            />
                        )} 
                    />
                    
                </div>
                <div style={{ width: "325px" }}>
                    <label className="block mb-3">Tanggal Lahir</label>
                    <Controller
                        control={control}
                        name="tanggal_lahir"
                        id="tanggal_lahir"
                        render={({ field: { value } }) => (
                            <Input.Date
                                placeholder="Isikan tanggal lahir"
                                id="tanggal_lahir"
                                name="tanggal_lahir"
                                maxDate={minAge}
                                startFrom={minAge}
                                register={register}
                                errors={errors.tanggal_lahir}
                                value={value}
                                validation={formValidation.tanggal_lahir}
                                onChange={(e) => setValue('tanggal_lahir', e)} 
                            />
                        )}
                    />
                </div>
                <div style={{ width: "325px" }}>
                    <label className="block mb-3">Nama Ibu Kandung</label>
                    <Controller
                        control={control}
                        name="ibu_kandung"
                        id="ibu_kandung"
                        render={({ field: { value } }) => (
                            <Input.Text
                                placeholder="Isikan nama ibu kandung"
                                id="ibu_kandung"
                                name="ibu_kandung"
                                value={value}
                                register={register}
                                errors={errors.ibu_kandung}
                                validation={formValidation.ibu_kandung}
                            />
                        )} 
                    />
                </div>
            </div>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className="block mb-3">Status Debitur</label>
                    <Controller
                        control={control}
                        name="status_debitur"
                        id="status_debitur"
                        render={({ field: { value } }) => (
                            <MySelect
                                withSearch
                                placeholder="Isikan status debitur"
                                id="status_debitur"
                                name="status_debitur"
                                value={value}
                                options={arrMenikah}
                                register={register}
                                errors={errors.status_debitur}
                                isLoading={getMenikah.isLoading}
                                disabled={getMenikah.isLoading}
                                validation={formValidation.status_debitur}
                                // onChange={(e) => handleChange(e, 'statusDebitur', onChange)} 
                                onChange={(value) => setValue('status_debitur', value, { shouldDirty: true, shouldValidate: true, shouldTouched: true })}
                            />
                        )}
                    />
                </div>
                <div style={{ width: "325px" }}>
                    <label className="block mb-3">Nomor Handphone</label>
                    <Controller
                        control={control}
                        name="no_handphone"
                        id="no_handphone"
                        render={({ field: { value } }) => (
                            <Input.Number
                                minLength={11}
                                maxLength={13}
                                placeholder="Isikan nomor handphone"
                                id="no_handphone"
                                name="no_handphone"
                                value={value}
                                register={register}
                                errors={errors.no_handphone}
                                validation={formValidation.no_handphone}
                            />
                        )} 
                    />
                </div>
                <div style={{ width: "325px" }}>
                    <label className="block mb-3">Nomor Telepon</label>
                    <Controller
                        control={control}
                        name="no_telepon"
                        id="no_telepon"
                        render={({ field: { value } }) => (
                            <Input.Number
                                minLength={11}
                                maxLength={13}
                                placeholder="Isikan nomor telepon"
                                id="no_telepon"
                                name="no_telepon"
                                value={value}
                                register={register}
                                errors={errors.no_telepon}
                                validation={formValidation.no_telepon} 
                            />
                        )} 
                    />
                </div>
            </div>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "325px" }}>
                    <label className="block mb-3">Alamat Sesuai KTP</label>
                    <Controller
                        control={control}
                        name="alamat_ktp"
                        id="alamat_ktp"
                        render={({ field: { value } }) => (
                            <Textarea
                                placeholder="Isikan alamat sesuai KTP"
                                id="alamat_ktp"
                                name="alamat_ktp"
                                value={value}
                                register={register}
                                errors={errors.alamat_ktp}
                                validation={formValidation.alamat_ktp}
                            />
                        )}
                    />
                </div>
                <div style={{ width: "325px" }}>
                    <label className="block mb-3">Alamat Domisili</label>
                    <Controller
                        control={control}
                        name="alamat_domisili"
                        id="alamat_domisili"
                        render={({ field: { value } }) => (
                            <Textarea
                                placeholder="Isikan alamat domisili"
                                id="alamat_domisili"
                                name="alamat_domisili"
                                value={value}
                                register={register}
                                errors={errors.alamat_domisili}
                                validation={formValidation.alamat_domisili}
                            />
                        )}
                    />
                    <Checkbox
                        label={'Klik jika alamat sama dengan KTP'}
                        name={'domisili'}
                        id="domisili"
                        onChange={() => setDomisili(alamat_ktp.value)}
                    />
                </div>
                <div style={{ width: "325px" }}>
                    <label className="block mb-3">Kode POS</label>
                    <Controller
                        control={control}
                        name="kode_pos"
                        id="kode_pos"
                        render={({ field: { value } }) => (
                            <Input.Number
                                minLength={5}
                                placeholder="Isikan nomor telepon"
                                id="kode_pos"
                                name="kode_pos"
                                value={value}
                                register={register}
                                errors={errors.kode_pos}
                                validation={formValidation.kode_pos}
                            />
                        )}
                    />
                </div>
            </div>

            <div className="flex flex-row justify-start gap-4 w-full md:flex-nowrap flex-wrap my-4 mb-7" style={{ gap: "30px" }}>
                <div style={{ width: "685px" }}>
                    <label className="block mb-3">Cari Kelurahan Debitur</label>
                    <Controller
                        control={control}
                        name="wilayah_debitur"
                        id="wilayah_debitur"
                        render={({ field: { value } }) => (
                            <Input.Text
                                placeholder="Isikan cari kelurahan debitur"
                                id="wilayah_debitur"
                                name="wilayah_debitur"
                                value={wilayah ? wilayah : value}
                                register={register}
                                errors={errors.wilayah_debitur}
                                validation={formValidation.wilayah_debitur}
                                onChange={e => {handleWilayah(e.target.value), setValue('wilayah_debitur', e.target.value)}} 
                                // onChange={e => setValue('wilayah_debitur', e.target.value)} 
                            />
                        )} 
                    />
                    {suggestions && suggestions.map((item, i) =>
                        <div key={i}
                            className="form-control-auto bg-slate-50 block transition duration-200 px-2 py-2 cursor-pointer my-2 truncate rounded-lg"
                            onClick={() => onSuggestHandler(item)}>
                            {item.label}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default FormNasabah