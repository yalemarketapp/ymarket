import React, { FC, useContext } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import * as colors from '../../constants/colors'
import { Text } from '../../components/building-blocks'
import ProfilePhoto from '../../components/ProfilePhoto'
import SafeAreaView from '../../components/SafeAreaView'
import UserContext from '../../hooks/UserContext'
import { StackScreenProps } from '@react-navigation/stack'
import { ProfileStackParamList } from '../../navigation/NavigationTypes.d'
import AuthContext from '../../hooks/AuthContext'
import { CommonActions } from '@react-navigation/native'

const ProfileScreen: FC<StackScreenProps<ProfileStackParamList>> = ({ navigation }) => {
  const { user } = useContext(UserContext)
  const { signOut } = useContext(AuthContext)

  const onLogout = () => {
    signOut()
    navigation.dispatch((state) => {
      return CommonActions.reset({
        ...state,
        index: 0,
      })
    })
  }

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={styles.image}>
          <ProfilePhoto src={user.avatar_url} size={75} circular />
        </View>
        <View>
          <Text value={`${user.first_name} ${user.last_name}`} style={styles.name} />
          <Text value={user.email} style={styles.email} />
        </View>
      </View>
      {user.biography ? <Text style={styles.biography} value={user.biography} /> : null}
      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logout} value="Logout" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  image: {
    marginHorizontal: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.mainBlue,
    marginBottom: 3,
  },
  email: {
    fontSize: 14,
    color: colors.darkerGray,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
    paddingVertical: 10,
  },
  biography: {
    fontSize: 14,
    color: colors.darkerGray,
  },
  logout: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.white,
  },
  logoutButton: {
    padding: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.mainBlue,
    width: 150,
    marginTop: 'auto',
    marginBottom: 20,
  },
})

export default ProfileScreen
