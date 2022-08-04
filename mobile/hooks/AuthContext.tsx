import React, { createContext, FC, useState } from 'react'
import tokens from '../store/tokens'
import { AccessToken } from '../types'

type AuthContextType = {
  loading: boolean
  setLoading: (value: boolean) => void
  accessToken: AccessToken
  signIn: (token: string) => void
  signOut: () => void
}
const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider: FC = ({ children }) => {
  const [accessToken, setAccessToken] = useState<AccessToken>(undefined)
  const [loading, setLoading] = useState(true)

  const initialValues: AuthContextType = {
    loading,
    setLoading: (value) => setLoading(value),
    accessToken,
    signIn: (token: string) => {
      setLoading(false)
      setAccessToken(token)
    },
    signOut: () => {
      tokens.clearRefreshToken()
      setAccessToken(undefined)
    },
  }

  return <AuthContext.Provider value={initialValues}>{children}</AuthContext.Provider>
}

export default AuthContext
