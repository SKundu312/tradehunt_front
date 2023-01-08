import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, TextInput} from 'react-native';
import {AppColors} from '../../../constants/colors';
import {FontStyles, Layouts} from '../../../constants/theme';
import WatchlistComponent from '../components/WatchlistComponent';
import PageWithTitle from './../../../components/hoc/PageWithTitle';
const SEARCH_BAR_HEIGHT = Layouts.xxxLarge;

const allowedSymbols = {
  BTCUSDT: {
    icon: 'https://res.cloudinary.com/icellnitkkr/image/upload/v1643212359/assets-icons/btc-bitcoin_rtptep.png',
    name: 'Bitcoin',
    token: 'BTCUSDT',
    currPrice: 0,
    percentChange: 0,
  },
  BNBUSDT: {
    icon: 'https://res.cloudinary.com/icellnitkkr/image/upload/v1643212922/assets-icons/bnb-binance-coin_qozs3z.png',
    name: 'Binance Coin',
    token: 'BNBUSDT',
    currPrice: 0,
    percentChange: 0,
  },
  ETHUSDT: {
    icon: 'https://res.cloudinary.com/icellnitkkr/image/upload/v1643212359/assets-icons/eth-ethereum_c6jqsq.png',
    name: 'Ethereum',
    token: 'ETHUSDT',
    currPrice: 0,
    percentChange: 0,
  },
  ADAUSDT: {
    icon: 'https://res.cloudinary.com/icellnitkkr/image/upload/v1643212359/assets-icons/ada-cardano_hnkupj.png',
    name: 'Cardano',
    token: 'ADAUSDT',
    currPrice: 0,
    percentChange: 0,
    decimalPoints: 5,
  },
  XRPUSDT: {
    icon: 'https://res.cloudinary.com/icellnitkkr/image/upload/v1643212359/assets-icons/xrp-xrp_idhvqc.png',
    name: 'XRP',
    token: 'XRPUSDT',
    currPrice: 0,
    percentChange: 0,
    decimalPoints: 5,
  },
  SOLUSDT: {
    icon: 'https://res.cloudinary.com/icellnitkkr/image/upload/v1643212359/assets-icons/sol-solana_zz1iti.png',
    name: 'Solana',
    token: 'SOLUSDT',
    currPrice: 0,
    percentChange: 0,
  },
  LUNAUSDT: {
    icon: 'https://res.cloudinary.com/icellnitkkr/image/upload/v1643212359/assets-icons/luna-terra_znp0ds.png',
    name: 'Terra',
    token: 'LUNAUSDT',
    currPrice: 0,
    percentChange: 0,
  },
  DOGEUSDT: {
    icon: 'https://res.cloudinary.com/icellnitkkr/image/upload/v1643212359/assets-icons/doge-dogecoin_utp808.png',
    name: 'Dogecoin',
    token: 'DOGEUSDT',
    currPrice: 0,
    percentChange: 0,
    decimalPoints: 5,
  },
  AVAXUSDT: {
    icon: 'https://res.cloudinary.com/icellnitkkr/image/upload/v1643212360/assets-icons/avax-avalanche_eujqut.png',
    name: 'Avalanche',
    token: 'AVAXUSDT',
    currPrice: 0,
    percentChange: 0,
  },
  DOTUSDT: {
    icon: 'https://res.cloudinary.com/icellnitkkr/image/upload/v1643212359/assets-icons/dot-polkadot_ymyu1w.png',
    name: 'Polkadot',
    token: 'DOTUSDT',
    currPrice: 0,
    percentChange: 0,
  },
  MATICUSDT: {
    icon: 'https://res.cloudinary.com/icellnitkkr/image/upload/v1643212359/assets-icons/matic-polygon_gosz18.png',
    name: 'Polygon',
    token: 'MATICUSDT',
    currPrice: 0,
    percentChange: 0,
    decimalPoints: 5,
  },
  SHIBUSDT: {
    icon: 'https://res.cloudinary.com/icellnitkkr/image/upload/v1643212360/assets-icons/shib-shiba-inu_vldoev.png',
    name: 'Shiba Inu',
    token: 'SHIBUSDT',
    currPrice: 0,
    percentChange: 0,
    decimalPoints: 8,
  },
};
const Watchlist = ({ navigation, route }) => {
  const { contestId } = route.params;
  const [textInputValue, setTextInputValue] = React.useState('');

  const [allAssets, setAllAssets] = useState(allowedSymbols);

  useEffect(() => {
    let subs = [];
    for (let i of Object.keys(allAssets)) {
      subs.push(i.toLowerCase() + '@ticker');
    }

    const ws = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${subs.join('/')}`,
    );
    ws.onmessage = e => {
      const {data} = JSON.parse(e.data);
      // console.log(allAssets.BTCUSDT)
      setAllAssets(ra => {
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
  }, []);

  return (
    <PageWithTitle backButton title={'Assets'}>
      <TextInput
        style={styles.input}
        onChangeText={text => setTextInputValue(text)}
        value={textInputValue}
        placeholderTextColor={AppColors.white}
        placeholder="Search for assets"
      />
      <FlatList
        data={Object.keys(allAssets).filter(i =>
          allAssets[i].name.includes(textInputValue),
        )}
        style={styles.list}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <WatchlistComponent item={allAssets[item]} symbol={item} contestId={contestId} />
        )}
      />
    </PageWithTitle>
  );
};

export default Watchlist;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  container2: {
    width: '100%',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SEARCH_BAR_HEIGHT / 2 + Layouts.medium,
  },
  header: {
    backgroundColor: AppColors.primary,
    padding: Layouts.medium,
    paddingTop: Layouts.large,
  },
  heading: {
    ...FontStyles.h1,
    marginBottom: Layouts.xxLarge,
    color: AppColors.white,
  },
  list: {
    width: '100%',
    marginTop: Layouts.large,
  },
  input: {
    height: SEARCH_BAR_HEIGHT,
    ...FontStyles.subtitle,
    alignSelf: 'center',
    width: '100%',
    borderRadius: Layouts.large,
    padding: Layouts.large,
    backgroundColor: AppColors.searchBarBg,
    color: AppColors.white,
  },
});
