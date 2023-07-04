import Button from "@/components/Button";
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
        name: 'Id',
        selector: (row) => row.id,
        cellExport: row => row.id,
        sortable: true,
        center: false,
    },
    {
        name: 'First Name',
        selector: (row) => row.firstName,
        cellExport: row => row.firstName,
        sortable: true,
        filterable: true,
        center: false
    },
    {
        name: 'Last Name',
        selector: (row) => row.lastName,
        cellExport: row => row.lastName,
        sortable: true,
        center: false,
    },
    {
        name: 'Email',
        selector: (row) => row.email,
        cellExport: row => row.email,
        sortable: true,
        center: false,
        wrap: true,
        grow: 2
    },
    {
        name: 'Age',
        selector: (row) => row.age,
        cellExport: row => row.age,
        sortable: true,
        center: false
    },
    {
        name: 'Gender',
        selector: (row) => row.gender,
        cellExport: row => row.gender,
        sortable: true,
        center: false
    },
    {
        name: 'Phone',
        selector: (row) => row.phone,
        cellExport: row => row.phone,
        sortable: true,
        center: false
    },
    {
        name: 'Birth Date',
        selector: (row) => row.birthDate,
        cellExport: row => row.birthDate,
        sortable: true,
        center: true
    },
    
  ];

export default columns;