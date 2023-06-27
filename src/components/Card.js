'use client'

import React from 'react'
import { useTheme } from '../hooks/ThemeContext';

const Card = ({ children, custom }) => {

  const { theme } = useTheme()
  const boxShadowCardStyle = theme == 'light' ? {
    'boxShadow': '#c7cdc969 3px 0px 25px 0px'
  } : {}

  const customStyle = custom ? custom : '';

  return (
    <div style={boxShadowCardStyle} className={`card rounded-xl bg-white dark:bg-dark-depth1 dark:text-grey dark:shadow-none w-full ${customStyle}`}>
      {children}
    </div>
  )
}

export default Card