"use client"

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input } from '@/app/components';
import Logo from '../../../../../public/logo_bank_kalteng.png';
import BgLogin from '../../../../../public/Consultative sales-bro.png';
import Image from "next/image";

const loginSchema = yup.object({
    nama: yup.string().required('Wajib diisi').min(6, 'Minimal disii 6 karakter'),
    number: yup.string().required('Wajib diisi'),
    password: yup.string().required('Wajib diisi'),
});

export default function login() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(loginSchema)
    });
    const onSubmit = data => console.log(data);

    return (
        <>
            <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                    </div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div>
                                <h1 className="text-2xl font-semibold">Login Form with Floating Labels</h1>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="relative">
                                        <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                        <Input.Text
                                            name={'username'}
                                            register={register}
                                            placeholder={'Username'}
                                            errors={errors.nama}>
                                        </Input.Text>
                                    </div>
                                    <div className="relative">
                                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">password</label>
                                        <Input.Password
                                            name={'password'}
                                            placeholder={'password'}
                                            errors={errors.password}
                                            register={register}
                                        />
                                    </div>
                                    <div className="relative">
                                        <Button.Primary type={'Submit'}> Submit </Button.Primary>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div>
                <div className='grid grid-cols-2 gap-2 min-h-screen'>
                    <div className="flex justify-center items-center">
                        <div className="h-auto w-95 bg-green-100">
                            <Image src={Logo} className="h-auto mb-auto w-auto bg-blue-300"></Image>
                            <form className="space-y-6 w-full mt-20 bg-red-100" action="#">
                                <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign In</h5>
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                    <Input.Text
                                        name={'username'}
                                        register={register}
                                        placeholder={'Username'}
                                        errors={errors.nama}
                                    />
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                    <Input.Password
                                        name={'password'}
                                        placeholder={'password'}
                                        errors={errors.password}
                                        register={register}
                                    />
                                </div>
                                <Button.Primary type={'Submit'}> Submit </Button.Primary>
                            </form>
                        </div>
                    </div>
                    <div>
                        <Image src={BgLogin} className="h-full mb-auto w-auto"></Image>
                    </div>
                </div>
            </div> */}
        </>
    )
}