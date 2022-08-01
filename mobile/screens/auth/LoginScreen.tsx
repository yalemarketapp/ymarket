import React, { FC } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { LoggedOutStackParamList } from '../../navigation/NavigationTypes.d'
import SafeAreaView from '../../components/SafeAreaView'
import LoginForm from '../../components/auth/LoginForm'
import HelperPrompt from '../../components/auth/HelperPrompt'
import Header from '../../components/auth/Header'

const LoginScreen: FC<StackScreenProps<LoggedOutStackParamList>> = ({ navigation }) => {
  return (
    <SafeAreaView style={{ alignItems: 'center' }}>
      <Header text="Welcome Back!" />
      <LoginForm />
      <HelperPrompt
        text="Don't have an account? "
        keyPhrase="Sign up"
        onPress={() => navigation.navigate('Register')}
      />
    </SafeAreaView>
  )
}

export default LoginScreen
