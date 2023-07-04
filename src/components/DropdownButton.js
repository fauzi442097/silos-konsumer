import { useTheme } from '@/hooks/ThemeContext';
import { useClickOutside } from '@/hooks/useClickOutside';
import React, { useRef, useState } from 'react'


const DropdownButton = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const divRef = useRef('')

    return (
        <div className="relative inline-block text-left" ref={divRef}>
            <button
                type="button"
                data-dropdown-toggle="dropdownDots"
                className="relative z-5 block p-2 text-gray-700 bg-white border rounded-md  focus:ring-primary focus:ring-1 dark:border-[#5a5b5e] dark:bg-transparent dark:focus:ring-primary-800 focus:outline-none group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <svg className="w-6 h-6 group-focus:text-primary dark:text-grey dark:group:focus:text-primary-800" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
            </button>
            {isOpen && <DropdownItem divRef={divRef} setIsOpen={setIsOpen}> {children} </DropdownItem>}
        </div>
    )
}

const DropdownItem = ({ setIsOpen, divRef, children }) => {

    let ref = useClickOutside(() => {
        setIsOpen(false)
    }, divRef);

    return (
        <div ref={ref} className="absolute left-0 z-50 py-2 mt-2 origin-top-left bg-white rounded-md  dark:bg-dark-depth3 min-w-max" style={{
            inset:"auto auto 0px 38px",
            boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'
        }}>
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <ul className="py-2 text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">                            
                    {children}
                </ul>
            </div>
        </div>
    )
}

export default DropdownButton