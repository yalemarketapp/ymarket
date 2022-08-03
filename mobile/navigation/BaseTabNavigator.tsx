import { BaseTabNavigatorParamList } from './NavigationTypes'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'

const Tab = createBottomTabNavigator<BaseTabNavigatorParamList>()

function BaseTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}

export default BaseTabNavigator
