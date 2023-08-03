import { AnimatePresence } from 'framer-motion'
import React, { useRef, useState } from 'react'
import Preloader from '@/components/Layout/Admin/Header/Preloader'
import Modal from '@/components/Modal/ModalSection';
import Button, { ButtonCloseModal } from '@/components/Button';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import usePost from '@/hooks/usePost';
import FormGroup from '@/components/Form/FormGroup';
import Textarea from '@/components/Form/Textarea';
import { invalid } from 'moment';

const MyModal = dynamic(() => import('../../../../components/Modal'), { ssr: false, loading: () => <Preloader type={'toggleSidebar'} /> })

const ModalRejectProspek = ({ showModal, setShowModal, idProspect}) => {

    const queryClient = useQueryClient()
    // const 

    const [ reasonReject, setReasonReject ] = useState('')
    const [ invalidInput, setInvalidInput] = useState(false)
    const payload = []

    const mutation = usePost(['reject-pengajuan-prospect'], '/master/prospek/pengajuan', payload, {
        refetchOnWindowFocus: false,
        retry: false,
        onError: (error, variables, context) => {
            mySwal.error(error.rm)
        },
        onSuccess: (data, variables, context) => {
            setShowModal(false)
            queryClient.invalidateQueries(['getNewEntry']);
            let message = data.data.rm
            mySwal.success(message, 'Sukses')
            // mySwal.success('Data prospek berhasil dikirim', 'Sukses')
            
        },
    });

    const handleChangeInput = (e) => {
        if ( !e.target.value ) {
            setInvalidInput(true)
        } else {
            setInvalidInput(false)
        }
        setReasonReject(e.target.value)
    }

    const rejectProspek = () => {
        // if ( !branchSelected ) return setError(true)
        // setPayload({
        //     id: idProspect,
        //     branchId: branchSelected.value,
        // })
        // mutation.mutate(payload)
        // let value = reasonReject.current
        // console.log(value)
        if ( !reasonReject ) return setInvalidInput(true)
   }

  return (
    <AnimatePresence>
        {showModal && 
            <MyModal closeOutside={true} setShowModal={setShowModal}>
                <Modal.Header>
                    <Modal.Title title="Batalkan Pengajuan Prospek" subTitle={'Isi alasan batal pengajuan'} />
                    <ButtonCloseModal onClick={() => setShowModal(prev => !prev)} />
                </Modal.Header>
                <Modal.Body>
                    <FormGroup
                        className={'mb-2 flex-col gap-2'}
                        label={<label className='dark:text-grey'> Alasan batal </label>} 
                        input={
                            <Textarea 
                                placeholder={`Tidak memenuhi syarat ..`} 
                                rows={4} 
                                maxLength={150}
                                value={reasonReject}
                                className={invalidInput && 'form-invalid'}
                                onChange={handleChangeInput}
                            />
                        }
                    />
                    {invalidInput && <span className='mt-1 block text-sm form-invalid-message'> Wajib diisi </span>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'clean'} onClick={() => setShowModal(prev => !prev)}> Tutup </Button>
                    <Button 
                        onClick={() => rejectProspek()}
                        className={`${mutation.isLoading && 'cursor-not-allowed'}`}> 
                        {mutation.isLoading && <LoadingSpinner/>} 
                        {mutation.isLoading ? 'Processing ...' : 'Batalkan Pengajuan'} 
                    </Button>
                </Modal.Footer>
            </MyModal>
        }
    </AnimatePresence>
  )
}

export default ModalRejectProspek