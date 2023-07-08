import { useTheme } from '@/hooks/ThemeContext'
import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

function LoadingTable() {

  const { theme } = useTheme()

  return (
    <div className="w-full">
      <SkeletonTheme baseColor={theme == 'dark' ? "#36393d" : ""} highlightColor={theme == 'dark' ? "#484c51" : ""}>
        <Skeleton style={{ marginBottom: '3px' }} count={10} height={40} borderRadius={'0.75rem'}/>
      </SkeletonTheme>
   </div>

  )
}

export default LoadingTable