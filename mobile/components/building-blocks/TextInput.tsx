import { FC } from 'react'
import { TextInput as RNTextInput, TextInputProps, StyleSheet } from 'react-native'
import * as colors from '../../constants/colors'

const TextInput: FC<TextInputProps> = ({ children, ...props }) => {
  return (
    <RNTextInput placeholderTextColor={colors.darkerGray} {...props} style={[styles.textInput, props.style]}>
      {children}
    </RNTextInput>
  )
}

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
})

export default TextInput
