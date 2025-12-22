import React, { useState } from 'react'

import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { Heading } from '../components/Heading'
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'

export function Signup () {

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: ""
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setUser({...user, [e.target.name]:e.target.value})
    console.log(user);
    
  }

  const handleSignup = async () => {
    const res = await axios.post("http://localhost:3000/api/v1/user/signup", user)
    console.log(res);
    localStorage.setItem("token",res.data.token)
    navigate("/dashboard")
  }

  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox label={"First Name"} type={"text"} placeholder={"John"} name={"firstName"} onChange={handleChange} value={user.firstName} />
          <InputBox label={"Last Name"} type={"text"} placeholder={"Doe"} name={"lastName"} onChange={handleChange} value={user.lastName} />
          <InputBox label={"Email"} type={"email"} placeholder={"johndoe@gmail.com"} name={"username"} onChange={handleChange} value={user.username} />
          <InputBox label={"Password"} type={"password"} placeholder={"12345"} name={"password"} onChange={handleChange} value={user.password} />
          <div className='pt-4' >
            <Button label={"Sign up"} onClick={handleSignup} />
          </div>
          <BottomWarning label={"Already have an account?"} to={"/signin"} buttonText={"Sign in"}/>
        </div>
      </div>
    </ div>
  )
}
