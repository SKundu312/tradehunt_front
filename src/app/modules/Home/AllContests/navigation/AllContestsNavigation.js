import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllContests from '../screens/AllContests';
import PastContests from "./../screens/PastContests";
import ViewContest from "../screens/ViewContest";
import ActiveContestNavigation from "./ActiveContestNavigation";
import { View } from "react-native";
import { AppColors } from "./../../../../constants/colors";

const ContestsStack = createNativeStackNavigator();
export const AllContestScreenNames = {
    AllContests: "AllContests",
    PastContests: "PastContests",
    ActiveContest: "ActiveContest",
    ViewContest: "ViewContest",
}
const AllContestsNavigation = () => (
          <View style={{flex: 1, backgroundColor: AppColors.background}}>
  <ContestsStack.Navigator
    screenOptions={{
      headerShown: false,
    //   animation: 'fade_from_bottom',
    }}>
    <ContestsStack.Screen
      name={AllContestScreenNames.AllContests}
      component={AllContests}
    />
    <ContestsStack.Screen
      name={AllContestScreenNames.PastContests}
      component={PastContests}
    />
    <ContestsStack.Screen
      name={AllContestScreenNames.ActiveContest}
      component={ActiveContestNavigation}
    />
    <ContestsStack.Screen
      name={AllContestScreenNames.ViewContest}
      component={ViewContest}
    />
        </ContestsStack.Navigator>
        </View>
);

export default AllContestsNavigation;
