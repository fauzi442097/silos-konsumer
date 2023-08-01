import React from 'react'
import { forwardRef } from 'react';
import Select from "react-tailwindcss-select";

// eslint-disable-next-line react/display-name
const MySelect = forwardRef(({ 
   selectInModal = false,
   withSearch = false, 
   disabled = false, 
   errors,
   validation,
   register, 
   ...props
}, ref) => {


  return (
   <div>
      <Select
         isSearchable={withSearch}
         isDisabled={disabled}
         isMultiple={props.isMultiple}
         {...register && {...register(name, validation)} }
         ref={null}
         classNames={{ 
            menuButton: ({ isDisabled }) => (
                  `flex text-sm py-0.5 px-4 border rounded rounded-xl my-0 transition duration-300 focus:outline-none enabled:focus:ring-1 enabled:focus:ring-primary ${
                     isDisabled
                        ? "opacity-50 dark:opacity-40 cursor-not-allowed bg-gray-200 dark:bg-[#3c413fba] dark:border-transparent"
                        : "bg-white dark:bg-dark-depth2 dark:border-dark-depth2 hover:border-gray-400 focus:border-primary focus:ring focus:ring-primary/20"
                  }`
            ),
            menu: `${!selectInModal && 'absolute z-50'} bg-white dark:bg-dark-depth2 shadow-lg dark:shadow-none dark:border-dark-depth2 border rounded-xl py-2 mt-1.5 transition duration-300 w-full`,
            searchContainer: 'px-3 my-4',
            searchBox: 'rounded-lg border w-full px-9 py-2 focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-primary-800 dark:bg-[#575b5f] dark:border-[#575b5f] dark:focus:ring-primary-800',
            listItem: ({ isSelected }) => (
               `block transition dark:text-grey duration-200 px-2 py-2 cursor-pointer my-2 rounded-lg select-none truncate rounded ${
                   isSelected
                       ? `bg-primary text-white dark:text-primary-600 dark:bg-[#484c51] font-inter-medium`
                       : `hover:bg-[#edf0f1] hover:text-primary dark:hover:bg-[#484c51] hover:font-inter-medium`
               }`
           ),
           tagItemText: 'mb-0',
           searchIcon: `dark:text-grey text-sm w-5 absolute ${selectInModal ? 'top-[5.3rem]' : 'top-8'} left-5`,
           listGroupLabel: 'font-inter-semibold',
           ChevronIcon: 'bg-red-500 text-ld'
          }}
         primaryColor={"emerald"}
         {...props}
      />
      {errors && <span className='mt-1 block text-sm form-invalid-message'>{errors.message}</span>}
   </div>
  )
});

export default MySelect