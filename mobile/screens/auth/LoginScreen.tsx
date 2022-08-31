import React, { FC, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { LoggedOutStackParamList } from '../../navigation/NavigationTypes.d'
import SafeAreaView from '../../components/SafeAreaView'
import HelperPrompt from '../../components/auth/HelperPrompt'
import Header from '../../components/auth/Header'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from '../../components/building-blocks'
import { validateYaleEmail, validatePassword } from '../../utility/validators'
import ymarket from '../../api/ymarket'
import SubmitButton from '../../components/auth/SubmitButton'
import InputContainer, { InputProps } from '../../components/auth/InputContainer'

const LoginScreen: FC<StackScreenProps<LoggedOutStackParamList>> = ({ route, navigation }) => {
  const [email, setEmail] = useState({ value: route.params?.email || '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [formError, setFormError] = useState('')

  const onLoginPressed = async () => {
    if (email.error || password.error) {
      setFormError('Please fix the errors before submitting.')
      return
    } else if (!email.value || !password.value) {
      setFormError("Form values can't be empty")
      return
    }

    await ymarket.post('api/users/login/', { email: email.value, password: password.value }).catch((err) => {
      if (err.response) {
        const error = err.response.data[Object.keys(err.response.data)[0]]
        setFormError(error)
      }
    })
  }

  const inputDetails: InputProps[] = [
    {
      label: 'Yale Email',
      state: email,
      setState: setEmail,
      validate: validateYaleEmail,
      type: 'email',
    },
    {
      label: 'Password',
      state: password,
      setState: setPassword,
      validate: validatePassword,
      type: 'password',
    },
  ]

  return (
    <SafeAreaView>
      <Header text="Welcome Back!" />
      <InputContainer inputs={inputDetails} />
      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPassword} value="Forgot your password?" />
      </TouchableOpacity>
      <SubmitButton label="Login" onSubmit={onLoginPressed} error={formError} />
      <HelperPrompt
        text="Don't have an account? "
        keyPhrase="Sign up"
        onPress={() => navigation.navigate('Register', { email: email.value })}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    width: '80%',
    marginTop: 2,
    marginBottom: 5,
  },
  forgotPassword: {
    fontSize: 13,
    color: 'gray',
  },
})

export default LoginScreen
