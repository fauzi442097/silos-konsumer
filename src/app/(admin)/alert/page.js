'use client'

import Alert from '@/components/Alert'
import Button from '@/components/Button'
import Card from '@/components/Card'
import PageTitle from '@/components/PageTitle'
import { useMySwal } from '@/hooks/useMySwal'
import { useMyToast } from '@/hooks/useMyToast'
import { AnimatePresence } from 'framer-motion'
import React, { useState} from 'react'


const Page = () => {

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
         <Card.Body>
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
               <Button onClick={() => showToast('warning')}> Toast Warning </Button>
               <Button onClick={() => showToast('success')}> Toast Sukses </Button>
               <Button onClick={() => showToast('error')}> Toast Error </Button>
               <Button onClick={() => showToast('info')}> Toast Info </Button>
            </div>

            <div className='flex gap-4 my-4 items-start'>
               <Button onClick={() => showSwal('warning', 'info')}> Swal Warning </Button>
               <Button onClick={() => showSwal('success', 'info')}> Swal Sukses </Button>
               <Button onClick={() => showSwal('error', 'info')}> Swal Error </Button>
               <Button onClick={() => showSwal('info', 'info')}> Swal Info </Button>
            </div>

            <div className='flex gap-4 my-4 items-start'>
               <Button onClick={() => showSwal('warning', 'confirm')}> Swal Confirm Warning </Button>
               <Button onClick={() => showSwal('success', 'confirm')}> Swal Confirm Sukses </Button>
               <Button onClick={() => showSwal('error', 'confirm')}> Swal Confirm Error </Button>
               <Button onClick={() => showSwal('info', 'confirm')}> Swal Confirm Info </Button>
            </div>
         </Card.Body>
      </Card>
    </>
  )
}

export default Page