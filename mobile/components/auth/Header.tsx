import React, { FC } from 'react'
import { StyleSheet, Image } from 'react-native'
import { Text } from '../building-blocks'
import * as colors from '../../constants/colors'

type HeaderProps = {
  text: string
}

const Header: FC<HeaderProps> = ({ text }) => {
  return (
    <>
      <Image source={require('../../assets/logo.png')} style={styles.image} />
      <Text style={styles.header} value={text} />
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 85,
    height: 75,
    marginBottom: 15,
    alignSelf: 'center',
  },
  header: {
    color: colors.mainBlue,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
  },
})

export default Header
