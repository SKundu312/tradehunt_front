import React, {useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FontSizes, Layouts} from '../../../../constants/theme';
import {AppColors} from './../../../../constants/colors';
import {FontStyles, GlobalStyles} from './../../../../constants/theme';

const {width, height} = Dimensions.get('screen');
const TopPerformers = ({leaderboard}) => {
  const [winnerHeight, setWinnerHeight] = useState(0);
  const [sideRankHeight, setSideRankHeight] = useState(0);
  const onWinnerLayout = event => {
    setWinnerHeight(event.nativeEvent.layout.width);
  };
  const onSideRankLayout = event => {
    setSideRankHeight(event.nativeEvent.layout.width);
  };
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.sideRankContainer} onLayout={onSideRankLayout}>
          <View
            style={[styles.sideRankImageContainer, {height: sideRankHeight}]}>
            <Image
              source={{uri: leaderboard[1].user.profileAvatar}}
              style={styles.sideRankImage}
            />
          </View>
          <Text
            style={[
              styles.rankStatus,
              {backgroundColor: AppColors.silverFaded},
            ]}></Text>
          <Text adjustsFontSizeToFit style={FontStyles.h3}>
            {leaderboard[1].user.name}
          </Text>
          <Text adjustsFontSizeToFit style={FontStyles.normal}>
            @{leaderboard[1].user.username}
          </Text>
        </View>
        <View style={styles.winnerContainer} onLayout={onWinnerLayout}>
          <View style={[styles.winnerImageContainer, {height: winnerHeight}]}>
            <Image
              source={{uri: leaderboard[0].user.profileAvatar}}
              style={[styles.sideRankImage]}
            />
          </View>
          <Text
            style={[
              styles.rankStatus,
              {backgroundColor: AppColors.gold},
            ]}></Text>
          <Text adjustsFontSizeToFit style={FontStyles.h2}>
            {leaderboard[0].user.name}
          </Text>
          <Text adjustsFontSizeToFit style={FontStyles.normal}>
            @{leaderboard[0].user.username}
          </Text>
        </View>
        <View style={styles.sideRankContainer}>
          <View
            style={[styles.sideRankImageContainer, {height: sideRankHeight}]}>
            <Image
              source={{uri: leaderboard[2].user.profileAvatar}}
              style={styles.sideRankImage}
            />
          </View>
          <Text
            style={[
              styles.rankStatus,
              {backgroundColor: AppColors.bronze},
            ]}></Text>
          <Text numberOfLines={1} adjustsFontSizeToFit style={FontStyles.h3}>
            {leaderboard[2].user.name}
          </Text>
          <Text adjustsFontSizeToFit style={FontStyles.normal}>
            @{leaderboard[2].user.username}
          </Text>
        </View>
      </View>
      {/* <View
        style={[
          GlobalStyles.rowSpread,
          {
            backgroundColor: AppColors.calmBlue,
            padding: Layouts.regular,
            paddingVertical: Layouts.large,
            borderRadius: Layouts.regular,
            marginBottom: Layouts.large,
          },
        ]}>
        <Text style={FontStyles.h3}>Your Rank</Text>
        <Text style={[FontStyles.h2, {color: AppColors.yellowHighlight}]}>
          26
        </Text>
      </View> */}
    </View>
  );
};

export default TopPerformers;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: height / 4,
    marginBottom: Layouts.large,
  },

  sideRankContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  winnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 5,
    marginHorizontal: Layouts.medium,
  },
  sideRankImage: {
    width: '100%',
    height: '100%',
    borderRadius: 200,
  },
  winnerImageContainer: {
    width: '100%',
    borderRadius: 200,
    marginBottom: Layouts.small,
  },
  sideRankImageContainer: {
    width: '100%',
    borderRadius: 200,
    marginBottom: Layouts.small,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankStatus: {
    padding: Layouts.small,
    ...FontStyles.h3,
    borderRadius: Layouts.giant,
    width: Layouts.large,
    height: Layouts.large,
    marginBottom: Layouts.medium,
  },
  statIcon: {
    marginRight: Layouts.small,
  },
  profitColor: {
    color: AppColors.profit,
  },
  lossColor: {
    color: AppColors.loss,
  },
});
