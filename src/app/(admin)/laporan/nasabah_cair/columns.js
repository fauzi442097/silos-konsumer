import Dropdown, { DropdownItem } from "@/components/Dropdown";
import { formatRupiah, formatTanggal } from "@/lib/utils";

const DropdownAction = () => {
    return (
        <Dropdown>
            <DropdownItem href="/form"> Lihat Data </DropdownItem>
            <DropdownItem href="/form"> Ubah Data </DropdownItem>
            <DropdownItem href="/form"> Slik </DropdownItem>
            <DropdownItem href="/form"> Upload Dokumen Slik </DropdownItem>
            <DropdownItem href="/form"> Checklist Dokumen </DropdownItem>
            <DropdownItem href="/form"> Edit Biaya Lainnya </DropdownItem>
            <DropdownItem href="/form"> Kirim Prospek </DropdownItem>
        </Dropdown>
    )
}


export const columns = [
    {
        name: 'ID',
        selector: (row) => row.id,
        sortable: true,
        center: true,
        wrap: true,
        omit: true,
        grow: 2
    },
    {
        name: 'Aksi',
        cell: (row, index, column, id) => <DropdownAction/>,
        ignoreRowClick: false,
        allowOverflow: true,
        button: true,
    },
    {
        name: 'Nama Nasabah',
        selector: (row) => row.namaNasabah,
        cellExport: row => row.namaNasabah,
        sortable: true,
        center: false,
        wrap: true,
        grow: 2
    },
    {
        name: 'NIK',
        selector: (row) => row.noIdentitas,
        cellExport: row => row.noIdentitas,
        sortable: true,
        center: false,
        wrap: true,
        grow: 2
    },
    {
        name: 'Produk',
        selector: (row) => row.prodName,
        cellExport: row => row.prodName,
        sortable: true,
        center: false,
        wrap: true,
        grow: 2
    },
    {
        name: 'Cabang',
        selector: (row) => row.branchName,
        cellExport: row => row.branchName,
        sortable: true,
        center: false,
        wrap: true,
        grow: 2
    },
    {
        name: 'Plafon',
        selector: (row) => formatRupiah(row.plafon),
        cellExport: row => row.plafon,
        sortable: true,
        right: true,
        wrap: true,
        grow: 2
    },
    {
        name: 'Jangka Waktu (Bulan)',
        selector: (row) => row.jangkaWaktu,
        cellExport: row => row.jangkaWaktu,
        sortable: true,
        right: true,
        wrap: true,
        grow: 2
    },
    {
        name: 'Tanggal Cair',
        selector: (row) => formatTanggal(row.tglCair),
        cellExport: row => row.tglCair,
        sortable: true,
        right: true,
        wrap: true,
        grow: 3
    },
    {
        name: 'Petugas',
        selector: (row) => row.totalAngsuran,
        cellExport: row => row.totalAngsuran,
        sortable: true,
        right: true,
        wrap: true,
        grow: 2
    },
    {
        name: 'Status Kirim SIP',
        selector: (row) => row.totalAngsuran,
        cellExport: row => row.totalAngsuran,
        sortable: true,
        right: true,
        wrap: true,
        grow: 2
    }
];