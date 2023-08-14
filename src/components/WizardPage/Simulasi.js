'use client'

import React, { useState, useEffect, useRef, useMemo } from "react"
import MySelect from "@/components/Form/Select";
import Input from "@/components/Form/Input";
import { API } from "@/config/api";
import { Controller, useForm } from "react-hook-form";
import ModalHasilSimulasi from "../HasilSimulasi/ModalHasilSimulasi";
import ErrorMessageForm from "../Form/ErrorMessageForm";
import Button from "../Button";
import FormGroup from "../Form/FormGroup";
import useGet from "@/hooks/useGet";
import { FormRules } from "@/lib/formRules";
import moment from "moment";
import TabAction from "../TabAction";
import { useMySwal } from "@/hooks/useMySwal";
import { clearFormatRupiah } from "@/lib/utils";
import usePost from "@/hooks/usePost";
import LoadingSpinner from "../LoadingSpinner";

const formValidation = {
    nama_debitur: {maxLength: FormRules.MaxLength(30),  pattern: FormRules.OnlyLetter('Hanya boleh diisi huruf')},
    cif: {maxLength: FormRules.MaxLength(15, 'Maksimal diisi 15 digit Angka')},
    produk: {required: FormRules.Required('Pilih produk')},
    pekerjaan: {required: FormRules.Required('Pilih pekerjaan')},
    jangka_waktu: {required: FormRules.Required(), valueAsNumber: true},
    jangka_waktu_promo: {valueAsNumber: true},
    tanggal_lahir: {required: FormRules.Required()},
    asuransi: {required: FormRules.Required()},
    rate_asuransi: {required: FormRules.Required(), max: FormRules.MaxNumber(100, 'Maksimal diisi 100'), valueAsNumber: true},
    bunga_promo: {valueAsNumber: true},
    gaji: {required: FormRules.Required(), maxLength: FormRules.MaxLength(11)},
    penghasilan_lain: {maxLength: FormRules.MaxLength(11)},
    ulp: {maxLength: FormRules.MaxLength(11)},
    plafon: {required: FormRules.Required(), maxLength: FormRules.MaxLength(13)},
    status_debitur: {required: FormRules.Required()}
}

