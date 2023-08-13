'use client'

import React, { useState, useEffect, useRef, useMemo } from "react"
import MySelect from "@/components/Form/Select";
import Input from "@/components/Form/Input";
import { API } from "@/config/api";
import MySwal from "@/components/Swal/MySwal";
import { Controller, useForm } from "react-hook-form";
import ModalHasilSimulasi from "../HasilSimulasi/ModalHasilSimulasi";
import ErrorMessageForm from "../Form/ErrorMessageForm";
import Button from "../Button";
import FormGroup from "../Form/FormGroup";
import useGet from "@/hooks/useGet";
import { useMySwal } from "@/hooks/useMySwal";
import { FormRules } from "@/lib/formRules";
import moment from "moment";
import TabAction from "../TabAction";

const options = [
    { value: "fox", label: "Fox" },
    { value: "Butterfly", label: "Butterfly" },
    { value: "Honeybee", label: "Honeybee" }
];


const formValidation = {
    nama_debitur: {maxLength: FormRules.MaxLength(30),  pattern: FormRules.OnlyLetter('Hanya boleh diisi huruf')},
    cif: {maxLength: FormRules.MaxLength(15, 'Maksimal diisi 15 digit Angka')},
    produk: {required: FormRules.Required('Pilih produk')},
    pekerjaan: {required: FormRules.Required('Pilih pekerjaan')},
    jangka_waktu: {required: FormRules.Required()},
    tanggal_lahir: {required: FormRules.Required()},
    bunga_promo: {max: FormRules.MaxNumber(100, 'Maksimal diisi 100')},
    gaji: {required: FormRules.Required(), maxLength: FormRules.MaxLength(11)},
    penghasilan_lain: {maxLength: FormRules.MaxLength(11)},
    ulp: {maxLength: FormRules.MaxLength(11)},
    plafon: {required: FormRules.Required(), maxLength: FormRules.MaxLength(13)},
    status_debitur: {required: FormRules.Required()}
}

