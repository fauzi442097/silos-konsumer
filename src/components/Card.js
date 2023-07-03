'use client'

import React from 'react'
import { useTheme } from '../hooks/ThemeContext';
import { cn } from '@/lib/utils';

const Card = ({ children, className }) => {

  const { theme } = useTheme()
  const boxShadowCardStyle = theme == 'light' ? {
    'boxShadow': '#c7cdc969 3px 0px 25px 0px'
  } : {}

  return (
    <div style={boxShadowCardStyle} className={cn(['card rounded-xl bg-white dark:bg-dark-depth1 dark:text-grey dark:shadow-none w-full', className])}>
      {children}
    </div>
  )
}

export default Card