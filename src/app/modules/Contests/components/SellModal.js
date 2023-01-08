import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import AppButton from './../../../components/ui-components/button/AppButton';
import {AppColors} from './../../../constants/colors';
import {FontStyles, GlobalStyles, Layouts} from './../../../constants/theme';
const SEARCH_BAR_HEIGHT = Layouts.xxxLarge;

const SellModal = ({
  currentPrice,
  orderSuccess,
  isLoading,
  token,
  walletAmount,
}) => {
  const [quantity, setQuantity] = useState(0);
  return (
    <View>
      <TextInput
        onChangeText={text => setQuantity(text)}
        placeholder="Enter Quantity"
        keyboardType="numeric"
        style={styles.input}
      />
      <Text style={styles.availableText}>
        Available {token}: {walletAmount}
      </Text>
      <View style={[GlobalStyles.rowSpread, styles.billRow]}>
        <Text style={FontStyles.h2}>Current Price</Text>
        <Text style={FontStyles.h2}>${currentPrice}</Text>
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
        <Text style={FontStyles.h2}>
          ${(quantity * currentPrice).toFixed(2)}
        </Text>
      </View>
      <AppButton
        showLoader={isLoading}
        onPress={() => orderSuccess(quantity)}
        maxWidth
        rounded
        style={{backgroundColor: AppColors.sellRed}}>
        Complete Sell Order
      </AppButton>
    </View>
  );
};

export default SellModal;

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
