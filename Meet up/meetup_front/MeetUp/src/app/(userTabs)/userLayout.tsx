import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InicioPerfil from './inicioPerfil';
import GameIn from './gameIn';
import EditAvatar from './editAvatar';
const Stack = createNativeStackNavigator();

function UserLayoutStack(): React.JSX.Element {
  return (
        <Stack.Navigator screenOptions={{statusBarHidden: true}}>
          <Stack.Screen component={InicioPerfil} name='InicioPerfil' options={{headerShown: false}}/>
          <Stack.Screen component={GameIn} name='GameIn' options={{headerShown: false}}/>
          <Stack.Screen component={EditAvatar} name='EditAvatar' options={{headerShown: false}}/>
        </Stack.Navigator>
  )
}

export default UserLayoutStack