'use client'

import Button from '@/components/Button';
import Card from '@/components/Card';
import CheckboxTable from '@/components/Datatable/CheckboxTable';
import LoadingTable from '@/components/Datatable/LoadingTable';
import MyDataTable from '@/components/Datatable/MyDatatable';
import React, { useEffect, useState } from 'react'


const Page = () => {
   
  const [ listUsers, setListUsers] = useState([]);
  useEffect(() => {
      const getUsers = async () => {
         const res = await fetch('https://dummyjson.com/users');
         const users = await res.json();
         setListUsers(users.users);
      }

      getUsers();
  }, []);

  const columns = [
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
        center: false
    },
    {
        name: 'Last Name',
        selector: (row) => row.lastName,
        cellExport: row => row.lastName,
        sortable: true,
        center: false
    },
    {
        name: 'Email',
        selector: (row) => row.email,
        cellExport: row => row.email,
        sortable: true,
        center: false
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
    {
        name: 'Alamat',
        selector: (row) => row.address.address,
        cellExport: row => row.address.address,
        sortable: true,
        center: true
    },
    {
        name: 'Tinggi Badan',
        selector: (row) => row.height,
        cellExport: row => row.height,
        sortable: true,
        center: true
    },
    {
        name: 'Berat Badan',
        selector: (row) => row.weight,
        cellExport: row => row.weight,
        sortable: true,
        center: true
    },
    {
        name: 'Golongan Darah',
        selector: (row) => row.bloodGroup,
        cellExport: row => row.bloodGroup,
        sortable: true,
        center: true
    },
    {
        name: 'Action',
        cell: (row, index, column, id) => <Button className="btn-sm" onClick={() => router.push(`/users/${row.id}`)}> Detail </Button>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    }
  ];

  return (
    <Card>
        <Card.Body>
            <MyDataTable
                fixedHeader={true}
                // fixedHeaderScrollHeight="500px"
                columns={columns}
                data={listUsers}
                selectableRows={true}
                pagination={true}
                paginationPerPage={10}
                responsive={true}
                progressPending={false}
                title="List User"
                selectableRowsComponent={CheckboxTable}
                progressComponent={<LoadingTable/>}
                contextActions={<Button variant={'light'} onClick={() => alert('on progress')}>Hapus</Button>}
            />
        </Card.Body>
    </Card>
  )
}



export default Page