import Dropdown, { DropdownItem } from "@/components/Dropdown";
import { formatRupiah } from "@/lib/utils";

const DropdownAction = () => {
    return (
        <Dropdown>
            <DropdownItem href="#">Simulasi Calon Nasabah</DropdownItem>
            <DropdownItem href="#">Ubah Data</DropdownItem>
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
        omit: true
    },
    {
        name: 'Aksi',
        cell: (row, index, column, id) => <DropdownAction/>,
        ignoreRowClick: false,
        allowOverflow: true,
        button: true,
    },
    {
        name: 'Jenis Nasabah',
        selector: (row) => row.idChannel === 2 ? <span className="bg-secondary text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-secondary dark:text-white">SIP</span> : <span className="bg-primary text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-primary dark:text-white">Calon Nasabah</span>,
        cellExport: row => row.idChannel,
        sortable: true,
        center: false,
        wrap: true,
        grow: 2
    },
    {
        name: 'Nama Nasabah',
        selector: (row) => row.nasabah.namaNasabah,
        cellExport: row => row.nasabah.namaNasabah,
        sortable: true,
        center: false,
        wrap: true,
        grow: 3
    },
    {
        name: 'Produk',
        selector: (row) => row.product.prodName,
        cellExport: row => row.product.prodName,
        sortable: true,
        center: false,
        wrap: true,
        grow: 4
    },
    {
        name: 'Cabang',
        selector: (row) => row.branch.branchName,
        cellExport: row => row.branch.branchName,
        sortable: true,
        center: false,
        wrap: true,
        grow: 2
    },
    {
        name: 'Plafon',
        selector: (row) => row.promo ? formatRupiah(row.promo.angsuranNormal) : formatRupiah(row.totalAngsuran),
        cellExport: row => row.promo ? formatRupiah(row.promo.angsuranNormal) : formatRupiah(row.totalAngsuran),
        sortable: true,
        center: false,
        wrap: true,
        grow: 1
    },
    {
        name: 'Jangka Waktu',
        selector: (row) => row.jangkaWaktu,
        cellExport: row => row.jangkaWaktu,
        sortable: true,
        center: false,
        wrap: true,
    },
    {
        name: 'Angsuran Normal',
        selector: (row) => row.promo ? formatRupiah(row.promo.angsuranNormal) : formatRupiah(row.totalAngsuran),
        cellExport: row => row.promo ? formatRupiah(row.promo.angsuranNormal) : formatRupiah(row.totalAngsuran),
        sortable: true,
        center: false,
        wrap: true,
    },
    {
        name: 'Angsuran Promo',
        selector: (row) => row.nmProspek,
        cellExport: row => row.nmProspek,
        sortable: true,
        center: false,
        wrap: true,
    },
    {
        name: 'Status',
        selector: (row) => row.nmProspek,
        cellExport: row => row.nmProspek,
        sortable: true,
        center: false,
        wrap: true,
    },
    {
        name: 'Hasil Analisa',
        selector: (row) => row.nmProspek,
        cellExport: row => row.nmProspek,
        sortable: true,
        center: false,
        wrap: true,
    },
]