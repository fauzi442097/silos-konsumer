import React, { forwardRef } from 'react'

// eslint-disable-next-line react/display-name
const Toolbar = forwardRef(({className, children, ...props}, ref) => {
   return (
      <div className={`btn-toolbar ${className || ''}`}  {...props} ref={ref}>  
         {children}
      </div>
   )
})

export default Toolbar