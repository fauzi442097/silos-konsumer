import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion'
import Preloader from '@/components/Layout/Admin/Header/Preloader'
import Modal from '@/components/Modal/ModalSection';
import Button, { ButtonCloseModal } from '@/components/Button';
import MySelect from '@/components/Form/Select';

const MyModal = dynamic(() => import('../../../../components/Modal'), { ssr: false, loading: () => <Preloader type={'toggleSidebar'} /> })

const options = [
    { value: "fox", label: "Cabang Utama Kupang" },
    { value: "Butterfly", label: "Butterfly" },
    { value: "Honeybee", label: "Honeybee" }
];

const createListBranch = (branch) => {
    const lists = branch.map((item) => {
        return {
            value: item.id,
            label: item.branchName
        }
    })
    return lists
}

const ModalKirimProspek = ({ showModal, setShowModal, branchQuery}) => {

   const branch = branchQuery.data?.data?.data
   const [branchSelected, setBranchSelected] = useState(null);
   const [error, setError] = useState(false)
   
   const handleChange = value => {
        setBranchSelected(value);
        setError(false)
   };

   const kirimProspek = () => {
        if ( !branchSelected ) return setError(true)
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
                        <MySelect selectInModal withSearch options={branch ? createListBranch(branch) : []} value={branchSelected} onChange={handleChange}/>
                        {error && <span className='mt-1 block text-sm form-invalid-message'> Pilih cabang proses </span>}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'clean'} onClick={() => setShowModal(prev => !prev)}> Batal </Button>
                    <Button onClick={() => kirimProspek()}> Kirim Prospek </Button>
                </Modal.Footer>
            </MyModal>
        }
    </AnimatePresence>
  )
}

export default ModalKirimProspek