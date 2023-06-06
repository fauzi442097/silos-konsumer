'use client'

import React, { Suspense } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { useTheme } from '@/app/hooks/ThemeContext'
import { SidebarProvider, useSidebar } from '@/app/hooks/SidebarContext'
import { MySwal, MyToast } from '@/app/components'
import LoadingPage from '@/app/components/LoadingPage'

// import dynamic from "next/dynamic";
// const Sidebar = dynamic(() => import("./Sidebar"));
// const Header = dynamic(() => import("./Header"));

const AdminLayout = ({ children }) => {

  const { openSidebar } = useSidebar()
  
  return (
    <>
       <LoadingPage/>
        <div className={`flex h-screen overflow-auto bg-main dark:bg-dark-main transition-color duration-200`}>
          <Sidebar/>
          <div className={`w-full container-content relative ${openSidebar ? 'lg:ml-72' : 'lg:ml-28'} transition-all duration-300 flex-1`}> 
            <Header/>
            <main className='max-w-full lg:mx-5 mt-24 lg:mt-40 relative '> 
              <div className='content ml-4 mx-8 mt-10'>
                {children}
              </div>
            </main>
          </div>
        </div>
    </>
  )
}

export default AdminLayout