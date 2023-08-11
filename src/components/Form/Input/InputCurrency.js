import { forwardRef } from "react"
import CurrencyInput from "react-currency-input-field"

// eslint-disable-next-line react/display-name
const InputCurrency = forwardRef(({ 
    decimalsLimit = 2, 
    className, 
    validation, 
    name, 
    register, 
    errors, 
    onChange, 
    hideError = false, 
    ...props 
}, ref) => {
   return (
      <>
        <CurrencyInput
          className={`form-control ${errors ? 'form-invalid' : ''} ${className || ''}`}
          decimalsLimit={decimalsLimit}
          onValueChange={onChange}
          disableAbbreviations={false}
          ref={null} // Transform when type 1K will be convert to 1.000
          {...register && {...register(name, validation)} }
          {...props}
        />
        {(errors && !hideError) && <span className='mt-1 block text-sm form-invalid-message'>{errors.message}</span>}
     </>
   )
 });

export default InputCurrency