import ymarket from './ymarket'
import tokens from '../store/tokens'
import React, { FC, useContext, useEffect } from 'react'
import AuthContext from '../hooks/AuthContext'

// Interceptors are handled in a React component so they have access to AuthContext
const WithYMarketApi: FC = ({ children }) => {
  const { accessToken, signIn, signOut } = useContext(AuthContext)

  // If accessToken is defined, use it in all requests
  ymarket.interceptors.request.use(async (config) => {
    if (config.headers) {
      config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : ''
    }

    return config
  })

  useEffect(() => {
    ymarket.interceptors.response.use(
      (response) => {
        // Handle access/refresh tokens in secure store + AuthContext
        if (response.data.access_token && response.data.refresh_token) {
          const { access_token: access, refresh_token: refresh } = response.data
          signIn(access)
          tokens.setRefreshToken(refresh)
        } else if (response.data.access) {
          signIn(response.data.access)
        } else if (response.data.detail === 'Successfully logged out.') {
          signOut()
          tokens.clearRefreshToken()
        }

        return response
      },
      async (error) => {
        if (error.status !== 401) {
          // Reject other errors
          return Promise.reject(error)
        }

        const refreshToken = await tokens.getRefreshToken()
        if (!refreshToken) {
          // User isn't currently logged in
          return Promise.reject(error)
        }

        const config = error.config
        config._retry = true
        ymarket.post('api/token/refresh/', { refresh: refreshToken })

        // Resend request with new token
        return ymarket(config)
      },
    )
  }, [])

  return <>{children}</>
}

export default WithYMarketApi
