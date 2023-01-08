import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import {FontStyles, Layouts} from './constants/theme';
import {AppColors} from './constants/colors';

const SplashScreen = () => {
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowLoader(true);
    }, 1000);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splash.png')}
        style={{
          width: '100%',
          height: '60%',
          resizeMode: 'contain',
        }}
      />
      <Text style={FontStyles.h1}>Tradehunt</Text>
      <Text style={FontStyles.lightH3}>Made with ❤️ by ICELL</Text>
      {showLoader && (
        <ActivityIndicator
          color={AppColors.white}
          style={styles.loader}
          size={'small'}
        />
      )}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.background,
  },
  loader: {
    position: 'absolute',
    bottom: Layouts.large,
  },
});
