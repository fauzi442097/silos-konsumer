'use client'

import React from 'react'
import dynamic from 'next/dynamic';
import Image from 'next/image'

import { useTheme } from '@/app/hooks/ThemeContext';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'

import Toolbar from '@/app/layout/Admin/Header/Toolbar';
import Preloader from '@/app/layout/Admin/Header/Preloader';
import styles from './login.module.css'


const MySwal = dynamic(() => import('../../components/Swal/MySwal'), { ssr: false, loading: () => <Preloader type={'toggleSidebar'}/> });
const MyToast = dynamic(() => import('../../components/Toast/MyToast'), { ssr: false, loading: () => <Preloader type={'toggleSidebar'}/> });

const GuestLayout = ({ children }) => {

   const { theme, setTheme } = useTheme();
   const logoBrand = theme == 'light' ? '/logo_bank_kalteng.png' : '/logo_bank_kalteng_transparent.png';
   const ToggleThemeIcon = theme == 'light' ? <BsFillSunFill className='text-yellow-logo text-xl'/> : <BsFillMoonFill className='text-yellow-logo text-xl'/>

  return (
   <body className={`${theme == 'dark' ? 'dark' : ''}`}>
      <MyToast/>
      <MySwal/>
      <div className='flex w-100 min-h-screen overflow-auto bg-white dark:bg-dark-main transition duration-300'>
         <div className=' w-2/5 py-20 relative'> 
            <div className='w-[350px] mx-auto flex flex-col justify-between h-full'>
               <div className='w-full flex justify-between items-center'> 
                  <Image
                     src={logoBrand}
                     alt="logo bank kalteng"
                     className={`w-[200px] transition-all duration-300`}
                     priority={true}
                     width="0"
                     height="0"
                     sizes="100vw"
                  />

                  {/* Toggle Theme */}
                  <Toolbar onClick={() => setTheme(theme == 'light' ? 'dark' : 'light')}> {ToggleThemeIcon} </Toolbar>
               </div>

               <div className='w-full -mt-20 '> 
                  {children} 
               </div>

               <div className='invisible'></div>
            </div>
         
            <svg className='absolute bottom-0' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#009A4B" fill-opacity="1" d="M0,32L80,37.3C160,43,320,53,480,96C640,139,800,213,960,256C1120,299,1280,309,1360,314.7L1440,320L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
         </div>
         <div className={`w-3/5 ${styles['bg_login']} relative`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#009A4B" fill-opacity="1" d="M0,0L80,5.3C160,11,320,21,480,64C640,107,800,181,960,181.3C1120,181,1280,107,1360,69.3L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
            <div className='absolute top-48 left-[50%]'>
               <h1 className='text-primary font-inter-bold text-3xl'> Silos </h1>
               <p className='text-lg text-gray-500'> Platform Digital Pengelolaan Pinjaman </p>
            </div>
         </div>
      </div>
   </body>
  )
}

export default GuestLayout