import React, { FC, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text, TextInput } from '../building-blocks'
import * as colors from '../../constants/colors'
import { validateYaleEmail, validatePassword, validateConfirmPassword } from '../../utility/validators'
import ymarket from '../../api/ymarket'

const RegisterForm: FC = () => {
  const [firstName, setFirstName] = useState({ value: '', error: '' })
  const [lastName, setLastName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [passwordConfirm, setPasswordConfirm] = useState({ value: '', error: '' })

  const onSignUpPressed = async () => {
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
          setPassword({ ...password, error })
        }
      })
  }

  return (
    <>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          label="First Name"
          value={firstName.value}
          error={firstName.error}
          onChangeText={(value) => setFirstName({ ...firstName, value })}
          margin={styles.outerInput}
        />
        <TextInput
          style={styles.input}
          label="Last Name"
          value={lastName.value}
          error={lastName.error}
          onChangeText={(value) => setLastName({ ...lastName, value })}
          margin={styles.outerInput}
        />
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
          margin={styles.outerInput}
        />
        <TextInput
          style={styles.input}
          label="Password"
          value={password.value}
          onEndEditing={(event) => {
            const error = validatePassword(event.nativeEvent.text)
            setPassword({ ...password, error })
          }}
          error={password.error}
          onChangeText={(value) => setPassword({ ...password, value })}
          margin={styles.outerInput}
        />
        <TextInput
          style={styles.input}
          label="Confirm Password"
          value={passwordConfirm.value}
          onEndEditing={(event) => {
            const error = validateConfirmPassword(event.nativeEvent.text, password.value)
            setPasswordConfirm({ ...passwordConfirm, error })
          }}
          error={passwordConfirm.error}
          onChangeText={(value) => setPasswordConfirm({ ...passwordConfirm, value })}
          margin={styles.outerInput}
        />
      </View>
      <TouchableOpacity style={styles.signupButton} onPress={onSignUpPressed}>
        <Text style={styles.signupText} value="Sign Up" />
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
    marginVertical: 5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.mainBlue,
    padding: 10,
    marginTop: 20,
    width: 100,
  },
  signupButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.mainBlue,
  },
  signupText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
})

export default RegisterForm
