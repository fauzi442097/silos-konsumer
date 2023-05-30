'use client'

import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { useTheme } from "@/app/hooks/ThemeContext"

const InputDate = ({ name, tittle }) => {

    const { theme } = useTheme()
    const darkMode = theme == 'light' ? {
        'boxShadow': '#c7cdc969 3px 0px 25px 0px'
    } : {}

    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });

    const handleValueChange = (newValue) => {
        setValue(newValue);
    }


    return (
        <div style={{ darkMode }} className="mb-5">
            <label htmlFor={name} className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">{tittle}</label>
            <Datepicker
                primaryColor={"emerald"}
                placeholder={name}
                useRange={false}
                asSingle={true}
                value={value}
                displayFormat={"DD/MM/YYYY"}
                onChange={handleValueChange}
                inputClassName="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-primary w-full p-2.5 dark:bg-dark-depth2"
            />
        </div>
    )
}

export default InputDate