import React from 'react'
import { motion } from 'framer-motion'
import Menu from "./Menu";
import Logo from './Logo';
import { useClickOutside } from '@/hooks/useClickOutside';

const ToggleSidebar = ({ setShowSidebarMobile, btnRef }) => {

   let sidebarRef = useClickOutside(() => {
      setShowSidebarMobile(false);
  }, btnRef);

  return (
    <>
      {/* Backdrop */}
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ 
            default: { ease: "linear"},
            duration: 2
         }}
         className='z-30  fixed inset-0 backdrop-header'>
      </motion.div>

      {/* Menu */}
      <motion.div  
         initial={{ x: "-100vw" }}
         animate={{ x: 0 }}
         exit={{ x: "-100vw" }}
         transition={{ 
            default: { ease: "linear"},
            duration: 3
         }}
         ref={sidebarRef} 
         className='fixed z-40 left-0 top-0 bottom-0 overflow-auto flex flex-col w-[250px] dark:bg-dark-depth1 bg-primary shadow-lg dark:shadow-none'> 
         <div className='w-full mb-7'> 
            <Logo/>
            <div className='pl-7'>
               <Menu/>
            </div>
         </div>
      </motion.div>
    </>
  )
}

export default ToggleSidebar