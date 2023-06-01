"use client"

import React, { useState, useRef} from 'react'
import { useSidebar } from '@/app/hooks/SidebarContext'
import { useTheme } from '@/app/hooks/ThemeContext'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { VscThreeBars } from 'react-icons/vsc'
import Notification from './Notification'
import { motion, AnimatePresence } from "framer-motion"
import UserProfile from './UserProfile'
import Badge from '../../Badge'
import ToggleSidebar from '../Sidebar/ToggleSidebar'
import Toolbar from './Toolbar'

const Header = () => {

   const {theme, setTheme} = useTheme();
   const { openSidebar, toggleSidebar, setOpenSidebar, setOpenSideMenu, openSidebarMobile, setOpenSidebarMobile } = useSidebar();
   const [ showDropdownTopbar, setShowDropdownTopbar ] = useState({
      notification: false,
      userAccount: false
   });

   const setToggleSidebar = () => {
      toggleSidebar();
      if (openSidebar) setOpenSideMenu(-1)
   }

   const notifRef = useRef('');
   const userProfileRef = useRef('');
   const btnToggleSidebarRef = useRef('');

   const toggleDropdownTopbar = (clicked) => {
      const newObject = Object.keys(showDropdownTopbar)
            .filter((key) => !key.includes(clicked))
            .reduce((obj, key) => {
                return Object.assign(obj, {
                    [key]: false
                });
        }, {});
  
      newObject[clicked] = !showDropdownTopbar[clicked];
      setShowDropdownTopbar(newObject);
   }

   const activeSidebarMobile = () => {
      setOpenSidebarMobile(true)
      setOpenSidebar(true)
   }


   const ToggleSidebarIcon = openSidebar ? <VscThreeBars className='text-xl'/> :  <HiOutlineMenuAlt2 className='text-xl'/>
   const ToggleThemeIcon = theme == 'light' ? <BsFillSunFill className='text-yellow-logo text-xl'/> : <BsFillMoonFill className='text-yellow-logo text-xl'/>
      
  return (
   <header className={`header left-0 ${openSidebar ? 'lg:left-72' : 'lg:left-28'} bg-main dark:bg-dark-main transition-all duration-300`}>
      <div className='pl-4 pr-2 lg:pr-8 lg:py-8 py-1 flex justify-between items-center lg:mx-5 lg:bg-main bg-primary dark:bg-primary-800 dark:lg:bg-dark-main rounded-b-3xl'>
      <div className='flex flex-row gap-3'> 

         {/* Toggle Sidebar Mobile View */}
         <Toolbar className={'lg:hidden'} onClick={() => activeSidebarMobile()} ref={btnToggleSidebarRef}> {ToggleSidebarIcon} </Toolbar>

         {/* Toggle Sidebar Desktop VIew */}
         <Toolbar className={'hidden lg:flex'} onClick={() => setToggleSidebar()}> {ToggleSidebarIcon} </Toolbar>

         {/* Toggle Theme */}
         <Toolbar onClick={() => setTheme(theme == 'light' ? 'dark' : 'light')}> {ToggleThemeIcon} </Toolbar>
      </div>

      <div className='flex flex-row gap-4 items-center'> 
         <div className='relative'>
            <Toolbar ref={notifRef} className={`btn-toolbar ${showDropdownTopbar.notification ? 'active' : ''}`} onClick={() => toggleDropdownTopbar('notification')}> 
               <IoMdNotificationsOutline className='text-xl'/>   
            </Toolbar>

            <AnimatePresence>
               { showDropdownTopbar.notification && <Notification setShowDropdownTopbar={setShowDropdownTopbar} btnRef={notifRef}/>}
            </AnimatePresence>
         </div>
         
         <div className="flex gap-3 cursor-pointer px-4 py-2 rounded-lg " ref={userProfileRef} onClick={() => toggleDropdownTopbar('userAccount')}>
            <img 
               src={'/man-avatar.png'} 
               className='w-12 h-12 bg-white rounded-full object-contain select-none' 
               style={{ 
                  'boxShadow': 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
               }}
               alt='user' />
               <div className='flex flex-col items-start'>
                  <span className='selected-none font-inter-semibold dark:text-grey lg:text-[#5b5b5d] text-grey'> 
                     Ahmad Fauzi 
                  </span>
                  <span className='text-grey lg:text-primary text-sm lg:dark:text-primary font-inter-medium dark:text-grey'> Admin </span>
               </div>
            </div>

            <AnimatePresence>
               { showDropdownTopbar.userAccount && <UserProfile setShowDropdownTopbar={setShowDropdownTopbar} divRef={userProfileRef}/> }
            </AnimatePresence>
         </div>

         <AnimatePresence>
            { openSidebarMobile &&  <ToggleSidebar setShowSidebarMobile={setOpenSidebarMobile} btnRef={btnToggleSidebarRef}/> }
         </AnimatePresence>

      </div>
   </header>
  )
}

export default Header