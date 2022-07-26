import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import LoggedOutStackNavigator from './navigation/LoggedOutStackNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <LoggedOutStackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
