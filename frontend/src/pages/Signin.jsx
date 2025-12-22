import React, { useState } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Heading } from '../components/Heading'
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'

export const Signin = () => {

  const [user, setUser] = useState({
    username: "",
    password: ""
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setUser({...user, [e.target.name]:e.target.value})
  }

  const handleSignin = async() => {
    const res = await axios.post("http://localhost:3000/api/v1/user/signin", user)
    console.log(res);
    localStorage.setItem("token", res.data.token)
    navigate("/dashboard")
  }
  
  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox label={"Email"} placeholder={"johndoe@gmail.com"}  type={"email"} name={"username"} onChange={handleChange} value={user.username} />
          <InputBox label={"Password"} placeholder={"12345"} type={"password"} name={"password"} onChange={handleChange} value={user.password} />
          <div className='pt-4'>
            <Button label={"Sign in"} onClick={handleSignin} />
          </div>
          <BottomWarning label={"Don't have an account?"} to={"/signup"} buttonText={"Sign up"}/>
        </div>
      </div>
    </ div>
  )
}

export default Signin