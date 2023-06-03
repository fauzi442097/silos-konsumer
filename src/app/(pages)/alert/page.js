'use client'

import { Alert, Button, Card, PageTitle } from '@/app/components'
import { AnimatePresence } from 'framer-motion'
import React, { useState} from 'react'
import { useMyToast } from '@/app/hooks/useMyToast'
import { useMySwal } from '@/app/hooks/useMySwal'

const AlertPage = () => {

  const [ showAlert, setShowAlert ] = useState({
      success: true,
      error: true,
      warning: true,
      info: true
  })


  const myToast = useMyToast();
  const mySwal = useMySwal();
  
  const showToast = (type) => {
      myToast[type]('Ini adalah toast');
  }

  const showSwal = (type, dialogType) => {
      if ( dialogType == 'info' ) {
         mySwal[type]('Test my swal', null);
      } else {
         mySwal.confirm({
            type: type,
            title: 'Tes',
            message: 'Berhasil dites',
            labelSubmit: 'Simpan',
            onSubmit: () => {
               alert('Sukses');
            },
            labelCancel: 'Batal',
            onClose: () => {
               alert('dibatalkan');
            }
         });
      }
  }


  return (
    <>
      <PageTitle title={'Alert & Toast'}/>
      <Card>
         
         <div className='flex gap-4 items-start'>
            <AnimatePresence>
               { showAlert.error && <Alert onClose={() => setShowAlert(false)} type="error" title="Error" message={'Terjadi kesalahan pada server'}/>}
            </AnimatePresence>

            <AnimatePresence>
               { showAlert.success && <Alert onClose={() => setShowAlert(false)} type="success" title="Sukses" message={'Data berhasil disimpan'}/>}
            </AnimatePresence>

            <AnimatePresence>
               { showAlert.success && <Alert onClose={() => setShowAlert(false)} type="warning" title="Warning" message={'Data tidak aktif'}/>}
            </AnimatePresence>

            <AnimatePresence>
               { showAlert.info && <Alert onClose={() => setShowAlert(false)} type="info" title="Info" message={'User sudah terdaftar'}/>}
            </AnimatePresence>
         </div>

         <div className='flex gap-4 my-4 items-start'>
            <Button.Primary onClick={() => showToast('warning')}> Toast Warning </Button.Primary>
            <Button.Primary onClick={() => showToast('success')}> Toast Sukses </Button.Primary>
            <Button.Primary onClick={() => showToast('error')}> Toast Error </Button.Primary>
            <Button.Primary onClick={() => showToast('info')}> Toast Info </Button.Primary>
         </div>

         <div className='flex gap-4 my-4 items-start'>
            <Button.Primary onClick={() => showSwal('warning', 'info')}> Swal Warning </Button.Primary>
            <Button.Primary onClick={() => showSwal('success', 'info')}> Swal Sukses </Button.Primary>
            <Button.Primary onClick={() => showSwal('error', 'info')}> Swal Error </Button.Primary>
            <Button.Primary onClick={() => showSwal('info', 'info')}> Swal Info </Button.Primary>
         </div>

         <div className='flex gap-4 my-4 items-start'>
            <Button.Primary onClick={() => showSwal('warning', 'confirm')}> Swal Confirm Warning </Button.Primary>
            <Button.Primary onClick={() => showSwal('success', 'confirm')}> Swal Confirm Sukses </Button.Primary>
            <Button.Primary onClick={() => showSwal('error', 'confirm')}> Swal Confirm Error </Button.Primary>
            <Button.Primary onClick={() => showSwal('info', 'confirm')}> Swal Confirm Info </Button.Primary>
         </div>
      </Card>
    </>
  )
}

export default AlertPage