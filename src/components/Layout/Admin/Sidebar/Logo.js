import { useSidebar } from '@/hooks/SidebarContext';
import { useTheme } from '@/hooks/ThemeContext';
import Image from 'next/image'
import { cn } from '@/lib/utils';

import logo_bank_kalteng from '/public/img/logo_bank_kalteng.png'
import logo_bank_kalteng_trf from '/public/img/logo_bank_kalteng_transparent.png'
import logo_bank_kalteng_simple from '/public/img/logo_bank_kalteng_simple.png'

const Logo = () => {

   const { openSidebar } = useSidebar();
   const { theme } = useTheme();
   const logoBrand = theme == 'light' ? logo_bank_kalteng : logo_bank_kalteng_trf;

  return (
   <div className="mb-12 py-8 app-brand bg-[#D5EBE1] dark:bg-dark-depth1 w-full m-auto relative">

      <div className={cn(['m-auto relative', !openSidebar ? 'w-[100px]' : 'w-[160px]' ])}>
         <Image
            src={logoBrand}
            alt="logo bank kalteng"
            className={cn(['m-auto transition-all duration-300', !openSidebar && 'hidden group-hover:block'])}
            priority={true}
            width={0}
            height={0}
            sizes="100vw"
         />

         <Image
            src={logo_bank_kalteng_simple}
            alt="logo bank kalteng"
            className={cn(['m-auto transition-all object-cover duration-300', openSidebar ? 'hidden' : 'group-hover:hidden'])}
            width={0}
            height={0}
            priority={true}
         />
      </div>

      

      
   </div>
  )
}

export default Logo