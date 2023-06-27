'use client'
import React from 'react'

const generateColumn = (totalColumn, height = 'h-8') => {
    return [...Array(totalColumn)].map((item, i) => <div key={i} className={`h-8 align-middle dark:bg-dark-depth-2 bg-gray-200 mt-3`}></div>)
}

const LoadingSkeletonTable = ({ totalRows = 10, totalColumn  }) => {
  const columns = generateColumn(totalColumn)
  return (
    <div className='animate-pulse'>
        <div className={`grid grid-cols-${totalColumn} gap-4`}>
            {columns.map((column, i) => column)}
        </div>
        <div className='border-b border-dashed border-color-border-light dark:border-color-border-dark my-2'></div>
        {
            [...Array(totalRows)].map((item, i) => ( 
                <>
                    <div key={i} className={`grid grid-cols-${totalColumn} gap-4`}>
                        {[...Array(totalColumn)].map((value, i) => <div key={i} className={`h-4 align-middle dark:bg-dark-depth-2 bg-gray-200`}></div>)}
                    </div>
                    <div className='border-b border-dashed border-color-border-light dark:border-color-border-dark my-2'></div>
                </>
            ))
        }
    </div>
  )
}

export default LoadingSkeletonTable