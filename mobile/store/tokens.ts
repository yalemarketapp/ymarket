import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store'

const ACCESS = 'ACCESS'
const REFRESH = 'REFRESH'

const getAccessToken = async () => {
  return await getItemAsync(ACCESS)
}

const getRefreshToken = async () => {
  return await getItemAsync(REFRESH)
}

const clearTokens = async () => {
  await Promise.all([deleteItemAsync(ACCESS), deleteItemAsync(REFRESH)])
}

const setAccessToken = async (access: string) => {
  return await setItemAsync(ACCESS, access)
}

const setRefreshToken = async (refresh: string) => {
  await setItemAsync(REFRESH, refresh)
}

export default { getAccessToken, getRefreshToken, clearTokens, setAccessToken, setRefreshToken }
