import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNav } from '../NavigationKeys';
import { StackRoute } from '../NavigationRoutes';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={StackNav.LoginScreen}>
      <Stack.Screen
        name={StackNav.LoginScreen}
        component={StackRoute.LoginScreen}
      />
      <Stack.Screen
        name={StackNav.VerifyLoginOtp}
        component={StackRoute.VerifyLoginOtp}
      />
      {/* <Stack.Screen
        name={StackNav.VerifyRegisterOtp}
        component={StackRoute.VerifyRegisterOtp}
      />
      <Stack.Screen name={StackNav.Signup} component={StackRoute.Signup} /> */}
    </Stack.Navigator>
  );
}
