import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import avatar from "/public/man-avatar.png";
import { FiLogOut } from 'react-icons/fi'
import { RiUserSettingsLine } from 'react-icons/ri'
import { motion } from 'framer-motion'
import { useClickOutside } from '@/app/hooks/useClickOutside';

const UserProfile = ({ setShowDropdownTopbar, divRef, className, ...props }) => {

    let userAccountRef = useClickOutside(() => {
      setShowDropdownTopbar((prev) => ({ ...prev, userAccount: false}));
    }, divRef);
  
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
                className='top-24 left-0 right-0 bottom-0 fixed overflow-hidden backdrop-header bg-[#f8fafb52] dark:bg-[#060e075c]'>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                    default: { ease: "linear"},
                    duration: 3
                }}
                ref={userAccountRef} 
                style={{ 
                    'boxShadow': 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                 }}
                className={`bg-white w-[275px] dark:bg-dark-depth1 dark:text-grey absolute rounded-2xl top-[5.2rem] lg:top-24 right-14 py-6 px-3 flex flex-col z-50 ${className || ''}`} {...props}>
            <div className='px-3'> 
                <div className='flex items-center gap-4 px-3 py-3'> 
                    <div className='h-9 w-9 sm:h-11 sm:w-11 rounded-md flex-none overflow-hidden'>
                        <Image src={avatar} alt="avatar" className='bg-cover'/>
                    </div>
                    <div className='flex flex-col overflow-hidden'>
                        <p className='m-0 text-lg font-inter-semibold'> Ahmad Fauzi </p>
                        <p className='m-0 text-sm break-all font-inter-light'>fauzi442097@gmail.com </p>
                    </div>
                </div>
            </div>
            <div className='separator my-2'></div>
            <div className='px-3'>
                <ul className='flex flex-col gap-2 text-sm'>
                    <ItemUserProfileMenu>
                        <RiUserSettingsLine/>
                        <span> Profile  </span>
                    </ItemUserProfileMenu>
                    <ItemUserProfileMenu>
                        <FiLogOut/>
                        <Link href={'/login'}> Logout </Link>
                    </ItemUserProfileMenu>
                </ul>
            </div>
            </motion.div>
        </>
     )
  }
  
  const ItemUserProfileMenu = ({ children }) => {
     return (
        <li className='flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-light-primary hover:text-primary hover:cursor-pointer dark:hover:bg-dark-depth2 dark:hover:text-primary transition group'> 
           {children}
        </li>
     )
  }
  
  export default UserProfile