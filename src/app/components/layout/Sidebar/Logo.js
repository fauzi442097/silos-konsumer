import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
   <div className="mb-12 py-8 app-brand bg-[#D5EBE1] w-full m-auto">
      <Image
         src={"/logo_bank_kalteng.png"}
         alt="logo bank kalteng"
         className="m-auto"
         width={160}
         height={160}
      />
   </div>
  )
}

export default Logo