import React, {createRef, useContext, useEffect, useState} from 'react';
import {Animated, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {AuthContext} from './../../../context/context';
import PageWithTitle from './../../../components/hoc/PageWithTitle';
import {FontStyles, Layouts} from './../../../constants/theme';
import {AppColors} from './../../../constants/colors';
import AppButton from './../../../components/ui-components/button/AppButton';
import {emailRegex} from './utils/utils';
import {showToast} from './../../../utils/utils';
import {loginUser} from './services/authService';
const INPUT_HEIGHT = Layouts.xxxLarge;
const LoginScreen = () => {
  const {signIn} = useContext(AuthContext);
  const passwordRef = createRef(null);
  const zoom = new Animated.Value(1);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    if (password.length < 8) {
      showToast('Enter a valid password');
    } else if (!emailRegex.test(email))
      showToast('Please enter a valid email address');
    else {
      const d = await loginUser(email, password);
      console.log(d);
      if (d.token) {
        signIn(d.token, d.user);
      } else {
        showToast(d.message);
      }
    }
  };

  useEffect(() => {
    Animated.timing(zoom, {
      toValue: 3,
      duration: 30000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <PageWithTitle backButton>
      <Animated.Image
        style={{
          width: '200%',
          resizeMode: 'cover',
          height: '100%',
          position: 'absolute',
          opacity: 0.2,
          transform: [{scale: zoom}],
        }}
        blurRadius={4}
        source={{
          uri: 'https://motionarray.imgix.net/preview-192135-SZ93HRU4Xs-high_0006.jpg',
        }}
      />
      <View style={styles.header}>
        <Text style={FontStyles.h1}>Sign in</Text>
        <Text style={FontStyles.lightH3}>into a world of awesomeness</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          autoComplete="email"
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
          placeholder={'E-mail address'}
          onSubmitEditing={() => passwordRef.current.focus()}
        />
        <TextInput
          ref={passwordRef}
          style={styles.input}
          autoComplete="password"
          placeholder={'Password'}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        <AppButton style={styles.cta} onPress={login} maxWidth>
          Log In
        </AppButton>
      </View>
    </PageWithTitle>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  input: {
    height: INPUT_HEIGHT,
    ...FontStyles.h3,
    alignSelf: 'center',
    width: '100%',
    borderRadius: Layouts.large,
    padding: Layouts.large,
    backgroundColor: AppColors.searchBarBg,
    marginVertical: Layouts.medium,
  },
  header: {marginTop: Layouts.medium},
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  cta: {
    marginTop: Layouts.medium,
    borderRadius: Layouts.large,
    height: INPUT_HEIGHT,
  },
});
