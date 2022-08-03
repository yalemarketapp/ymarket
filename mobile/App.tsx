import React, { FC, useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import LoggedOutStackNavigator from './navigation/LoggedOutStackNavigator'
import BaseTabNavigator from './navigation/BaseTabNavigator'
import SplashScreen from './screens/SplashScreen'
import AuthContext, { AuthProvider } from './hooks/AuthContext'

import { UserProvider } from './hooks/UserContext'
import WithYMarketApi from './api/WithYMarketApi'

function App() {
  const { loading: loadingProfile, accessToken } = useContext(AuthContext)

  if (loadingProfile) {
    return <SplashScreen />
  }

  const loggedInRoot = (
    <UserProvider>
      <BaseTabNavigator />
    </UserProvider>
  )
  const loggedOutRoot = <LoggedOutStackNavigator />

  return <NavigationContainer>{accessToken ? loggedInRoot : loggedOutRoot}</NavigationContainer>
}

const AppContainer: FC = () => {
  return (
    <AuthProvider>
      <WithYMarketApi>
        <App />
      </WithYMarketApi>
    </AuthProvider>
  )
}

export default AppContainer
