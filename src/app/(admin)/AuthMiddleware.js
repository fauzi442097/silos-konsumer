
'use client'

import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const AuthMiddleware = ({ children }) => {

   const router = useRouter()
   const { isAuthenticated } = useAuth()

   useEffect(() => {
      if ( !isAuthenticated ) {
         router.push('/login')
      } 
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return children
}

export default AuthMiddleware