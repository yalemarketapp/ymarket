import React, { FC } from 'react'
import { StyleSheet, Text as RNText, TextProps as RNTextProps } from 'react-native'

type TextProps = { value: string } & Pick<RNTextProps, 'style'>

const Text: FC<TextProps> = ({ value, style }) => {
  return <RNText style={[styles.text, style]}>{value}</RNText>
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Arial',
    fontSize: 14,
    fontWeight: '300',
  },
})

export default Text
