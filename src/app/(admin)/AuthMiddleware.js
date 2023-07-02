
'use client'

import useAuth from '@/hooks/useAuth'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

const AuthMiddleware = ({ children }) => {

   const { isAuthenticated } = useAuth()

   useEffect(() => {
      if ( !isAuthenticated ) {
         redirect('/login')
      } 
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return children
}

export default AuthMiddleware