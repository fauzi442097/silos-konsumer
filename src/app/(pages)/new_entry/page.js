
import React from 'react'
import Card from '@/app/components/Card'
import MyDatatable from '@/app/components/datatable/MyDatatable'

const NewEntry = () => {
  return (
    <>
      <h1 className='text-3xl font-semibold dark:text-white'> New Entry </h1>
      <Card>
        <MyDatatable/>
      </Card>
    </>
  )
}

export default NewEntry