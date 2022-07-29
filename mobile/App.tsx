import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import LoggedOutStackNavigator from './navigation/LoggedOutStackNavigator'
import { StatusBar } from 'react-native'

export default function App() {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <LoggedOutStackNavigator />
      </NavigationContainer>
    </>
  )
}
