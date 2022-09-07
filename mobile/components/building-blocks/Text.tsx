import React, { FC } from 'react'
import { StyleSheet, Text as RNText, TextProps as RNTextProps } from 'react-native'

type TextProps = { value: string } & Pick<
  RNTextProps,
  'style' | 'onPress' | 'numberOfLines' | 'ellipsizeMode' | 'lineBreakMode'
>

const Text: FC<TextProps> = ({ value, style, ...props }) => {
  return (
    <RNText style={[styles.text, style]} {...props}>
      {value}
    </RNText>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Arial',
    fontSize: 14,
    fontWeight: '300',
  },
})

export default Text
