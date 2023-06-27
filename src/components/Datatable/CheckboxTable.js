import React, {forwardRef} from 'react';

const checkIcon = "<svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 24 24'><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M20 7L10 17l-5-5'/></svg>"
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
                    <span className='font-inter-bold absolute text-green-500 dark:text-green-600 top-[0.05rem] left-[0.05rem] dark:text-opacity-0 text-opacity-0 transition check peer-checked:text-opacity-100'
                    dangerouslySetInnerHTML={{ __html: checkIcon }}/>
                    
                </span>
                <label className="form-check-label" id="booty-check" />
            </div>
        </>
    )
});

CheckboxTable.displayName = "CheckboxTable";
export default CheckboxTable;