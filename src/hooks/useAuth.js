import React from 'react'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const useAuth = () => {
    const isAuthenticated = () => {
        let token = cookies.get('token')
        return token
    }

    const setAuth = (token, user) => {
        cookies.set('token', token)
        cookies.set('user', user)
    }
   
    return {
        isAuthenticated,
        setAuth
    }
}

export default useAuth