'use client'
import React from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { useTheme } from '@/app/hooks/ThemeContext'
import { useSidebar } from '@/app/hooks/SidebarContext'


const Layout = ({ children }) => {

  const { theme } = useTheme()
  const { openSidebar } = useSidebar()

  return (
    <div className={`${theme == 'dark' ? 'dark' : ''}`}>
      <div className={`flex h-screen overflow-auto bg-main dark:bg-dark-main transition-color duration-200`}>
        <Sidebar/>
        <div className={`w-full container-content relative ${openSidebar ? 'ml-72' : 'ml-28'} transition-all duration-300 flex-1`}> 
          <Header/>
          <main className='max-w-full mx-5 mt-24 overflow-auto z-10 relative '> 
            <div className='content ml-4 mx-8 mt-10'>
                {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout