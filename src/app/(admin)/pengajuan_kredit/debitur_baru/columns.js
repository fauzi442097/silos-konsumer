import Dropdown, { DropdownItem } from "@/components/Dropdown";
import { formatRupiah } from "@/lib/utils";
import Badge from "@/components/Badge";

const DropdownAction = () => {
    return (
        <Dropdown>
            <DropdownItem href="#">Data Simulasi</DropdownItem>
            <DropdownItem href="/prospek_baru/debitur_baru/pengajuan">Proses Pengajuan</DropdownItem>
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
        grow: 3
    },
    {
        name: 'NIK',
        selector: (row) => row.noIdentitas,
        cellExport: row => row.noIdentitas,
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
        grow: 3
    },
    {
        name: 'Plafon',
        selector: (row) => formatRupiah(row.plafon),
        cellExport: row => formatRupiah(row.plafon),
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
        selector: (row) => row.promo ? formatRupiah(row.promo.angsuranPromo) : formatRupiah(0),
        cellExport: row => row.promo ? formatRupiah(row.promo.angsuranPromo) : formatRupiah(0),
        sortable: true,
        center: false,
        wrap: true,
    },
]