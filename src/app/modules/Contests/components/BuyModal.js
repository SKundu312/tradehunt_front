import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {AppColors} from './../../../constants/colors';
import {FontStyles, GlobalStyles, Layouts} from './../../../constants/theme';
import AppButton from './../../../components/ui-components/button/AppButton';
const SEARCH_BAR_HEIGHT = Layouts.xxxLarge;

const BuyModal = ({orderSuccess, currentPrice, isLoading, walletAmount}) => {
  const [quantity, setQuantity] = useState(0);
  const amount = (quantity * currentPrice).toFixed(2);
  return (
    <View>
      <TextInput
        onChangeText={text => setQuantity(text)}
        placeholder="Enter Quantity"
        keyboardType="numeric"
        defaultValue='0'
        style={styles.input}
      />
      <Text style={styles.availableText}>
        Available Credit: ${walletAmount}
      </Text>
      <View style={[GlobalStyles.rowSpread, styles.billRow]}>
        <Text style={FontStyles.h2}>Current Price</Text>
        <Text style={FontStyles.h2}>{currentPrice.toFixed(2)}</Text>
      </View>
      <View style={[GlobalStyles.rowSpread, styles.billRow]}>
        <Text style={FontStyles.h2}>Quantity</Text>
        <Text style={FontStyles.h2}>{quantity}</Text>
      </View>
      <Text style={styles.dashedDivider} ellipsizeMode="clip" numberOfLines={1}>
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        - - - - - - - - - - - - - - - - - - - -
      </Text>
      <View style={[GlobalStyles.rowSpread, styles.billRow]}>
        <Text style={FontStyles.h2}>Amount</Text>
        <Text style={FontStyles.h2}>{amount}</Text>
      </View>
      <AppButton
        onPress={() => orderSuccess(quantity)}
        maxWidth
        showLoader={isLoading}
        rounded
        style={{backgroundColor: AppColors.buyGreen}}>
        Complete Buy Order
      </AppButton>
    </View>
  );
};

export default BuyModal;

const styles = StyleSheet.create({
  input: {
    height: SEARCH_BAR_HEIGHT,
    ...FontStyles.h3,
    alignSelf: 'center',
    width: '100%',
    borderRadius: Layouts.large,
    padding: Layouts.large,
    backgroundColor: AppColors.searchBarBg,
  },
  availableText: {
    ...FontStyles.h3,
    color: AppColors.yellowHighlight,
    marginTop: Layouts.large,
    textAlign: 'right',
    marginBottom: Layouts.xxxLarge,
  },
  billRow: {
    marginBottom: Layouts.medium,
  },
  dashedDivider: {
    ...FontStyles.h3,
    marginVertical: Layouts.large,
  },
});
