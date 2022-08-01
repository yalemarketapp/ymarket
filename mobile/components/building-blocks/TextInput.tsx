import React, { FC } from 'react'
import { TextInput as RNTextInput, StyleSheet } from 'react-native'
import type { TextInputProps as RNTextInputProps } from 'react-native'
import * as colors from '../../constants/colors'
import Text from './Text'
import InputCaption from '../InputCaption'

type TextInputProps = {
  label?: string
  error?: string
} & Pick<
  RNTextInputProps,
  | 'autoCapitalize'
  | 'autoCorrect'
  | 'defaultValue'
  | 'editable'
  | 'onChangeText'
  | 'onEndEditing'
  | 'placeholder'
  | 'placeholderTextColor'
  | 'secureTextEntry'
  | 'textAlign'
  | 'value'
  | 'style'
  | 'maxLength'
>

const TextInput: FC<TextInputProps> = ({ label, error, ...props }) => {
  const errorStyle = error ? { borderColor: colors.errorRed } : {}

  return (
    <>
      {label && <Text style={[styles.label, { marginBottom: 2 }]} value={label} />}
      <RNTextInput
        placeholderTextColor={colors.darkerGray}
        {...props}
        style={[styles.textInput, props.style, errorStyle]}
      />
      <InputCaption style={{ marginTop: 2 }} isError={!!error} caption={error} />
    </>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 10,
    color: colors.darkerGray,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
})

export default TextInput
