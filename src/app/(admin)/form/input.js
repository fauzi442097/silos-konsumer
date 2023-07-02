
import Button from '@/components/Button'
import Checkbox from '@/components/Form/Checkbox'
import Input from '@/components/Form/Input'
import Radio from '@/components/Form/Radio'
import Textarea from '@/components/Form/Textarea'
import React from 'react'



const FormInput = () => {

  return (
   <>
      <div className='flex gap-2'>
         <Radio label="Indonesia" name="language" value="idn" id="idn" className="mr-3"/>
         <Radio label="Inggris" name="language" value="inggris" className="mr-3"/>
         <Radio label="America" name="language" value="america" className="mr-3" disabled/>
      </div>

      <div className='flex gap-2 my-4'>
         <Checkbox label={'Setuju'} name={'setuju'} id="accept"/>
         <Checkbox label={'Tidak setuju'} name={'setuju'} id="no-accept"/>
         <Checkbox label={'Disabled'} name={'1'} id="no-accept2" disabled/>
      </div>

      <div className='flex flex-row gap-4 w-full md:flex-nowrap flex-wrap my-4'>
         <Textarea placeholder={'with placeholder'} defaultValue={'tes'}/>
         <Textarea defaultValue={`Textarea non disabled `}/>
         <Textarea disabled defaultValue={`Disabled`}/>
         <Textarea readOnly defaultValue={`Readonly`}/>
      </div>

      <div className='flex flex-wrap gap-4 my-4'>
         <div> 
            <label className='block mb-1.5'> Input </label>
            <Input.Text defaultValue='Fauzi' name='text'/>
         </div>
         <div> 
            <label className='block mb-1.5'> Input (Placeholder)</label>
            <Input.Text placeholder={'Sugandi'} />
         </div>
         <div> 
            <label className='block mb-1.5'> Input  (Disabled)</label>
            <Input.Text disabled defaultValue={'disabled'}/>
         </div>
         <div> 
            <label className='block mb-1.5'> Input  (Read Only)</label>
            <Input.Text readOnly defaultValue={'readonly'}/>
         </div>
      </div>

      <div className='flex flex-wrap gap-4 my-4'>
         <div> 
            <label className='block mb-1.5'> Input Text </label>
            <Input.Text defaultValue='Fauzi' name='text'/>
         </div>
         <div> 
            <label className='block mb-1.5'> Input Number </label>
            <Input.Number />
         </div>
         <div> 
            <label className='block mb-1.5'> Input Password </label>
            <Input.Password defaultValue={'123456'}/>
         </div>
         <div> 
            <label className='block mb-1.5'> Input Date </label>
            <Input.Date />
         </div>
         <div> 
            <label className='block mb-1.5'> Input Range Date </label>
            <Input.Date useRange/>
         </div>
         <div> 
            <label className='block mb-1.5'> Input File </label>
            <Input.File/>
         </div>
      </div>


      <div className='flex gap-4 my-4 '>
         <div>
            <label className='block mb-1.5'> Input Group Prepend </label>
            <Input.Group
               inputGroupText={'@'}
               inputElement={<Input.Text name='password'/>}
            />
         </div>

         <div>
            <label className='block mb-1.5'> Input Group Append </label>
            <Input.Group
               append
               inputGroupText={'@example.com'}
               inputElement={<Input.Text name='password'/>}
            />
         </div>

         <div>
            <label className='block mb-1.5'> Input Group Append (Btn) </label>
            <Input.Group
               append
               useButton
               inputElement={<Input.Text name='search' placeholder='search for'/>}
               inputGroupText={<Button className={'rounded-tl-none rounded-bl-none'}> Go! </Button>}
            />
         </div>
      </div>   

      <div className='flex gap-4 my-4'>
         <div>
            <label className='block mb-1.5'> Input Currency (Without Decimal) </label>
            <Input.Currency 
               id="input-example"
               name="input-name"
               prefix='$'
               placeholder="Please enter a number"
               allowDecimals={false}
               onChange={(value, name) => console.log(value, name)}
            />
         </div>
         <div>
            <label className='block mb-1.5'> Input Currency (Without Prefix)</label>
            <Input.Currency 
               id="input-example2"
               name="input-name"
               placeholder="Please enter a number"
               defaultValue={1000}
               allowDecimals={false}
               allowNegativeValue={false}
               onChange={(value, name) => console.log(value, name)}
            />
         </div>

         <div>
            <label className='block mb-1.5'> Input Rupiah (Allow Decimal)</label>
            <Input.Currency 
               id="input-example3"
               name="input-name"
               placeholder="Please enter a number"
               prefix={'Rp'}
               allowDecimals={true}
               allowNegativeValue={false}
               decimalSeparator={','}
               groupSeparator={'.'}
               onChange={(value, name) => console.log(value, name)}
            />
         </div>
      </div>
   </>
  )
}

export default FormInput