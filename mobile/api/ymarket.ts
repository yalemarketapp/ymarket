import axios from 'axios'
import tokens from '../store/tokens'

const ymarket = axios.create({
  baseURL: 'http://127.0.0.1:8000', // TODO: https://linear.app/ymarket/issue/YMA-16/use-env-variables-with-backend-settingspy-and-axios-url
  headers: {
    'Content-type': 'application/json',
  },
})

ymarket.interceptors.request.use(async (config) => {
  const token = await tokens.getAccessToken()
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

ymarket.interceptors.response.use(
  (response) => {
    if (response.data.access_token && response.data.refresh_token) {
      tokens.setAuthTokens({ access: response.data.access_token, refresh: response.data.refresh_token })
    } else if (response.data.access) {
      tokens.setAuthTokens({ access: response.data.access_token })
    } else if (response.data.detail === 'Successfully logged out.') {
      tokens.clearAuthTokens()
    }

    // TODO: https://linear.app/ymarket/issue/YMA-11/login-and-register-screen-rewrite

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
    ymarket.post('token/refresh', { refresh: refreshToken })

    // Resend request with new token
    return ymarket(config)
  },
)

export default ymarket
