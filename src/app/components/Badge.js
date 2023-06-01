import React from 'react'

const Badge = ({children}) => {
  return (
    <>
      {children}
    </>
  )
}

const BadgeSuccess = ({className, children}) => {
   return (
      <span className={`badge badge-success ${className || ''}`}> {children} </span>
   )
}

const BadgeDanger = ({className, children}) => {
   return (
      <span className={`badge badge-danger ${className || ''}`}> {children} </span>
      
   )
}

const BadgeWarning = ({className, children}) => {
   return (
      <span className={`badge badge-warning ${className || ''}`}> {children} </span>
      
   )
}

const BadgeLight = ({className, children}) => {
   return (
      <span className={`badge badge-light ${className || ''}`}> {children} </span>
      
   )
}

Badge.Success = BadgeSuccess;
Badge.Warning = BadgeWarning;
Badge.Danger = BadgeDanger;
Badge.Light = BadgeLight;

export default Badge