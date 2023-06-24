import React from 'react'
import { AnimatePresence } from 'framer-motion';
import SwalContent from './SwalContent';
import { useSwalStore } from '@/stores/swal';


const MySwal = () => {

   const messages = useSwalStore(state => state.messages);
   const remove = useSwalStore(state => state.removeAlert);
  return (
    <div
        style={{ 
            zIndex: '9999',
            margin: '20px',
         }} 
        className='fixed top-0 right-0'>
        <AnimatePresence>
            {
                messages.map(({ type, title, message, id, labelSubmit, labelCancel, dialogType, onClose, onSubmit }) => (
                    <SwalContent 
                        onClose={() => {
                           if ( onClose !== undefined ) onClose();
                           remove(id);
                        }}
                        onSubmit={() => onSubmit()}
                        title={title}
                        key={id} 
                        labelCancel={labelCancel}
                        labelSubmit={labelSubmit}
                        context={type}
                        message={message}
                        dialogType={dialogType}
                    />
                ))
            }
        </AnimatePresence>
    </div>
  )
}

export default MySwal