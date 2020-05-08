import React from 'react'

import { useAuth } from 'context/AuthContext'

function AuthenticatedApp() {
  const { logout } = useAuth()
  return (
    <div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}

export default AuthenticatedApp
