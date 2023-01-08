import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import SkeletonComponent from '../../../../components/ui-components/skeleton/Skeleton';
import {FontStyles, Layouts} from '../../../../constants/theme';
import {getPortfolioValue} from '../../../Contests/services/contestService';
import {AppColors} from './../../../../constants/colors';

const PortfolioHeader = ({ balance, time, walletAmount, contestId , isPast}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [portfolio, setPortfolio] = useState(0);
  const [change, setChange] = useState(0);
  const getPortfolio = async () => {
    setIsLoading(true)
    const d = await getPortfolioValue(contestId);
    if (d.success) {
      setPortfolio(d.portfolio);
      setChange(d.change);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getPortfolio();
  }, []);
  return (
    <Pressable onPress={getPortfolio}>
      <View style={styles.dashboardInfoBg}>
        <Image
          source={require('../../../../../assets/images/portfolio-bg.png')}
          style={styles.portfolioBgImg}
        />
        <Text style={styles.subheading}>Your portfolio value is</Text>
        {isLoading ? (
          <SkeletonComponent
            height={Layouts.xLarge}
            width={200}
            style={{marginVertical: Layouts.small}}
          />
        ) : (
          <Text style={styles.heading}>$ {portfolio.toFixed(3)}</Text>
        )}
        {isLoading ? (
          <SkeletonComponent
            height={Layouts.large}
            width={100}
            style={{marginVertical: Layouts.small}}
          />
        ) : (
          <Text style={change >= 0 ? styles.profit : styles.loss}>
            {change > 0 && '+'}
            {change}% overall
          </Text>
        )}
        <Text style={styles.timer}>End Date - 22:50:21</Text>
      </View>
      {walletAmount && (
        <Text
          style={[
            FontStyles.h3,
            {textAlign: 'right', marginBottom: Layouts.large},
          ]}>
          Wallet Balance: ${walletAmount}
        </Text>
      )}
    </Pressable>
  );
};

export default PortfolioHeader;

const styles = StyleSheet.create({
  dashboardInfoBg: {
    backgroundColor: AppColors.calmBlue,
    marginVertical: Layouts.large,
    borderRadius: Layouts.regular,
    alignItems: 'center',
    paddingVertical: Layouts.xxxLarge,
    overflow: 'hidden',
  },
  portfolioBgImg: {
    position: 'absolute',
    width: '100%',
    height: '250%',
  },
  heading: {
    ...FontStyles.h1,
    color: AppColors.white,
  },
  profit: {
    ...FontStyles.normal,
    color: AppColors.profit,
  },
  loss: {
    ...FontStyles.normal,
    color: AppColors.loss,
  },
  subheading: {
    ...FontStyles.normal,
    color: AppColors.white,
    letterSpacing: Layouts.xSmall,
  },
  timer: {
    ...FontStyles.h4,
    letterSpacing: Layouts.xSmall,
    borderRadius: Layouts.small,
    position: 'absolute',
    left: 0,
    margin: Layouts.regular,
  },
});
