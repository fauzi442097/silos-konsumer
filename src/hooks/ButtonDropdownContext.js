'use client'
import React, { useContext, useState } from 'react'

const ButtonDropdownContext = React.createContext({})

export const useButtonDropdown = () => {
    return useContext(ButtonDropdownContext)
}

export function ButtonDropdownProvider({ children }){
    const [openDropdown, setOpenDropdown] = useState(true)

    const toggleDropdown = () => {
        setOpenDropdown(prevDropdown => !prevDropdown)
    }

    return (
        <ButtonDropdownContext.Provider value={{
            openDropdown,
            toggleDropdown
        }}>
            {children}
        </ButtonDropdownContext.Provider>
    )
}