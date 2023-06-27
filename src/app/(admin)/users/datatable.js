'use client'


import Button from '@/components/Button';
import Card from '@/components/Card';
import CheckboxTable from '@/components/Datatable/CheckboxTable';
import LoadingTable from '@/components/Datatable/LoadingTable';
import MyDataTable from '@/components/Datatable/MyDatatable';
import PageTitle from '@/components/PageTitle';
import React from 'react'
import columns from './columns';

const Datatable = ({ data }) => {
  return (
    <>
        <PageTitle title='Users'/>
        <Card>
            <div className='flex justify-between items-center mb-8'>
                <h3> Users </h3>
                <Button.Primary> Tambah Data </Button.Primary>
            </div>

            <MyDataTable
                compactness={true}
                fixedHeader={true}
                withFilter={false}
                // fixedHeaderScrollHeight="500px"
                columns={columns}
                data={data}
                selectableRows={false}
                pagination={true}
                paginationPerPage={10}
                responsive={true}
                progressPending={false}
                selectableRowsComponent={CheckboxTable}
                progressComponent={<LoadingTable/>}
                contextActions={<Button.LightPrimary onClick={() => alert('on progress')}>Hapus</Button.LightPrimary>}
            />
        </Card>
    </>
  )
}

export default Datatable