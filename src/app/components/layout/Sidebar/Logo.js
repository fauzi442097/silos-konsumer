import { useSidebar } from '@/app/hooks/SidebarContext';
import Image from 'next/image'
import React from 'react'

const Logo = () => {

   const { openSidebar } = useSidebar();

  return (
   <div className="mb-12 py-8 app-brand bg-[#D5EBE1] w-full m-auto">
      <Image
         src={"/logo_bank_kalteng.png"}
         alt="logo bank kalteng"
         className={`m-auto transition-all duration-300 ${openSidebar ? '' : 'hidden'}`}
         width={160}
         height={160}
      />

      <Image
         src={"/logo_bank_kalteng_simple.png"}
         alt="logo bank kalteng"
         className={`m-auto transition-all duration-300 ${openSidebar ? 'hidden' : ''}`}
         width={100}
         height={100}
      />
   </div>
  )
}

export default Logo