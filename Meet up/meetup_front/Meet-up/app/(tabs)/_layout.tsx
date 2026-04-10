import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/context/AuthContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {authState} = useAuth();

  if (authState?.authenticated) {
    return <Redirect href="/inicioPerfil" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen
        name="index"
      />
      <Stack.Screen
        name="homeScreen"
      />
      <Stack.Screen
        name="registerscreen"
      />
      <Stack.Screen
        name="loginscreen"
      />
    </Stack>
  );
}
