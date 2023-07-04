import { useTheme } from '@/hooks/ThemeContext';
import { useClickOutside } from '@/hooks/useClickOutside';
import React, { useRef, useState } from 'react'
import { createPopper } from '@popperjs/core';



const DropdownButton = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const divRef = useRef('')
    
    function openDropdown(event,dropdownID){
        let element = event.target;
        while(element.nodeName !== "BUTTON"){
          element = element.parentNode;
        }
        var popper = createPopper(element, document.getElementById(dropdownID), {
          placement: 'bottom-start'
        });
        document.getElementById(dropdownID).classList.toggle("hidden");
        document.getElementById(dropdownID).classList.toggle("block");
      }

    return (
        // <div className="relative inline-block text-left" ref={divRef}>
        //     <button
        //         type="button"
        //         data-dropdown-toggle="dropdownDots"
        //         className="relative z-5 block p-2 text-gray-700 bg-white border rounded-md  focus:ring-primary focus:ring-1 dark:border-[#5a5b5e] dark:bg-transparent dark:focus:ring-primary-800 focus:outline-none group"
        //         onClick={(e) => openDropdown(e,'dropdown-id-amber')}
        //     >
        //         <svg className="w-6 h-6 group-focus:text-primary dark:text-grey dark:group:focus:text-primary-800" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
        //     </button>
        //     {isOpen && <DropdownItem divRef={divRef} setIsOpen={setIsOpen}> {children} </DropdownItem>}
        // </div>

        <div className="flex flex-wrap">
        <div className="w-full sm:w-6/12 md:w-4/12 px-4">
        <div className="relative inline-flex align-middle w-full">
            <button className="text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 bg-amber-500 active:bg-amber-600 ease-linear transition-all duration-150" type="button" 
            onClick={(e) => openDropdown(e,'dropdown-id-amber')}>
            amber Dropup
            </button>
            <div className="hidden bg-amber-500  text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1 min-w-48" id="dropdown-id-amber">
            <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white">
                Action
            </a>
            <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white">
                Another action
            </a>
            <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white">
                Something else here
            </a>
            <div className="h-0 my-2 border border-solid border-t-0 border-blueGray-800 opacity-25"></div>
            <a href="#pablo" className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white">
                Seprated link
            </a>
            </div>
        </div>
        </div>
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