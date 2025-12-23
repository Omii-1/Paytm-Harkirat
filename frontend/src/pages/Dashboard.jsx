import React from 'react'

import { AppBar } from '../components/AppBar'
import { Balance } from '../components/Balance'
import { Users } from '../components/Users'

export const Dashboard = () => {
  return (
    <div>
      <AppBar />
      <div className='my-8 mx-36'>
        <Balance value={"3000"} />
        <Users />
      </div>
    </div>
  )
}

export default Dashboard