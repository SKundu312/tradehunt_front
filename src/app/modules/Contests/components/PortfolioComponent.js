import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {FontStyles, Layouts} from '../../../constants/theme';
import {AppColors} from '../../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {Pressable} from 'react-native';
import {ActiveContestScreenNames} from '../../Home/AllContests/navigation/ActiveContestNavigation';

const PortfolioComponent = ({item, subtitle, qty}) => {
  const navigation = useNavigation();
  const {name, tradePrice, percentageChange, contestId, walletAmount} = item;
  return (
    <>
      <Pressable
        style={styles.container}
        onPress={() =>
          navigation.navigate(ActiveContestScreenNames.AssetDetail, {
            token: item.token,
            name: item.token,
            contestId,
            walletAmount
          })
        }>
        <View style={styles.watchlistDetails}>
          <Text style={FontStyles.h3}>{item.token}</Text>
          <Text style={FontStyles.normal}>Qty. {item.qty}</Text>
          <Text style={FontStyles.normal}>{name}</Text>
        </View>
        <View style={styles.priceDetails}>
          {/* <Text
            style={[
              FontStyles.descriptionLarge,
              percentageChange >= 0 ? styles.profitTxt : styles.lossTxt,
            ]}>
            {percentageChange >= 0 ? '+' : ''}
            {percentageChange}%
          </Text> */}
          <Text
            style={[
              styles.amount,
              tradePrice >= 0 ? styles.profitTxt : styles.lossTxt,
            ]}>
            ${(item.qty * tradePrice).toFixed(2)}
          </Text>
          <Text style={FontStyles.subtitle}>LTP {tradePrice.toFixed(2)}</Text>

          <Text
            style={percentageChange >= 0 ? styles.profitTxt : styles.lossTxt}>
            ({percentageChange >= 0 ? '+' : ''}
            {percentageChange}%)
          </Text>
        </View>
      </Pressable>
    </>
  );
};

export default PortfolioComponent;

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
  watchlistDetails: {},
  priceDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceDetails: {
    alignItems: 'flex-end',
  },
  profitTxt: {
    color: AppColors.profit,
  },
  lossTxt: {
    color: AppColors.loss,
  },
  amount: {
    ...FontStyles.h3,
  },
});
