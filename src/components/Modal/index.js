import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const modalVariants = cva('modal bg-white dark:bg-dark-depth1 dark:text-grey rounded-2xl shadow-lg dark:shadow-none transform overflow-hidden text-left align-middle transition-all flex flex-col', {
  variants: {
    size: {
      default: 'w-modal-base',
      sm: 'w-modal-sm rounded-xl',
      lg: 'w-modal-lg rounded-xl',
      xl: 'w-modal-xl rounded-xl',
      fullscreen: 'modal-fullscreen'
    }, 
  },
  defaultVariants: {
    size: 'default',
    position: 'default'
  }
})

const Modal = ({ children, size, position, closeOutside = false, setShowModal}) => {

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
              <div className={cn([
                'flex justify-center text-center',
                (size == 'fullscreen' || position == 'center') ? 'h-full' : 'my-32',
                position == 'center' ? 'items-center' : 'items-start',
              ])}>
                 <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                       default: { ease: "linear"},
                       duration: 2,
                    }}
                    ref={modalDialogRef}
                    className={cn(modalVariants({size}))}>
                      {children}
                 </motion.div>
              </div>
           </div>
  
      </>
    )
  }

export default Modal