import { digestStringAsync, CryptoDigestAlgorithm } from 'expo-crypto'

export const encrypt = async (content: string) => {
  return await digestStringAsync(CryptoDigestAlgorithm.SHA256, content)
}
