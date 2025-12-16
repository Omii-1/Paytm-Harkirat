import React from 'react'

import { Heading } from '../components/Heading'
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'

export const Signin = () => {
  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox label={"Email"} placeholder={"johndoe@gmail.com"}  type={"email"} />
          <InputBox label={"Password"} placeholder={"12345"} type={"password"} />
          <div className='pt-4'>
            <Button label={"Sign in"} onClick={()=>{}} />
          </div>
          <BottomWarning label={"Don't have an account?"} to={"/signup"} buttonText={"Sign up"}/>
        </div>
      </div>
    </ div>
  )
}

export default Signin