import React from 'react'
import { AiOutlineDashboard } from 'react-icons/ai'

const Menu = () => {
  return (
   <nav className=' mx-8 flex flex-col gap-2 bg-red-200'>
      <menu className='flex items-center bg-[#009a4d] px-4 py-2 rounded-l-2xl'>
         <div className='flex gap-4 items-center'>   
            <span className='text-lg'> <AiOutlineDashboard /> </span>
            <span> Dashboard </span>
         </div> 
      </menu>
      <menu className='bg-blue-200'> 2 </menu>
      <menu className='bg-blue-200'> 3 </menu>
   </nav>
  )
}

export default Menu