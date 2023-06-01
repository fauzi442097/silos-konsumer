'use client';

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import { RxCaretDown, RxHamburgerMenu } from "react-icons/rx";
import { TiThLarge } from "react-icons/ti";
import { FaUserCheck, FaUserClock } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import { useSidebar } from '@/app/hooks/SidebarContext';
import Link from 'next/link'
import menus from './Menu.json';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion"


const CheckMenuActive = (url, submenu) => {
   const pathname = usePathname();  
   const activeMenu = pathname.startsWith(url);

   if ( submenu ) {
      const i = submenu.findIndex(item => pathname.startsWith(item.url));
      return i > -1;      
   }

   return activeMenu;
}

const MenuItem = ({ name, icon, url, className, subMenu, id}) => {

   const pathname = usePathname();   
   const activeMenu = CheckMenuActive(url, subMenu)
   const { openSidebar, toggleSidebar, openSideMenu, setOpenSideMenu, setOpenSidebarMobile } = useSidebar();
   const hiddenElement = !openSidebar ? 'hidden duration-300' : '';   
   const sideMenuActive = openSideMenu === id;

   const toggleSubMenu = (id) => {
      setOpenSideMenu(prev => prev === id ? -1 : id);
      if ( !openSidebar ) toggleSidebar();
   };

   return (
      <li className={`menu-item ${className || ''} ${activeMenu ? 'active': ''}`}>
         {
            !subMenu ? 
            (<Link href={url} id={id} onClick={() => {setOpenSideMenu(-1);setOpenSidebarMobile(false)}}>
               <span className="menu-icon">
                  {" "}
                  {icon}{" "}
               </span>
               <span className={`menu-item-name ${hiddenElement}`}> {name} </span>
            </Link>
            ) : (
               <>
                  <a id={id} onClick={() => toggleSubMenu(id)}>
                     <span className="menu-icon">
                        {" "}
                        {icon}{" "}
                     </span>
                     <span className={`menu-item-name ${hiddenElement}`}> {name} </span>
                     {subMenu && <span className={`menu-icon absolute right-2 ${hiddenElement}`}><RxCaretDown className={`transition-all duration-300 ${sideMenuActive? 'rotate-180' : 'rotate-0'} `} /></span>}            
                  </a>
                  <AnimatePresence> { (sideMenuActive) && <SubMenu items={subMenu} />} </AnimatePresence>
               </>
            )
         }
         
         
      </li>
   )
}

const SubMenu = ({ items }) => {

   const { setOpenSidebarMobile } = useSidebar();

   const menuAnimation = {
      hidden: {
         opacity: 0,
         height: 0,
         padding: 0,
         transition: { 
            duration: 0.4, 
            when: "afterChildren" 
         },
      },
      show: {
         opacity: 1,
         height: "auto",
         transition: {
            duration: 0.4,
            when: "beforeChildren",
         },
      },
   };

   const menuItemAnimation = {
      hidden: (i) => ({
         padding: 0,
         x: "-1000%",
         transition: {
            duration: (i + 1) * 0.1,
         },
      }),
      show: (i) => ({
         x: 0,
         transition: {
            duration: (i + 1) * 0.1,
         },
      }),
   };

   const pathname = usePathname();   
   return (
      <motion.ul 
         variants={menuAnimation}
         initial="hidden"
         animate="show"
         exit="hidden"
         className={`sub-menu mt-4 p-0`}>
         {items.map((item, index) => {
            return (<motion.div variants={menuItemAnimation} key={index} custom={index}> 
                     <li className={`sub-menu-item ${pathname.startsWith(item.url) ? 'active': ''}`} key={item.id}>
                        <Link href={item.url} onClick={() => setOpenSidebarMobile(false)}>
                           <span className="submenu-icon">
                              <TbPointFilled />
                           </span>
                           <span> {item.name} </span>
                        </Link>
                     </li>
                  </motion.div>
                  )
         })}
      </motion.ul>      
   )
}

const Menu = () => {
  return (
   <ul className="side-menu">
      {
         menus.map((item, i) => {
            return <MenuItem 
               key={item.id}
               id={item.id}
               name={item.name}
               icon={<TiThLarge />}
               url={item.url}
               subMenu={item.subMenu}
            />
         })
      }
   </ul>
  )
}

export default Menu