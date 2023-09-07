import { formatRupiah } from "@/lib/utils";
import Badge from '@/components/Badge'
import Dropdown, { DropdownItem } from "@/components/Dropdown";

const DropdownAction = (data) => {
    console.log(data);
    let id = data.data.id;

    return (
        <Dropdown>
            <DropdownItem href="#">Data Simulasi</DropdownItem>
            <DropdownItem href={`/pengajuan_kredit/data_debitur_pembiayaan/${id}`}>Proses Pengajuan</DropdownItem>
        </Dropdown>
    )
}

const JenisDebitur = (data) => {
    let jenis = '';

    if(data.idChannel == 2) {
        jenis = <Badge variant={'primary'}> SIP </Badge>
    } else {
        jenis = <Badge variant={'success'}> Calon Debitur </Badge>
    }

    return (
        jenis
    )
}

const StatusDebitur = (data) => {
    let status = '';

    if (data.bicheck) {
        if (data.bicheck.biCheckStatusId) {
            status = <Badge variant={'success'}> Completed </Badge>
        } else {
            if (data.bicheck.document.length > 0) {
                status = <Badge variant={'warning'}> Uploaded </Badge>
            } else {
                status = <Badge variant={'warning'}> Progress Slik </Badge>
            }
        }
    } else {
        status = <Badge variant={'danger'}> Slik Checking </Badge>
    }
    
    return (
        status
    )
}

const HasilScoring = (data) => {
    let hasil = '';

    if (data.scoringRange) {
        let hasilScoring = data.scoringRange.isLayak;
        if (hasilScoring) {
            hasil = <Badge variant={'success'}> Layak </Badge>;
        } else {
            hasil = <Badge variant={'danger'}> Tidak Layak </Badge>;
        }
    } else {
        hasil = '';
    }

    return (
        hasil
    )
}

export const columns = [
    {
        name: 'ID',
        selector: (row) => row.id,
        sortable: true,
        center: true,
        wrap: true,
        omit: true
    },
    {
        name: 'Aksi',
        cell: (row, index, column, id) => <DropdownAction data={row}/>,
        ignoreRowClick: false,
        allowOverflow: true,
        button: true,
    },
    {
        name: 'Nama Debitur',
        selector: (row) => row.nasabah.namaNasabah,
        cellExport: row => row.nasabah.namaNasabah,
        sortable: true,
        center: true,
        wrap: false,
    },
    {
        name: 'Jenis Debitur',
        cell: (row, index, column, id) => <JenisDebitur data={row}/>,
        ignoreRowClick: false,
        allowOverflow: true,
        button: true,
    },
    {
        name: 'Produk',
        selector: (row) => row.product.prodName,
        cellExport: row => row.product.prodName,
        sortable: true,
        center: false,
        wrap: true,
        grow: 2
    },
    {
        name: 'Plafon',
        selector: (row) => formatRupiah(row.plafon),
        cellExport: row => formatRupiah(row.plafon),
        sortable: true,
        right: true,
        wrap: true,
    },
    {
        name: 'Jangka Waktu (Bulan)',
        selector: (row) => row.jangkaWaktu,
        cellExport: row => row.jangkaWaktu,
        sortable: true,
        right: false,
        wrap: true,
    },
    {
        name: 'Angsuran',
        selector: (row) => row.promo ? formatRupiah(row.promo.angsuranNormal) : formatRupiah(row.totalAngsuran),
        cellExport: row => row.promo ? formatRupiah(row.promo.angsuranNormal) : formatRupiah(row.totalAngsuran),
        sortable: true,
        right: true,
        wrap: false,
    },
    {
        name: 'Angsuran Promo',
        selector: (row) => row.promo ? formatRupiah(row.promo.angsuranPromo) : 0,
        cellExport: row => row.promo ? formatRupiah(row.promo.angsuranPromo) : 0,
        sortable: true,
        right: true,
        wrap: true,
    },
    {
        name: 'Status',
        cell: (row, index, column, id) => <StatusDebitur data={row}/>,
        ignoreRowClick: false,
        allowOverflow: true,
        button: true,
    },
    {
        name: 'Hasil Analisa',
        cell: (row, index, column, id) => <HasilScoring data={row}/>,
        ignoreRowClick: false,
        allowOverflow: true,
        button: true,
    }
]