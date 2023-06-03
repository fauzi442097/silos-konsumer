'use client'

import { Alert, Button, Card, PageTitle } from '@/app/components'
import { AnimatePresence } from 'framer-motion'
import React, { useState} from 'react'
import { useMyToast } from '@/app/hooks/useMyToast'

const AlertPage = () => {

  const [ showAlert, setShowAlert ] = useState({
      success: true,
      error: true,
      warning: true,
      info: true
  })

  const toggleAlert = (type) => {
   setShowAlert((prev) => ({ ...prev, [type]: true }))
  }

  const myToast = useMyToast();
  
  const showToast = (type) => {
      myToast[type]('Ini adalah toast');
  }


  return (
    <>
      <PageTitle title={'Alert & Toast'}/>
      <Card>
         
         <div className='flex gap-4 items-start'>
            <AnimatePresence>
               { showAlert.error && <Alert onCloseAlert={() => setShowAlert(false)} type="error" title="Error" message={'Terjadi kesalahan pada server'}/>}
            </AnimatePresence>

            <AnimatePresence>
               { showAlert.success && <Alert onCloseAlert={() => setShowAlert(false)} type="success" title="Sukses" message={'Data berhasil disimpan'}/>}
            </AnimatePresence>

            <AnimatePresence>
               { showAlert.success && <Alert onCloseAlert={() => setShowAlert(false)} type="warning" title="Warning" message={'Data tidak aktif'}/>}
            </AnimatePresence>

            <AnimatePresence>
               { showAlert.info && <Alert onCloseAlert={() => setShowAlert(false)} type="info" title="Info" message={'User sudah terdaftar'}/>}
            </AnimatePresence>
         </div>

         <div className='flex gap-4 items-start'>
               <Button.Primary onClick={() => showToast('warning')}> Toast Warning </Button.Primary>
               <Button.Primary onClick={() => showToast('success')}> Toast Sukses </Button.Primary>
               <Button.Primary onClick={() => showToast('error')}> Toast Error </Button.Primary>
               <Button.Primary onClick={() => showToast('info')}> Toast Info </Button.Primary>
         </div>
      </Card>
    </>
  )
}

export default AlertPage