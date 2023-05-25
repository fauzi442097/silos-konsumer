import Image from 'next/image'
import React from 'react'
import { AiOutlineDashboard } from 'react-icons/ai'
import Logo from './Logo'
import Menu from './Menu'

const Sidebar = () => {
  return (
   <sidebar className='fixed left-0 bottom-0 top-0 w-72'>  
      <Logo/>
      <Menu/>
   </sidebar>
  )
}

export default Sidebar