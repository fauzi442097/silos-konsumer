import React from 'react'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const useAuth = () => {

    const setAuth = (token, user) => {
        cookies.set('auth', {token, user})
    }

    const auth = cookies.get('auth')
    const isAuthenticated = auth ? true : false

    const removeAuth = () => {
        cookies.remove('auth')
    }
  
    return {
        auth,
        setAuth,
        isAuthenticated,
        removeAuth
    }
}

export default useAuth