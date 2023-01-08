import React, {useEffect, useMemo, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeBottomTabsNavigation} from './modules/Home/HomeBottomTabNavigation';
import AuthNavigation from './modules/Home/AuthStackNavigation';
import {View} from 'react-native';
import {AppColors} from './constants/colors';
const AppStack = createNativeStackNavigator();

const TradeHunt = ({token}) => {
  return (
    <View style={{flex: 1, backgroundColor: AppColors.background}}>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {token !== null ? (
          <AppStack.Screen
            name="RootNavigation"
            component={HomeBottomTabsNavigation}
          />
        ) : (
          <AppStack.Screen
            name="AuthNavigation"
            options={{}}
            component={AuthNavigation}
          />
        )}
      </AppStack.Navigator>
    </View>
  );
};

export default TradeHunt;
