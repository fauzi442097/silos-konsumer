import Dropdown, { DropdownItem } from "@/components/Dropdown";
import { formatRupiah } from "@/lib/utils";

const DropdownAction = ({row}) => {

    console.log(row)
    return (
        <Dropdown>
            <DropdownItem href={`/dalam_proses/new_entry/${row.id}`}> Lihat Data </DropdownItem>
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
        omit: true
    },
    {
        name: 'Aksi',
        cell: (row, index, column, id) => <DropdownAction row={row}/>,
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
        wrap: true
    },
    {
        name: 'Produk',
        selector: (row) => row.productName,
        cellExport: row => row.productName,
        sortable: true,
        center: false,
        wrap: true
    },
    {
        name: 'Plafon',
        selector: (row) => formatRupiah(row.plafon),
        cellExport: row => row.plafon,
        // format: (row) => formatRupiah(row.plafon),
        sortable: true,
        right: true,
        wrap: true
    },
    {
        name: 'Jangka Waktu (Bulan)',
        selector: (row) => row.jangkaWaktu,
        cellExport: row => row.jangkaWaktu,
        sortable: true,
        right: true,
        wrap: true,
    },
    {
        name: 'Angsuran',
        selector: (row) => formatRupiah(row.totalAngsuran),
        cellExport: row => row.totalAngsuran,
        // format: (row) => formatRupiah(row.totalAngsuran),
        sortable: true,
        right: true,
        wrap: true
    }
];