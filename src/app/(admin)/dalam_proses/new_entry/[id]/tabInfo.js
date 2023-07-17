import Skeleton from "react-loading-skeleton"
import { Info } from "./page"
import { formatRupiah, formatTanggal } from "@/lib/utils"

export const TabProfile = ({dataProspek, isLoadingContent}) => {

    return (
        <div id="tab-profile">
            <div className="mb-8">
                <p className="text-muted text-xl mt-4 mb-2 font-inter-medium"> Data Alamat </p>
                <div className='grid grid-cols-3 gap-4'>
                    <Info className={'my-0'} label="Alamat KTP" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : dataProspek.alamat}/>
                    <Info className={'my-0'} label="Alamat Domisili" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : dataProspek.alamatDomisili}/>
                    <Info className={'my-0'} label="Kode POS" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : dataProspek.kodePos} />

                    { dataProspek?.wilayahNasabah && (
                        <>
                            <Info className={'my-0'} label="Kelurahan / Kecamatan" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : `${dataProspek.wilayahNasabah.kelurahan} / ${dataProspek.wilayahNasabah.kecamatan}`} />
                            <Info className={'my-0'} label="Kota" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : `${dataProspek.wilayahNasabah.kotakab}`} />
                            <Info className={'my-0'} label="Provinsi" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : `${dataProspek.wilayahNasabah.provinsi}`} />
                        </>
                    )}
                </div>
            </div>

            {
                dataProspek?.isMenikah ? (
                    <div>
                        <p className="text-muted text-xl mt-4 mb-2 font-inter-medium"> Data Pasangan </p>
                        <div className='grid grid-cols-3 gap-4'>
                            <Info className={'my-0'} label="Nama" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : dataProspek.namaPasangan}/>
                            <Info className={'my-0'} label="No KTP" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : dataProspek.noKtpPasangan}/>
                            <Info className={'my-0'} label="Pekerjaan" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : dataProspek.pekerjaanPasangan?.nmPekerjaan} />
                            <Info className={'my-0'} label="Tempat Lahir" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : dataProspek.tempatLahirP} />
                            <Info className={'my-0'} label="Tanggal Lahir" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  :formatTanggal(dataProspek.tglLahirPasangan)} />
                        </div>
                    </div>
                ) : ''
            }
        </div>
    )
}

export const TabPekerjaan = ({ dataProspek, isLoadingContent}) => {
    return (
        <div id="tab-pekerjaan" className="my-4">
            <div className='grid grid-cols-3 gap-4'>
                <Info label="Pekerjaan" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : dataProspek.pekerjaanName}/>
                <Info label="Jabatan" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : dataProspek.jabatanKerja.nmPekerjaan}/>
                <Info label="NPWP" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : dataProspek.npwp || '-'}/>
            </div>

            <div className='grid grid-cols-3 gap-4'>
                <Info label="Nama Kantor" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : dataProspek.officeName}/>
                <Info label="Alamat Kantor" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : dataProspek.officeAddress}/>
                <Info label="Nama Pimpinan" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : dataProspek.pimpinan || '-'}/>
            </div>

            <div className='grid grid-cols-3 gap-4'>
                <Info label="Sumber Pendapatan" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : dataProspek.sumberPendapatan}/>
                <Info label="Pendapatan Bulanan" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : formatRupiah(dataProspek.pendapatanBulan)}/>
                <Info label="Penghasilan Lain" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : formatRupiah(dataProspek.pendapatanLainnya)}/>
            </div>

            <div className='grid grid-cols-3 gap-4'>
                <Info label="ULP" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : formatRupiah(dataProspek.pendapatanLainnya2)}/>
                <Info label="Jenis Usaha Sampingan" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : dataProspek.jenisUsahaSampingan}/>
            </div>

        </div>
    )
}

export const TabPembiayaan = ({ dataProspek, isLoadingContent }) => {
    return (
        <div id="tab-pekerjaan" className="my-4">
            <div className='grid grid-cols-3 gap-4'>
                <Info label="Produk" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : dataProspek.productName}/>
                <Info label="Pekerjaan" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : dataProspek.pekerjaanName}/>
                <Info label="Suku Bunga" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : `${dataProspek.rate}%`}/>

                <Info label="Jangka Waktu" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : `${dataProspek.jangkaWaktu} Bulan`}/>
                <Info label="Jangka Waktu Promo" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : dataProspek.promo ? `${dataProspek.promo.bulanPromo} Bulan` : '-'} />
                <Info label="Suku Bunga Promo" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : dataProspek.promo ? `${dataProspek.promo.ratePromo}%` : '-'}/>


                <Info label="Asuransi" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : dataProspek.pekerjaan.nmPekerjaan}/>
                <Info label="Rate Asuransi" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : `${dataProspek.rateAsuransi}%`}/>
                <Info label="Plafon" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : formatRupiah(dataProspek.plafon)}/>

                <Info label="Angsuran / bulan" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : formatRupiah(dataProspek.totalAngsuran)}/>                
                <Info label="Angsuran Promo / bulan " value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : formatRupiah(dataProspek.promo.angsuranPromo)}/>
                <Info label="Angsuran Normal (Setelah Promo)" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : formatRupiah(dataProspek.promo.angsuranNormal)}/>

                <Info label="Tujuan Penggunaan Dana" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : dataProspek.npwp || '-'}/>                
            </div>

            <div className="mt-4">
                <p className="text-muted text-xl font-inter-medium mb-2"> Data Biaya </p>
                <div className='grid grid-cols-4 gap-4'>
                    <Info label="Biaya Provisi" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : formatRupiah(dataProspek.byProvisi)}/>
                    <Info label="Biaya Asuransi" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : formatRupiah(dataProspek.byAsuransi)}/>
                    <Info label="Biaya Administrasi" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : formatRupiah(dataProspek.byAdministrasi)}/>
                    <Info label="Biaya Administrasi Kredit" value={isLoadingContent ? <Skeleton height={15} borderRadius={'0.5rem'}/>  : formatRupiah(dataProspek.byAdmKredit)}/>
                </div>
            </div>
            
        </div>
    )
}