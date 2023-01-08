import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PhoneScreen from './Auth/PhoneScreen';
import LoginScreen from './Auth/LoginScreen';
import RegisterScreen from './Auth/RegisterScreen';
import {View} from 'react-native';
import { AppColors } from '../../constants/colors';

const AuthStack = createNativeStackNavigator();
export const AuthScreenNames = {
  Home: 'AuthHome',
  Login: 'LoginScreen',
  Register: 'RegisterScreen',
};
const AuthNavigation = () => (
  <View style={{flex: 1, backgroundColor: AppColors.background}}>
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name={AuthScreenNames.Home} component={PhoneScreen} />
      <AuthStack.Screen name={AuthScreenNames.Login} component={LoginScreen} />
      <AuthStack.Screen
        name={AuthScreenNames.Register}
        component={RegisterScreen}
      />
    </AuthStack.Navigator>
  </View>
);

export default AuthNavigation;
