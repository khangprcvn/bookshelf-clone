/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import * as authClient from 'utils/auth-client'
import { useAsync } from 'utils/use-async'
import { bootstrapAppData } from 'utils/bootstrap'

const AuthContext = React.createContext()

const appDataPromise = bootstrapAppData()

function AuthProvider(props) {
  const {
    data,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData
  } = useAsync()

  React.useLayoutEffect(() => {
    run(appDataPromise)
  }, [run])

  const signup = React.useCallback(
    form => authClient.signup(form).then(user => setData({ user })),
    [setData]
  )

  const login = React.useCallback(
    form => authClient.login(form).then(user => setData({ user })),
    [setData]
  )

  const logout = React.useCallback(() => {
    authClient.logout()
    setData(null)
  }, [setData])

  const user = data?.user

  const value = React.useMemo(() => ({ user, login, signup, logout }), [
    user,
    login,
    signup,
    logout
  ])

  if (isLoading || isIdle) return <p>Loading...</p>

  if (isError) return <p>Error ${error}</p>

  if (isSuccess) return <AuthContext.Provider value={value} {...props} />
}

function useAuth() {
  const context = React.useContext(AuthContext)

  if (context === undefined)
    throw new Error('useAuth must be used within a Provider')
  return context
}

export { AuthProvider, useAuth }
