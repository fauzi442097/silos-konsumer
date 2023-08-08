import Button from '@/components/Button'
import React from 'react'

const TabAction = ({ prevAction, onSubmit, lastForm }) => {
  return (
    <div className="flex justify-between border-t mt-10 py-6">
        <div className="order-first">
            {prevAction &&  <Button variant="outline" className="mr-3" onClick={prevAction}> Kembali </Button>}
        </div>
        <div className="order-last">
            <Button variant="primary" onClick={onSubmit}> 
                {lastForm ? 'Simpan' : 'Simpan & Lanjutkan'}
            </Button>
        </div>
    </div>
  )
}

export default TabAction