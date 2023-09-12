'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { REF_STEP } from "../../Stepper";
import { useMySwal } from '@/hooks/useMySwal';
import { formatTanggalDB, camelCase } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import useGet from '@/hooks/useGet';
import usePost from '@/hooks/usePost';
import Card from '@/components/Card';
import Button from '@/components/Button';

import FormNasabah from './FormNasabah'
import FormPasangan from './FormPasangan'
import FormPekerjaan from './FormPekerjaan'
import FormPembiayaan from './FormPembiayaan'
import FormBiaya from './FormBiaya'
import ContainerStepper from '../../ContainerStepper';
import LoadingSpinner from '@/components/LoadingSpinner';

const usePostSimpanDataDebitur = (mySwal, hitUpdateBiaya, router) => {
    return usePost(['inquiry-by-tanggallahir'], '/v2/nasabah/complete', [], {
        refetchOnWindowFocus: false,
        retry: false,
        onError: (error, variables, context) => {
            if (error.rc === 4001){
                mySwal.warning('Terjadi kesalahan !')
            }
            
            mySwal.warning(error.rm);
        },
        onSuccess: (data, variables, context) => {
            mySwal.success(data.data.rm);
            console.log({data, variables});

            let idPembiayaan = data.data.data.idPembiayaan;
            let totalAngsuran = variables.promo ? variables.pembiayaan.promo.angsuranNormal : variables.pembiayaan.totalAngsuran;

            let payloadUpdateBiaya = {
                idPembiayaan: idPembiayaan,
                jangkaWaktu: variables.pembiayaan.jangkaWaktu,
                totalAngsuran: totalAngsuran,
                plafon: variables.pembiayaan.plafon,
                rate: variables.pembiayaan.rate,
                promo: variables.pembiayaan.promo,
                byAdmKredit: variables.pembiayaan.byAdministrasi,
                byFeeKetiga: variables.pembiayaan.byFeeKetiga,
                byAsuransi: variables.pembiayaan.byAsuransi,
                byProvisi: variables.pembiayaan.byProvisi,
            }

            if (data.data.rc === 200){
                hitUpdateBiaya.mutate(payloadUpdateBiaya);
            }

            router.push(`/pengajuan_kredit/ceklis_dokumen/${idPembiayaan}`)
        }
    })
}

const usePostUpdateBiaya = (mySwal) => {
    return usePost(['inquiry-by-tanggallahir'], '/master/pembiayaan/update', [], {
        refetchOnWindowFocus: false,
        retry: false,
        onError: (error, variables, context) => {
            if (error.rc === 4001){
                mySwal.warning('Terjadi kesalahan !')
            }
            
            mySwal.warning(error.rm);
        },
        onSuccess: (data, variables, context) => {
            // mySwal.success(data.data.rm);
        }
    })
}

