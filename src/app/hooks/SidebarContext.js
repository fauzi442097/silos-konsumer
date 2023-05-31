'use client'
import React, { useContext, useState } from 'react'

const SidebarContext = React.createContext({});

export const useSidebar = () => {
   return useContext(SidebarContext)
}
export function SidebarProvider({ children }) {
   const [ openSidebar, setOpenSidebar ] = useState(true)
   const [ openSideMenu, setOpenSideMenu ] = useState(-1);
   
   const toggleSidebar = () => {
      setOpenSidebar(prevSidebar => !prevSidebar)
   }

   const toggleOpenSubMenu = (isOpen) => {
      setOpenSubMenu(isOpen);
   }

   return (
      <SidebarContext.Provider value={{
         openSidebar,
         toggleSidebar,
         openSideMenu,
         setOpenSideMenu
      }}>
         {children}
      </SidebarContext.Provider>
   )

}