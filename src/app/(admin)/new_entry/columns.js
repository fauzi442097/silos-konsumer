import DropdownFunc from "@/components/Dropdown";
import DropdownButton from "@/components/DropdownButton";
import { formatRupiah } from "@/lib/utils";
import { useRef, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';

export const MyDropdown = ()  => {
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

        // <Dropdown>
            

        //     <Dropdown.Toggle className="relative z-5 block p-2 text-gray-700 bg-white border rounded-md  focus:ring-primary focus:ring-1 dark:border-[#5a5b5e] dark:bg-transparent dark:focus:ring-primary-800 focus:outline-none group "> 
        //         <svg className="w-6 h-6 group-focus:text-primary dark:text-grey dark:group:focus:text-primary-800" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
        //     </Dropdown.Toggle>

        //     <Dropdown.Menu 
        //         className="z-50 py-3 mt-2 origin-top-left bg-white rounded-lg dark:bg-dark-depth3 min-w-max"
        //         style={{ 
        //             boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'
        //          }}
        //     >
        //         <Dropdown.Item className="dropdown-item" href="#/action-1">Action</Dropdown.Item>
        //         <Dropdown.Item className="dropdown-item" href="#/action-2">Another action</Dropdown.Item>
        //         <Dropdown.Item className="dropdown-item" href="#/action-3">Something else</Dropdown.Item>
        //     </Dropdown.Menu>
        // </Dropdown>
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
        cell: (row, index, column, id) => <DropdownFunc placement="right" offset={{ horizontal: 0, vertical: 0 }}>
             <div>1 asdf</div>
            <div>2 asdf</div>
            <div>3 asdf</div>
            <div>4 asdf</div>
            <div>5 asdf</div>
            <div>6 asdf</div>
            <div>7 asdf</div>
            <div>8 asdf</div>
            <div>9 asdf</div>
            <div>10 asdf</div>
        </DropdownFunc>,
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