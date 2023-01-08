import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileHome from '../../More/MoreTab';
import {View} from 'react-native';
import {AppColors} from './../../../../constants/colors';

const ProfileStack = createNativeStackNavigator();
export const AllProfileScreenNames = {
  ProfileHome: 'ProfileHome',
};
const AllProfileNavigation = () => (
  <View style={{flex: 1, backgroundColor: AppColors.background}}>
    <ProfileStack.Navigator
      initialRouteName={AllProfileScreenNames.ProfileHome}
      screenOptions={{
        headerShown: false,
      }}>
      <ProfileStack.Screen
        name={AllProfileScreenNames.ProfileHome}
        component={ProfileHome}
      />
    </ProfileStack.Navigator>
  </View>
);

export default AllProfileNavigation;
