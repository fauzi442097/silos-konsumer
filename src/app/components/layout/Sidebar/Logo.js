import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
   <div className="mb-10 p-4 app-brand bg-main mt-4 m-auto w-52 rounded-xl">
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