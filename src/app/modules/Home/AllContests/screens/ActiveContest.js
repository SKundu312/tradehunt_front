import React from 'react';
import PageWithTitle from '../../../../components/hoc/PageWithTitle';
import AppButton from '../../../../components/ui-components/button/AppButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {AppColors} from './../../../../constants/colors';
import {ActiveContestScreenNames} from './../navigation/ActiveContestNavigation';
const ActiveContest = ({navigation}) => (
  <PageWithTitle backButton title="Active Contest">
    <AppButton
      onPress={() =>
        navigation.navigate(ActiveContestScreenNames.TransactionHistory)
      }
      leftIcon={<MaterialIcons color={AppColors.primary} name="leaderboard" />}
      alignRight
      clear>
      Leaderboard
    </AppButton>
  </PageWithTitle>
);

export default ActiveContest;
