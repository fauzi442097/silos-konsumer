'use client'

import React, { forwardRef, useState } from 'react'
import Datepicker from "react-tailwindcss-datepicker";

// eslint-disable-next-line react/display-name
const InputDate = forwardRef(({
   className, 
   useRange = false, 
   format = 'DD/MM/YYYY', 
   name, 
   validation, 
   register,
   errors,
   ...props
}, ref) => {

   const [value, setValue] = useState({
      startDate: null,
      endDate: null
  });

  const handleValueChange = (newValue) => {
      setValue(newValue);
  }

  return (   
      <>
         <Datepicker
            primaryColor={"emerald"}
            useRange={useRange}
            asSingle={!useRange}
            displayFormat={format}
            separator={"-"} 
            {...register && {...register(name, validation)} }
            ref={null}
            showShortcuts={useRange} 
            showFooter={useRange} 
            readOnly={true} 
            popoverDirection="bottom" 
            configs={{
               shortcuts: {
                  today: "Hari Ini", 
                  yesterday: "Kemarin", 
                  past: period => `${period} Hari Terakhir`, 
                  currentMonth: "Bulan Ini", 
                  pastMonth: "Bulan Lalu" 
               },
               footer: {
                  cancel: "Batal", 
                  apply: "Tetapkan" 
               }
            }} 
            inputClassName={`form-control ${errors ? 'form-invalid' : ''} read-only:bg-white dark:read-only:bg-dark-depth2 read-only:cursor-pointer`}
            {...props}
         />
      {errors && <span className='mt-1 block text-sm form-invalid-message'>{errors.message}</span>}
    </>
   )

})

export default InputDate