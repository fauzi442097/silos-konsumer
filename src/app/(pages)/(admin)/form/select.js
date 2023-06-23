import MySelect from '@/app/components/Form/Select';
import React, { useState } from 'react'

 
const optionsGroups= [
	{
		label: "Mammal",
		options: [
			{ value: "Dolphin", label: "🐬 Dolphin" },
			{ value: "Giraffe", label: "🦒 Giraffe" }
		]
	},
	{
		label: "Carnivore",
		options: [
			{ value: "Tiger", label: "🐅 Tiger" },
			{ value: "Lion", label: "🦁 Lion" }
		]
	},
	{ value: "Zombie", label: "🧟 Zombie" }
];

const options = [
   { value: "fox", label: "Fox" },
   { value: "Butterfly", label: "Butterfly" },
   { value: "Honeybee", label: "Honeybee" }
];

const FormSelect = () => {

   const [animal, setAnimal] = useState(null);
   const handleChange = value => {
       setAnimal(value);
   };

  return (
   <>
      <div className='w-full flex gap-4 my-4'>
         <div className='w-1/2'> 
            <label className='block mb-1.5'> Select </label>
         <MySelect options={options} value={animal} onChange={handleChange}/>
         </div>
         <div className='w-1/2'> 
            <label className='block mb-1.5'> Select With Searching </label>
            <MySelect options={options} withSearch value={animal} onChange={handleChange}/>
         </div>
      </div>

      <div className='w-full flex gap-4 my-4'>
         <div className='w-1/2'> 
            <label className='block mb-1.5'> Select (disabled)</label>
            <MySelect disabled options={options} value={animal} onChange={handleChange}/>
         </div>
         <div className='w-1/2'> 
            <label className='block mb-1.5'> Select Multiple </label>
            <MySelect withSearch options={optionsGroups} isMultiple={true} value={animal} onChange={handleChange}/>
         </div>
      </div>
   </> 
  )
}

export default FormSelect