import { formatRupiah } from "@/lib/utils";
import Dropdown, { DropdownItem } from "@/components/Dropdown";

const DropdownAction = (data) => {
    let id = data.data.id;

    return (
        <Dropdown>
            <DropdownItem href="#">Data Simulasi</DropdownItem>
            <DropdownItem href={`/pengajuan_kredit/data_debitur/${id}`}>Proses Pengajuan</DropdownItem>
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
        cell: (row, index, column, id) => <DropdownAction data={row}/>,
        ignoreRowClick: false,
        allowOverflow: true,
        button: true,
    },
    {
        name: 'Nama Debitur',
        selector: (row) => row.nmProspek,
        cellExport: row => row.nmProspek,
        sortable: true,
        center: true,
        wrap: false,
    },
    {
        name: 'Produk',
        selector: (row) => row.productName,
        cellExport: row => row.productName,
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
    }
]