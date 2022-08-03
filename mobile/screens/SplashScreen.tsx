import React, { useContext, useEffect } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import ymarket from '../api/ymarket'
import AuthContext from '../hooks/AuthContext'
import tokens from '../store/tokens'

export default function SplashScreen() {
  const { setLoading: setLoadingProfile } = useContext(AuthContext)

  useEffect(() => {
    const getNewAccessToken = async () => {
      const refresh = await tokens.getRefreshToken()
      ymarket
        .post('api/token/refresh/', { refresh })
        .then(() => null)
        .catch(() => setLoadingProfile(false))
    }

    getNewAccessToken()
  }, [])

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 85,
    height: 75,
    marginBottom: 10,
  },
})
