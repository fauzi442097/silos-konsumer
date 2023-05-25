import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
   <div className='mb-4 py-8'> 
      <Image 
         src={'/logo_bank_kalteng.png'} 
         alt='logo bank kalteng' 
         className='m-auto'
         width={200}
         height={200}/>
   </div>
  )
}

export default Logo