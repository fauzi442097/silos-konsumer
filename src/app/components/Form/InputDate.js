'use client'

import React, { useState } from 'react'
import Datepicker from "react-tailwindcss-datepicker";

const InputDate = ({className, useRange = false, format = 'DD/MM/YYYY', ...props}) => {

   const [value, setValue] = useState({
      startDate: null,
      endDate: null
  });

  const handleValueChange = (newValue) => {
      setValue(newValue);
  }


  return (   
   <Datepicker
      primaryColor={"emerald"}
      useRange={useRange}
      asSingle={!useRange}
      value={value}
      displayFormat={format}
      separator={"-"} 
      showShortcuts={useRange} 
      showFooter={useRange} 
      onChange={handleValueChange}
      readOnly={true} 
      popoverDirection="up" 
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
      {...props}
      inputClassName="form-control read-only:bg-white dark:read-only:bg-dark-depth2"
    />
   )

}

export default InputDate