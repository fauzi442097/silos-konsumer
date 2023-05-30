import React from 'react'
import { motion } from "framer-motion"


const Notification = ({ setShowDropdownTopbar, btnRef, className, ...props }) => {

//   let notificationRef = useClickOutside(() => {
//         setShowDropdownTopbar((prev) => ({ ...prev, notification: false}));
//   }, btnRef);

  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
        default: { ease: "linear"},
        duration: 3
        }}
        ref={notificationRef} 
        className={`w-80 absolute rounded-lg top-14 right-0 md:top-20 md:right-0 shadow-lg dark:topbar-box-shadow-dark flex flex-col z-20 ${className || ''} transition duration-300 ease-in-out`} {...props}>
            <div className='px-3 py-6 bg-primary rounded-t-lg text-white dark:text-gray-400 dark:bg-primary-dark '> 
                <div className='flex items-center gap-4 px-3'> 
                <p className='text-lg font-inter-semibold'> Notification </p>
                </div>
            </div>
            <div className='p-6 max-h-80 overflow-y-auto bg-white dark:topbar-content-bg-dark'>
                Content
            </div>
            <div className='separator'></div>
            <div className="px-3 text-center rounded-b-lg py-4 bg-white dark:topbar-content-bg-dark text-sm">
                Lihat semua
            </div>
    </motion.div>
  )
}

export default Notification