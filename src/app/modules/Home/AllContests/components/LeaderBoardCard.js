import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {FontStyles, Layouts, FontSizes} from './../../../../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AppColors} from '../../../../constants/colors';

const LeaderBoardCard = ({item: {user, portfolio, position}, initialSum}) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={[FontStyles.normal, styles.rank]}>{position}</Text>

        <Image source={{uri: user.profileAvatar}} style={styles.userImage} />
        <View style={styles.details}>
          <Text style={FontStyles.h3}>{user.name}</Text>
          {user.username && (
            <Text style={FontStyles.subtitle}>{user.username}</Text>
          )}
        </View>
      </View>
      <View style={styles.statContainer}>
        <Icon
          name={portfolio >= initialSum ? 'caret-up' : 'caret-down'}
          size={FontSizes.h2}
          style={[
            styles.statIcon,
            portfolio >= initialSum ? styles.profitColor : styles.lossColor,
          ]}
        />
        <Text
          style={[
            FontStyles.h3,
            portfolio >= initialSum ? styles.profitColor : styles.lossColor,
          ]}>
          ${portfolio}
        </Text>
      </View>
    </View>
  );
};

export default LeaderBoardCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: AppColors.backgroundHighlight,
    borderRadius: Layouts.medium,
    marginBottom: Layouts.medium,
    // elevation: 2,
    padding: Layouts.small,
    paddingVertical: Layouts.large,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    width: Layouts.xxLarge,
    height: Layouts.xxLarge,
    marginRight: Layouts.medium,
    borderRadius: Layouts.xLarge,
  },
  statContainer: {
    flexDirection: 'row',
    paddingRight: Layouts.medium
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
  rank: {
    marginHorizontal: Layouts.regular,
  },
});
