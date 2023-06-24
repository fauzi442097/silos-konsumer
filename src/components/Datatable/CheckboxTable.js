import React, {forwardRef} from 'react';
import { FaCheck } from 'react-icons/fa';


const CheckboxTable = forwardRef(({...rest}, ref) => {
  return(
        <>
            <div className="pointer-events-none relative cursor-pointer select-none gap-1.5 items-center inline-flex" style={{ backgroundColor: '' }}>
                <span className='h-5 w-5'>
                    <input 
                        type="checkbox"
                        className="form-check border rounded-md peer h-5 w-5 bg-white dark:bg-transparent"
                        ref={ref}
                        {...rest}
                    />
                    <FaCheck className='font-inter-bold w-3 h-3 absolute text-green-500 dark:text-green-600 top-1 left-1 dark:text-opacity-0 text-opacity-0 transition check peer-checked:text-opacity-100'/>
                </span>
                <label className="form-check-label" id="booty-check" />
            </div>
        </>
    )
});

CheckboxTable.displayName = "CheckboxTable";
export default CheckboxTable;