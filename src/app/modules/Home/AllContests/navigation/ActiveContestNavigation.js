import React from 'react';
import ActiveContest from './../components/DetailsContest';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LeaderBoard from '../../../Contests/screens/LeaderBoard';
import MainDashboard from '../../../Contests/screens/MainDashboard';
import TransactionHistory from './../../../Contests/screens/TransactionHistory';
import Watchlist from '../../../Contests/screens/Watchlist';
import CreateTradeScreen from './../../../Contests/screens/CreateTradeScreen';
import Portfolio from './../../../Contests/screens/Portfolio';
import AssetDetailScreen from './../../../Contests/screens/AssetDetailScreen';
import {AppColors} from './../../../../constants/colors';
import {View} from 'react-native';

const ActiveContestStack = createNativeStackNavigator();
export const ActiveContestScreenNames = {
  Details: 'Details',
  LeaderBoard: 'Leaderboard',
  MainDashboard: 'MainDashboard',
  TransactionHistory: 'TransactionHistory',
  Watchlist: 'Watchlist',
  AssetDetail: 'AssetDetail',
  CreateTradeScreen: 'CreateTradeScreen',
  Portfolio: 'Portfolio',
};
const ActiveContestNavigation = ({route}) => {
  return (
    <View style={{flex: 1, backgroundColor: AppColors.background}}>
      <ActiveContestStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <ActiveContestStack.Screen
          name={ActiveContestScreenNames.MainDashboard}
          component={MainDashboard}
          initialParams={route.params}
        />
        <ActiveContestStack.Screen
          name={ActiveContestScreenNames.Details}
          component={ActiveContest}
        />
        <ActiveContestStack.Screen
          name={ActiveContestScreenNames.Watchlist}
          component={Watchlist}
        />
        <ActiveContestStack.Screen
          name={ActiveContestScreenNames.LeaderBoard}
          component={LeaderBoard}
        />
        <ActiveContestStack.Screen
          name={ActiveContestScreenNames.TransactionHistory}
          component={TransactionHistory}
        />
        <ActiveContestStack.Screen
          name={ActiveContestScreenNames.AssetDetail}
          component={AssetDetailScreen}
        />
        <ActiveContestStack.Screen
          name={ActiveContestScreenNames.CreateTradeScreen}
          component={CreateTradeScreen}
        />
        <ActiveContestStack.Screen
          name={ActiveContestScreenNames.Portfolio}
          component={Portfolio}
        />
      </ActiveContestStack.Navigator>
    </View>
  );
};

export default ActiveContestNavigation;
