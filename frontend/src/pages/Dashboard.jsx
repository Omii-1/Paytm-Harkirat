import React from 'react'

import { AppBar } from '../components/AppBar'
import { Balance } from '../components/Balance'
import { Users } from '../components/Users'

export const Dashboard = () => {
  return (
    <div>
      <AppBar />
      <Balance value={"3000"} />
      <Users />
    </div>
  )
}

export default Dashboard