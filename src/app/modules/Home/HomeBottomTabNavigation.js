import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FontSizes, FontStyles, FontFamily} from './../../constants/theme';
import {AppColors} from './../../constants/colors';
import Notifications from './Notifications/Notifications';
import AllContestsNavigation from './AllContests/navigation/AllContestsNavigation';
import AllProfileNavigation from './AllContests/navigation/ProfileNavigation';
import PastContests from "./AllContests/screens/PastContests";

const HomeTabs = createBottomTabNavigator();

const appTabs = [
  {
    tabLabel: 'Active Contests',
    iconName: 'flash',
    name: 'AllContestsTab',
    component: AllContestsNavigation,
  },
  {
    tabLabel: 'Past Contests',
    iconName: 'clock-o',
    name: 'Past Contests',
    component: PastContests,
  },
  {
    tabLabel: 'News',
    iconName: 'bell',
    name: 'Notifications',
    component: Notifications,
  },
  {
    tabLabel: 'Account',
    iconName: 'th-large',
    name: 'Account',
    component: AllProfileNavigation,
  },
];

export const HomeBottomTabsNavigation = () => (
  <HomeTabs.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    {appTabs.map((tab, index) => (
      <HomeTabs.Screen
        key={index}
        options={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: AppColors.bottomTab,
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: AppColors.white,
          tabBarIcon: ({focused}) => (
            <Icon
              color={focused ? AppColors.yellowHighlight : AppColors.fadedGray}
              size={FontSizes.h3}
              name={tab.iconName}
            />
          ),
        }}
        name={tab.name}
        component={tab.component}
      />
    ))}
  </HomeTabs.Navigator>
);

const styles = StyleSheet.create({});
