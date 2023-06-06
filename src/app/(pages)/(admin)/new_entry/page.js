
import React from 'react'
import Card from '@/app/components/Card'
import MyDatatable from '@/app/components/datatable/MyDatatable'
import Button from '@/app/components/Button'

const NewEntry = () => {
  return (
    <>
      <h1 className='text-3xl font-semibold dark:text-white'> New Entry </h1>
      <Card>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <Button className="mx-2"> Entry Data </Button>
          </div>
        </div>
        <MyDatatable />
      </Card>
    </>
  )
}

export default NewEntry