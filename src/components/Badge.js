import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import React from 'react'

const badgeVariants = cva('inline-flex items-center py-1 px-2 rounded-md text-sm cursor-default', {
   variants: {
      variant: {
         success: 'text-primary bg-primary-100 dark:bg-light-primary',
         warning: 'text-[#FFA800] bg-[#FFF4DE]  dark:bg-[#eae0ab] dark:text-[#756930]',
         danger: 'text-[#ec1a1f] bg-[#ffebeb] dark:bg-[#ece2e2] dark:text-red-logo',
         light: 'bg-gray-100 border border-gray-100 text-gray-600 dark:bg-gray-300 dark:border-gray-300 dark:text-gray-700'
      }
   },
   defaultVariants: {
      variant: 'light'
   }
})

const Badge = ({className, variant, ...props}) => {
   return <span className={cn(badgeVariants({variant, className}))} {...props}/>
}

export default Badge