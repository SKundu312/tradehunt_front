import React from 'react';
import {StyleSheet, Text, View, Pressable, ImageBackground} from 'react-native';

import {Layouts} from '../../../constants/theme';
import {AppColors} from '../../../constants/colors';
import {FontStyles} from '../../../constants/theme';
import {AllContestScreenNames} from '../../../modules/Home/AllContests/navigation/AllContestsNavigation';
import LinearGradient from 'react-native-linear-gradient';

export default function ContestCard({
  _id,
  title,
  coverImg,
  endDate,
  startDate,
  organiser,
  registered,
  navigation,
  active,
  desc,
  prizes,
  initialSum,
  leaderboardId,
  helper,
  isPast
}) {
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        if (registered || isPast) {
          navigation.navigate(AllContestScreenNames.ActiveContest, {
            _id,
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
            isPast

          });
        } else
          navigation.navigate(AllContestScreenNames.ViewContest, {
            _id,
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
            helper,
            leaderboardId,
          });
      }}>
      <ImageBackground
        imageStyle={{
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
        }}
        style={styles.imgBackground}
        source={{uri: coverImg}}>
        <LinearGradient
          style={styles.cardImage}
          locations={[0, 0.5, 1.2]}
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,1)']}>
          {active && <View style={styles.online} />}
          <View style={styles.detailsTextContainer}>
            {!active && (
              <Text style={styles.cardSupertitle}>Starts at 12 Dec, 5PM</Text>
            )}
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardSubtitle}>{organiser}</Text>
            {registered && <Text style={styles.active}>Registered</Text>}
          </View>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Layouts.medium,
    overflow: 'hidden',
    marginBottom: Layouts.large,
    height: Layouts.giant,
  },
  imgBackground: {
    flex: 1,
    width: '100%',
    // backgroundColor: AppColors.silverFaded,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    paddingHorizontal: Layouts.large,
    paddingBottom: Layouts.small,
  },
  cardTitle: {
    ...FontStyles.h2,
    color: AppColors.white,
  },
  cardSubtitle: {
    ...FontStyles.normal,
  },
  active: {
    ...FontStyles.h3,
    backgroundColor: AppColors.yellowHighlight,
    textAlign: 'right',
    position: 'absolute',
    right: 0,
    bottom: 0,
    paddingHorizontal: Layouts.medium,
    borderRadius: Layouts.small,
  },
  cardSupertitle: {
    ...FontStyles.normal,
    marginBottom: Layouts.small,
  },
  online: {
    width: Layouts.xxLarge,
    height: Layouts.xxLarge,
    backgroundColor: AppColors.profit,
    borderRadius: Layouts.xxLarge,
    position: 'absolute',
    right: -Layouts.large,
    top: -Layouts.large,
  },
});
