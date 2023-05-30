'use client'

import React from "react"
import { useTheme } from "@/app/hooks/ThemeContext"

const Textarea = ({ name, tittle }) => {

    const { theme } = useTheme()
    const darkMode = theme == 'light' ? {
        'boxShadow': '#c7cdc969 3px 0px 25px 0px'
    } : {}

    return (
        <div style={{ darkMode }} className="mb-5">
            <label htmlFor={name} className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">{tittle}</label>
            <textarea id={name} name={name} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 outline-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
        </div>
    )
}

export default Textarea