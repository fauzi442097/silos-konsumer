import Button, { buttonVariants } from '@/components/Button'
import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const NotFound = () => {
  return (
    <div className='min-h-screen flex flex-row w-full relative'>
      <svg className="absolute md:hidden top-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#009A4B" fillOpacity="1" d="M0,0L80,5.3C160,11,320,21,480,64C640,107,800,181,960,181.3C1120,181,1280,107,1360,69.3L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
      <div className='md:w-1/2 w-full flex flex-col justify-center px-20 lg:px-32'>
        <h3 className='font-inter-bold text-gray-400 mb-2'> 404 Error </h3>
        <p className='font-inter-extrabold text-[2rem] lg:text-[2.5rem] text-gray-500 mb-2'> Halaman Tidak Ditemukan </p>
        <p className='text-lg text-gray-400 mb-6 lg:w-1/2'> Maaf halaman yang anda cari tidak tersedia atau sudah dihapus. Coba cari halaman lain. </p>
        <Link className={cn([buttonVariants({ variant: 'primary' }), 'self-start'])} href="/"> Home </Link>
        <svg className='absolute bottom-0 left-0 h-20' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#009A4B" fillOpacity="1" d="M0,32L80,37.3C160,43,320,53,480,96C640,139,800,213,960,256C1120,299,1280,309,1360,314.7L1440,320L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
      </div>
      
      <div className="w-1/2 bg-[url('/img/404.png')] bg-no-repeat bg-center bg-[length:70%] hidden md:block"> 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#009A4B" fillOpacity="1" d="M0,0L80,5.3C160,11,320,21,480,64C640,107,800,181,960,181.3C1120,181,1280,107,1360,69.3L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
      </div>
    </div>
  )
}

export default NotFound