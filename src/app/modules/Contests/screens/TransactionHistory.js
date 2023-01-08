import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import PageWithTitle from '../../../components/hoc/PageWithTitle';
import {AppColors} from '../../../constants/colors';
import {FontStyles, Layouts} from '../../../constants/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TransactionComponent from '../components/TransactionComponent';
import {getOrderBook} from '../services/contestService';
const history = [
  {
    id: 'ord_1',
    type: 'sell',
    assetName: 'Ethereum',
    symbol: 'ETH',
    time: new Date(),
    tradeQuantity: 2.24,
    tradePrice: 320,
  },
  {
    id: 'ord_2',
    type: 'sell',
    assetName: 'PolkaDot',
    symbol: 'DOT',
    time: new Date(),
    tradeQuantity: 6.3,
    tradePrice: 74,
  },
  {
    id: 'ord_3',
    type: 'buy',
    assetName: 'Bitcoin',
    symbol: 'BTC',
    time: new Date(),
    tradeQuantity: 1.0,
    tradePrice: 1020,
  },
  {
    id: 'ord_4',
    type: 'buy',
    assetName: 'Matic',
    symbol: 'MAT',
    time: new Date(),
    tradeQuantity: 2.24,
    tradePrice: 320,
  },
];

const TransactionHistory = ({navigation, route}) => {
  const {contestId} = route.params;
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getData = async () => {
    setRefreshing(true);
    const d = await getOrderBook(contestId);
    if (d.success) {
      setData(d.history);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <PageWithTitle
      title={'Order Book'}
      backButton
      style={styles.container}
      isLoading={refreshing}>
      <View style={styles.container2}>
        <FlatList
          data={data}
          style={styles.list}
          keyExtractor={({time, token}) => token + time}
          renderItem={TransactionComponent}
        />
      </View>
    </PageWithTitle>
  );
};

export default TransactionHistory;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  heading: {
    ...FontStyles.h1,
    marginBottom: Layouts.regular,
    color: AppColors.white,
  },
  container2: {
    width: '100%',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: SEARCH_BAR_HEIGHT / 2 + Layouts.medium,
  },
  list: {
    marginTop: Layouts.medium,
    width: '100%',
  },
});
