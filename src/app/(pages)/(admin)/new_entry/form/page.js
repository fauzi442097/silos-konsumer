'use client'
import React, { useState } from "react"
import { Button, Card, PageTitle } from "@/app/components"
import Step1 from './step1'
import Step2 from "./step2"

const FormNewEntry = () => {
    const [step, setStep] = useState(1);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    return (
        <>
            <PageTitle title="Form New Entry" />
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                        <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                        New Entry
                    </a>
                </li>
                <li>
                    <div className="flex items-center">
                        <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                        <a href="#" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Form New Entry</a>
                    </div>
                </li>
            </ol>
            <Card>
                <div className="grid grid-rows-6 grid-flow-col gap-20">
                    <div className="grid place-content-center row-span-6 bg-gray">
                        <div className='card rounded-full bg-primary-100 dark:bg-dark-depth1 dark:text-grey dark:shadow-none'>
                            <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
                                <li className="mb-10 h-[100px]">
                                    <span className={`absolute flex items-center justify-center w-8 h-8 ${step === 1 ? "bg-green-200" : "bg-gray-100"} rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900`}>
                                        <svg aria-hidden="true" className="w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    </span>
                                    {/* <h3 className="font-medium leading-tight">Simulasi</h3>
                                    <p className="text-sm">Isian Form Simulasi</p> */}
                                </li>
                                <li className="h-[100px]">
                                    <span className={`absolute flex items-center justify-center w-8 h-8 ${step === 2 ? "bg-green-200" : "bg-gray-100"} rounded-full -left-4 ring-white dark:ring-gray-900 dark:bg-gray-700`}>
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                    </span>
                                    {/* <h3 className="font-medium leading-tight">Biaya - biaya</h3>
                                    <p className="text-sm">Isian Form Biaya - biaya</p> */}
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div className="row-span-6 col-span-3">
                        {step === 1 ? <Step1 /> : <Step2 />}
                    </div>
                </div>
                <div className="flex justify-between mt-6">
                    {step > 1 && (
                        <Button.Primary
                            // className="bg-gray-300 px-6 py-1.5 rounded-lg text-gray-700 hover:bg-gray-400"
                            onClick={handleBack}
                        >
                            Back
                        </Button.Primary>
                    )}
                    {step < 2 && (
                        <Button.Primary
                            // className="bg-blue-500 px-6 py-1.5 rounded-lg text-white hover:bg-blue-600"
                            onClick={handleNext}
                        >
                            Simulasi
                        </Button.Primary >
                    )}
                </div>
            </Card>
        </>
    );
}

export default FormNewEntry