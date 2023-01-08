import React, {createRef, useContext, useEffect, useState} from 'react';
import {Animated, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {AuthContext} from './../../../context/context';
import PageWithTitle from './../../../components/hoc/PageWithTitle';
import {FontStyles, Layouts} from './../../../constants/theme';
import {AppColors} from './../../../constants/colors';
import AppButton from './../../../components/ui-components/button/AppButton';
import {registerUser} from './services/authService';
import {showToast} from './../../../utils/utils';
import {emailRegex, phoneRegex} from './utils/utils';
const INPUT_HEIGHT = Layouts.xxxLarge;

const RegisterScreen = () => {
  const {signIn} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cnfpassword, setCNFPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const emailRef = createRef(null);
  const regnumRef = createRef(null);
  const passwordRef = createRef(null);
  const cnfpasswordRef = createRef(null);
  const zoom = new Animated.Value(1);

  const register = async () => {
    if (password.length < 8) {
      showToast('Passwords should be greater than 8 digits');
    } else if (password != cnfpassword) {
      showToast('Passwords do not match');
      showToast('Passwords do not match');
    } else if (!emailRegex.test(email))
      showToast('Please enter a valid email address');
    else if (!phoneRegex.test(phone))
      showToast('Please enter a valid 10-digit phone number');
    else {
      const d = await registerUser(email, password, phone, name);
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
        blurRadius={3}
        source={{
          uri: 'https://motionarray.imgix.net/preview-192135-SZ93HRU4Xs-high_0006.jpg',
        }}
      />
      <View style={styles.header}>
        <Text style={FontStyles.h1}>Register</Text>
        <Text style={FontStyles.lightH3}>
          and get started in your trading journey
        </Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder={'Name'}
          autoComplete="name"
          onChangeText={text => setName(text)}
          onSubmitEditing={() => emailRef.current.focus()}
        />
        <TextInput
          ref={emailRef}
          style={styles.input}
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
          placeholder={'E-mail address'}
          onSubmitEditing={() => regnumRef.current.focus()}
        />
        <TextInput
          ref={regnumRef}
          style={styles.input}
          placeholder={'Phone Number'}
          onChangeText={text => setPhone(text)}
          keyboardType="number-pad"
          onSubmitEditing={() => passwordRef.current.focus()}
        />
        <TextInput
          ref={passwordRef}
          style={styles.input}
          autoComplete="password-new"
          placeholder={'Password'}
          onChangeText={text => setPassword(text)}
          onSubmitEditing={() => cnfpasswordRef.current.focus()}
          secureTextEntry
        />
        <TextInput
          ref={cnfpasswordRef}
          style={styles.input}
          onChangeText={text => setCNFPassword(text)}
          placeholder={'Confirm Password'}
          secureTextEntry
        />
        <AppButton
          disabled={!email || !name || !password || !cnfpassword || !phone}
          onPress={register}
          style={styles.cta}
          maxWidth>
          Register
        </AppButton>
        <Text style={styles.note}>
          Please note that a student can only create one account and awards will
          be distributed on the complete verification of your identity. Please
          double check your name and registration number.
        </Text>
      </View>
    </PageWithTitle>
  );
};

export default RegisterScreen;

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
  note: {
    ...FontStyles.normal,
    color: AppColors.redFaded,
    margin: Layouts.small,
  },
});
