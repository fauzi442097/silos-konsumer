'use client'

import React from "react"
import { useTheme } from "@/app/hooks/ThemeContext"

const InputText = ({ name, tittle }) => {

    const { theme } = useTheme()
    const darkMode = theme == 'light' ? {
        'boxShadow' : '#c7cdc969 3px 0px 25px 0px'
    } : {}

    return (
        <div style={{darkMode}} className="mb-5">
            <label for={name} class="block mb-3 text-sm font-medium text-gray-900 dark:text-white">{tittle}</label>
            <input name={name} id={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-primary block w-full p-2.5 dark:bg-dark-depth2">
            </input>
        </div>
    )
}

export default InputText