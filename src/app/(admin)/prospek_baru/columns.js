import Dropdown, { DropdownItem } from "@/components/Dropdown";
import { formatRupiah } from "@/lib/utils";

const DropdownAction = () => {
    return (
        <Dropdown>
            <DropdownItem href="/lanjutkan"> Lanjutkan </DropdownItem>
            <DropdownItem href="/batal_pengajuan_prospek"> Batalkan Pengajuan Prospek </DropdownItem>
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
        name: 'Nama Nasabah',
        selector: (row) => row.nmProspek,
        cellExport: row => row.nmProspek,
        sortable: true,
        center: false,
        wrap: true,
    },
    {
        name: 'NIK',
        selector: (row) => row.noIdentitas,
        cellExport: row => row.noIdentitas,
        sortable: true,
        center: false,
        wrap: true,
    },
    {
        name: 'Produk',
        selector: (row) => row.productName,
        cellExport: row => row.productName,
        sortable: true,
        center: false,
        wrap: true,
    },
    {
        name: 'Cabang',
        selector: (row) => row.branchName,
        cellExport: row => row.branchName,
        sortable: true,
        center: false,
        wrap: true,
    },
    {
        name: 'Plafon',
        selector: (row) => formatRupiah(row.plafon),
        cellExport: row => formatRupiah(row.plafon),
        sortable: true,
        center: false,
        wrap: true,
    },
    {
        name: 'Jangka Waktu (Bulan)',
        selector: (row) => row.jangkaWaktu,
        cellExport: row => row.jangkaWaktu,
        sortable: true,
        center: false,
        wrap: true,
    },
    {
        name: 'Angsuran',
        selector: (row) => row.promo ? formatRupiah(row.promo.angsuranNormal) : formatRupiah(row.totalAngsuran),
        cellExport: row => row.promo ? formatRupiah(row.promo.angsuranNormal) : formatRupiah(row.totalAngsuran),
        sortable: true,
        center: false,
        wrap: true,
    },
    {
        name: 'Angsuran Promo',
        selector: (row) => row.promo ? formatRupiah(row.promo.angsuranPromo) : '',
        cellExport: row => row.promo ? formatRupiah(row.promo.angsuranPromo) : '',
        sortable: true,
        center: false,
        wrap: true,
    },
];