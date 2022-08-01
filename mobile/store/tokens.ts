import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store'

const ACCESS = 'ACCESS'
const REFRESH = 'REFRESH'

const getAccessToken = async () => {
  return await getItemAsync(ACCESS)
}

const getRefreshToken = async () => {
  return await getItemAsync(REFRESH)
}

const clearAuthTokens = async () => {
  await Promise.all([deleteItemAsync(ACCESS), deleteItemAsync(REFRESH)])
}

const setAuthTokens = async ({ access, refresh }: { access: string; refresh?: string }) => {
  await Promise.all([setItemAsync(ACCESS, access), refresh ? setItemAsync(REFRESH, refresh) : undefined])
}

export default { getAccessToken, getRefreshToken, clearAuthTokens, setAuthTokens }
