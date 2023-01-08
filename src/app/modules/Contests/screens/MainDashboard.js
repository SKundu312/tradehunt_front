import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import AppButton from '../../../components/ui-components/button/AppButton';
import {AppColors} from '../../../constants/colors';
import {FontStyles, Layouts} from '../../../constants/theme';
import {ActiveContestScreenNames} from '../../Home/AllContests/navigation/ActiveContestNavigation';
import PageWithTitle from '../../../components/hoc/PageWithTitle';
import {Dimensions} from 'react-native';
import PortfolioHeader from '../../Home/AllContests/components/PortfolioHeader';

const MENU_ITEMS = [
  {
    id: 'screen_1',
    label: 'History',
    screen: 'TransactionHistory',
  },
  {
    id: 'screen_2',
    label: 'Assets',
    screen: 'Watchlist',
  },
  {
    id: 'screen_3',
    label: 'Details',
    screen: 'ViewContest',
  },
  {
    id: 'screen_4',
    label: 'Positions',
    screen: 'Portfolio',
  },
];

const MainDashboard = ({navigation, route}) => {
  const {
    _id,
    helper,
    title,
    organiser,
    leaderboardId,
    coverImg,
    endDate,
    startDate,
    registered,
    active,
    desc,
    prizes,
    initialSum,
    isPast,
  } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return helper;
  }, []);
  return (
    <PageWithTitle backButton title={'Contest Home'}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.contestNameBg}>
          <Text style={FontStyles.h3}>
            {title}, {organiser}
          </Text>
        </View>
        {!isPast && (
          <PortfolioHeader
            isPast={isPast}
            isLoading={isLoading}
            contestId={_id}
          />
        )}

        {!isPast && (
          <View style={styles.gotoContainer}>
            <View style={styles.contestMenuBg}>
              <Text style={FontStyles.lightH3}>Contest Menu</Text>
            </View>
            <View
              style={{
                margin: -Layouts.regular,
                marginTop: Layouts.large,
                marginBottom: Layouts.small,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {MENU_ITEMS.map(({label, screen, id}) => (
                <Pressable
                  key={id}
                  disabled={isLoading}
                  onPress={() =>
                    navigation.navigate(screen, {
                      fromDashboard: true,
                      contestId: _id,
                      title,
                      coverImg,
                      endDate,
                      startDate,
                      organiser,
                      registered,
                      active,
                      desc,
                      prizes,
                      initialSum,
                      leaderboardId,
                    })
                  }
                  style={styles.menuItemContainer}>
                  <Image
                    source={require('../../../../assets/images/menu_item-bg.png')}
                    style={styles.menuItemBg}
                  />
                  <Text style={styles.menuItemLabel}>{label}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
        <View style={styles.leaderboardContainer}>
          <Text style={styles.leaderboardTxt2}>Do not lose hope!</Text>
          <Text style={styles.leaderboardTxt}>
            Checkout what your friends are earning & the best performers for
            this contest.
          </Text>
          <AppButton
            clear
            disabled={isLoading}
            style={styles.leaderboardBtn}
            onPress={() => {
              navigation.navigate(ActiveContestScreenNames.LeaderBoard, {
                leaderboardId,
                isPast
              });
            }}>
            Go to Leaderboard
          </AppButton>
        </View>
      </ScrollView>
    </PageWithTitle>
  );
};

export default MainDashboard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contestNameBg: {
    backgroundColor: AppColors.roseGray,
    width: '100%',
    padding: Layouts.xSmall,
    paddingLeft: Layouts.small,
    borderRadius: Layouts.small,
  },
  contestMenuBg: {
    backgroundColor: AppColors.bottomTab,
    width: '100%',
    padding: Layouts.xSmall,
    paddingLeft: Layouts.small,
    borderRadius: Layouts.small,
    alignItems: 'center',
  },
  menuItemContainer: {
    width: Dimensions.get('screen').width / 2 - 2 * Layouts.regular,
    paddingVertical: Layouts.large,
    marginHorizontal: Layouts.regular,
    marginBottom: Layouts.large,
    backgroundColor: AppColors.backgroundHighlight,
    alignItems: 'flex-end',
    borderRadius: Layouts.large,
  },
  menuItemBg: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  gotoHeader: {
    ...FontStyles.h3,
    borderBottomWidth: Layouts.xSmall,
    borderBottomColor: AppColors.primaryDark,
    paddingVertical: Layouts.medium,
  },
  gotoTxtContainer: {
    borderBottomWidth: Layouts.xxSmall,
    borderBottomColor: AppColors.silverFaded,
    paddingVertical: Layouts.large,
  },
  gotoTxt: {
    ...FontStyles.descriptionLarge,
  },

  leaderboardContainer: {
    width: '100%',
    backgroundColor: AppColors.muneBlue,
    padding: Layouts.large,
    borderRadius: Layouts.large,
    marginBottom: Layouts.large,
    marginTop: Layouts.medium,
  },
  leaderboardTxt: {
    ...FontStyles.h3,
  },
  leaderboardTxt2: {
    ...FontStyles.descriptionLarge,
    marginBottom: Layouts.large,
  },
  leaderboardBtn: {
    marginTop: '10%',
    backgroundColor: AppColors.primaryBlue,
    padding: Layouts.medium,
    alignSelf: 'flex-end',
    marginRight: -Layouts.large,
  },
  menuItemLabel: {
    ...FontStyles.h1,
    marginRight: Layouts.large,
  },
});
