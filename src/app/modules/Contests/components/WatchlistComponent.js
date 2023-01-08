import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {FontStyles, Layouts} from '../../../constants/theme';
import {AppColors} from '../../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {Pressable} from 'react-native';
import {ActiveContestScreenNames} from '../../Home/AllContests/navigation/ActiveContestNavigation';

const WatchlistComponent = ({item, symbol, contestId}) => {
  // console.log(item)
  const {icon, name, token, currPrice, percentChange, decimalPoints} = item;
  const navigation = useNavigation();
  return (
    <>
      <Pressable
        style={styles.container}
        onPress={() =>
          navigation.navigate(ActiveContestScreenNames.AssetDetail, {
            token,
            name,
            icon,
            decimalPoints,
            contestId,
          })
        }>
        <View style={styles.watchlistDetailsContainer}>
          <Image style={styles.icon} source={{uri: icon}} />
          <View style={styles.watchlistDetails}>
            <Text style={FontStyles.h3}>{name}</Text>
            <Text style={FontStyles.normal}>{token}</Text>
          </View>
        </View>
        <View style={styles.priceDetailsContainer}>
          <View style={styles.priceDetails}>
            <Text
              style={
                (percentChange >= 0 ? styles.profitTxt : styles.lossTxt) ||
                styles.amount
              }>
              ${currPrice.toFixed(decimalPoints || 2)}
            </Text>
            <Text
              style={percentChange >= 0 ? styles.profitTxt : styles.lossTxt}>
              {percentChange}%
            </Text>
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default WatchlistComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: AppColors.backgroundHighlight,
    paddingVertical: Layouts.medium,
    paddingHorizontal: Layouts.large,
    marginBottom: Layouts.regular,
    borderRadius: Layouts.regular,
  },
  watchlistDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  watchlistDetails: {
    marginLeft: Layouts.medium,
  },
  priceDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceDetails: {
    alignItems: 'flex-end',
  },
  profitTxt: {
    ...FontStyles.descriptionLarge,
    color: AppColors.profit,
  },
  lossTxt: {
    ...FontStyles.descriptionLarge,
    color: AppColors.loss,
  },
  amount: {
    ...FontStyles.h3,
  },
  icon: {
    width: Layouts.large,
    height: Layouts.large,
  },
});
