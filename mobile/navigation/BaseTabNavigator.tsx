import React from 'react'
import { BaseTabNavigatorParamList } from './NavigationTypes'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import { TabBarIcon } from '../utility/Icons'
import * as colors from '../constants/colors'
import ProfileStackNavigator from './ProfileStackNavigator'

const Tab = createBottomTabNavigator<BaseTabNavigatorParamList>()

function BaseTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.mainBlue }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="ProfileRoot"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="user-circle" color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}

export default BaseTabNavigator
