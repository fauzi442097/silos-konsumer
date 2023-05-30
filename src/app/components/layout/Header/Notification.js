import React from 'react'
import { motion } from "framer-motion"
import { useClickOutside } from '@/app/hooks/useClickOutside';


const Notification = ({ setShowDropdownTopbar, btnRef, className, ...props }) => {

  let notificationRef = useClickOutside(() => {
    setShowDropdownTopbar((prev) => ({ ...prev, notification: false}));
  }, btnRef);

  return (
    <>
        <motion.div 
         initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
                default: { ease: "linear"},
                duration: 2
            }}
            className='top-24 left-0 right-0 bottom-0 fixed overflow-hidden backdrop-blur-sm z-30 bg-[#f8fafb52]'>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
            default: { ease: "linear"},
            duration: 3
        }}
        ref={notificationRef} 
        style={{ 
            'boxShadow': 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
         }}
        className={`w-80 absolute rounded-2xl top-14 right-2 shadow-lg dark:topbar-box-shadow-dark flex flex-col z-50 ${className || ''} transition duration-300 ease-in-out`} {...props}>
            <div className='px-3 py-6 bg-primary rounded-t-2xl text-white dark:text-gray-400 dark:bg-primary-dark '> 
                <div className='flex items-center gap-4 px-3'> 
                <p className='text-xl font-inter-semibold'> Notification </p>
                </div>
            </div>
            <div className='p-6 max-h-80 overflow-y-auto bg-white dark:topbar-content-bg-dark'>
                Content
            </div>
            <div className='separator'></div>
            <div className="px-3 text-center rounded-b-2xl py-4 bg-white dark:topbar-content-bg-dark text-sm">
                Lihat semua
            </div>
        </motion.div>
    </>
  )
}

export default Notification