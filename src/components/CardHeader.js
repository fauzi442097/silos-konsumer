'use client'

import React from 'react'
import { useTheme } from '../hooks/ThemeContext';

const CardHeader = ({ children }) => {

  const { theme } = useTheme()
  const boxShadowCardStyle = theme == 'light' ? {
    'boxShadow': '#c7cdc969 3px 0px 25px 0px'
  } : {}

  return (
      <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {children}
        </h3>
      </div>
  )
}

export default CardHeader