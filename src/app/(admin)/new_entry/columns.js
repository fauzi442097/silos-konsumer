import DropdownButton from "@/components/DropdownButton";

const columns = [
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
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },
    {
        name: 'Nama Nasabah',
        selector: (row) => row.brand,
        cellExport: row => row.brand,
        sortable: true,
        center: false,
    },
    {
        name: 'Alamat',
        selector: (row) => row.description,
        cellExport: row => row.description,
        sortable: true,
        center: false,
    },
    {
        name: 'Produk',
        selector: (row) => row.title,
        cellExport: row => row.title,
        sortable: true,
        center: false,
    },
    {
        name: 'Plafon',
        selector: (row) => row.price,
        cellExport: row => row.price,
        sortable: true,
        center: false,
    },
    {
        name: 'Jangka Waktu',
        selector: (row) => row.stock,
        cellExport: row => row.stock,
        sortable: true,
        center: false,
    },
    {
        name: 'Angsuran',
        selector: (row) => row.rating,
        cellExport: row => row.rating,
        sortable: true,
        center: false,
    }
];