import React, { createContext, FC, useState } from 'react'
import tokens from '../store/tokens'

type AuthContextType = {
  loading: boolean
  setLoading: (value: boolean) => void
  loggedIn: boolean
  signIn: (token: string) => void
  signOut: () => void
}
const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider: FC = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  const initialValues: AuthContextType = {
    loading,
    setLoading: (value) => setLoading(value),
    loggedIn,
    signIn: (token: string) => {
      setLoading(false)
      setLoggedIn(true)
      tokens.setAccessToken(token)
    },
    signOut: () => {
      setLoggedIn(false)
      tokens.clearTokens()
    },
  }

  return <AuthContext.Provider value={initialValues}>{children}</AuthContext.Provider>
}

export default AuthContext
