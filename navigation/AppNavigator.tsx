import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import ResgiterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ParkingScreen from '../screens/ParkingScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import DrawerNavigator from './DrawerNavigator';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Parking: undefined;
  ForgotPassword: undefined;
  ChangePassword: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={ResgiterScreen} />
      <Stack.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }}/>
      <Stack.Screen name="Parking" component={ParkingScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
}
