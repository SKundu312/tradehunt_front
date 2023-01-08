import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import PageWithTitle from '../../../components/hoc/PageWithTitle';
import {
  VictoryChart,
  VictoryTheme,
  VictoryCandlestick,
  VictoryAxis,
} from 'victory-native';
import {
  FontFamily,
  FontStyles,
  Layouts,
  GlobalStyles,
} from '../../../constants/theme';
import {AppColors} from '../../../constants/colors';
import {ClockIcon} from '../../../constants/icons';
import AppButton from '../../../components/ui-components/button/AppButton';
import AppModal from './../../../components/ui-components/modal/AppModal';
import BuyModal from '../components/BuyModal';
import SellModal from './../components/SellModal';
import {buyOrder, getAssetDetails, sellOrder} from '../services/contestService';
import {showToast} from './../../../utils/utils';

const AssetDetailScreen = ({navigation, route}) => {
  const {token, name, contestId, decimalPoints} = route.params;
  const [chartData, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [chartMode, setChartMode] = useState('1hr');
  const [orderType, setOrderType] = useState('BUY');
  const [showResultModal, setShowResultModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [currentPrice, setCurrentPrice] = useState(0);
  const [currentPriceChange, setCurrentPriceChange] = useState(0);
  const [highPrice, setHighPrice] = useState(0);
  const [lowPrice, setLowPrice] = useState(0);
  const [volume, setVolume] = useState(0);
  const [walletAmount, setWalletAmount] = useState(0);
  const [availableQty, setAvailableQty] = useState(0);

  const [hData, setHData] = useState([]);
  const [DData, setDData] = useState([]);
  const [mData, setMData] = useState([]);
  const [wData, setWData] = useState([]);

  const changeChartMode = type => {
    if (type == chartMode) return;
    setChartMode(type);
    switch (type) {
      case '1hr':
        onClick1H();
        break;
      case '1dy':
        onClick1D();
        break;
      case '1wk':
        onClick1W();
        break;
      case '1mn':
        onClick1M();
        break;
    }
  };

  const fetchCandleStickData = async (timeperiod = '1h') => {
    setIsLoading(true);
    const d = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${token.toUpperCase()}&interval=${timeperiod}&limit=50`,
    );
    const data = await d.json();
    setIsLoading(false);
    return data.map(ele => {
      const [x, open, high, low, close] = ele;
      return {
        x,
        open,
        high,
        low,
        close,
      };
    });
  };

  const onClick1H = async () => {
    if (hData.length < 1) {
      const hdata = await fetchCandleStickData('1h');
      setHData(hdata);
      setData(hdata);
    } else setData(hData);
  };
  const onClick1D = async () => {
    if (DData.length < 1) {
      const hdata = await fetchCandleStickData('1d');
      setDData(hdata);
      setData(hdata);
    } else setData(DData);
  };
  const onClick1W = async () => {
    if (wData.length < 1) {
      const hdata = await fetchCandleStickData('1w');
      setWData(hdata);
      setData(hdata);
    } else setData(wData);
  };
  const onClick1M = async () => {
    if (mData.length < 1) {
      const hdata = await fetchCandleStickData('1m');
      setMData(hdata);
      setData(hdata);
    } else setData(mData);
  };
  const orderSuccess = () => {
    setModalVisible(false);
    setShowResultModal(true);
  };
  const closeSuccessModal = () => {
    setShowResultModal(false);
    navigation.pop(2);
  };
  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${token.toLowerCase()}@ticker`,
    );
    ws.onmessage = e => {
      const data = JSON.parse(e.data);
      setHighPrice(Number(data['h']));
      setLowPrice(Number(data['l']));
      setCurrentPrice(Number(data['c']));
      setCurrentPriceChange(Number(data['P']));
      setVolume(Number(data['v']));
    };

    return () => {
      console.log('closing');
      ws.close();
    };
  }, []);

  const getAsstDetail = async () => {
    const d = await getAssetDetails(token, contestId);
    if (d.success) {
      console.log(d.data);
      setWalletAmount(d.data.walletAmount);
      if (d.data.holdings) {
        setAvailableQty(d.data?.holdings?.qty);
      }
    } else {
      navigation.goBack();
      showToast('Asset Unavailable');
    }
  };

  useEffect(() => {
    getAsstDetail();
    onClick1H();
  }, []);

  const executeBuyOrder = async qty => {
    if (!qty || qty <= 0) {
      showToast('Quantity should be greater than 0');
      return;
    }
    setIsLoading1(true);
    const d = await buyOrder(token, currentPrice, qty, contestId);
    console.log(d);
    if (d.success) {
      orderSuccess();
    }
    showToast(d.message);
    setIsLoading1(false);
  };
  const executeSellOrder = async qty => {
    if (!qty || qty <= 0) {
      showToast('Quantity should be greater than 0');
      return;
    }
    setIsLoading1(true);
    const d = await sellOrder(token, currentPrice, qty, contestId);
    if (d.success) {
      orderSuccess();
    }
    showToast(d.message);
    setIsLoading1(false);
  };
  return (
    <PageWithTitle backButton title={name} isLoading={isLoading}>
      <AppModal
        visible={modalVisible}
        title={orderType + ' ORDER'}
        closeModal={() => setModalVisible(false)}>
        {orderType === 'BUY' ? (
          <BuyModal
            currentPrice={currentPrice}
            orderSuccess={executeBuyOrder}
            isLoading={isLoading1}
            walletAmount={walletAmount}
          />
        ) : (
          <SellModal
            token={token}
            orderSuccess={executeSellOrder}
            currentPrice={currentPrice}
            isLoading={isLoading1}
            walletAmount={availableQty}
          />
        )}
      </AppModal>
      <AppModal
        visible={showResultModal}
        hideHeader
        closeModal={closeSuccessModal}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../.././../assets/images/confetti.png')}
            style={styles.confettiImg}
          />
          <Text style={[FontStyles.h2, {color: AppColors.primaryBlue}]}>
            Order Successful
          </Text>
          <Text style={[FontStyles.h3, {color: AppColors.subtitle}]}>
            {token}
          </Text>
          <AppButton
            maxWidth
            outline
            onPress={closeSuccessModal}
            outlineColor={AppColors.buyGreen}
            style={{marginVertical: Layouts.large}}>
            Go To Contest Home
          </AppButton>
        </View>
      </AppModal>
      <ScrollView>
        <View style={[GlobalStyles.rowSpread, styles.header]}>
          <View style={{alignItems: 'flex-start'}}>
            <Text style={FontStyles.h1}>
              ${currentPrice.toFixed(decimalPoints || 2)}
            </Text>
            <Text
              style={[
                FontStyles.normal,
                {
                  color:
                    currentPriceChange > 0 ? AppColors.profit : AppColors.loss,
                },
              ]}>
              ({currentPriceChange.toFixed(2)}%)
            </Text>
          </View>
          <View style={styles.statBg}>
            <View style={GlobalStyles.rowSpread}>
              <View>
                <Text style={[FontStyles.h3, {color: AppColors.profit}]}>
                  High
                </Text>
                <Text style={[FontStyles.normal]}>
                  ${highPrice.toFixed(decimalPoints || 2)}
                </Text>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={[FontStyles.h3, {color: AppColors.loss}]}>
                  Low
                </Text>
                <Text style={[FontStyles.normal]}>
                  ${lowPrice.toFixed(decimalPoints || 2)}
                </Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={GlobalStyles.rowSpread}>
              <View>
                <Text style={[FontStyles.h3, {color: AppColors.subtitle}]}>
                  Base Volume
                </Text>
                <Text style={[FontStyles.normal]}>{volume.toFixed(0)}</Text>
              </View>
              {/* <View style={{alignItems: 'flex-end'}}>
                <Text style={[FontStyles.h3, {color: AppColors.subtitle}]}>
                  Close
                </Text>
                <Text style={[FontStyles.normal]}>43,292</Text>
              </View> */}
            </View>
          </View>
        </View>
        <View style={styles.timelineBg}>
          <ClockIcon
            size={Layouts.medium}
            style={{marginRight: Layouts.small}}
          />
          <Text style={FontStyles.lightH3}>Timeline</Text>
        </View>
        <View style={[styles.chart]}>
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={{x: 20}}
            scale={{x: 'time'}}>
            <VictoryAxis
              dependentAxis
              tickFormat={t =>
                `${
                  Number(t) > 1000
                    ? Math.round(Number(t) / 1000) + 'k'
                    : Number(t)
                }`
              }
            />
            <VictoryCandlestick
              candleRatio={0.5}
              candleColors={{
                positive: AppColors.profit,
                negative: AppColors.loss,
              }}
              data={chartData}
            />
          </VictoryChart>
          <View style={[styles.row, {justifyContent: 'space-evenly'}]}>
            <Text
              onPress={() => changeChartMode('1hr')}
              style={[
                styles.chartTimeSelector,
                chartMode == '1hr' && styles.chartTimeSelected,
              ]}>
              1 hr
            </Text>
            <Text
              onPress={() => changeChartMode('1dy')}
              style={[
                styles.chartTimeSelector,
                chartMode == '1dy' && styles.chartTimeSelected,
              ]}>
              1 day
            </Text>
            <Text
              onPress={() => changeChartMode('1wk')}
              style={[
                styles.chartTimeSelector,
                chartMode == '1wk' && styles.chartTimeSelected,
              ]}>
              1 week
            </Text>
            <Text
              onPress={() => changeChartMode('1mn')}
              style={[
                styles.chartTimeSelector,
                chartMode == '1mn' && styles.chartTimeSelected,
              ]}>
              1 month
            </Text>
          </View>
        </View>
        <View>
          <AppButton
            maxWidth
            onPress={() => {
              if (walletAmount > 0) {
                
              setOrderType('BUY');
              setModalVisible(true);
              } else {
                showToast('You do not have enough balance in your wallet')
              }
            }}
            style={{
              backgroundColor: AppColors.buyGreen,
              marginBottom: Layouts.large,
              paddingVertical: Layouts.large,
            }}>
            BUY +
          </AppButton>
          <AppButton
            onPress={() => {
              if (availableQty > 0) {
                
              setOrderType('SELL');
              setModalVisible(true);
              } else {
                showToast('You have no available tokens to sell');
              }
            }}
            outline
            maxWidth
            outlineColor={AppColors.sellRed}>
            - SELL
          </AppButton>
        </View>
      </ScrollView>
    </PageWithTitle>
  );
};

