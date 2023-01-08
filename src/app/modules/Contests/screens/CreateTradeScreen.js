import React from 'react';
import {Text, View, StyleSheet, TextInput, Modal, Alert} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';

import PageWithTitle from '../../../components/hoc/PageWithTitle';
import {FontStyles, Layouts} from './../../../constants/theme';
import {AppColors} from './../../../constants/colors';
import AppButton from '../../../components/ui-components/button/AppButton';
import {useState} from 'react';
import {Pressable} from 'react-native';
import {ActiveContestScreenNames} from '../../Home/AllContests/navigation/ActiveContestNavigation';

const CreateTradeScreen = ({navigation}) => {
  const tradePrice = 2800000;
  const percentageChange = 0.68;
  const [orderType, setOrderType] = useState('BUY');
  const [quantity, setQuantity] = useState(0);
  const [balance, setBalance] = useState(20000);
  const [visible, setVisible] = useState(false);
  const [available, setAvailable] = useState(0.002);

  const switchOrderType = () => {
    orderType === 'BUY' ? setOrderType('SELL') : setOrderType('BUY');
  };
  const createTrade = () => {
    Alert.alert('Success!', 'Order Placed Successfully', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <PageWithTitle backButton>
      <View style={styles.cryptoDetails}>
        <View>
          <Text>
            <Text style={[FontStyles.h1]}>Bitcoin</Text>
          </Text>
          <Pressable
            onPress={() =>
              navigation.navigate(ActiveContestScreenNames.CrptoScreen)
            }>
            <Text style={[FontStyles.subtitle]}>
              View Chart <Fontisto name={'line-chart'} />
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
          }}>
          <Text style={FontStyles.h3}>₹{tradePrice}</Text>
          <Text
            style={percentageChange >= 0 ? styles.profitTxt : styles.lossTxt}>
            ({percentageChange >= 0 ? '+' : ''}
            {percentageChange}%)
          </Text>
        </View>
      </View>
      <View style={styles.switchContainer}>
        <Pressable
          onPress={switchOrderType}
          style={[styles.switch, orderType === 'BUY' && styles.buySwitch]}>
          <Text style={styles.switchText}>BUY</Text>
        </Pressable>
        <Pressable
          onPress={switchOrderType}
          style={[styles.switch, orderType === 'SELL' && styles.sellSwitch]}>
          <Text style={styles.switchText}>SELL</Text>
        </Pressable>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter Quantity"
        keyboardType="number-pad"
        value={quantity}
        onChangeText={q => setQuantity(q)}
        placeholderTextColor={AppColors.primaryDark}
      />
      {orderType === 'BUY' && (
        <View style={styles.detailsFlx}>
          <Fontisto style={styles.detailIcon} name={'wallet'} />
          <Text style={FontStyles.h3}>Wallet Balance: </Text>
          <Text style={FontStyles.h3}>₹{balance} </Text>
          <Pressable
            onPress={() => {
              setQuantity((balance / tradePrice).toFixed(5).toString());
            }}>
            <Text
              style={[
                styles.normal,
                {
                  color: AppColors.primary,
                  marginLeft: Layouts.small,
                },
              ]}>
              100%
            </Text>
          </Pressable>
        </View>
      )}
      {orderType === 'SELL' && (
        <View style={styles.detailsFlx}>
          <Fontisto style={styles.detailIcon} name={'propeller-2'} />
          <Text style={FontStyles.h3}>Available Bitcoin: </Text>
          <Text style={FontStyles.h3}>{available} </Text>
          <Pressable
            onPress={() => {
              setQuantity(available.toString());
            }}>
            <Text
              style={[
                styles.normal,
                {
                  color: AppColors.primary,
                  marginLeft: Layouts.small,
                },
              ]}>
              100%
            </Text>
          </Pressable>
        </View>
      )}
      <View style={styles.detailsFlx}>
        <Fontisto style={styles.detailIcon} name={'inr'} />
        <Text style={FontStyles.h3}>Amount: </Text>
        <Text style={[FontStyles.h3, {color: AppColors.primary}]}>
          ₹{(tradePrice * quantity).toFixed(2) || '0'}
        </Text>
      </View>
      <AppButton onPress={createTrade} maxWidth style={styles.ctaButton}>
        Place Order
      </AppButton>
    </PageWithTitle>
  );
};

export default CreateTradeScreen;

const styles = StyleSheet.create({
  cryptoDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    backgroundColor: AppColors.white,
    ...FontStyles.h3,
    marginVertical: Layouts.large,
    paddingHorizontal: Layouts.medium,
    borderRadius: Layouts.small,
    elevation: 1,
  },
  ctaButton: {
    marginVertical: Layouts.medium,
  },
  detailsFlx: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layouts.medium,
  },
  detailIcon: {
    ...FontStyles.h2,
    marginRight: Layouts.small,
  },
  buySwitch: {
    backgroundColor: AppColors.profit,
  },
  sellSwitch: {
    backgroundColor: AppColors.loss,
  },
  switch: {width: '45%', padding: Layouts.medium, borderRadius: Layouts.medium},
  switchText: {
    ...FontStyles.h2,
    color: AppColors.white,
    textAlign: 'center',
  },
  profitTxt: {
    ...FontStyles.descriptionLarge,
    color: AppColors.profit,
  },
  lossTxt: {
    ...FontStyles.descriptionLarge,
    color: AppColors.loss,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: Layouts.medium,
  },
});
