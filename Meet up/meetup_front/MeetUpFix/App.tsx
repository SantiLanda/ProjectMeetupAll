import React from 'react';
import {
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/app/(tabs)/index'
import LogInScreen from './src/app/(tabs)/loginScreen';

import { AuthProvider, useAuth } from './src/context/AuthContext';
import UserLayoutStack from './src/app/(userTabs)/userLayout';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

function NotLoggedInStack(): React.JSX.Element {
  return (
        <Stack.Navigator screenOptions={{statusBarHidden: true}}>
          <Stack.Screen component={HomeScreen} name='Home' options={{headerShown: false}}/>
          <Stack.Screen component={LogInScreen} name='LogIn' options={{headerShown: false}}/>
        </Stack.Navigator>
  )
}

function AppNavigator(): React.JSX.Element {
  const {authState} = useAuth()
  return (
    <NavigationContainer>
        {authState?.authenticated ? <UserLayoutStack/> : <NotLoggedInStack/>}
    </NavigationContainer>
  )
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <AuthProvider>
      <GestureHandlerRootView>
        <AppNavigator/>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
