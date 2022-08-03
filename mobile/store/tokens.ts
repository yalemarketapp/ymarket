import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store'

const REFRESH = 'REFRESH'

const getRefreshToken = async () => {
  return await getItemAsync(REFRESH)
}

const clearRefreshToken = async () => {
  await deleteItemAsync(REFRESH)
}

const setRefreshToken = async (refresh: string) => {
  await setItemAsync(REFRESH, refresh)
}

export default { getRefreshToken, clearRefreshToken, setRefreshToken }
