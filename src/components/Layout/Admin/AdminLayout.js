'use client'

import React from 'react'
import dynamic from 'next/dynamic'

import { useTheme } from '@/hooks/ThemeContext'
import LoadingPage from '@/components/LoadingPage'
import Preloader from './Header/Preloader'
import { useSidebar } from '@/hooks/SidebarContext'

const Header = dynamic(() => import('./Header/Header'))
const Sidebar = dynamic(() => import('./Sidebar/Sidebar'))
const MySwal = dynamic(() => import('../../../components/Swal/MySwal'), { ssr: false, loading: () => <Preloader type={'toggleSidebar'}/> });
const MyToast = dynamic(() => import('../../../components/Toast/MyToast'), { ssr: false, loading: () => <Preloader type={'toggleSidebar'}/> });

const AdminLayout = ({ children }) => {

  const { openSidebar } = useSidebar()
  const { theme } = useTheme();

  return (
    <body className={`${theme == 'dark' ? 'dark' : ''}`}>
        <MyToast/>
        <MySwal/>
        <LoadingPage/>
        <div className={`flex h-screen container-content overflow-auto bg-main dark:bg-dark-main transition-color duration-200 ${openSidebar ? 'after:transition-all after:duration-200 after:left-72' : 'after:transition-all after:duration-200 after:left-28'}`}>
          <Sidebar/>
          <Header/>
          <div className={`w-full relative ${openSidebar ? 'lg:ml-72' : 'lg:ml-28'} transition-all duration-300 flex-1 overflow-x-scroll`}> 
            <main className='max-w-full lg:mx-5 mt-24 lg:mt-40 relative lg:pb-6'> 
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