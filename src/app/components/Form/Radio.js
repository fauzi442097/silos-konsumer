import React from 'react'

const Radio = ({ label, className, ...props } ) => {
   return (
      <label htmlFor={props.is} className="radio-label">
         <input
            className="radio-input"
            type="radio"
            {...props}
         />
         <span className="custom-radio" />
         <span className='inline-block -ml-1'> {label} </span>
      </label>
   )
 }
 

export default Radio