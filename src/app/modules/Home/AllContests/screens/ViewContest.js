import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
  Text,
  StatusBar,
  TextInput,
} from 'react-native';
import {Layouts} from '../../../../constants/theme';
import {AppColors} from '../../../../constants/colors';
import AppButton from '../../../../components/ui-components/button/AppButton';
import {AllContestScreenNames} from '../navigation/AllContestsNavigation';
import DetailsContest from '../components/DetailsContest';
import {ArrowBackIcon} from '../../../../constants/icons';
import {FontStyles} from './../../../../constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import AppModal from '../../../../components/ui-components/modal/AppModal';
import AppIput from './../../../../components/ui-components/input/AppInput';
import {APP_BASE_URL} from './../../../../constants/urls';
import {getStorageItem, showToast} from './../../../../utils/utils';

const ViewContest = ({route, navigation}) => {
  const {coverImg, title, organiser, _id, helper, leaderboardId, ...params} =
    route.params;
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');
  const registerContest = async () => {
    setIsLoading(true);
    const coder = code;
    const token = await getStorageItem('userToken');
    fetch(APP_BASE_URL + 'contests/registerForContest', {
      method: 'POST',
      body: JSON.stringify({
        inviteCode: coder,
        contestId: _id,
      }),
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    })
      .then(res => res.json())
      .then(d => {
        if (d.success) {
          navigation.replace(AllContestScreenNames.ActiveContest, {
            _id,
            helper,
            title,
            organiser,
            leaderboardId,
          });
        } else {
          showToast(d.err);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const toggleModal = () => setVisible(!visible);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppModal
        visible={visible}
        closeModal={toggleModal}
        title={'Enter Invite Code'}>
        <TextInput
          placeholder={'6 digit Invite Code'}
          onChangeText={text => setCode(text)}
          style={styles.input}
        />
        <AppButton
          maxWidth
          rounded
          showLoader={isLoading}
          onPress={registerContest}
          style={styles.ctaButton}>
          Register
        </AppButton>
      </AppModal>
      {/* <StatusBar translucent backgroundColor={'transparent'} /> */}
      <ImageBackground style={styles.ContestImage} source={{uri: coverImg}}>
        <LinearGradient
          style={{
            flex: 1,
            justifyContent: 'space-between',
            padding: Layouts.regular,
            paddingTop: Layouts.regular,
          }}
          colors={[
            'rgba(0, 0, 0, 0)',
            'rgba(1, 4, 31, 0.7)',
            'rgba(1, 4, 31, 0.99)',
          ]}>
          <ArrowBackIcon onPress={() => navigation.goBack()} />
          <View>
            <Text style={FontStyles.h1}>{title}</Text>
            <Text style={FontStyles.h3}>{organiser}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
      <DetailsContest {...params} />
      {route.params.fromDashboard || (
        <AppButton
          maxWidth
          rounded
          onPress={toggleModal}
          style={styles.ctaButton}>
          Register
        </AppButton>
      )}
    </ScrollView>
  );
};

export default ViewContest;
const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.background,
    minHeight: '100%',
    padding: Layouts.regular,
  },
  buttonConatiner: {
    padding: Layouts.regular,
  },
  ctaButton: {
    marginVertical: Layouts.large,
    backgroundColor: AppColors.buyGreen,
  },
  ContestImage: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height * 0.4,
    margin: -Layouts.regular,
  },
  input: {
    height: Layouts.xxxLarge,
    ...FontStyles.h3,
    alignSelf: 'center',
    width: '100%',
    borderRadius: Layouts.large,
    padding: Layouts.large,
    backgroundColor: AppColors.searchBarBg,
  },
});
