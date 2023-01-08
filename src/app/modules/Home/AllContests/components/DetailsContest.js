import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {AppColors} from '../../../../constants/colors';
import {FontStyles, Layouts} from '../../../../constants/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/FontAwesome5';
import {GlobalStyles} from './../../../../constants/theme';

const {width, height} = Dimensions.get('screen');

const DetailsContest = ({
  navigation,
  desc,
  prizes,
  initialSum,
  startDate,
  endDate,
}) => {
  const startD = new Date(startDate);
  const endD = new Date(endDate);
  const renderPrizes = () => {
    return (
      <View style={prizes.length < 4 ? GlobalStyles.rowSpread : styles.prizes}>
        {prizes.map((p, i) => {
          return (
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              key={i}
              style={
                i == 0
                  ? styles.firstPrize
                  : i == 1
                  ? styles.secondPrize
                  : styles.thirdPrize
              }>
              <Icons name="medal" color={AppColors.black} /> {p}
            </Text>
          );
        })}
      </View>
    );
  };

  return (
    // <View>

    <View style={styles.body}>
      <View style={styles.section}>
        <Text style={styles.bodyHeader}>About the contest</Text>
        <Text style={styles.about}>{desc}</Text>
        <Text style={styles.bodyHeader}>Allotted Money</Text>
        <Text style={styles.impDetail}>${initialSum}</Text>
        <Text style={styles.bodyHeader}>Starts At</Text>
        <Text style={styles.impDetail}>
          {`${startD.toDateString()} ${startD.toLocaleTimeString()}`}
        </Text>
        <Text style={styles.bodyHeader}>Ends At</Text>
        <Text style={styles.impDetail}>
          {`${endD.toDateString()} ${endD.toLocaleTimeString()}`}
        </Text>
      </View>

      <Text style={styles.bodyHeader}>Prizes</Text>
      {renderPrizes()}
    </View>
  );
};

export default DetailsContest;

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: '0%',
    backgroundColor: AppColors.primaryRgba,
    width: '100%',
    padding: Layouts.large,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    ...FontStyles.h1,
    color: AppColors.white,
    textAlign: 'right',
    textShadowRadius: Layouts.medium,
    textShadowOffset: {width: 4, height: 1},
  },
  subheading: {
    ...FontStyles.normal,
    color: AppColors.white,
    textAlign: 'right',
    letterSpacing: Layouts.small,
    textShadowRadius: Layouts.medium,
    textShadowOffset: {width: 4, height: 1},
  },

  body: {},
  section: {
    marginTop: Layouts.large,
  },
  bodyHeader: {
    ...FontStyles.h3,
    paddingBottom: Layouts.small,
    paddingTop: Layouts.medium,
  },
  about: {
    ...FontStyles.normal,
    paddingTop: Layouts.small,
    paddingBottom: Layouts.medium,
  },
  impDetail: {
    ...FontStyles.h1,
  },
  firstPrize: {
    ...FontStyles.h3,
    color: AppColors.black,
    flex: 1,
    backgroundColor: AppColors.goldFaded,
    padding: Layouts.large,
    textAlign: 'center',
    marginVertical: Layouts.xSmall,
    borderRadius: Layouts.small,
    width: '100%',
  },
  secondPrize: {
    ...FontStyles.h3,
    color: AppColors.black,
    flex: 1,
    backgroundColor: AppColors.silverFaded,

    padding: Layouts.large,
    textAlign: 'center',
    marginVertical: Layouts.xSmall,
    borderRadius: Layouts.small,
    width: '100%',
  },
  thirdPrize: {
    ...FontStyles.h3,
    flex: 1,
    width: '100%',
    backgroundColor: AppColors.bronzeFaded,
    color: AppColors.black,

    padding: Layouts.large,
    textAlign: 'center',
    marginVertical: Layouts.xSmall,
    borderRadius: Layouts.small,
  },
  prizes: {
    alignItems: 'center',
  },
});
