import InputFile from "./InputFile"
import InputCurrency from "./InputCurrency"
import InputDate from "./InputDate"
import InputGroup from "./InputGroup"
import InputNumber from "./InputNumber"
import InputPassword from "./InputPassword"
import InputText from "./InputText"
import InputHidden from "./InputHidden"

const Input = {
   Text : InputText,
   Hidden : InputHidden,
   Password: InputPassword,
   Date: InputDate,
   File: InputFile,
   Group: InputGroup,
   Number: InputNumber,
   Currency: InputCurrency
}

export default Input
