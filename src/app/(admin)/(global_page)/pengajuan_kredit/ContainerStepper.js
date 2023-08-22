import React from 'react'
import { RefStepper, Stepper } from './Stepper'

const ContainerStepper = ({ currentStep }) => {
  return (
   <div className="my-6">
      <div className=" w-full bg-white rounded-2xl shadow py-8 dark:bg-dark-depth1">
      <div className='w-[85%] flex justify-center items-center gap-20 m-auto'>
      {RefStepper.map((item, i) => (
            <Stepper
                  key={i}
                  id={item.id}
                  visited={i < currentStep}
                  active={item.id == currentStep}
                  icon={item.icon} 
                  label={item.label}
            />
         ))}
      </div>
      </div>
   </div>
  )
}

export default ContainerStepper