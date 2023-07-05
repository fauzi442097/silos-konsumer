import Dropdown, { DropdownItem } from "@/components/Dropdown";

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
        </Dropdown>
    )
}

const columns = [
    {
        name: 'Action',
        cell: (row, index, column, id) => <DropdownAction/>,
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