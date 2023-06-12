import React, { useState } from 'react'

const DropdownButton = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="relative inline-block text-left">
                <button
                    type="button"
                    data-dropdown-toggle="dropdownDots"
                    className="relative z-10 block p-2 text-gray-700 bg-white border border-transparent rounded-md dark:text-white focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-gray-800 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
                </button>
                {isOpen && (
                    <div className="absolute left-0 z-20 py-2 mt-2 origin-top-left bg-white rounded-md shadow-xl dark:bg-gray-800" style={{width: "14rem"}}>
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">                            
                                {children}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </>

    )
}

export default DropdownButton