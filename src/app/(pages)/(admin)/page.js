"use client"

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Input, PageTitle } from "@/app/components";

const loginSchema = yup.object({
  nama: yup.string().required('Wajib diisi').min(6, 'Minimal disii 6 karakter'),
  number: yup.string().required('Wajib diisi'),
  password: yup.string().required('Wajib diisi'),
});

export default function Home() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(loginSchema)
  });
  const onSubmit = data => console.log(data);

  return (
    <>
      <PageTitle title='Dashboard'/>
      <Card>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='my-4'>
              <Input.Text 
                name={'username'}
                register={register} 
                placeholder={'Username'}
                errors={errors.nama}
              />
            </div>

            <div className="my-4">
              <Input.Password
                name={'password'}
                placeholder={'password'}
                errors={errors.password}
                register={register}
              />
            </div>

            <Button.Primary type={'Submit'}> Submit </Button.Primary>
          </form>
      </Card>
    </>
  )
}