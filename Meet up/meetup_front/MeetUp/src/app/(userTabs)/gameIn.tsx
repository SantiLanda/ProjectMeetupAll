import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {AxisPad, AxisPadTouchEvent} from "@fustaro/react-native-axis-pad"
import { StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import GamePlay from './gamePlay'
import App from './app';

const GameIn = () => {
    const navigation = useNavigation();
    useEffect(() => {
        return () => {
            Orientation.unlockAllOrientations()
        }
    })
    return (
        <App/>
    );
}

export default GameIn

const styles = StyleSheet.create({
  axis:
    {
      width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
      position: 'absolute', bottom: 0, left: 0, right: 0, paddingBottom: 30, paddingLeft: 50, paddingRight: 50,
      zIndex: 1
    },
    backButton: {
      color: '#1abc9c',
      position: 'absolute',
      top: 10,
      left: 10,
      zIndex: 1,
      backgroundColor: 'white',
      borderRadius: 20,
    },
})