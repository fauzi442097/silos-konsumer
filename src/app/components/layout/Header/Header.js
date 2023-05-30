"use client"

import { useSidebar } from '@/app/hooks/SidebarContext'
import { useTheme } from '@/app/hooks/ThemeContext'
import React from 'react'
import { BsFillSunFill } from 'react-icons/bs'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { VscThreeBars } from 'react-icons/vsc'
import Notification from './Notification'

// export const useClickOutside = (handler, btnRef) => {
//    const domNode = useRef();
//    useEffect(() => {
//       let handleClick = (e) => {
//          if ( !domNode.current.contains(e.target) && !btnRef.current.contains(e.target)) {
//             handler();
//          }
//       }
//       document.addEventListener('click', handleClick);
//       return () => { document.removeEventListener('click', handleClick);}
//    });

//    return domNode;
// }


const Header = () => {

   const {theme, setTheme} = useTheme();
   const { openSidebar, toggleSidebar, setOpenSideMenu } = useSidebar();
   // const [ showDropdownTopbar, setShowDropdownTopbar ] = useState({
   //    notification: false,
   //    userAccount: false
   // });

   const setToggleSidebar = () => {
      toggleSidebar();
      if (openSidebar) setOpenSideMenu(-1)
   }

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

  return (
   <header className={`header  ${openSidebar ? 'left-72' : 'left-28'} bg-main dark:bg-dark-main transition-all duration-300`}>
      <div className='pl-4 pr-8 py-8 flex justify-between mx-5'>
      <div className='flex flex-row gap-3'> 
         <div className='btn-toolbar' onClick={() => setToggleSidebar()}> 
          <VscThreeBars className='text-xl'/>
         </div>
         <div className='btn-toolbar' onClick={() => setTheme(theme == 'light' ? 'dark' : 'light')}>  
            <BsFillSunFill className='text-yellow-logo text-xl'/>
         </div>
      </div>
      <div className='flex flex-row gap-4 items-center'> 
         <div className='btn-toolbar relative'> 
            <IoMdNotificationsOutline className='text-xl'/>
            {/* <Notification/> */}
         </div>


         <div className="flex gap-3">
            <img 
               src={'/man-avatar.png'} 
               className='w-12 h-12 bg-white rounded-full object-contain' 
               style={{ 
                  'boxShadow': 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
               }}
               alt='user' />
               <div className='flex flex-col items-start'>
                  <span className='font-semibold'> 
                     Ahmad Fauzi 
                  </span>
                  <span className='text-primary text-sm'> Admin </span>
               </div>
            </div>
         </div>
      </div>
   </header>
  )
}

export default Header