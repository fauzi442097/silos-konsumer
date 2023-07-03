import React from 'react'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const useAuth = () => {

    const setAuth = (token, user) => {
        cookies.set('auth', {token, user})
    }

    const auth = cookies.get('auth') ? cookies.get('auth') : null
    const isAuthenticated = cookies.get('auth') ? true : false

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