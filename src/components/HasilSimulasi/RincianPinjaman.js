import React from 'react'
import Button, { buttonVariants } from '../Button'
import Dropdown from '../Dropdown'
import { cn, formatRupiah } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '../LoadingSpinner'

const InfoBiaya = ({ label, value }) => {
    return (
        <div className='flex justify-between items-center mb-2'>
            <p className="mb-0"> {label}</p>
            <p className="text-primary font-inter-medium mb-0">Rp {value}</p>
        </div>
    )
}

const RincianPinjaman = ({ hitStoreSimulasi, hitAjukanPinjaman, setShowModal, closeModal, data, dataSimulasi }) => {
    const router = useRouter();
    let totalBiaya = Number(data.dataBiaya.biaya[0].nominal) + Number(data.dataBiaya.biaya[1].nominal) + Number(data.dataBiaya.biaya[2].nominal) + Number(data.dataBiaya.biaya[3].nominal)
    let estimasiBiaya = Number(data.plafon) - Number(totalBiaya);

    let bodySimulasi = {
        channelId: 1,
        nmProspek: dataSimulasi.namaDebitur,
        tglLahir: dataSimulasi.tglLahir,
        isMenikah: dataSimulasi.isMenikah,
        productId: dataSimulasi.productId,
        pekerjaanId: dataSimulasi.idPekerjaan,
        pendapatanBulan: dataSimulasi.pendapatanBulan ? dataSimulasi.pendapatanBulan : 0,
        pendapatanLainnya: dataSimulasi.pendapatanLainnya ? dataSimulasi.pendapatanLainnya : 0,
        pendapatanLainnya2: dataSimulasi.pendapatanLainnya2 ? dataSimulasi.pendapatanLainnya2 : 0,
        jangkaWaktu: dataSimulasi.jangkaWaktu,
        totalAngsuran: data.angsuranBulan,
        plafon : data.plafon,
        asuransiId: data.dataBiaya.asuransiId,
        rate : dataSimulasi.rate,
        rateAsuransi : data.dataBiaya.rateAsuransi,
        byProvisi : data.dataBiaya.biaya[1].nominal,
        byAsuransi : data.dataBiaya.biaya[2].nominal,
        byAdministrasi : data.dataBiaya.biaya[3].nominal,
        byFeeKetiga : data.dataBiaya.biaya[4].nominal,
        promo : data.promo,
        cifid : dataSimulasi.cif,
        noRekAfiliasi : dataSimulasi.nomorRekening,
        noIdentitas: dataSimulasi.noKtp
    };

    const handleSimpanSimulasi = () => {
        hitStoreSimulasi.mutate(bodySimulasi);
        setShowModal(false);
    }

    const handleAjukanPinjaman = () => {
        hitAjukanPinjaman.mutate(bodySimulasi)
        // setShowModal(false);
    }

    return (
        <div className="div">
            <div className="flex flex-row">
                <div className="basis-1/2">
                    {data.promo ? <p className="text-semibold mb-2">Angsuran setalah promo sebesar</p> : <p className="text-semibold mb-2">Angsuran sebesar</p>}
                    
                    <p className="text-3xl text-primary font-inter-bold mb-0">Rp {data.promo ? formatRupiah(data.promo.angsuranNormal) : formatRupiah(data.angsuranBulan)}  <span className="text-primary font-inter-semibold"> / bulan</span> </p>
                    <p className="mt-0"> dari total pinjaman <span className="text-primary font-inter-bold text-lg"> Rp {formatRupiah(data.plafon)} </span></p>
                    <Button variant="outline" className="mr-3" onClick={closeModal}> Hitung Ulang </Button>
                </div>
                <div className="basis-1/2 bg-gray-100 dark:bg-dark-depth2 rounded-lg text-sm p-4 italic self-start">
                    <p className='mb-1'> Catatan: </p>
                    <span>
                        Cicilan ini setara dengan <span className="font-inter-medium"> {parseFloat(data.angsuranGaji).toFixed(2)} % </span> dari penghasilan bulanan <span className='text-primary font-inter-medium'> Rp {formatRupiah(data.input.totalPenghasilan)} </span> dengan  <strong className="font-semibold text-gray-900 dark:text-white"> sisa penghasilan </strong> sebesar
                        <span className='text-primary font-inter-medium'> Rp {formatRupiah(data.sisaGaji)} </span>
                    </span>
                </div>
            </div>

            <hr className="h-px my-4 bg-gray-400 border-0 dark:border-[#2f3237]"></hr>


            {data.promo && (<>
                <div className='flex justify-between items-center'>
                    <p className="text-lg font-inter-medium mb-0">Angsuran promo sebesar</p>
                    <p className="text-lg text-primary font-inter-medium mb-0">Rp {formatRupiah(data.promo.angsuranPromo)} </p>
                </div>
                <hr className="h-px my-4 bg-gray-400 border-0 dark:border-[#2f3237]"></hr>
            </>
            )}


            <p className='text-lg text-muted font-inter-medium dark:text-grey mb-6'> Biaya - Biaya </p>

            <InfoBiaya label={'Biaya Notaris'} value={formatRupiah(Number(data.dataBiaya.biaya[0].nominal))} />
            <InfoBiaya label={'Biaya Asuransi'} value={formatRupiah(Number(data.dataBiaya.biaya[2].nominal))} />
            <InfoBiaya label={'Biaya Provisi'} value={formatRupiah(Number(data.dataBiaya.biaya[1].nominal))} />
            <InfoBiaya label={'Biaya Administrasi'} value={formatRupiah(Number(data.dataBiaya.biaya[3].nominal))} />
            {/* <InfoBiaya label={'Biaya Pihak Ketiga'} value={formatRupiah(Number(data.dataBiaya.biaya[4].nominal))}/> */}

            <div className='flex justify-between items-center mb-4'>
                <p className="text-lg mb-0 font-inter-medium">Total Biaya Lainnya </p>
                <p className="text-lg text-primary font-inter-medium mb-0">Rp {formatRupiah(totalBiaya)}</p>
            </div>

            <div className='flex justify-between items-center mb-4'>
                <p className="text-lg mb-0 font-inter-medium">Estimasi Dana Diterima </p>
                <p className="text-lg text-primary font-inter-medium mb-0">Rp {formatRupiah(estimasiBiaya)}</p>
            </div>

            <hr className="h-px my-4 bg-gray-400 border-0 dark:border-[#2f3237]"></hr>

            {parseFloat(data.angsuranGaji).toFixed() > 90 && (<><div className="flex flex-row">
                <div className="basis-full">
                    <span>Rasio ini sudah <strong className="font-inter-semibold text-red-600 dark:text-white">berbahaya</strong>, berpotensi mengganggu cash flow mu dimasa depan. <br></br> Karena angsuran perbulan telah melebihi 90% gaji</span>
                </div>
            </div>
                <hr className="h-px my-4 bg-gray-400 border-0 dark:border-[#2f3237]"></hr>
            </>)}


            <div className='flex flex-row justify-between'>
                <Dropdown
                    position='top'
                    className={cn([buttonVariants({ variant: 'secondary' })], 'mr-3')}
                    text={<><svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path fill="currentColor" d="M408 112H106a58 58 0 0 0-58 58v158a56 56 0 0 0 56 56h8v39.68A40.32 40.32 0 0 0 152.32 464h207.36A40.32 40.32 0 0 0 400 423.68V384h8a56 56 0 0 0 56-56V168a56 56 0 0 0-56-56Zm-40 311.68a8.35 8.35 0 0 1-8.32 8.32H152.32a8.35 8.35 0 0 1-8.32-8.32V264.32a8.35 8.35 0 0 1 8.32-8.32h207.36a8.35 8.35 0 0 1 8.32 8.32Zm26-215.76a24 24 0 1 1 22-22a24 24 0 0 1-22 22ZM344 48H168a56.09 56.09 0 0 0-55.42 48h286.84A56.09 56.09 0 0 0 344 48Z" /></svg> Cetak </>}>
                    <button className="dropdown-item" onClick={() => handleShowModalReject(row.id)}> Estimasi Biaya </button>
                    <button className="dropdown-item" onClick={() => handleShowModalReject(row.id)}> Formulir Permohonan </button>
                </Dropdown>

                <div>
                    <Button 
                        onClick={handleSimpanSimulasi}
                        variant={'light'}
                        className={`mr-3 ${(hitStoreSimulasi.isLoading) && 'cursor-not-allowed'}`}> 
                        {(hitStoreSimulasi.isLoading) && <LoadingSpinner />}
                        {(hitStoreSimulasi.isLoading) ? 'Processing' : 'Simpan Simulasi'}
                    </Button>
                    <Button 
                        onClick={handleAjukanPinjaman}
                        className={`mr-3 ${(hitAjukanPinjaman.isLoading) && 'cursor-not-allowed'}`}
                    >
                    {(hitAjukanPinjaman.isLoading) && <LoadingSpinner />}
                    {(hitAjukanPinjaman.isLoading) ? 'Processing' : 'Ajukan Pinjaman'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default RincianPinjaman