const Simulasi = ({ onSubmit }) => {

    const mySwal = useMySwal()
    const { register, control, handleSubmit, getValues, setValue, formState: { errors }  } = useForm({ mode: "all", defaultValues: {
        rate_asuransi: 0
    } });

    
    const [dataProduk, setDataProduk] = useState([]);
    const [produk, setProduk] = useState({value: -1, label: 'Pilih produk', disabled: true});

    const [ showModal, setShowModal ] = useState(false)

    const [dataAsuransi, setDataAsuransi] = useState([])
    const [asuransi, setAsuransi] = useState({value: -1, label: 'Pilih asuransi', disabled: true})

    const [dataPekerjaan, setDataPekerjaan] = useState([]);
    const [pekerjaan, setPekerjaan] = useState({value: -1, label: 'Pilih pekerjaan', disabled: true});
    const [loadingPekerjaan, setLoadingPekerjaan] = useState(false)

    const [dataMenikah, setDataMenikah] = useState([]);
    const [menikah, setMenikah] = useState({value: -1, label: 'Pilih status debitur', disabled: true});

    const [tanggalLahir, setTanggalLahir] = useState(undefined);
    const [totalPenghasilan, setTotalPenghasilan] = useState(undefined)

    const [dataSimulasi, setDataSimulasi] = useState({})

    
    let payload = []
    const hitSimulasi = usePost(['simulasi'], '/v2/master/simulasi', payload, {
        refetchOnWindowFocus: false,
        retry: false,
        onError: (error, variables, context) => {
            mySwal.warning(error.rm)
        },
        onSuccess: (data, variables, context) => {
            let resData = data.data.data
            let collectData = {...resData, totalPenghasilan}
            setDataSimulasi(collectData)

            let angsuranBulan = resData.promo ? resData.promo.angsuranPromo : resData.angsuranBulan
            let payloadBiayaLainnya = {
                productId: variables.productId,
                idPekerjaan: variables.idPekerjaan,
                jangkaWaktu: variables.jangkaWaktu,
                rate: variables.rate,
                plafon: variables.plafon,
                asuransiId: getValues('asuransi'),
                angsuran: angsuranBulan,
                idProspek: null,
                rateAsuransi: getValues('rate_asuransi')
            }
            hitBiayaLainnya.mutate(payloadBiayaLainnya)
            

            // productId: productId,
            // idPekerjaan: idPekerjaan,
            // jangkaWaktu: jangkaWaktu,
            // rate: rate,
            // plafon: plafon,
            // asuransiId: asuransi,
            // angsuran: angsuranBulan,
            // idProspek: null,
            // rateAsuransi: rateAsuransi
            
            // setShowModal(false)
            // queryClient.invalidateQueries(['getNewEntry']);
            // let message = data.data.rm
            // mySwal.success(message, 'Sukses')
        },
    });

    const hitBiayaLainnya = usePost(['biaya-lainnya'], 'v2/master/kalkulasi-biaya', payload, {
        refetchOnWindowFocus: false,
        retry: false,
        onError: (error, variables, context) => {
            mySwal.warning(error.rm)
        },
        onSuccess: (data, variables, context) => {
            let resData = data.data.data
            let collectData = {...dataSimulasi, dataBiaya: resData}
            setDataSimulasi(collectData)
            setShowModal(true)

            // setDataAsuransi((prev) => ({...prev, dataBiaya: resData}))
            

            // console.log({variables})
            // console.log({context})
            
            // let resData = data.data.data
            // let collectData = {...resData, totalPenghasilan}
            // setDataSimulasi(collectData)

            // setShowModal(false)
            // queryClient.invalidateQueries(['getNewEntry']);
            // let message = data.data.rm
            // mySwal.success(message, 'Sukses')
        },
    })

    // url: '{{ route('post_data') }}',
    // data: {
    //     act_url: 'v2/master/kalkulasi-biaya',
    //     productId: productId,
    //     idPekerjaan: idPekerjaan,
    //     jangkaWaktu: jangkaWaktu,
    //     rate: rate,
    //     plafon: plafon,
    //     asuransiId: asuransi,
    //     angsuran: angsuranBulan,
    //     idProspek: null,
    //     rateAsuransi: rateAsuransi
    // },

    // typeJadwalId = jika ada promo type = 1 else 2
    // $response = $this->postAPIClient('master/jadwal-angsur', [
    //     "idProduct" => $request->get('productId')?$request->get('productId'):$request->get('prodId'),
    //     "totalAngsuran" => $request->get('angsuranBulan')?str_replace('.','',$request->get('angsuranBulan')):str_replace('.','',$request->get('angsuranNew')),
    //     "plafon" => str_replace('.','',$request->get('plafon')),
    //     "jangkaWaktu" => $request->get('jangkaWaktu'),
    //     "rate" => $request->get('rate'),
    //     "typeJadwalId" => $request->get('typeJadwalId'),
    //     "promo" => [
    //         "angsuranPromo"=> $request->get('angsuranPromo'),
    //         "plafonPromo"=> $request->get('plafonPromo'),
    //         "tenorPromo"=> $request->get('tenorPromo'),
    //         "ratePromo"=> $request->get('ratePromo'),
    //         "bulanPromo"=> $request->get('bulanPromo'),
    //         "angsuranNormal"=> $request->get('angsuranNormal'),
    //         "plafonNormal"=> $request->get('plafonNormal'),
    //         "tenorNormal"=> $request->get('tenorNormal'),
    //         "rateNormal"=> $request->get('rateNormal')
    //     ],
    // ])->json();

    const minAge = moment().subtract(17, 'years');
    const refGaji = useRef(0)
    const refULP = useRef(0)
    const suku_bunga = useRef(undefined)
    const refPenghasilanLain = useRef(0)
    const refUsia = useRef('')
    const refRateAsuransi = useRef(0)

    const handleChange = async (e, type, onChange) => {
        let value = e.value   
        switch (type)  {
            case 'produk': 
                onChange(value)
                let produkSelected = dataProduk.find((item, i) => item.value == value)
                suku_bunga.current = produkSelected.eqRate
                setProduk(produkSelected)
                getPekerjaan(value)
                register('bunga_promo', {max: {value: Number(produkSelected.eqRate), message: `Tidak boleh lebih dari suku bunga normal`}, valueAsNumber: true})
            break;
            case 'pekerjaan' :
                let pekerjaanSelected = dataPekerjaan.find((item, i) => item.value == value)
                setPekerjaan(pekerjaanSelected)
                onChange(value)
                register('jangka_waktu', {max: {value: pekerjaanSelected.tenor, message: `Maksimal diisi ${pekerjaanSelected.tenor} bulan`}, valueAsNumber: true})
            break;
            case 'tglLahir' :
                let tglLahir = e.startDate
                let age = moment().diff(tglLahir, 'years', false);
                refUsia.current = `${age} Tahun`
                setTanggalLahir(e)
                onChange(e.startDate)
            break;
            case 'statusDebitur' :
                onChange(value)
                let statusSelected = dataMenikah.find((item, i) => item.value == value)
                setMenikah(statusSelected)
            break;
            case 'asuransi' :
                onChange(value)
                let asuransiSelected = dataAsuransi.find((item, i) => item.value == value)
                let produkId = getValues('produk')
                let tglLahirSelected = getValues('tanggal_lahir')
                let idPekerjaan = getValues('pekerjaan')
                let tenor = getValues('jangka_waktu')
                let asuransiId = asuransiSelected.value

                if ( produkId && tglLahirSelected && idPekerjaan && tenor && asuransiId ) {
                    let rateAsuransi = await getAsuransi(asuransiId, tenor, produkId, tglLahirSelected, idPekerjaan, 'rate-asuransi')
                    refRateAsuransi.current = rateAsuransi
                }

                setAsuransi(asuransiSelected)
            break;
        }
    };

    const getProduk = async () => {
        const response = await API.GET(`/master/list/product`);
        if (response.status != 200) return mySwal.error(response.data.error)
        const arr = [];
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
        if (response.status != 200) return mySwal.error(response.data.error)
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
        const response = await API.GET(`master/list/status-kawin`);
        if (response.status != 200) return mySwal.error(response.data.error)
        const arrMenikah = [];
        let getDataMenikah = response.data.data;
        getDataMenikah.map((item) => {
            return arrMenikah.push({ value: item.idStatusKawin, label: item.nmStatusKawin })
        })
        setDataMenikah(arrMenikah);
    }

    const getAsuransi = async (asuransiId = null, jangkaWaktu, idProduct, tglLahir, idPekerjaan, type = 'list-asuransi') => {
        const response = await API.POST(`v2/master/calc-asuransi-list/${asuransiId}?jangkaWaktu=${jangkaWaktu}&idProduct=${idProduct}&${tglLahir}&idPekerjaan=${idPekerjaan}`);            
        if (response.status != 200) return mySwal.error(response.data.error)
        const refAsuransi = response.data.data.list
        if ( type == 'rate-asuransi' ) return response.data.data.rate
        const arrAsuransi = []
        refAsuransi.map((item, index) => arrAsuransi.push({value: item.asuransiId, label: item.definition}))
        setDataAsuransi(arrAsuransi)    
    }

    

    const storeDataSimulasi = (data) => {

        if ( (data.jangka_waktu_promo && !data.bunga_promo) || (!data.jangka_waktu_promo && data.bunga_promo) ) {
            return mySwal.warning('Suku bunga promo dan janga waktu promo wajib diisi')
        }

        const dataFormatted = {
            productId: data.produk,
            idPekerjaan: data.pekerjaan,
            pendapatanBulan: clearFormatRupiah(data.gaji),
            pendapatanLainnya: clearFormatRupiah(data.penghasilan_lain), // Penghasilan lain
            pendapatanLainnya2: clearFormatRupiah(data.ulp), // ULP
            jangkaWaktu: data.jangka_waktu,
            tglLahir: data.tanggal_lahir,
            isMenikah: data.status_debitur,
            plafon: clearFormatRupiah(data.plafon),
            rate: Number(suku_bunga.current),
            pengeluaran: 0,
            totalAngsuranLain: 0,
            ratePromo: data.bunga_promo,
            bulanPromo: Number(data.jangka_waktu_promo),
        }
        hitSimulasi.mutate(dataFormatted)
        // onSubmit();
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
        getAsuransi(null,120,4,'2000-12-22',8)
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
                                    inputElement={<Input.Text name='suku_bunga' id="suku_bunga" ref={suku_bunga} value={suku_bunga.current} readOnly/>}
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
                                    onChange={(value, name) => register('jangka_waktu_promo', {max: {value: value, message: `Tidak boleh lebih dari jangka waktu normal`}, valueAsNumber: true})}
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
                                    options={dataMenikah} 
                                    value={menikah}
                                    validation={formValidation.status_debitur}
                                    onChange={(e) => handleChange(e, 'statusDebitur', onChange)}
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
                        label={<label className='dark:text-grey' htmlFor="bunga_promo"> Suku Bunga Promo <span className="text-gray-400 text-sm"> (Opsional) </span>  </label>} 
                        input={<>
                                <Input.Group
                                    append
                                    inputGroupText={'%'}
                                    inputElement={<Input.Currency 
                                        disableGroupSeparators
                                        allowNegativeValue={false}
                                        allowDecimals={true}
                                        maxLength={4}
                                        decimalsLimit={1}
                                        hideError 
                                        validation={formValidation.bunga_promo}
                                        register={register} 
                                        id="bunga_promo"
                                        name='bunga_promo'
                                        errors={errors.bunga_promo} 
                                    />}
                                />
                                {errors.bunga_promo && <ErrorMessageForm>{errors.bunga_promo.message}</ErrorMessageForm>}
                        </>}
                    />

                    <FormGroup
                        className={'mb-2 flex-col gap-2 w-full'}
                        label={<label className='dark:text-grey' htmlFor="jangka_waktu_promo"> Jangka Waktu Promo <span className="text-gray-400 text-sm"> (Opsional) </span>  </label>} 
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
                                        id="jangka_waktu_promo"
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
                        label={<label className='dark:text-grey' htmlFor="asuransi"> Asuransi </label>}
                        input={<Controller
                            control={control}
                            name="asuransi"
                            id="asuransi"
                            render={({ field: { onChange } }) => (
                                    <MySelect
                                        withSearch
                                        // loading={loadingPekerjaan}
                                        // isDisabled={loadingPekerjaan}
                                        name={'asuransi'} 
                                        id="asuransi"
                                        register={register} 
                                        errors={errors.asuransi} 
                                        options={dataAsuransi} 
                                        value={asuransi} 
                                        validation={formValidation.asuransi}
                                        onChange={(e) => handleChange(e, 'asuransi', onChange)}
                                    />
                                )}
                        />}
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
                                        allowDecimals={true}
                                        maxLength={6}
                                        decimalsLimit={4}
                                        hideError 
                                        value={refRateAsuransi.current}
                                        validation={formValidation.rate_asuransi}
                                        register={register} 
                                        id="rate_asuransi"
                                        name='rate_asuransi'
                                        errors={errors.rate_asuransi} 
                                    />}
                                />
                                {errors.rate_asuransi && <ErrorMessageForm>{errors.rate_asuransi.message}</ErrorMessageForm>}                    
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
                        label={<label className='dark:text-grey' htmlFor="penghasilan_lain"> Penghasilan Lain <span className="text-gray-400 text-sm"> (Opsional) </span> </label>} 
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
                                        id="penghasilan_lain"
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
                                        id="total_penghasilan"
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

            {showModal && <ModalHasilSimulasi data={dataSimulasi} setShowModal={setShowModal} closeModal={() => setShowModal((prev) => !prev)}/>}

            <div className="text-right pb-6">
                <Button 
                    onClick={handleSubmit(storeDataSimulasi)}
                    className={`${hitBiayaLainnya.isLoading && 'cursor-not-allowed'}`}> 
                    {hitBiayaLainnya.isLoading && <LoadingSpinner/>} 
                    {hitBiayaLainnya.isLoading ? 'Processing ...' : 'Simulasi'}
                </Button>
            </div>
        </>
    )
};

export default Simulasi