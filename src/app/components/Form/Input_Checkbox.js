'use client'

import React from "react"
import { useTheme } from "@/app/hooks/ThemeContext"

const InputCheckbox = ({ name, tittle }) => {

    const { theme } = useTheme()
    const darkMode = theme == 'light' ? {
        'boxShadow' : '#c7cdc969 3px 0px 25px 0px'
    } : {}

    return (
        <div style={{darkMode}} className="mb-5">
            <input type="checkbox" name={name} id={name} className="w-4 h-4 outline-primary bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            </input>
            <label htmlFor={name} class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{tittle}</label>
        </div>
    )
}

export default InputCheckbox