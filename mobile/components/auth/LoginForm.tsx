import { useNavigation } from '@react-navigation/native'
import React, { FC, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text, TextInput } from '../building-blocks'
import { validateYaleEmail } from '../../utility/validators'
import * as colors from '../../constants/colors'
import ymarket from '../../api/ymarket'

const LoginForm: FC = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = async () => {
    await ymarket.post('api/users/login/', { email: email.value, password: password.value }).catch((err) => {
      if (err.response) {
        const error = err.response.data[Object.keys(err.response.data)[0]]
        setPassword({ ...password, error })
      }
    })
  }

  const validatePassword = (value: string) => {
    if (value.length < 8) return 'Must be at least 8 characters'

    return ''
  }

  return (
    <>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          label="Yale Email"
          value={email.value}
          onEndEditing={(event) => {
            const error = validateYaleEmail(event.nativeEvent.text)
            setEmail({ ...email, error })
          }}
          error={email.error}
          onChangeText={(value) => setEmail({ ...email, value })}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={{ margin: 5 }} />
        <TextInput
          style={styles.input}
          label="Password"
          value={password.value}
          error={password.error}
          onEndEditing={(event) => {
            const error = validatePassword(event.nativeEvent.text)
            setPassword({ ...password, error })
          }}
          onChangeText={(value) => setPassword({ ...password, value })}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => navigation.navigate('ResetPassword')}>
        <Text style={styles.forgotPassword} value="Forgot your password?" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={onLoginPressed}>
        <Text style={styles.loginText} value="Login" />
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    width: '80%',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    color: colors.darkerGray,
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  outerInput: {
    marginVertical: 10,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    width: '80%',
    marginTop: 2,
    marginBottom: 12,
  },
  forgotPassword: {
    fontSize: 13,
    color: 'gray',
  },
  loginButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.mainBlue,
  },
  loginText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
})

export default LoginForm
