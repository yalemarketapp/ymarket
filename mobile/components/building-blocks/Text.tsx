import { FC } from 'react'
import { StyleSheet, Text as RNText, TextProps } from 'react-native'

const Text: FC<TextProps> = ({ children, ...props }) => {
  return (
    <RNText style={[styles.text, props.style]} {...props}>
      {children}
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
