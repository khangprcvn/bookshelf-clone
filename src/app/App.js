import React from 'react'
import './app.css'

import { useAuth } from 'context/AuthContext'

const AuthenticatedApp = React.lazy(() => import('pages/AuthenticatedApp'))
const UnauthenticatedApp = React.lazy(() => import('pages/UnauthenticatedApp'))

function App() {
  const { user } = useAuth()
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}

export default App
