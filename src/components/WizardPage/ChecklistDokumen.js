'use client'

import React from "react"
import TabAction from "../TabAction"
import Checkbox from "../Form/Checkbox"

const ChecklistDokumen = ({ prevAction, onSubmit }) => {

    const storeChecklistDokumen = (data) => {
        console.log(data)
        onSubmit();
    }

    return (
        <>
            <div className="w-full my-4 mb-7">
                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                    List Dokumen
                </h3>
                <ul className="w-1/2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center pl-3">
                            <label
                                htmlFor="laravel-checkbox"
                                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                <Checkbox label={'KTP (Dokumen Wajib)'} name={'setuju'} id="accept"/>
                            </label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center pl-3">
                            <label
                                htmlFor="laravel-checkbox"
                                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                <Checkbox label={'KTP (Dokumen Wajib)'} name={'setuju'} id="accept"/>
                            </label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center pl-3">
                            <label
                                htmlFor="laravel-checkbox"
                                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                <Checkbox label={'KTP (Dokumen Wajib)'} name={'setuju'} id="accept"/>
                            </label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center pl-3">
                            <label
                                htmlFor="laravel-checkbox"
                                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                <Checkbox label={'KTP (Dokumen Wajib)'} name={'setuju'} id="accept"/>
                            </label>
                        </div>
                    </li>
                </ul>

                <TabAction onSubmit={storeChecklistDokumen} prevAction={prevAction} />
            </div>
        </>
    )
}

export default ChecklistDokumen