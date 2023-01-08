import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {AppColors} from '../../../constants/colors';
import {FontStyles, Layouts} from '../../../constants/theme';
import PageWithTitle from './../../../components/hoc/PageWithTitle';
import PortfolioHeader from '../../Home/AllContests/components/PortfolioHeader';
import PortfolioComponent from '../components/PortfolioComponent';
import {getHoldings} from '../services/contestService';


const Watchlist = ({navigation, route}) => {
  const {contestId} = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [holdingsData, setHoldings] = useState({});
  const [walletAmount, setWalletAmount] = useState(0)

  const getHoldingsHelper = async () => {
    setIsLoading(true);
    const { holdings, walletAmount } = await getHoldings(contestId);
    setWalletAmount(walletAmount)
    setIsLoading(false);
    const x = {};
    for (let h of holdings) {
      x[h.token] = {
        currPrice: 0,
        percentChange: 0,
        qty: Number(h.qty),
        name: h.name,
      };
    }
    setHoldings(x);
    let subs = [];
    for (let i of holdings) {
      subs.push(i.token.toLowerCase() + '@ticker');
    }

    const ws = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${subs.join('/')}`,
    );
    ws.onmessage = e => {
      const {data} = JSON.parse(e.data);
      setHoldings(ra => {
        let a = {};
        Object.assign(a, ra);
        a[data['s']].currPrice = Number(data['c']);
        a[data['s']].percentChange = Number(data['P']);
        return a;
      });
    };
    return () => {
      console.log('closing');
      ws.close();
    };
  };

  useEffect(() => {
    getHoldingsHelper();
  }, []);

  return (
    <PageWithTitle backButton title={'Your Positions'} isLoading={isLoading}>
      <View style={styles.container2}>
        {!isLoading && (
          <FlatList
            data={Object.keys(holdingsData)}
            style={styles.list}
            ListHeaderComponent={<PortfolioHeader contestId={contestId} walletAmount={walletAmount} />}
            keyExtractor={({id}) => id}
            renderItem={({item}) => {
              return (
                // <Text>Hello</Text>
                <PortfolioComponent
                  item={{
                    percentageChange: holdingsData[item].percentChange,
                    tradePrice: holdingsData[item].currPrice,
                    qty: holdingsData[item].qty,
                    name: holdingsData[item].name,
                    token: item,
                    contestId,
                    walletAmount
                  }}
                />
              );
            }}
          />
        )}
      </View>
    </PageWithTitle>
  );
};

export default Watchlist;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: AppColors.white,
  },
  header: {
    backgroundColor: AppColors.primary,
    padding: Layouts.regular,
    paddingTop: Layouts.large,
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
    width: '100%',
  },
});
