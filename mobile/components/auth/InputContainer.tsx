import React, { FC } from 'react'
import { NativeSyntheticEvent, StyleSheet, TextInputEndEditingEventData, View } from 'react-native'
import { FormInput } from '../../types'
import { TextInput } from '../building-blocks'

type InputContainerProps = {
  inputs: InputProps[]
}

const InputContainer: FC<InputContainerProps> = ({ inputs }) => {
  return (
    <>
      <View style={styles.formContainer}>
        {inputs.map(({ label, state, setState, validate, type }) => (
          <Input key={label} label={label} state={state} setState={setState} validate={validate} type={type} />
        ))}
      </View>
    </>
  )
}

export type InputProps = {
  label: string
  state: FormInput
  setState: (state: FormInput) => void
  validate?: (value: string) => string
  type?: 'email' | 'password' | undefined
}

const Input: FC<InputProps> = ({ label, state, setState, validate, type }) => {
  const { value, error } = state

  const emailProps = {
    autoCapitalize: 'none',
    autoCorrect: false,
  }
  const passwordProps = {
    ...emailProps,
    secureTextEntry: true,
  }
  const extraProps = type === 'email' ? emailProps : type === 'password' ? passwordProps : {}

  const onEndEditing = validate
    ? (event: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
        const error = validate(event.nativeEvent.text)
        setState({ ...state, error })
      }
    : undefined

  return (
    <TextInput
      {...extraProps}
      style={styles.input}
      label={label}
      value={value}
      onEndEditing={onEndEditing}
      onChangeText={(value) => setState({ ...state, value })}
      error={error}
      margin={styles.outerInput}
    />
  )
}

const styles = StyleSheet.create({
  formContainer: {
    width: '80%',
    justifyContent: 'center',
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  outerInput: {
    marginVertical: 5,
  },
})

export default InputContainer
