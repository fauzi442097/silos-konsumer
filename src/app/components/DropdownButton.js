import React, { useState } from 'react'
import { useButtonDropdown } from '../hooks/ButtonDropdownContext'
import { useSidebar } from '../hooks/SidebarContext'
import { motion, AnimatePresence } from "framer-motion"

const DropdownButton = ({ children }) => {

    const { openDropdown, toggleDropdown } = useButtonDropdown()
    const { openSidebar, toggleSidebar, setOpenSideMenu } = useSidebar();
    const [showDropdownButton, setShowDropdownButton] = useState({ button: false });

    const setToggleDropdown = () => {
        toggleDropdown();
    }

    const toggleButtonDropdown = (clicked) => {
        const newObject = Object.keys(showDropdownButton)
            .filter((key) => !key.includes(clicked))
            .reduce((obj, key) => {
                return Object.assign(obj, {
                    [key]: false
                });
            }, {});

        newObject[clicked] = !showDropdownButton[clicked];
        setShowDropdownButton(newObject);
    }

    return (
        <>
            <button onClick={() => toggleButtonDropdown('button')} id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" className={` inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600`} type="button">
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
            </button>

            <div id="dropdownDots" className={`z-100 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${showDropdownButton.button ? 'block' : 'hidden'}`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                    </li>
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                    </li>
                    <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                    </li>
                </ul>
                <div className="py-2">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Separated link</a>
                </div>
                <AnimatePresence>
                    {showDropdownButton.button}
                </AnimatePresence>
            </div>
        </>

    )
}

export default DropdownButton