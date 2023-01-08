import React, {useContext} from 'react';
import {Image, Text, StyleSheet} from 'react-native';
import AppButton from '../../../components/ui-components/button/AppButton';
import PageWithTitle from './../../../components/hoc/PageWithTitle';
import {FontStyles, Layouts} from './../../../constants/theme';
import {AppColors} from './../../../constants/colors';
import {AuthScreenNames} from './../AuthStackNavigation';

const PhoneScreen = ({navigation}) => {
  return (
    <PageWithTitle style={{alignItems: 'center'}}>
      <Image
        source={require('../../../../assets/images/splash.png')}
        style={{
          width: '100%',
          height: '30%',
          resizeMode: 'contain',
        }}
      />
      <Text style={[FontStyles.h1]}>TradeHunt</Text>
      <Text style={styles.text}>Made with ❤️ by ICELL</Text>
      <AppButton
        style={styles.cta}
        onPress={() => navigation.navigate(AuthScreenNames.Login)}
        maxWidth>
        Log In
      </AppButton>
      <AppButton
        onPress={() => navigation.navigate(AuthScreenNames.Register)}
        outline
        style={styles.cta}
        outlineColor={AppColors.primaryBlue}
        maxWidth>
        Register
      </AppButton>
    </PageWithTitle>
  );
};

export default PhoneScreen;

const styles = StyleSheet.create({
  cta: {
    marginTop: Layouts.large,
  },
  text: {
    ...FontStyles.lightH3,
    marginBottom: Layouts.giant2,
  },
});
