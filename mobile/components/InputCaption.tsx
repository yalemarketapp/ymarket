import { FC } from 'react'
import Text from './building-blocks/Text'
import { StyleProp, StyleSheet, TextStyle } from 'react-native'
import * as colors from '../constants/colors'

type InputCaptionProps = {
  caption?: string
  isError?: boolean
  style?: StyleProp<TextStyle>
}

const InputCaption: FC<InputCaptionProps> = ({ caption, isError = false, style }) => {
  const color = isError ? colors.errorRed : colors.darkerGray
  return caption ? <Text style={[styles.caption, { color }, style]} value={caption} /> : null
}

const styles = StyleSheet.create({
  caption: {
    fontSize: 12,
  },
})

export default InputCaption
