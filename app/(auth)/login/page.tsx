'use client';

import { signIn } from 'next-auth/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";

import { LoginPayload } from '@models/user';
import { Button, FormInput } from '@components/index';
import './page.scss';

const LoginSchema: ZodType<LoginPayload> = z
  .object({
    email: z
      .string()
      .email({ message: 'Email is invalid' })
    ,
    password: z
      .string()
      .min(6, { message: "Password is too short" })
    ,
  })

export default function Login() {
  const { register, handleSubmit, formState: { isValid, errors } } = useForm<LoginPayload>({
    resolver: zodResolver(LoginSchema)
  })

  const onSubmit: SubmitHandler<LoginPayload> = async (payload) => {
    const { email, password } = payload

    const response = await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    console.log(response)
  }

  return (
    <main className='login'>
      <h1>Login</h1>
      <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='login-form-row'>
          <FormInput
            placeholder='Email address'
            icon={{
              src: '/icons/email.svg',
              alt: 'Email icon'
            }}
            register={register('email')}
          />
          <div className='login-form-row-error'>
            {errors.email && <span className='login-form-row-error-text'>{errors.email.message}</span>}
          </div>
        </div>
        <div className='login-form-row'>
          <FormInput
            placeholder='Password'
            icon={{
              src: '/icons/lock.svg',
              alt: 'Lock icon'
            }}
            type='password'
            register={register('password')}
          />
          <div className='login-form-row-error'>
            {errors.password && <span className='login-form-row-error-text'>{errors.password.message}</span>}
          </div>
        </div>
        <Button type='submit' disabled={!isValid}>LOGIN</Button>
      </form>
    </main>
  )
}