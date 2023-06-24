

import React from 'react'

const InputGroup = ({ 
   inputGroupText, 
   inputElement, 
   prepend = true, 
   append = false,
   useButton = false,  
   ...props 
}) => {
 if ( append ) {
   return (
     <div className='input-group' {...props}>
         {inputElement}
         <div className="input-group-append">
           {
             useButton ? inputGroupText : (
               <span className="input-group-text">
                 {inputGroupText}
               </span>
             )
           }
         </div>
     </div>  
   )
 }

 return (
   <div className='input-group' {...props}>
     <div className='input-group-prepend'>
         {
             useButton ? inputGroupText : (
               <span className="input-group-text">
                 {inputGroupText}
               </span>
             )
         }
       </div>
       {inputElement}
   </div>
 )
}


export default InputGroup