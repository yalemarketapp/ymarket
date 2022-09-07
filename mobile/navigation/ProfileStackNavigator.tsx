import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ProfileStackParamList } from './NavigationTypes'
import ProfileScreen from '../screens/profile/ProfileScreen'
import EditProfileScreen from '../screens/profile/EditProfileScreen'

const Stack = createNativeStackNavigator<ProfileStackParamList>()

function ProfileStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  )
}

export default ProfileStackNavigator
