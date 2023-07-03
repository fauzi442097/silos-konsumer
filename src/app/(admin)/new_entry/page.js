'use client'
import React, { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import DropdownButton from "@/components/DropdownButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import Card from "@/components/Card";
import Button from "@/components/Button";
import MyDataTable from "@/components/Datatable/MyDatatable";
import LoadingTable from "@/components/Datatable/LoadingTable";
import CheckboxTable from "@/components/Datatable/CheckboxTable";


const Page = () => {

    const router = useRouter();

    const [listNewEntry, setListNewEntry] = useState([]);
    useEffect(() => {
        const getNewEntry = async () => {
            const res = await fetch('https://dummyjson.com/products');
            const data = await res.json();

            console.log(data.products);
            setListNewEntry(data.products);
        }
        getNewEntry();
    }, []);

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

    return (
        <>
            <Breadcrumbs/>
            <Card>
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        New Entry
                    </h3>
                    <Button.Icon 
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800"
                        onClick={() => router.push(`/new_entry/form`)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/></svg>
                        <span className="ml-3">
                            Tambah Data
                        </span>
                    </Button.Icon>
                </div>
                <MyDataTable
                    // fixedHeader={false}
                    fixedHeaderScrollHeight="500px"
                    columns={columns}
                    data={listNewEntry}
                    selectableRows={true}
                    pagination={true}
                    paginationPerPage={10}
                    responsive={true}
                    progressPending={false}
                    selectableRowsComponent={CheckboxTable}
                    progressComponent={<LoadingTable />}
                // contextActions={<Button.LightPrimary onClick={() => alert('on progress')}>Hapus</Button.LightPrimary>}
                >
                </MyDataTable>
            </Card>
        </>
    )

}

export default Page