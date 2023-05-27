import React from 'react'
import { RxCaretDown, RxHamburgerMenu } from "react-icons/rx";
import { TiThLarge } from "react-icons/ti";
import { FaUserCheck, FaUserClock } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";

const Menu = () => {
  return (
   <ul className="side-menu">
      <li className="menu-item">
         <a hre="#">
            <span className="menu-icon">
               {" "}
               <TiThLarge />{" "}
            </span>
            <span className="menu-item-name"> Dashboard </span>
         </a>
      </li>

      <li className="active menu-item">
         <a href="#">
            <span className="menu-icon">
               {" "}
               <FaUserClock />{" "}
            </span>
            <span className="menu-item-name"> Dalam Proses </span>
            <span className="menu-icon absolute right-0">
               {" "}
               <RxCaretDown />{" "}
            </span>
         </a>

         <ul className="sub-menu mt-4 p-0">
            <li className="sub-menu-item">
               <a hre="#">
                  <span className="submenu-icon">
                     {" "}
                     <TbPointFilled />{" "}
                  </span>
                  <span> New Entry </span>
               </a>
            </li>
            <li className="sub-menu-item">
               <a hre="#">
                  <span className="submenu-icon">
                     {" "}
                     <TbPointFilled />{" "}
                  </span>
                  <span> Monitoring SIP Cabang </span>
               </a>
            </li>
            <li className="sub-menu-item">
               <a hre="#">
                  <span className="submenu-icon">
                     {" "}
                     <TbPointFilled />{" "}
                  </span>
                  <span> Prospek Baru </span>
               </a>
            </li>
            <li className="sub-menu-item active">
               <a hre="#">
                  <span className="submenu-icon">
                     {" "}
                     <TbPointFilled />{" "}
                  </span>
                  <span> Calon Nasabah </span>
               </a>
            </li>
            <li className="sub-menu-item">
               <a hre="#">
                  <span className="submenu-icon">
                     {" "}
                     <TbPointFilled />{" "}
                  </span>
                  <span> Topup Pinjaman </span>
               </a>
            </li>
         </ul>
      </li>
      
      <li className="menu-item">
         <a href="#">
            <span className="menu-icon">
               {" "}
               <FaUserCheck />{" "}
            </span>
            <span className="menu-item-name"> Sudah Cair </span>
            <span className="menu-icon absolute right-0">
               {" "}
               <RxCaretDown />{" "}
            </span>
         </a>
      </li>

   </ul>
  )
}

export default Menu