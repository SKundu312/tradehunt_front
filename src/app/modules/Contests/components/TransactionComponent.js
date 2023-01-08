import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {FontStyles, Layouts} from '../../../constants/theme';
import {AppColors} from './../../../constants/colors';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const TransactionComponent = ({item}) => {
  const { id, type, token, time, qty, rate, symbol } = item;
  const date = new Date(time);
  return (
    <View style={styles.container}>
      <View style={styles.transactionNameDetails}>
        <View style={styles.orderType}>
          <Fontisto style={FontStyles.h2} name={'arrow-swap'} />
          <Text
            style={
              `${type}` == `buy` ? styles.buyTxt : styles.sellTxt
            }>{`${type.toUpperCase()}`}</Text>
        </View>
        <View style={styles.details}>
          <Text style={FontStyles.h3}>{`${token}`}</Text>
          <Text
            style={
              FontStyles.subtitle
            }>{`${date.getHours()}:${date.getMinutes()} ${date.getDate()} ${
            months[date.getMonth()]
          }`}</Text>
        </View>
      </View>
      <View style={styles.transactionAmountDetails}>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>${(qty * rate).toFixed(2)}</Text>
          <Text style={styles.ltp}>Qty.{qty}</Text>
          <Text style={styles.ltp}>Price {rate}</Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Layouts.medium,
    paddingVertical: Layouts.medium,
    paddingHorizontal: Layouts.small,
    paddingLeft: Layouts.medium,
    backgroundColor: AppColors.backgroundHighlight,
    borderRadius: Layouts.large,
  },
  transactionNameDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderType: {
    flexDirection: 'column',
  },
  buyTxt: {
    ...FontStyles.description,
    color: AppColors.profit,
  },
  sellTxt: {
    ...FontStyles.description,
    color: AppColors.loss,
  },
  transactionAmountDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  details: {
    marginLeft: Layouts.medium,
  },
  amount: {
    ...FontStyles.h3,
  },
  amountContainer: {
    alignItems: 'flex-end',
    marginRight: Layouts.medium,
  },
  ltp: {
    ...FontStyles.description,
  },
});
