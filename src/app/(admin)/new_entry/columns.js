import Dropdown, { DropdownItem } from "@/components/Dropdown";
import { formatRupiah } from "@/lib/utils";

const DropdownAction = () => {
    return (
        <Dropdown>
            <DropdownItem href="/form"> Lihat Data </DropdownItem>
            <DropdownItem href="/form"> Ubah Data </DropdownItem>
            <DropdownItem href="/form"> Hapus </DropdownItem>
            <DropdownItem href="/form"> Kirim Proses </DropdownItem>
            <DropdownItem href="/form"> Approve Pengajuan </DropdownItem>
            <DropdownItem href="/form"> Non Aktif User</DropdownItem>
            <DropdownItem href="/form"> Inquiry </DropdownItem>
            <DropdownItem href="/form"> Slik </DropdownItem>
            <DropdownItem href="/form"> Simulasi </DropdownItem>
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
        name: 'Alamat',
        selector: (row) => row.alamat,
        cellExport: row => row.alamat,
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