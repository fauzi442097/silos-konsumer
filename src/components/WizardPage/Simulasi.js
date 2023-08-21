'use client'

import React, { useState, useEffect, useRef } from "react"
import MySelect from "@/components/Form/Select";
import Input from "@/components/Form/Input";
import { API } from "@/config/api";
import { Controller, useForm } from "react-hook-form";
import ModalHasilSimulasi from "../HasilSimulasi/ModalHasilSimulasi";
import ErrorMessageForm from "../Form/ErrorMessageForm";
import Button from "../Button";
import FormGroup from "../Form/FormGroup";
import { FormRules } from "@/lib/formRules";
import moment from "moment";
import { useMySwal } from "@/hooks/useMySwal";
import { clearFormatRupiah } from "@/lib/utils";
import usePost from "@/hooks/usePost";
import LoadingSpinner from "../LoadingSpinner";
import ModalInfoPlafon from "@/app/(admin)/(global_page)/pengajuan_kredit/ModalInfoPlafon";
import useGet from "@/hooks/useGet";

const formValidation = {
    nama_debitur: { required: FormRules.Required(), maxLength: FormRules.MaxLength(30), pattern: FormRules.OnlyLetter('Hanya boleh diisi huruf') },
    cif: { maxLength: FormRules.MaxLength(15, 'Maksimal diisi 15 digit Angka') },
    produk: { required: FormRules.Required('Pilih produk') },
    pekerjaan: { required: FormRules.Required('Pilih pekerjaan') },
    jangka_waktu: { required: FormRules.Required(), valueAsNumber: true },
    jangka_waktu_promo: { valueAsNumber: true },
    tanggal_lahir: { required: FormRules.Required() },
    asuransi: { required: FormRules.Required() },
    rate_asuransi: { required: FormRules.Required(), max: FormRules.MaxNumber(100, 'Maksimal diisi 100'), valueAsNumber: true },
    bunga_promo: { valueAsNumber: true },
    gaji: { required: FormRules.Required(), maxLength: FormRules.MaxLength(11) },
    penghasilan_lain: { maxLength: FormRules.MaxLength(11) },
    ulp: { maxLength: FormRules.MaxLength(11) },
    plafon: { maxLength: FormRules.MaxLength(13) },
    status_debitur: { required: FormRules.Required() }
}

const minAge = moment().subtract(21, 'years');

