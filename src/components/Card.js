import React from 'react'
import { cn } from '@/lib/utils';

const Card = ({ children, className }) => {
  return (
    <div className={cn(['card rounded-2xl bg-white dark:bg-dark-depth1 dark:text-grey dark:shadow-none w-full', className])}>
      {children}
    </div>
  )
}

const CardHeader = ({ className, ...props}) => {
  return (
    <div className={cn(['px-10 py-8 border-b dark:border-b-[#2f3237]', className])} {...props} /> 
  )
}

const CardBody = ({ className, ...props}) => {
  return (
    <div className={cn(['px-10 py-1', className])} {...props} /> 
  )
}

const CardFooter = ({ className, ...props}) => {
  return (
    <div className={cn(['px-10 py-8', className])} {...props} /> 
  )
}

Card.Body = CardBody
Card.Header = CardHeader
Card.Footer = CardFooter

export default Card