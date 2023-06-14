'use client'

import React from 'react'
import { useTheme } from '../hooks/ThemeContext';

const Card = ({ children }) => {

  const { theme } = useTheme()
  const boxShadowCardStyle = theme == 'light' ? {
        'boxShadow': '#c7cdc969 3px 0px 25px 0px'
        } : {}

  return (
    <div style={boxShadowCardStyle} className='card bg-white dark:bg-dark-depth1 dark:text-grey dark:shadow-none overflow-y-scroll'>
        {children}
    </div>
  )
}

export default Card