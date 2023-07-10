'use client'

import React from 'react'
import dynamic from 'next/dynamic'

import { useTheme } from '@/hooks/ThemeContext'
import { useSidebar } from '@/hooks/SidebarContext'
import LoadingPage from '@/components/LoadingPage'
import Preloader from './Header/Preloader'
import { Sidebar } from './Sidebar'
import { cn } from '@/lib/utils'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const MySwal = dynamic(() => import('../../../components/Swal/MySwal'), { ssr: false, loading: () => <Preloader type={'toggleSidebar'}/> });
const MyToast = dynamic(() => import('../../../components/Toast/MyToast'), { ssr: false, loading: () => <Preloader type={'toggleSidebar'}/> });
const Header = dynamic(() => import('./Header/Header'), { ssr: false, loading: () => <Preloader type={'toggleSidebar'}/> });
import 'react-loading-skeleton/dist/skeleton.css'

const queryClient = new QueryClient()

const AdminLayout = ({ children }) => {

  const { openSidebar } = useSidebar()
  const { theme } = useTheme();

  return (
      <QueryClientProvider client={queryClient}>
        <body className={`${theme == 'dark' ? 'dark' : ''}`}>
            <MyToast/>
            <MySwal/>
            <LoadingPage/>
            <div className={cn(['flex h-screen container-content overflow-auto bg-main dark:bg-dark-main transition-color duration-200', openSidebar ? 'after:transition-all after:duration-200 after:left-72' : 'after:transition-all after:duration-200 after:left-28'])}>
              <Sidebar/>
              <Header/>
              <div className={cn(['w-full relative transition-all duration-300 flex-1 overflow-x-auto', openSidebar ? 'lg:ml-72' : 'lg:ml-28'])}> 
                <main className='max-w-full lg:mx-5 mt-24 lg:mt-40 relative lg:pb-6'> 
                  <div className='content ml-4 mx-8 mt-10'>
                    {children}
                  </div>
                </main>
              </div>
            </div>
        </body>
      </QueryClientProvider>
  )
}

export default AdminLayout