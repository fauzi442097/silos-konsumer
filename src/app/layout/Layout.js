'use client'
import React, { Suspense } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { useTheme } from '@/app/hooks/ThemeContext'
import { useSidebar } from '@/app/hooks/SidebarContext'
import NextTopLoader from 'nextjs-toploader';
import { MyToast } from '../components'

// import dynamic from "next/dynamic";
// const Sidebar = dynamic(() => import("./Sidebar"));
// const Header = dynamic(() => import("./Header"));


const Layout = ({ children }) => {

  const { theme } = useTheme()
  const { openSidebar } = useSidebar()
  const loadingPageColor = theme == 'dark' ? '#FFF' : '#009A4B'

  return (
    <>
      <NextTopLoader
          color={loadingPageColor}
          initialPosition={0.01}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
      />
      <MyToast/>
      <div className={`${theme == 'dark' ? 'dark' : ''}`}>
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
      </div>
    </>
  )
}

export default Layout