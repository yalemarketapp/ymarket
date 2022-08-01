import React, { FC } from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { Text } from '../../components/building-blocks'
import * as colors from '../../constants/colors'

type HeaderProps = {
  text: string
}

const Header: FC<HeaderProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.image} />
      <Text style={styles.header} value={text} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  image: {
    width: 85,
    height: 75,
    marginBottom: 20,
    alignSelf: 'center',
  },
  header: {
    color: colors.mainBlue,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 40,
  },
})

export default Header
