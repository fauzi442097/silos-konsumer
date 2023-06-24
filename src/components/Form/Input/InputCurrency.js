import CurrencyInput from "react-currency-input-field"

const InputCurrency = ({ 
    decimalsLimit = 2, 
    className, 
    validation, 
    name, 
    register, 
    errors, 
    onChange, 
    ...props 
}) => {
   return (
      <>
        <CurrencyInput
          className={`form-control ${errors ? 'form-invalid' : ''} ${className || ''}`}
          decimalsLimit={decimalsLimit}
          onValueChange={onChange}
          disableAbbreviations={false} // Transform when type 1K will be convert to 1.000
          {...register && {...register(name, validation)} }
          {...props}
        />
        {errors && <span className='mt-1 block text-sm form-invalid-message'>{errors.message}</span>}
     </>
   )
 }

export default InputCurrency