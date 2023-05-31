'use client'

import React, { useState } from 'react';
import { useTheme } from "@/app/hooks/ThemeContext"
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';

const options = [
    ''
  ];

const InputTypeahead = ({ name, tittle }) => {
    const [singleSelections, setSingleSelections] = useState([]);
    const { theme } = useTheme()
    const darkMode = theme == 'light' ? {
        'boxShadow': '#c7cdc969 3px 0px 25px 0px'
    } : {}

    return (
        <div style={{ darkMode }} className="mb-5">
            <label htmlFor={name} className="block mb-3 text-sm font-medium text-gray-900 dark:text-white">{tittle}</label>
            <Typeahead
                id="basic-typeahead-single"
                name={name}
                labelKey="name"
                onChange={setSingleSelections}
                options={options}
                placeholder="Choose a state..."
                selected={singleSelections}
                inputProps={{
                    className: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-primary block w-full p-2.5 dark:bg-dark-depth2'
                  }}
            />
        </div>
    )
}

export default InputTypeahead