const BlockUI = () => {
    return (
        <div className="absolute inset-0 z-30 transition-opacity backdrop-blur-sm bg-transparent">
            <div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-center flex justify-center items-center gap-2">
                <p className="text-primary font-inter-medium text-2xl mb-0"> Processing </p>
                <div role="status">
                    <svg aria-hidden="true" className="w-6 h-6 dark:text-white animate-spin text-primary  fill-white dark:fill-green-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

const useGetProducts = () => {
    const mySwal = useMySwal();
    const queryProducts = useGet(['refProduk'], '/master/list/product', { retry: false, refetchOnWindowFocus: false });
    let dataProduk = [];
    if (queryProducts.isSuccess) {
        let products = queryProducts.data?.data.data;
        products.map((item) => {
            return dataProduk.push({
                value: item.id,
                label: item.prodName + ' - (Bunga: ' + item.eqRate + '%)',
                eqRate: item.eqRate,
                eqRateReal: item.eqRateReal
            })
        });
    }

    useEffect(() => {
        if (queryProducts.isError) mySwal.error(queryProducts.error)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryProducts.isError])
    return { dataProduk, queryProducts }
}

const useGetStatusDebitur = () => {
    const mySwal = useMySwal()
    const queryStatusDebitur = useGet(['refStatusDebitur'], '/master/list/status-kawin', { retry: false, refetchOnWindowFocus: false });
    let dataMenikah = [];
    if (queryStatusDebitur.isSuccess) {
        let getDataMenikah = queryStatusDebitur.data?.data.data;
        getDataMenikah.map((item) => { return dataMenikah.push({ value: item.idStatusKawin, label: item.nmStatusKawin }) })
    }

    useEffect(() => {
        if (queryStatusDebitur.isError) mySwal.error(queryStatusDebitur.error)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryStatusDebitur.isError])
    return { dataMenikah, queryStatusDebitur }
}

const usePostSimulasi = (mySwal, setDataSimulasi, paramInput, hitBiayaLainnya) => {
    return usePost(['simulasi'], '/v2/master/simulasi', [], {
        refetchOnWindowFocus: false,
        retry: false,
        onError: (error, variables, context) => {
            mySwal.warning(error.rm)
        },
        onSuccess: (data, variables, context) => {
            let resData = data.data.data
            let collectData = {
                ...resData,
                input: {
                    totalPenghasilan: paramInput.totalPenghasilan, 
                    jangkaWaktu: variables.jangkaWaktu,
                    rate: variables.rate
                }
            }
            setDataSimulasi(collectData)

            let angsuranBulan = resData.promo ? resData.promo.angsuranPromo : resData.angsuranBulan
            let payloadBiayaLainnya = {
                productId: variables.productId,
                idPekerjaan: variables.idPekerjaan,
                jangkaWaktu: variables.jangkaWaktu,
                rate: variables.rate,
                plafon: resData.plafon,
                asuransiId: paramInput.asuransiId,
                angsuran: angsuranBulan,
                idProspek: null,
                rateAsuransi: paramInput.rateAsuransi
            }
            hitBiayaLainnya.mutate(payloadBiayaLainnya)
        },
    });
}

const usePostBiayaLainnya = (mySwal, setDataSimulasi, dataSimulasi, setShowModal) => {
    return usePost(['biaya-lainnya'], 'v2/master/kalkulasi-biaya', [], {
        refetchOnWindowFocus: false,
        retry: false,
        onError: (error, variables, context) => {
            mySwal.warning(error.rm)
        },
        onSuccess: (data, variables, context) => {
            let resData = data.data.data
            let collectData = { ...dataSimulasi, dataBiaya: resData }
            setDataSimulasi(collectData)
            setShowModal(true)
        },
    })
}

const usePostMaksimalPlafon = (mySwal, setShowModalPlafon) => {
    return usePost(['simulasi-plafon'], 'v2/master/simulasi-plafon', [], {
        refetchOnWindowFocus: false,
        retry: false,
        onError: (error, variables, context) => {
            mySwal.warning(error.rm)
        },
        onSuccess: (data, variables, context) => {
            setShowModalPlafon(true)
        },
    })
}


const Simulasi = ({ onSubmit }) => {

    const mySwal = useMySwal()
    const { register, control, handleSubmit, getValues, setValue, watch, formState: { errors } } = useForm({ mode: "all" });

    const { dataProduk, queryProducts } = useGetProducts()
    const { dataMenikah, queryStatusDebitur } = useGetStatusDebitur()


    const [produk, setProduk] = useState({ value: -1, label: 'Pilih produk', disabled: true });

    const [showModal, setShowModal] = useState(false)
    const [showModalPlafon, setShowModalPlafon] = useState(false)

    const [dataAsuransi, setDataAsuransi] = useState([])
    const [asuransi, setAsuransi] = useState({ value: -1, label: 'Pilih asuransi', disabled: true })
    const [loadingAsuransi, setLoadingAsuransi] = useState(false)

    const [dataPekerjaan, setDataPekerjaan] = useState([]);
    const [pekerjaan, setPekerjaan] = useState({ value: -1, label: 'Pilih pekerjaan', disabled: true });
    const [loadingPekerjaan, setLoadingPekerjaan] = useState(false)

    const [menikah, setMenikah] = useState({ value: -1, label: 'Pilih status debitur', disabled: true });

    const [tanggalLahir, setTanggalLahir] = useState(undefined);
    const [totalPenghasilan, setTotalPenghasilan] = useState(undefined)

    const [rateAsuransi, setRateAsuransi] = useState(undefined)
    const [dataSimulasi, setDataSimulasi] = useState({})

    const [plafon, setPlafon] = useState(undefined)

    const refGaji = useRef(0)
    const refULP = useRef(0)
    const suku_bunga = useRef(undefined)
    const refPenghasilanLain = useRef(0)
    const refUsia = useRef('')


    const hitBiayaLainnya = usePostBiayaLainnya(mySwal, setDataSimulasi, dataSimulasi, setShowModal)
    let paramSimulasi = {
        totalPenghasilan: totalPenghasilan, 
        asuransiId: getValues('asuransi'),
        rateAsuransi: Number(rateAsuransi)
    }
    const hitSimulasi = usePostSimulasi(mySwal, setDataSimulasi, paramSimulasi, hitBiayaLainnya)
    const hitMaksimalPlafon = usePostMaksimalPlafon(mySwal, setShowModalPlafon)

    const handleChange = async (e, type, onChange) => {
        let value = e.value
        switch (type) {
            case 'produk':
                onChange(value)
                let produkSelected = dataProduk.find((item, i) => item.value == value)
                suku_bunga.current = produkSelected.eqRate
                setProduk(produkSelected)
                getPekerjaan(value)
                register('bunga_promo', { max: { value: Number(produkSelected.eqRate), message: `Tidak boleh lebih dari suku bunga normal` }, valueAsNumber: true })
                checkAndGetAsuransi()
                break;
            case 'pekerjaan':
                let pekerjaanSelected = dataPekerjaan.find((item, i) => item.value == value)
                setPekerjaan(pekerjaanSelected)
                onChange(value)
                register('jangka_waktu', { max: { value: pekerjaanSelected.tenor, message: `Maksimal diisi ${pekerjaanSelected.tenor} bulan` }, valueAsNumber: true })
                checkAndGetAsuransi()
                break;
            case 'tglLahir':
                let tglLahir = e.startDate
                let age = moment().diff(tglLahir, 'years', false);
                refUsia.current = `${age} Tahun`
                setTanggalLahir(e)
                onChange(e.startDate)
                checkAndGetAsuransi()
                break;
            case 'statusDebitur':
                onChange(value)
                let statusSelected = dataMenikah.find((item, i) => item.value == value)
                setMenikah(statusSelected)
                break;
            case 'plafon':
                console.log(value)
                // onChange(value)
                // setPlafon(value)
                break;
            case 'asuransi':
                onChange(value)
                let asuransiSelected = dataAsuransi.find((item, i) => item.value == value)
                let produkId = getValues('produk')
                let tglLahirSelected = getValues('tanggal_lahir')
                let idPekerjaan = getValues('pekerjaan')
                let tenor = getValues('jangka_waktu')
                let asuransiId = asuransiSelected.value

                if (produkId && tglLahirSelected && idPekerjaan && tenor && asuransiId) {
                    let rateAsuransi = await getAsuransi(asuransiId, tenor, produkId, tglLahirSelected, idPekerjaan, 'rate-asuransi')
                    setRateAsuransi(rateAsuransi)
                }

                setAsuransi(asuransiSelected)
                break;
        }
    };

    const getPekerjaan = async (idProduk) => {
        setLoadingPekerjaan(true)
        setPekerjaan({ value: -1, label: 'Pilih pekerjaan', disabled: true })
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


    const getAsuransi = async (asuransiId = null, jangkaWaktu, idProduct, tglLahir, idPekerjaan, type = 'list-asuransi') => {
        if (type == 'list-asuransi') setLoadingAsuransi(true)
        const response = await API.POST(`v2/master/calc-asuransi-list/${asuransiId}?jangkaWaktu=${jangkaWaktu}&idProduct=${idProduct}&${tglLahir}&idPekerjaan=${idPekerjaan}`);
        if (response.status != 200) return mySwal.error(response.data.error)
        if (type == 'list-asuransi') setLoadingAsuransi(false)
        const refAsuransi = response.data.data.list
        if (type == 'rate-asuransi') return response.data.data.rate
        const arrAsuransi = []
        refAsuransi.map((item, index) => arrAsuransi.push({ value: item.asuransiId, label: item.definition }))
        setDataAsuransi(arrAsuransi)
    }

    const checkAndGetAsuransi = () => {
        setAsuransi({ value: -1, label: 'Pilih asuransi', disabled: true })
        setDataAsuransi([])
        let jangkaWaktu = getValues('jangka_waktu')
        let productId = getValues('produk')
        let tglLahir = getValues('tanggal_lahir')
        let idPekerjaan = getValues('pekerjaan')
        if (jangkaWaktu && productId && tglLahir && idPekerjaan) getAsuransi(null, jangkaWaktu, productId, tglLahir, idPekerjaan)
    }

    const lihatMaksimalPlafon = (data) => {
        const payloadMaksimalPlafon = {
            productId: data.produk,
            idPekerjaan: data.pekerjaan,
            pendapatanBulan: clearFormatRupiah(data.gaji),
            pendapatanLainnya: clearFormatRupiah(data.penghasilan_lain),
            pendapatanLainnya2: clearFormatRupiah(data.ulp),
            jangkaWaktu: data.jangka_waktu,
            tglLahir: data.tanggal_lahir,
            isMenikah: data.status_debitur,
            plafon: plafon ? clearFormatRupiah(plafon.toString()) : null,
            rate: Number(suku_bunga.current),
            pengeluaran: 0,
            totalAngsuranLain: 0,
        }
        hitMaksimalPlafon.mutate(payloadMaksimalPlafon)
    }


    const storeDataSimulasi = (data) => {
        if ((data.jangka_waktu_promo && !data.bunga_promo) || (!data.jangka_waktu_promo && data.bunga_promo)) {
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
            plafon: plafon ? clearFormatRupiah(plafon.toString()) : null,
            rate: Number(suku_bunga.current),
            pengeluaran: 0,
            totalAngsuranLain: 0,
            ratePromo: data.bunga_promo ? data.bunga_promo : 0,
            bulanPromo: Number(data.jangka_waktu_promo),
        }

        hitSimulasi.mutate(dataFormatted)
    }

    const calculateTotalPenghasilan = (value, name) => {
        if (name == 'gaji') refGaji.current = value || 0
        if (name == 'ulp') refULP.current = value || 0
        if (name == 'penghasilan_lain') refPenghasilanLain.current = value || 0
        let total = Number(refGaji.current) + Number(refULP.current) + Number(refPenghasilanLain.current)
        setTotalPenghasilan(total)
    }

    const setMaksimalPlafon = (jangkaWaktu, plafon) => {
        setShowModalPlafon(false)
        setValue('jangka_waktu', jangkaWaktu)
        // setValue('plafon', plafon)     
        setPlafon(plafon)
    }

    return (
        <>
            <div className='grid sm:grid-cols-2 xl:grid-cols-3 gap-8 my-8'>
                {hitMaksimalPlafon.isLoading && <BlockUI />}

                <FormGroup
                    className={'mb-2 flex-col gap-2 w-full'}
                    label={<label className='dark:text-grey' htmlFor="jenis_debitur"> Jenis Debitur </label>}
                    input={<Input.Text name='jenis_debitur' id="jenis_debitur" value='Debitur Baru' readOnly />}
                />

                <FormGroup
                    className={'mb-2 flex-col gap-2 w-full'}
                    label={<label htmlFor="cif"> CIF </label>}
                    input={<Input.Group
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
                    />}
                />

                <FormGroup
                    className={'mb-2 flex-col gap-2 w-full'}
                    label={<label htmlFor="nama_debitur"> Nama Debitur </label>}
                    input={<Input.Text name="nama_debitur" id="nama_debitur" register={register} errors={errors.nama_debitur} maxLength={30} validation={formValidation.nama_debitur} />}
                />

                <FormGroup
                    className={'mb-2 flex-col gap-2 w-full'}
                    label={<label htmlFor="produk"> Produk </label>}
                    input={<Controller
                        control={control}
                        name="produk"
                        id="produk"
                        render={({ field: { onChange } }) => (
                            <MySelect
                                withSearch
                                isDisabled={queryProducts.isLoading}
                                loading={queryProducts.isLoading}
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
                    />}
                />

                <FormGroup
                    className={'mb-2 flex-col gap-2 w-full'}
                    label={<label htmlFor="pekerjaan"> Pekerjaan </label>}
                    input={<Controller
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
                    />}
                />

                <div className="flex gap-8 flex-wrap sm:flex-nowrap">
                    <FormGroup
                        className={'mb-2 flex-col gap-2 w-full'}
                        label={<label className='dark:text-grey' htmlFor="suku_bunga"> Suku Bunga </label>}
                        input={
                            <>
                                <Input.Group
                                    append
                                    inputGroupText={'%'}
                                    inputElement={<Input.Text name='suku_bunga' id="suku_bunga" ref={suku_bunga} value={suku_bunga.current} readOnly />}
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
                                        onBlur={() => checkAndGetAsuransi()}
                                        hideError
                                        onChange={(value, name) => register('jangka_waktu_promo', { max: { value: value, message: `Tidak boleh lebih dari jangka waktu normal` }, valueAsNumber: true })}
                                        register={register}
                                        value={watch('jangka_waktu') || ''}
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

                <FormGroup
                    className={'mb-2 flex-col gap-2 w-full'}
                    label={<label htmlFor="status_debitur"> Status Debitur </label>}
                    input={<Controller
                        control={control}
                        name="status_debitur"
                        id="status_debitur"
                        render={({ field: { onChange } }) => (
                            <MySelect
                                withSearch
                                name={'status_debitur'}
                                id="status_debitur"
                                isDisabled={queryStatusDebitur.isLoading}
                                loading={queryStatusDebitur.isLoading}
                                register={register}
                                errors={errors.status_debitur}
                                options={dataMenikah}
                                value={menikah}
                                validation={formValidation.status_debitur}
                                onChange={(e) => handleChange(e, 'statusDebitur', onChange)}
                            />
                        )}
                    />}
                />

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
                        input={<Input.Text id="usia" name="usia" value={refUsia.current} readOnly />}
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
                                    loading={loadingAsuransi}
                                    isDisabled={loadingAsuransi}
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
                                inputElement={
                                    <Controller
                                        control={control}
                                        name="rate_asuransi"
                                        id="rate_asuransi"
                                        render={({ field: { onChange } }) => (
                                            <Input.Currency
                                                disableGroupSeparators
                                                allowNegativeValue={false}
                                                allowDecimals={true}
                                                maxLength={6}
                                                decimalsLimit={4}
                                                hideError
                                                value={rateAsuransi}
                                                validation={formValidation.rate_asuransi}
                                                register={register}
                                                id="rate_asuransi"
                                                name='rate_asuransi'
                                                errors={errors.rate_asuransi}
                                                onChange={(e) => setRateAsuransi(e)}
                                            />
                                        )}
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
                                    value={plafon}
                                    onChange={(value) => setPlafon(value)}
                                    allowNegativeValue={false}
                                    decimalSeparator={','}
                                    groupSeparator={'.'}
                                />}
                            />
                            {errors.plafon && <ErrorMessageForm>{errors.plafon.message}</ErrorMessageForm>}
                            <button type="button" className="text-left link" onClick={handleSubmit(lihatMaksimalPlafon)}> Lihat maksimal plafon </button>
                        </>
                    }
                />
            </div>

            <div className="text-right pb-6">
                <Button
                    onClick={handleSubmit(storeDataSimulasi)}
                    className={`${(hitBiayaLainnya.isLoading || hitSimulasi.isLoading) && 'cursor-not-allowed'}`}>
                    {(hitBiayaLainnya.isLoading || hitSimulasi.isLoading) && <LoadingSpinner />}
                    {(hitBiayaLainnya.isLoading || hitSimulasi.isLoading) ? 'Processing ...' : 'Simulasi'}
                </Button>
            </div>

            {showModal && <ModalHasilSimulasi data={dataSimulasi} setShowModal={setShowModal} closeModal={() => setShowModal((prev) => !prev)} />}
            {showModalPlafon && <ModalInfoPlafon data={hitMaksimalPlafon.data} setMaksimalPlafon={setMaksimalPlafon} setShowModal={setShowModalPlafon} closeModal={() => setShowModalPlafon((prev) => !prev)} />}

        </>
    )
};

export default Simulasi