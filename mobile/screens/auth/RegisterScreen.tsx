import React, { FC } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { LoggedOutStackParamList } from '../../navigation/NavigationTypes'
import HelperPrompt from '../../components/auth/HelperPrompt'
import SafeAreaView from '../../components/SafeAreaView'
import Header from '../../components/auth/Header'
import RegisterForm from '../../components/auth/RegisterForm'

const RegisterScreen: FC<StackScreenProps<LoggedOutStackParamList>> = ({ navigation }) => {
  return (
    <SafeAreaView style={{ alignItems: 'center' }}>
      <Header text="Create an Account" />
      <RegisterForm />
      <HelperPrompt text="Already have an account? " keyPhrase="Login" onPress={() => navigation.navigate('Login')} />
    </SafeAreaView>
  )
}

export default RegisterScreen