const Simulasi = ({ onSubmit }) => {


    const [dataProduk, setDataProduk] = useState([]);
    const [produk, setProduk] = useState(null);

    const [ showModal, setShowModal ] = useState(false)
    const suku_bunga = useRef(null)
    
    const [dataPekerjaan, setDataPekerjaan] = useState([]);
    const [loadingPekerjaan, setLoadingPekerjaan] = useState(false)
    const [pekerjaan, setPekerjaan] = useState(null);

    const [maxTenor, setMaxTenor] = useState(false);

    const [dataMenikah, setDataMenikah] = useState([]);
    const [menikah, setMenikah] = useState(null);

    const [tanggalLahir, setTanggalLahir] = useState(null);

    const { register, control, handleSubmit, formState: { errors }  } = useForm({ mode: "all" });

    const minAge = moment().subtract(17, 'years');

 

    const [ totalPenghasilan, setTotalPenghasilan ] = useState()
    const refGaji = useRef(0)
    const refULP = useRef(0)
    const refPenghasilanLain = useRef(0)
    const refUsia = useRef('')

    const processSimulation = (data) => {
        setShowModal(true)
    }

    const handleChange = (e, type, onChange) => {
        let value = e.value   
        switch (type)  {
            case 'produk': 
                let produkSelected = dataProduk.find((item, i) => item.value == value)
                suku_bunga.current = produkSelected.eqRate
                setProduk(produkSelected)
                getPekerjaan(value);
                onChange(value)
            break;
            case 'pekerjaan' :
                let pekerjaanSelected = dataPekerjaan.find((item, i) => item.value == value)
                setPekerjaan(pekerjaanSelected)
                onChange(value)
            break;
            case 'tglLahir' :
                let tglLahir = e.startDate
                let age = moment().diff(tglLahir, 'years', false);
                refUsia.current = `${age} Tahun`
                setTanggalLahir(e)
                onChange(e.startDate)
            break;
        }
    };

    const id = 4;
    const refAgunan = useGet(['refJenisAgunan', id], `master/list/tipe-agunan/${id}/?idPekerjaan=8`, { retry: 1, refetchOnWindowFocus: false, enabled: id != null });
    const refDataProduk = useGet(['refProduct'], `master/list/product`, { retry: 1, refetchOnWindowFocus: false });
    console.log(refDataProduk.data);
    console.log(refAgunan.data);

    const getProduk = async () => {
        const arr = [];
        const response = await API.GET(`/master/list/product`);
        console.log(response)
        if (response.status != 200) return MySwal.error(response.data.error)
        let result = response.data.data;
        result.map((item) => {
            return arr.push({ 
                value: item.id, 
                label: item.prodName + ' - (Bunga: ' + item.eqRate + '%)',
                eqRate: item.eqRate,
                eqRateReal: item.eqRateReal
            })
        })
        
        setDataProduk(arr)
    }

    const getPekerjaan = async (idProduk) => {
        setLoadingPekerjaan(true)
        const arrPekerjaan = [];
        const response = await API.GET(`master/list/pekerjaan?idProduct=${idProduk}`)
        setLoadingPekerjaan(false)
            
        let getDataPekerjaan = response.data.data;
        getDataPekerjaan.map((item) => {
            return arrPekerjaan.push({ 
                value: item.idPekerjaan, 
                label: item.nmPekerjaan + ' - Max Tenor. ' + item.tenor + ' Bln', 
                tenor: item.tenor, 
                masaKerja: item.masaKerjaUmur
            })
        })

        setDataPekerjaan(arrPekerjaan);
    }

    const getMenikah = async () => {
        const arrMenikah = [];
        const response = await API.GET(`master/list/status-kawin`);
        let getDataMenikah = response.data.data;
        getDataMenikah.map((item) => {
            return arrMenikah.push({ value: item.idStatusKawin, label: item.nmStatusKawin })
        })

        setDataMenikah(arrMenikah);
    }

    const handleChangeMenikah = value => {
        setMenikah(value);
    }


    const storeDataSimulasi = (data) => {
        onSubmit();
        setShowModal(true)
    }

    const calculateTotalPenghasilan = (value, name) => {
        if ( name == 'gaji' ) refGaji.current = value || 0
        if ( name == 'ulp' ) refULP.current = value || 0
        if ( name == 'penghasilan_lain' ) refPenghasilanLain.current = value || 0
        let total = Number(refGaji.current) + Number(refULP.current) + Number(refPenghasilanLain.current)
        setTotalPenghasilan(total)
    }    

    useEffect(() => {
        getProduk();
        getMenikah();
    }, []);

    return (
        <>
            <div className='grid sm:grid-cols-2 xl:grid-cols-3 gap-8 my-8'>
                <div>
                    <label className='block mb-2' htmlFor="jenis_debitur"> Jenis Debitur </label>
                    <Input.Text value="Debitur Baru" disabled id='jenis_debitur'/>
                </div>
                <div>
                    <label className='block mb-2' htmlFor="cif"> CIF </label>
                    <Input.Group
                        append
                        useButton
                        inputElement={<Input.Currency 
                            disableGroupSeparators
                            allowNegativeValue={false}
                            allowDecimals={false}
                            maxLength={15}
                            register={register} 
                            name='cif'
                            id='cif'
                            errors={errors.cif} 
                            validation={formValidation.cif}
                            hideError
                        />}
                        inputGroupText={<Button className={'rounded-tl-none rounded-bl-none py-2'}> Inquiry </Button>}
                    />
                </div>

                <div>
                    <label className='block mb-2' htmlFor="nama_debitur"> Nama Debitur </label>
                    <Input.Text name="nama_debitur" id="nama_debitur" register={register} errors={errors.nama_debitur} maxLength={30} validation={formValidation.nama_debitur}/>
                </div>

                <div>
                    <label className='block mb-2' htmlFor="produk"> Produk </label>
                    <Controller
                        control={control}
                        name="produk"
                        id="produk"
                        render={({ field: { onChange } }) => (
                                <MySelect
                                    withSearch
                                    id="produk"
                                    name={'produk'} 
                                    register={register} 
                                    errors={errors.produk} 
                                    options={dataProduk} 
                                    value={produk} 
                                    validation={formValidation.produk}
                                    onChange={(e) => handleChange(e, 'produk', onChange)}
                                />
                            )}
                    />
                </div>

                <div>
                    <label className='block mb-2' htmlFor="pekerjaan"> Pekerjaan </label>
                    <Controller
                        control={control}
                        name="pekerjaan"
                        id="pekerjaan"
                        render={({ field: { onChange } }) => (
                                <MySelect
                                    withSearch
                                    loading={loadingPekerjaan}
                                    isDisabled={loadingPekerjaan}
                                    name={'pekerjaan'} 
                                    id="pekerjaan"
                                    register={register} 
                                    errors={errors.pekerjaan} 
                                    options={dataPekerjaan} 
                                    value={pekerjaan} 
                                    validation={formValidation.pekerjaan}
                                    onChange={(e) => handleChange(e, 'pekerjaan', onChange)}
                                />
                            )}
                    />

                </div>

                <div className="flex gap-8 flex-wrap sm:flex-nowrap">
                    <FormGroup
                        className={'mb-2 flex-col gap-2 w-full'}
                        label={<label className='dark:text-grey' htmlFor="suku_bunga"> Suku Bunga </label>} 
                        input={
                            <>
                                <Input.Group
                                    append
                                    inputGroupText={'%'}
                                    id="suku_bunga"
                                    inputElement={<Input.Text name='suku_bunga' ref={suku_bunga} value={suku_bunga.current} readOnly/>}
                                />
                            </>
                        }
                    />

                    <FormGroup
                        className={'mb-2 flex-col gap-2 w-full'}
                        label={<label className='dark:text-grey' htmlFor="jangka_waktu"> Jangka Waktu </label>} 
                        input={
                            <>
                            <Input.Group
                                append
                                inputGroupText={'Bulan'}
                                inputElement={<Input.Currency 
                                    disableGroupSeparators
                                    allowNegativeValue={false}
                                    allowDecimals={false}
                                    id="jangka_waktu"
                                    maxLength={3}
                                    hideError 
                                    register={register} 
                                    name='jangka_waktu'
                                    errors={errors.jangka_waktu} 
                                    validation={formValidation.jangka_waktu}
                                />}
                            />
                            {errors.jangka_waktu && <ErrorMessageForm>{errors.jangka_waktu.message}</ErrorMessageForm>}
                            </>
                        }
                    />
                </div>

                <div>
                    <label className='block mb-2' htmlFor="status_debitur"> Status Debitur </label>
                    <Controller
                        control={control}
                        name="status_debitur"
                        id="status_debitur"
                        render={({ field: { onChange } }) => (
                                <MySelect
                                    withSearch
                                    name={'status_debitur'} 
                                    id="status_debitur"
                                    register={register} 
                                    errors={errors.status_debitur} 
                                    options={options} 
                                    value={menikah}
                                    validation={formValidation.status_debitur}
                                    onChange={handleChangeMenikah}
                                />
                            )}
                    />

                </div>

                <div className="flex gap-8 flex-wrap sm:flex-nowrap">

                    <FormGroup  
                        className={'mb-2 flex-col gap-2 w-full'}
                        label={<label className='dark:text-grey' htmlFor="tanggal_lahir"> Tanggal lahir </label>}
                        input={<Controller
                            control={control}
                            name="tanggal_lahir"
                            id="tanggal_lahir"
                            render={({ field: { onChange } }) => (
                                    <Input.Date
                                        name={'tanggal_lahir'} 
                                        id="tanggal_lahir"
                                        maxDate={minAge}
                                        startFrom={minAge}  
                                        register={register} 
                                        errors={errors.tanggal_lahir} 
                                        value={tanggalLahir} 
                                        validation={formValidation.tanggal_lahir}
                                        onChange={(e) => handleChange(e, 'tglLahir', onChange)}
                                    />
                                )}
                        />}
                    />
                  
                    <FormGroup
                        className={'mb-2 flex-col gap-2 w-full'}
                        label={<label className='dark:text-grey' htmlFor="usia"> Usia </label>} 
                        input={<Input.Text id="usia" name="usia" value={refUsia.current} readOnly/>}
                    />
                </div>

                <div className="flex gap-8 flex-wrap xl:flex-nowrap">
                    <FormGroup
                        className={'mb-2 flex-col gap-2 w-full'}
                        label={<label className='dark:text-grey' htmlFor="bunga_promo"> Bunga Promo <span className="text-gray-400 text-sm"> (Opsional) </span>  </label>} 
                        input={<>
                                <Input.Group
                                    append
                                    inputGroupText={'%'}
                                    inputElement={<Input.Currency 
                                        disableGroupSeparators
                                        allowNegativeValue={false}
                                        allowDecimals={false}
                                        maxLength={3}
                                        hideError 
                                        validation={formValidation.bunga_promo}
                                        register={register} 
                                        id="bunga_promo"
                                        name='bunga_promo'
                                        errors={errors.bunga_promo} 
                                    />}
                                />
                        </>}
                    />

                    <FormGroup
                        className={'mb-2 flex-col gap-2 w-full'}
                        label={<label className='dark:text-grey'> Jangka Waktu Promo <span className="text-gray-400 text-sm"> (Opsional) </span>  </label>} 
                        input={
                            <>
                                <Input.Group
                                    append
                                    inputGroupText={'Bulan'}
                                    inputElement={<Input.Currency 
                                        disableGroupSeparators
                                        allowNegativeValue={false}
                                        allowDecimals={false}
                                        maxLength={3}
                                        hideError 
                                        register={register} 
                                        name='jangka_waktu_promo'
                                        errors={errors.jangka_waktu_promo} 
                                    />}
                                />
                                {errors.jangka_waktu_promo && <ErrorMessageForm>{errors.jangka_waktu_promo.message}</ErrorMessageForm>}                    
                            </>
                        }
                    />
                </div>

                <div className="flex gap-8 flex-wrap 2xl:flex-nowrap">
                    <FormGroup
                        className={'mb-2 flex-col gap-2 w-full'}
                        label={<label className='dark:text-grey'> Asuransi </label>}
                        input={<MySelect withSearch id="asuransi" name="asuransi" options={options} placeholder="Isikan Asuransi"/>}
                    />

                    <FormGroup
                        className={'mb-2 flex-col gap-2 w-full'}
                        label={<label className='dark:text-grey' htmlFor="rate_asuransi"> Rate Asuransi </label>} 
                        input={<>
                                <Input.Group
                                    append
                                    inputGroupText={'%'}
                                    inputElement={<Input.Currency 
                                        disableGroupSeparators
                                        allowNegativeValue={false}
                                        allowDecimals={false}
                                        maxLength={3}
                                        hideError 
                                        validation={formValidation.rate_asuransi}
                                        register={register} 
                                        id="rate_asuransi"
                                        name='rate_asuransi'
                                        errors={errors.bunga_promo} 
                                    />}
                                />
                        </>}
                    />
                </div>

                <div className="flex gap-8 flex-wrap 2xl:flex-nowrap">
                    <FormGroup
                        className={'mb-2 flex-col gap-2 w-full'}
                        label={<label className='dark:text-grey' htmlFor="gaji"> Gaji </label>} 
                        input={
                            <>
                                <Input.Group
                                    inputGroupText={'Rp'}
                                    inputElement={<Input.Currency
                                        name="gaji"
                                        id="gaji"
                                        ref={refGaji}
                                        allowDecimals={true}
                                        register={register}
                                        errors={errors.gaji}
                                        maxLength={9} 
                                        hideError
                                        allowNegativeValue={false}
                                        decimalSeparator={','}
                                        groupSeparator={'.'}
                                        validation={formValidation.gaji}
                                        onChange={(value, name) => calculateTotalPenghasilan(value, name)}
                                    />}
                                />     
                                {errors.gaji && <ErrorMessageForm>{errors.gaji.message}</ErrorMessageForm>}                    
                            </>
                        }
                    />

                    <FormGroup
                        className={'mb-2 flex-col gap-2 w-full'}
                        label={<label className='dark:text-grey'> Penghasilan Lain <span className="text-gray-400 text-sm"> (Opsional) </span> </label>} 
                        input={
                            <>
                                <Input.Group
                                    inputGroupText={'Rp'}
                                    inputElement={<Input.Currency
                                        name="penghasilan_lain"
                                        allowDecimals={true}
                                        register={register}
                                        errors={errors.penghasilan_lain}
                                        maxLength={9} 
                                        hideError
                                        allowNegativeValue={false}
                                        decimalSeparator={','}
                                        groupSeparator={'.'}
                                        validation={formValidation.penghasilan_lain}
                                        onChange={(value, name) => calculateTotalPenghasilan(value, name)}
                                    />}
                                />     
                                {errors.penghasilan_lain && <ErrorMessageForm>{errors.penghasilan_lain.message}</ErrorMessageForm>}                    
                            </>
                        }
                    />
                </div>

                
                <div className="flex gap-8 flex-wrap 2xl:flex-nowrap">
                    <FormGroup
                        className={'mb-2 flex-col gap-2 w-full'}
                        label={<label className='dark:text-grey' htmlFor="ulp"> ULP <span className="text-gray-400 text-sm"> (Opsional) </span>  </label>} 
                        input={
                            <>
                                <Input.Group
                                    inputGroupText={'Rp'}
                                    inputElement={<Input.Currency
                                        name="ulp"
                                        id="ulp"
                                        allowDecimals={true}
                                        register={register}
                                        validation={formValidation.ulp}
                                        errors={errors.ulp}
                                        maxLength={9} 
                                        hideError
                                        allowNegativeValue={false}
                                        decimalSeparator={','}
                                        groupSeparator={'.'}
                                        onChange={(value, name) => calculateTotalPenghasilan(value, name)}
                                    />}
                                />     
                                {errors.ulp && <ErrorMessageForm>{errors.ulp.message}</ErrorMessageForm>}                    
                            </>
                        }
                    />     

                    <FormGroup
                        className={'mb-2 flex-col gap-2 w-full'}
                        label={<label className='dark:text-grey' htmlFor="total_penghasilan"> Total Penghasilan </label>} 
                        input={
                            <>
                                <Input.Group
                                    inputGroupText={'Rp'}
                                    inputElement={<Input.Currency
                                        name="total_penghasilan"
                                        readOnly
                                        allowDecimals={true}
                                        allowNegativeValue={false}
                                        decimalSeparator={','}
                                        groupSeparator={'.'}
                                        value={totalPenghasilan}
                                    />}
                                />   
                            </>
                        }
                    />
                </div>

                <FormGroup
                    className={'mb-2 flex-col gap-2 w-full 2xl:w-1/2 2xl:pr-4'}
                    label={<label className='dark:text-grey' htmlFor="plafon"> Plafon </label>} 
                    input={
                        <>
                            <Input.Group
                                inputGroupText={'Rp'}
                                inputElement={<Input.Currency
                                    name="plafon"
                                    id="plafon"
                                    allowDecimals={true}
                                    register={register}
                                    validation={formValidation.plafon}
                                    errors={errors.plafon}
                                    maxLength={10} 
                                    hideError
                                    allowNegativeValue={false}
                                    decimalSeparator={','}
                                    groupSeparator={'.'}
                                />}
                            />     
                            {errors.plafon && <ErrorMessageForm>{errors.plafon.message}</ErrorMessageForm>}                    
                        </>
                    }
                />    
            </div>

            {showModal && <ModalHasilSimulasi setShowModal={setShowModal} closeModal={() => setShowModal((prev) => !prev)}/>}


            <div className="text-right ">
                <TabAction onSubmit={handleSubmit(storeDataSimulasi)}/>
            </div>
        </>
    )
};

export default Simulasi