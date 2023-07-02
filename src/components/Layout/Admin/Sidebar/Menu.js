import React from 'react'
import Link from 'next/link'
import menus from './Menu.json';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion"
import { useSidebar } from '@/hooks/SidebarContext';
import { cn } from '@/lib/utils';


const CheckMenuActive = (url, submenu) => {
   const pathname = usePathname();  
   const activeMenu = pathname === url;

   if ( submenu ) {
      const i = submenu.findIndex(item => pathname.startsWith(item.url));
      return i > -1;      
   }

   return activeMenu;
}

const MenuItem = ({ name, icon, url, className, subMenu, id}) => {

   const activeMenu = CheckMenuActive(url, subMenu)
   const { openSidebar, toggleSidebar, openSideMenu, setOpenSideMenu, setOpenSidebarMobile } = useSidebar();
   const hiddenElement = !openSidebar && 'hidden duration-300 group-hover:block';   
   const sideMenuActive = openSideMenu === id;

   const toggleSubMenu = (id) => {
      setOpenSideMenu(prev => prev === id ? -1 : id);
      if ( !openSidebar ) toggleSidebar();
   };

   return (
      <li className={cn(['menu-item', className, activeMenu && 'active'])}>
         {
            !subMenu ? 
            (<Link href={url} id={id} onClick={() => {setOpenSideMenu(-1);setOpenSidebarMobile(false)}}>
               <span className="menu-icon text-xs">
                  <span dangerouslySetInnerHTML={{ __html: icon }} />
               </span>
               <span className={cn(['menu-item-name', hiddenElement])}> {name} </span>
            </Link>
            ) : (
               <>
                  <a id={id} onClick={() => toggleSubMenu(id)}>
                     <span className="menu-icon">
                        <span dangerouslySetInnerHTML={{ __html: icon }} />
                     </span>
                     <span className={cn(['menu-item-name', hiddenElement])}> {name} </span>
                     {subMenu && <span className={cn(['menu-icon absolute right-2', hiddenElement])}>
                           <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 48 48' 
                                 className={cn(['transition-all duration-300', sideMenuActive ? 'rotate-90' : 'rotate-0'])}>
                                 <path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='4' d='m19 12l12 12l-12 12'/>
                           </svg>
                        </span>
                     }            
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
                     <li className={cn(['sub-menu-item', pathname.startsWith(item.url) && 'active'])} key={item.id}>
                        <Link href={item.url} onClick={() => setOpenSidebarMobile(false)}>
                           <span className="submenu-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M0 0h24v24H0z"/><path fill="currentColor" d="M12 7a5 5 0 1 1-4.995 5.217L7 12l.005-.217A5 5 0 0 1 12 7z"/></g></svg>
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
               icon={item.icon}
               url={item.url}
               subMenu={item.subMenu}
            />
         })
      }
   </ul>
  )
}

export default Menu