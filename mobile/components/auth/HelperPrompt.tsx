import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from '../building-blocks'
import * as colors from '../../constants/colors'

type HelperPromptProps = {
  text: string
  keyPhrase: string
  onPress: () => void
}

const HelperPrompt: FC<HelperPromptProps> = ({ text, keyPhrase, onPress }) => {
  return (
    <View style={styles.authHelperContainer}>
      <Text style={styles.authHelperText} value={text} />
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.authHelperText, styles.authHelperLink]} value={keyPhrase} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  authHelperContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  authHelperText: {
    fontSize: 14,
  },
  authHelperLink: {
    fontWeight: 'bold',
    color: colors.linkBlue,
  },
})

export default HelperPrompt