export default AssetDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginVertical: Layouts.medium,
    marginLeft: Layouts.medium,
  },
  timelineBg: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.muneBlue,
    borderRadius: Layouts.small,
    paddingVertical: Layouts.small,
  },
  statBg: {
    backgroundColor: AppColors.aidBlue,
    padding: Layouts.large,
    width: '45%',
    borderRadius: Layouts.large,
  },
  divider: {
    marginVertical: Layouts.medium,
    height: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: AppColors.subtitle,
  },
  row: {
    flexDirection: 'row',
  },
  chart: {
    fontFamily: FontFamily.regular,
    backgroundColor: AppColors.backgroundHighlight,
    paddingBottom: Layouts.medium,
    marginVertical: Layouts.medium,
    borderRadius: Layouts.regular,
    width: '100%',
  },
  chartTimeSelector: {
    backgroundColor: '#ddd',
    padding: Layouts.small,
    width: '20%',
    textAlign: 'center',
    borderRadius: Layouts.medium,
    ...FontStyles.h3,
    color: AppColors.background,
  },
  chartTimeSelected: {
    backgroundColor: AppColors.primaryBlue,
    color: AppColors.white,
  },
  confettiImg: {
    width: Layouts.giant2,
    height: Layouts.giant2,
    alignSelf: 'center',
    marginVertical: Layouts.large,
  },
});