const DataDebitur = ({ params }) => {
    const mySwal = useMySwal();
    const router = useRouter();
    const { idPembiayaan } = params;

    const useGetDataNasabah = () => {
        const getDataNasabah = useGet(['getDataByPembiayaan', idPembiayaan], `/master/nasabah/by-pembiayaan/${idPembiayaan}`, { retry: false, refetchOnWindowFokus: false, enable: idPembiayaan !== null });
        let dataNasabah = null;
        if (getDataNasabah.isSuccess) {
            dataNasabah = getDataNasabah.data;
        }
        
        useEffect(() => {
            if (getDataNasabah.isError) mySwal.error(getDataNasabah.error);
        }, [getDataNasabah.isError]);

        return { dataNasabah, getDataNasabah }
    }

    const { register, control, handleSubmit, getValues, setValue, formState: { errors } } = useForm({
        mode: "all"
    });

    const [produk, setProduk] = useState(null);
    const [idPekerjaan, setIdPekerjaan] = useState(null);
    const [statusMenikah, setStatusMenikah] = useState(null);
    const [tglLahir, setTglLahir] = useState(undefined);
    const [idWilayah, setIdWilayah] = useState('');
    const [idWilayahKantor, setIdWilayahKantor] = useState('');
    const [promo, setPromo] = useState([]);
    const [jenisKelamin, setJenisKelamin] = useState(null);

    const { dataNasabah, getDataNasabah } = useGetDataNasabah();

    const hitUpdateBiaya = usePostUpdateBiaya(mySwal);
    const hitSimpanDebitur = usePostSimpanDataDebitur(mySwal, hitUpdateBiaya, router);
    let statusDebitur = statusMenikah ? statusMenikah.value : null;
    
    const stateNasabah = {
        produk, setProduk,
        statusMenikah, setStatusMenikah,
        tglLahir, setTglLahir,
        idWilayah, setIdWilayah,
        jenisKelamin, setJenisKelamin
    }

    const statePekerjaan = {
        produk, setProduk, setIdPekerjaan, idWilayahKantor, setIdWilayahKantor
    }

    const statePembiayaan = {
        produk, tglLahir, idPekerjaan, promo, setPromo
    }

    const onSubmit = async (formData) => {
        let promo = dataNasabah.data.data[0].promo
        let sbdk = dataNasabah.data.data[0].sbdk;
        
        let nasabah = {
            idProspect: dataNasabah.data.data[0].id_prospek,
            namaNasabah: formData.nama_debitur,
            noIdentitas: formData.no_ktp,
            alamat: formData.alamat_domisili,
            idWilayahNasabah: idWilayah,
            idWilayah: idWilayahKantor,
            telp: formData.no_telepon,
            noHp: formData.no_handphone,
            tptLahir: formData.tempat_lahir,
            tglLahir: formatTanggalDB(formData.tanggal_lahir.startDate),
            jnsKelamin: jenisKelamin,
            // pendapatanBulan: clearFormatRupiah(formData.pendapatan_bulanan),
            // pendapatanLainnya: clearFormatRupiah(formData.penghasilan_lain),
            // pendapatanLainnya2: clearFormatRupiah(formData.ulp),
            pendapatanBulan: formData.pendapatan_bulanan,
            pendapatanLainnya: formData.penghasilan_lain,
            pendapatanLainnya2: formData.ulp,
            idPekerjaan: formData.pekerjaan.value,
            sumberPendapatan: formData.sumber_pendapatan.value,
            ibuKandung: formData.ibu_kandung,
            isMenikah: formData.status_debitur.value,
            idPekerjaanPasangan: formData.status_debitur.value === 1 ? formData.jenis_pekerjaan_pasangan.value : null,
            tglLahirPasangan: formData.status_debitur.value === 1 ? formData.tanggal_lahir_pasangan.startDate : null,
            cif: formData.cif,
            tempatKerjaP: formData.status_debitur.value === 1 ? formData.tempat_kerja_pasangan : null,
            noKk: formData.no_kk,
            alamatDomisili: formData.alamat_domisili,
            tempatLahirP: formData.status_debitur.value === 1 ? formData.tempat_lahir_pasangan : null,
            gajiP: formData.status_debitur.value === 1 ? formData.pendapatan_pasangan : 0,
            penggunaanDana: formData.penggunaan_dana.value,
            jabatan: formData.jabatan,
            pimpinan: formData.nama_pimpinan,
            idwilayahKantor: idWilayahKantor,
            alamatKerja: formData.alamat_kantor,
            namaPasangan: formData.status_debitur.value === 1 ? formData.nama_pasangan : null,
            noKtpPasangan: formData.status_debitur.value === 1 ? formData.no_ktp_pasangan : null,
            aktaNikah: formData.status_debitur.value === 1 ? formData.nomor_akta_nikah : null,
            npwp: formData.npwp,
            officePhone: formData.no_telp_kantor,
            nip: 0,
            isLifetime: formData.status_ktp.value,
            expKtp: formData.status_ktp === "false" ? formData.tanggal_expired_ktp : null,
            kodePos: formData.kode_pos
        };

        let pembiayaan = {
            id: idPembiayaan,
            productId: formData.produk.value,
            jangkaWaktu: formData.jangka_waktu,
            rate: formData.suku_bunga,
            totalAngsuran: formData.angsuran,
            plafon: formData.plafon,
            asuransiId: formData.asuransi.value,
            byProvisi: formData.biaya_provisi,
            byAsuransi: formData.biaya_asuransi,
            byAdministrasi: formData.biaya_administrasi_kredit,
            byFeeKetiga: 0,
            sisaPinjamanPokok: 0,
            sisaPinjamanBunga: 0,
            sbdk: sbdk,
            rateAsuransi: formData.rate_asuransi,
            noRekAfiliasi: formData.no_rek_afiliasi,
            noRekPencairan: null,
            isBap: true,
            promo: camelCase(promo)
        }

        let body = {
            nasabah: nasabah,
            pembiayaan: pembiayaan
        }

        console.log(body);
        hitSimpanDebitur.mutate(body);
    }


    return (
        <>
            <ContainerStepper currentStep={REF_STEP.DATA_DEBITUR} />
            <Card>
                <Card.Body className={'flex gap-4'}>
                    <div className="row-span-6 col-span-3">
                        <FormNasabah data={dataNasabah} stateNasabah={stateNasabah} register={register} errors={errors} control={control} setValue={setValue} getValues={getValues} />
                        {statusDebitur === 1 ? <FormPasangan data={dataNasabah} register={register} errors={errors} control={control} setValue={setValue} getValues={getValues}/> : ''}
                        <FormPekerjaan data={dataNasabah} statePekerjaan={statePekerjaan} register={register} errors={errors} control={control} setValue={setValue} getValues={getValues} />
                        <FormPembiayaan data={dataNasabah} statePembiayaan={statePembiayaan} register={register} errors={errors} control={control} setValue={setValue} getValues={getValues} />
                        <FormBiaya data={dataNasabah} register={register} errors={errors} control={control} setValue={setValue} />
                    </div>
                </Card.Body>
                <Card.Footer>
                    <div className='mt-8 flex flex-wrap justify-between'>
                        <Button variant={'secondary'} onClick={() => router.push('/pengajuan_kredit/simulasi/4201')}> Kembali </Button>
                        <Button 
                            onClick={handleSubmit(onSubmit)}
                            className={`${(hitSimpanDebitur.isLoading) && 'cursor-not-allowed'}`}>
                            {(hitSimpanDebitur.isLoading) && <LoadingSpinner />}
                            {(hitSimpanDebitur.isLoading) ? 'Processing' : 'Simpan & Lanjutkan'}
                        </Button>
                    </div>
                </Card.Footer>
            </Card>

        </>
    )
}

export default DataDebitur