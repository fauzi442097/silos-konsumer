import { useSidebar } from '@/app/hooks/SidebarContext';
import { useTheme } from '@/app/hooks/ThemeContext';
import Image from 'next/image'
import React from 'react'

const Logo = () => {

   const { openSidebar } = useSidebar();
   const { theme } = useTheme();
   const logoBrand = theme == 'light' ? '/logo_bank_kalteng.png' : '/logo_bank_kalteng_transparent.png';

  return (
   <div className="mb-12 py-8 app-brand bg-[#D5EBE1] dark:bg-dark-depth1 w-full m-auto">
      <Image
         src={logoBrand}
         alt="logo bank kalteng"
         className={`m-auto w-[160px] transition-all duration-300  ${openSidebar ? '' : 'hidden group-hover:block'}`}
         priority={true}
         width="0"
         height="0"
         sizes="100vw"
      />

      <Image
         src={"/logo_bank_kalteng_simple.png"}
         alt="logo bank kalteng"
         className={`m-auto transition-all duration-300 ${openSidebar ? 'hidden' : 'group-hover:hidden'}`}
         width={100}
         height={100}
         priority={true}
      />
   </div>
  )
}

export default Logo