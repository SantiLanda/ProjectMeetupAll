import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/context/AuthContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function userTabLayout() {
    const colorScheme = useColorScheme();
    const {authState} = useAuth();

    if (!authState?.authenticated) {
        return <Redirect href="/(tabs)/homeScreen" />;
    }

    return (
      <GestureHandlerRootView style={{flex: 1}}>
        <Stack
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen
            name="inicioPerfil"
          />
          <Stack.Screen
            name="editAvatar"
          />
          <Stack.Screen
            name="gameIn"
          />
        </Stack>
      </GestureHandlerRootView>
    );
}