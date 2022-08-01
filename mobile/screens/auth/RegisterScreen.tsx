import React, { FC, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { LoggedOutStackParamList } from '../../navigation/NavigationTypes'
import HelperPrompt from '../../components/auth/HelperPrompt'
import SafeAreaView from '../../components/SafeAreaView'
import Header from '../../components/auth/Header'
import { validateYaleEmail, validatePassword, validateConfirmPassword } from '../../utility/validators'
import ymarket from '../../api/ymarket'
import SubmitButton from '../../components/auth/SubmitButton'
import InputContainer, { InputProps } from '../../components/auth/InputContainer'

const RegisterScreen: FC<StackScreenProps<LoggedOutStackParamList>> = ({ navigation }) => {
  const [firstName, setFirstName] = useState({ value: '', error: '' })
  const [lastName, setLastName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [passwordConfirm, setPasswordConfirm] = useState({ value: '', error: '' })
  const [formError, setFormError] = useState('')

  const onSignUpPressed = async () => {
    if (firstName.error || lastName.error || email.error || password.error || passwordConfirm.error) {
      setFormError('Please fix the errors before submitting.')
      return
    }

    // TODO: https://linear.app/ymarket/issue/YMA-18/navigate-to-verify-email-after-register
    await ymarket
      .post('api/users/register/', {
        email: email.value,
        first_name: firstName.value,
        last_name: lastName.value,
        password1: password.value,
        password2: passwordConfirm.value,
      })
      .catch(function (err) {
        if (err.response) {
          const error = err.response.data[Object.keys(err.response.data)[0]]
          setFormError(error)
        }
      })
  }

  const inputDetails: InputProps[] = [
    {
      label: 'First Name',
      state: firstName,
      setState: setFirstName,
    },
    {
      label: 'Last Name',
      state: lastName,
      setState: setLastName,
    },
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
    {
      label: 'Confirm Password',
      state: passwordConfirm,
      setState: setPasswordConfirm,
      validate: (value) => validateConfirmPassword(value, password.value),
      type: 'password',
    },
  ]

  return (
    <SafeAreaView>
      <Header text="Create an Account" />
      <InputContainer inputs={inputDetails} />
      <SubmitButton label="Sign Up" onSubmit={onSignUpPressed} error={formError} />
      <HelperPrompt text="Already have an account? " keyPhrase="Login" onPress={() => navigation.navigate('Login')} />
    </SafeAreaView>
  )
}

export default RegisterScreen
