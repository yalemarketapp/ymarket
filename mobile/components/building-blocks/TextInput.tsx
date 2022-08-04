import React, { FC } from 'react'
import { TextInput as RNTextInput, StyleSheet, View as RNView } from 'react-native'
import type { TextInputProps as RNTextInputProps } from 'react-native'
import * as colors from '../../constants/colors'
import Text from './Text'
import Caption from '../Caption'
import { MarginStyling } from '../../types'

type TextInputProps = {
  label?: string
  error?: string
  margin?: MarginStyling
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

const TextInput: FC<TextInputProps> = ({ label, error, margin, ...props }) => {
  const errorStyle = error ? { borderColor: colors.errorRed } : {}

  return (
    <RNView style={[styles.container, margin]}>
      {label && <Text style={[styles.label, { marginBottom: 2 }]} value={label} />}
      <RNTextInput
        placeholderTextColor={colors.darkerGray}
        {...props}
        style={[styles.textInput, props.style, errorStyle]}
      />
      {!!error && <Caption style={{ marginTop: 2 }} isError={!!error} caption={error} />}
    </RNView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
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
