import React, { useState } from 'react';

import { useTheme } from "@/app/hooks/ThemeContext"
import Select from "react-select"

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

const InputSelect = ({ name, tittle }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const { theme } = useTheme()
    const darkMode = theme == 'light' ? {
        'boxShadow': '#c7cdc969 3px 0px 25px 0px'
    } : {}

    return (
        <div style={{ darkMode }} className="mb-3">
            <label htmlFor={name} className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">{tittle}</label>
            <Select
                name={name}
                id={name}
                defaultValue={selectedOption}
                options={options}
                theme={theme => ({
                    ...theme,
                    borderRadius: 8,
                    colors: {
                      ...theme.colors, 
                      primary25: 'black',
                      primary: 'primary',
                    },
                  })}
            />
        </div>
    )
}

export default InputSelect