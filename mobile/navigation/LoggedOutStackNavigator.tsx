import React from 'react'
import { LoggedOutStackParamList } from './NavigationTypes'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/auth/LoginScreen'
import RegisterScreen from '../screens/auth/RegisterScreen'
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen'

const Stack = createNativeStackNavigator<LoggedOutStackParamList>()

function LoggedOutStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  )
}

export default LoggedOutStackNavigator
