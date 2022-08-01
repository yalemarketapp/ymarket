import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from '../building-blocks'
import * as colors from '../../constants/colors'
import { useNavigation } from '@react-navigation/native'

const SignupPrompt: FC = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.signUpContainer}>
      <Text style={styles.signUpText} value="Don't have an account? " />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={[styles.signUpText, styles.signUpLink]} value="Sign up" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  signUpText: {
    fontSize: 14,
  },
  signUpLink: {
    fontWeight: 'bold',
    color: colors.linkBlue,
  },
})

export default SignupPrompt
