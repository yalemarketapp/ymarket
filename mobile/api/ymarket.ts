import axios from 'axios'

const ymarket = axios.create({
  baseURL: 'http://127.0.0.1:8000', // TODO: https://linear.app/ymarket/issue/YMA-16/use-env-variables-with-backend-settingspy-and-axios-url
  headers: {
    'Content-type': 'application/json',
  },
})

// Interceptors are handled in WithYMarketApi.tsx

export default ymarket
