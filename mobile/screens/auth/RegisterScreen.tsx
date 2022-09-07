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
import { ScrollView } from 'react-native'

const RegisterScreen: FC<StackScreenProps<LoggedOutStackParamList>> = ({ route, navigation }) => {
  const [firstName, setFirstName] = useState({ value: '', error: '' })
  const [lastName, setLastName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: route.params.email, error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [passwordConfirm, setPasswordConfirm] = useState({ value: '', error: '' })
  const [formError, setFormError] = useState('')

  const onSignUpPressed = async () => {
    if (firstName.error || lastName.error || email.error || password.error || passwordConfirm.error) {
      setFormError('Please fix the errors before submitting.')
      return
    } else if (!firstName.value || !lastName.value || !email.value || !password.value || !passwordConfirm.value) {
      setFormError("Form values can't be empty")
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
        // TODO: https://linear.app/ymarket/issue/MOB-42/fix-error-handling-from-http-requests
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
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 10 }}>
        <Header text="Create an Account" />
        <InputContainer inputs={inputDetails} />
        <SubmitButton label="Sign Up" onSubmit={onSignUpPressed} error={formError} />
        <HelperPrompt
          text="Already have an account? "
          keyPhrase="Login"
          onPress={() => navigation.navigate('Login', { email: email.value })}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default RegisterScreen
