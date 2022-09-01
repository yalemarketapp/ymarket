import React, { FC } from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'

type BackButtonProps = {
  onPress: () => void
}

const BackButton: FC<BackButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Image source={require('../assets/arrow_back.png')} style={styles.image} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    margin: 10,
  },
  image: {
    width: 24,
    height: 24,
  },
})

export default BackButton
