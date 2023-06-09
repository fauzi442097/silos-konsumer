'use client'

import React from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import {useSidebar } from '@/app/hooks/SidebarContext'
import LoadingPage from '@/app/components/LoadingPage'

import { useTheme } from '@/app/hooks/ThemeContext'
import { MySwal, MyToast } from '@/app/components'

const AdminLayout = ({ children }) => {

  const { openSidebar } = useSidebar()
  const { theme } = useTheme();

  return (
    <body className={`${theme == 'dark' ? 'dark' : ''}`}>
        <MyToast/>
        <MySwal/>
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
    </body>
  )
}

export default AdminLayout