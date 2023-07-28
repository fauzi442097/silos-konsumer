import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion'
import Preloader from '@/components/Layout/Admin/Header/Preloader'
import Modal from '@/components/Modal/ModalSection';
import Button, { ButtonCloseModal } from '@/components/Button';
import MySelect from '@/components/Form/Select';
import { useMySwal } from '@/hooks/useMySwal';
import { useQueryClient } from '@tanstack/react-query';
import usePost from '@/hooks/usePost';
import LoadingSpinner from '@/components/LoadingSpinner';

const MyModal = dynamic(() => import('../../../../components/Modal'), { ssr: false, loading: () => <Preloader type={'toggleSidebar'} /> })

const createListBranch = (branchQuery) => {
    if ( branchQuery.isError ) {
        return [{
            value: '-',
            label: branchQuery.error,
            disabled: true
        }]
    }

    const branch = branchQuery.data?.data?.data
    return branch.map((item) => {
        return {
            value: item.id,
            label: item.branchName
        }
    })
}

const ModalKirimProspek = ({ showModal, setShowModal, branchQuery, idProspect}) => {

    const queryClient = useQueryClient()

   const branch = createListBranch(branchQuery)
   const [branchSelected, setBranchSelected] = useState(null);
   const [error, setError] = useState(false)
   const [payload, setPayload] = useState(null)

   const mutation = usePost(['pengajuan-prospect'], '/master/prospek/pengajuan', payload, {
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

   const mySwal = useMySwal();
   
   const handleChange = value => {
        setBranchSelected(value);
        setError(false)
   };

   const kirimProspek = () => {
        if ( !branchSelected ) return setError(true)
        setPayload({
            id: idProspect,
            branchId: branchSelected.value,
        })
        mutation.mutate(payload)
   }

  return (
    <AnimatePresence>
        {showModal && 
            <MyModal closeOutside={true} setShowModal={setShowModal}>
                <Modal.Header>
                    <Modal.Title title="Kirim Prospek" subTitle={'Konfirmasi cabang proses'} />
                    <ButtonCloseModal onClick={() => setShowModal(prev => !prev)} />
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p className='mb-2'> Cabang Proses </p>
                        <MySelect 
                            selectInModal
                             withSearch 
                             options={branch} 
                             value={branchSelected} 
                             onChange={handleChange}
                             placeholder='Pilih cabang proses'
                        />
                        {error && <span className='mt-1 block text-sm form-invalid-message'> Pilih cabang proses </span>}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'clean'} onClick={() => setShowModal(prev => !prev)}> Batal </Button>
                    <Button 
                        onClick={() => kirimProspek()}
                        className={`${mutation.isLoading && 'cursor-not-allowed'}`}> 
                        {mutation.isLoading && <LoadingSpinner/>} 
                        {mutation.isLoading ? 'Processing ...' : 'Kirim Prospek'} 
                    </Button>
                </Modal.Footer>
            </MyModal>
        }
    </AnimatePresence>
  )
}

export default ModalKirimProspek