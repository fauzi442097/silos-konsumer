import DropdownButton from "@/components/DropdownButton";
import { formatRupiah } from "@/lib/utils";

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
        name: 'Action',
        cell: (row, index, column, id) => <DropdownButton>
                <li>
                    <a href="#" className="flex items-center px-3 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="ml-3">
                            Ubah Data
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center px-3 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="ml-3">
                            Slik
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center px-3 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="ml-3">
                            Checklist Dokumen
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center px-3 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="ml-3">
                            Edit Biaya Lainnya
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center px-3 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="ml-3">
                            Kirim Prospek
                        </span>
                    </a>
                </li>
            </DropdownButton>,
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