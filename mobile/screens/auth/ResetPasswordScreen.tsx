import { StackScreenProps } from '@react-navigation/stack'
import React, { FC, useState } from 'react'
import SafeAreaView from '../../components/SafeAreaView'
import Header from '../../components/auth/Header'
import Text from '../../components/building-blocks/Text'
import { LoggedOutStackParamList } from '../../navigation/NavigationTypes'
import { validateYaleEmail } from '../../utility/validators'
import InputContainer, { InputProps } from '../../components/auth/InputContainer'
import { StyleSheet, View } from 'react-native'
import BackButton from '../../components/BackButton'
import * as colors from '../../constants/colors'
import ymarket from '../../api/ymarket'
import SubmitButton from '../../components/auth/SubmitButton'

const ResetPasswordScreen: FC<StackScreenProps<LoggedOutStackParamList>> = ({ route, navigation }) => {
  const [email, setEmail] = useState({ value: route.params?.email || '', error: '' })
  const [formError, setFormError] = useState('')

  const inputDetails: InputProps[] = [
    {
      label: 'Yale Email',
      state: email,
      setState: setEmail,
      validate: validateYaleEmail,
      type: 'email',
    },
  ]

  const onSubmit = async () => {
    await ymarket
      .post('api/users/password-reset/', { email: email.value })
      .then((res) => navigation.navigate('Login', { email: email.value }))
      .catch((err) => {
        if (err.response) {
          const error = err.response.data[Object.keys(err.response.data)[0]]
          setFormError(error)
        }
      })
  }

  return (
    <SafeAreaView>
      <BackButton onPress={() => navigation.navigate('Login', { email: email.value })} />
      <View style={{ marginTop: 70, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <Header text="Reset Password" />
        <InputContainer inputs={inputDetails} />
        <Text style={styles.caption} value="You will receive an email with a password reset link." />
        <SubmitButton label="Send Instructions" onSubmit={onSubmit} error={formError} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  caption: {
    marginTop: 7,
    width: '80%',
    color: colors.darkerGray,
  },
})

export default ResetPasswordScreen
