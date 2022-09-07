import { StackScreenProps } from '@react-navigation/stack'
import React, { FC, useContext, useState } from 'react'
import UserContext from '../../hooks/UserContext'
import { ProfileStackParamList } from '../../navigation/NavigationTypes'
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import Text from '../../components/building-blocks/Text'
import SafeAreaView from '../../components/SafeAreaView'
import ymarket from '../../api/ymarket'
import ProfilePhoto from '../../components/ProfilePhoto'
import * as colors from '../../constants/colors'
import InputContainer, { InputProps } from '../../components/auth/InputContainer'
import BackButton from '../../components/BackButton'
import { v4 as uuidv4 } from 'uuid'

const EditProfileScreen: FC<StackScreenProps<ProfileStackParamList>> = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext)
  const [firstName, setFirstName] = useState({ value: user.first_name, error: '' })
  const [lastName, setLastName] = useState({ value: user.last_name, error: '' })
  const [biography, setBiography] = useState({ value: user.biography, error: '' })
  const [image, setImage] = useState(user.avatar_url)

  const addImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const createFormLabel = (label: string) => {
    return <Text value={label} style={styles.formLabel} />
  }

  const inputDetails: InputProps[] = [
    {
      label: createFormLabel('First Name'),
      state: firstName,
      setState: setFirstName,
    },
    {
      label: createFormLabel('Last Name'),
      state: lastName,
      setState: setLastName,
    },
    {
      label: createFormLabel('Biography'),
      state: biography,
      setState: setBiography,
      multiline: true,
    },
  ]

  const onSubmit = async () => {
    const formData = new FormData()
    formData.append('first_name', firstName.value)
    formData.append('last_name', lastName.value)
    formData.append('biography', biography.value)
    if (image) {
      // Stringify then parse is a workaround. See https://github.com/g6ling/React-Native-Tips/issues/1#issuecomment-526870226
      formData.append('file', JSON.parse(JSON.stringify({ uri: image, name: `${uuidv4()}.jpg`, type: 'image/jpg' })))
    }

    await ymarket
      .put(`/api/users/profile/${user.id}/`, formData)
      .then((res) => {
        // TODO: https://linear.app/ymarket/issue/MOB-42/fix-error-handling-from-http-requests
        setUser(res.data)
        navigation.goBack()
        return res
      })
      .catch((err) => err)
  }

  return (
    <SafeAreaView>
      <BackButton onPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.image}>
          <ProfilePhoto src={image} size={75} circular />
        </View>
        <Text style={styles.uploadText} value={`Upload ${image ? 'new ' : ''}image`} onPress={addImage} />
        <InputContainer inputs={inputDetails} marginVertical={5} />
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text value="Update Profile" style={styles.buttonText} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  image: {
    marginHorizontal: 15,
  },
  uploadText: {
    marginVertical: 5,
    color: colors.linkBlue,
    fontSize: 12,
  },
  formLabel: {
    fontSize: 18,
    color: colors.mainBlue,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  buttonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    width: 150,
    padding: 10,
    backgroundColor: colors.mainBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
})

export default EditProfileScreen
