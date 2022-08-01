import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import * as colors from '../../constants/colors'
import { Text } from '../building-blocks'
import Caption from '../Caption'

type SubmitButtonProps = {
  label: string
  onSubmit: () => void
  error?: string
}

const SubmitButton: FC<SubmitButtonProps> = ({ label, onSubmit, error }) => {
  return (
    <>
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.text} value={label} />
      </TouchableOpacity>
      {!!error && <Caption caption={error} isError style={styles.error} />}
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.mainBlue,
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  error: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: '500',
  },
})

export default SubmitButton
