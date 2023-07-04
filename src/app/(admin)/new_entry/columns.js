import DropdownButton from "@/components/DropdownButton";
import { formatRupiah } from "@/lib/utils";
import { useRef } from "react";

export const Dropdown = ()  => {
    const dropdownRef = useRef('')
    return (
        <DropdownButton divRef={dropdownRef}>
            <li>
                <a href="#" className="dropdown-item">
                    <span className="ml-3">
                        Ubah Data
                    </span>
                </a>
            </li>
            <li>
                <a href="#" className="dropdown-item">
                    <span className="ml-3">
                        Slik
                    </span>
                </a>
            </li>
            <li>
                <a href="#" className="dropdown-item">
                    <span className="ml-3">
                        Checklist Dokumen
                    </span>
                </a>
            </li>
            <li>
                <a href="#" className="dropdown-item">
                    <span className="ml-3">
                        Edit Biaya Lainnya
                    </span>
                </a>
            </li>
            <li>
                <a href="#" className="dropdown-item">
                    <span className="ml-3">
                        Kirim Prospek
                    </span>
                </a>
            </li>
        </DropdownButton>
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
        cell: (row, index, column, id) => <Dropdown/>,
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