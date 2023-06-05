'use client'
import React from 'react'
import { useTheme } from '../hooks/ThemeContext';
import { MySwal, MyToast } from '../components';

const Layout = ({ children }) => {
  const { theme } = useTheme();
  return (
      <html lang="en">
         <body className={`${theme == 'dark' ? 'dark' : ''}`}>
            <MyToast/>
            <MySwal/>
            {children}
         </body>
      </html>
  )
}

export default Layout