import React from 'react'
import { BsFillSunFill } from 'react-icons/bs'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { VscThreeBars } from 'react-icons/vsc'

const Header = () => {
  return (
   <header className='header'>
      <div className='pl-4 pr-8 py-8 flex justify-between mx-5'>
      <div className='flex flex-row gap-3'> 
            <div className='btn-toolbar'> 
            <VscThreeBars className='text-xl'/>
            </div>
            <div className='btn-toolbar'> 
            <BsFillSunFill className='text-yellow-logo text-xl'/>
            </div>
      </div>
      <div className='flex flex-row gap-4 items-center'> 
         <div className='btn-toolbar'> 
            <IoMdNotificationsOutline className='text-xl'/>
         </div>
         <div className="flex gap-3">
            <img 
               src={'/man-avatar.png'} 
               className='w-12 h-12 bg-white rounded-full object-contain' 
               style={{ 
                  'boxShadow': 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
               }}
               alt='user' />
               <div className='flex flex-col items-start'>
                  <span className='font-semibold'> 
                     Ahmad Fauzi 
                  </span>
                  <span className='text-primary text-sm'> Admin </span>
               </div>
            </div>
         </div>
      </div>
   </header>
  )
}

export default Header