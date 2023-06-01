import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const getSizeModal = (size) => {
  if ( size == 'fullscreen') return 'modal-fullscreen';

  switch ( size ) {
     case 'sm': return 'w-modal-sm rounded-xl'; break;
     case 'lg': return 'w-modal-lg rounded-xl'; break;
     case 'xl': return 'w-modal-xl rounded-xl'; break;
     default:
        return 'w-modal-base ';
  }
}

const Modal = ({ children, size, position, closeOutside = false, setShowModal}) => {


  const modalSize = getSizeModal(size);
  const modalPosition = position == 'center' ? 'items-center' : 'items-start';
  const modalBackdropHeight = (size == 'fullscreen' || position == 'center') ? 'h-full' : 'my-32';

  const modalDialogRef = useRef(null);

  const closeModal = (e) => {
    if ( closeOutside && e.target.contains(modalDialogRef.current) && setShowModal ) setShowModal((prev) => !prev);
  }


  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
            default: { ease: "linear"},
            duration: 1,
        }}
        className='fixed inset-0 bg-[#00000033] dark:bg-[#060e075c] transition-opacity backdrop-blur-sm z-20'>
      </motion.div>

        <div className='z-30 fixed inset-0 overflow-auto' onClick={closeModal}>
            <div className={`flex justify-center text-center ${modalBackdropHeight} ${modalPosition}`}>
               <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                     default: { ease: "linear"},
                     duration: 2,
                  }}
                  ref={modalDialogRef}
                  className={`modal  bg-white ${modalSize} dark:bg-dark-depth1 dark:text-grey rounded-2xl shadow-lg dark:shadow-none transform overflow-hidden text-left align-middle transition-all flex flex-col`}>
                    {children}
               </motion.div>
            </div>
         </div>

    </>
  )
}

const Header = ({ children }) => {
  return (
     <div className='flex justify-between items-baseline px-6 py-4'>
        { children }
     </div>
  )
}

const ModalTitle = ({ title, subTitle }) => {
  return (
    <div>
      <h3 className='mb-1'> {title} </h3>
      <p className='font-inter-medium text-muted text-md'> {subTitle} </p>
    </div>
  )
}

const Body = ({ children }) => {
  return (
     <div className='px-6 py-3 flex-auto modal-body my-2'>
        { children }
     </div>
  )
}

const Footer = ({ children }) => {
  return (
     <div className='modal-footer bg-main px-6 py-4 dark:bg-dark-depth2'>
        { children }
     </div>
  )
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
Modal.Title = ModalTitle;

export default Modal