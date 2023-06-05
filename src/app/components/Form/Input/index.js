import InputFile from "./InputFile"
import InputCurrency from "./InputCurrency"
import InputDate from "./InputDate"
import InputGroup from "./InputGroup"
import InputNumber from "./InputNumber"
import InputPassword from "./InputPassword"
import InputText from "./InputText"

const Input = {
   Text : InputText,
   Password: InputPassword,
   Date: InputDate,
   File: InputFile,
   Group: InputGroup,
   Number: InputNumber,
   Currency: InputCurrency
}

export default Input
