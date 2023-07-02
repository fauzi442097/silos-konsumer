'use client'

import React from 'react'

const CardHeader = ({ children }) => {

  return (
      <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {children}
        </h3>
      </div>
  )
}

export default CardHeader