import React, { FC } from 'react'
import Text from './building-blocks/Text'
import { StyleProp, StyleSheet, TextStyle } from 'react-native'
import * as colors from '../constants/colors'

type CaptionProps = {
  caption: string
  isError?: boolean
  style?: StyleProp<TextStyle>
}

const Caption: FC<CaptionProps> = ({ caption, isError = false, style }) => {
  const color = isError ? colors.errorRed : colors.darkerGray
  return <Text style={[styles.caption, { color }, style]} value={caption} />
}

const styles = StyleSheet.create({
  caption: {
    fontSize: 12,
  },
})

export default Caption
