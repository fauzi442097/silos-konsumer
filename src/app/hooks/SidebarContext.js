import React, { useContext, useState} from 'react'

const SidebarContext = React.createContext();

export const useSidebar = () => {
   return useContext(SidebarContext)
}

export function SidebarProvider({ children }) {
   const [ openSidebar, setOpenSidebar ] = useState(true)
   
   const toggleSidebar = () => {
      setOpenSidebar(prevSidebar => !prevSidebar)
   }

   return (
      <SidebarContext.Provider value={{
         openSidebar,
         toggleSidebar
      }}>
         {children}
      </SidebarContext.Provider>
   )

}