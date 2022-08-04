import React, { useContext, useEffect } from 'react'
import ymarket from '../api/ymarket'
import { Text } from '../components/building-blocks'
import SafeAreaView from '../components/SafeAreaView'
import UserContext from '../hooks/UserContext'
import tokens from '../store/tokens'
import { RefreshTokenType } from '../types'
import jwt_decode from 'jwt-decode'

const HomeScreen = () => {
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    const getUser = async () => {
      const refresh = await tokens.getRefreshToken()
      if (refresh) {
        const userId = jwt_decode<RefreshTokenType>(refresh).user_id
        ymarket
          .get(`api/users/profile/${userId}`)
          .then((res) => {
            setUser(res.data)
            return null
          })
          .catch(() => null)
      }
    }

    getUser()
  }, [setUser])

  return (
    <SafeAreaView>
      <Text value={`id${user.id}`} />
      <Text value={`url${user.avatar_url}`} />
      <Text value={`bio${user.biography}`} />
      <Text value={`email${user.email}`} />
      <Text value={`first${user.first_name}`} />
      <Text value={`last${user.last_name}`} />
    </SafeAreaView>
  )
}

export default HomeScreen
