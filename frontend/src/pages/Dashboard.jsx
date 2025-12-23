import React, { useEffect, useState } from 'react'

import { AppBar } from '../components/AppBar'
import { Balance } from '../components/Balance'
import { Users } from '../components/Users'
import axios from 'axios'

export const Dashboard = () => {

  const [user, setUser] = useState({
    firstName: "",
    balance: ""
  })

  useEffect(() => {

    const fetchBalance = async() => {
      try {
        const token = localStorage.getItem("token")
        const res = await axios.get("http://localhost:3000/api/v1/user/getBalance", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        
        setUser({
          firstName: res.data.username,
          balance: parseFloat(res.data.balance).toFixed(2)
        })
      } catch (error) {
        console.error("Error fetching balance:", error)
      }
    }

    fetchBalance()
  }, [])
  
  return (
    <div>
      <AppBar name={user.firstName} />
      <div className='my-8 mx-36'>
        <Balance value={user.balance} />
        <Users />
      </div>
    </div>
  )
}

export default Dashboard