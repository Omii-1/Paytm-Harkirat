import React from 'react'

import { Heading } from '../components/Heading'
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'

export function Signup () {
  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox label={"First Name"} type={"text"} placeholder={"John"} />
          <InputBox label={"Last Name"} type={"text"} placeholder={"Doe"} />
          <InputBox label={"Email"} type={"email"} placeholder={"johndoe@gmail.com"} />
          <InputBox label={"Password"} type={"password"} placeholder={"12345"} />
          <div className='pt-4'>
            <Button label={"Sign up"} onClick={()=>{}} />
          </div>
          <BottomWarning label={"Already have an account?"} to={"/signin"} buttonText={"Sign in"}/>
        </div>
      </div>
    </ div>
  )
}
