import React, { FC } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { StyleSheet } from 'react-native'
import { Text } from '../../components/building-blocks'
import { LoggedOutStackParamList } from '../../navigation/NavigationTypes.d'
import * as colors from '../../constants/colors'
import SafeAreaView from '../../components/SafeAreaView'
import LoginForm from '../../components/auth/LoginForm'
import SignupPrompt from '../../components/auth/SignupPrompt'

const LoginScreen: FC<StackScreenProps<LoggedOutStackParamList>> = () => {
  return (
    <SafeAreaView style={{ alignItems: 'center' }}>
      <Text style={styles.header} value="Welcome Back!" />
      <LoginForm />
      <SignupPrompt />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: 150,
    color: colors.mainBlue,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
})

export default LoginScreen
