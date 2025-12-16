import React from 'react'

import { Heading } from '../components/Heading'
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'

export function Signup () {
  return (
    <>
      <Heading label={"Sign up"} />
      <SubHeading label={"Enter your information to create an account"} />
      <InputBox label={"First Name"} placeholder={"John"} />
      <InputBox label={"Last Name"} placeholder={"Doe"} />
      <InputBox label={"Email"} placeholder={"johndoe@gmail.com"} />
      <InputBox label={"Password"} placeholder={"12345"} />
      <Button label={"Sign up"} onClick={()=>{}} />
      <BottomWarning label={"Already have an account?"} to={"/signin"} buttonText={"Sign in"}/>
    </>
  )
}
