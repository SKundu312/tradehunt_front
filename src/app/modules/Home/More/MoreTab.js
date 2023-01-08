import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Share,
  Linking,
} from 'react-native';
import {signOutFromApp} from '../Auth/utils/utils';
import PageWithTitle from './../../../components/hoc/PageWithTitle';
import {AuthContext} from './../../../context/context';
import {FontStyles, Layouts} from '../../../constants/theme';
import {RightCaretIcon} from '../../../constants/icons';
import {AppColors} from './../../../constants/colors';
import {GlobalStyles} from './../../../constants/theme';
import {GiftIcon, DevIcon} from './../../../constants/icons';
import AppModal from '../../../components/ui-components/modal/AppModal';
import {AvatarArray} from './../../../constants/avatars';
import {
  getStorageItem,
  setStorageItem,
  showToast,
} from './../../../utils/utils';
import {APP_BASE_URL} from './../../../constants/urls';
const team = [
  {
    id: '1',
    name: 'Shreya Kundu',
    image: require('../../../../assets/images/team/shreya.jpg'),
    link: 'https://www.linkedin.com/in/shreya-kundu-1b7b941b0',
  },
  {
    id: '2',
    name: 'Aniket Bhatia',
    image: require('../../../../assets/images/team/aniket.jpg'),
    link: 'https://www.linkedin.com/in/aniket-bhatia-1b04811bb/',
  },
  {
    id: '3',
    name: 'Shashwat Sahu',
    image: require('../../../../assets/images/team/shashwat.jpg'),
    link: 'https://www.linkedin.com/in/shashwat-sahu-1427501aa/',
  },
  {
    id: '4',
    name: 'Kartiken Barnwal',
    image: require('../../../../assets/images/team/kartiken.jpg'),
    link: 'https://www.linkedin.com/in/kartiken-barnwal-579a471a6/',
  },
  {
    id: '5',
    name: 'Deepansh Makkar',
    image: require('../../../../assets/images/team/deepansh.jpg'),
    link: 'https://www.linkedin.com/in/deepansh-makkar-175012197/',
  },
  {
    id: '6',
    name: 'Aman Goel',
    image: require('../../../../assets/images/team/aman.jpg'),
    link: 'https://www.linkedin.com/in/amangoelfv/',
  },
];
const More = ({navigation}) => {
  const getAvatar = async () => {
    const userJson = await getStorageItem('user');
    const tokenH = await getStorageItem('userToken');
    setToken(tokenH);
    const user = JSON.parse(userJson);
    setUser(user);
    setAvatar(user.profileAvatar);
  };
  const {signOut} = useContext(AuthContext);

  const [devsModalVisible, setDevsNameModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const appSignOut = () => {
    signOutFromApp();
    signOut();
  };
  const inviteAFriend = async () => {
    const result = await Share.share({
      message:
        'Download Tradehunt app now and participate in various contests to test your trading skills and win cash prizes by ranking high on the Leaderboard!',
    });
  };

  const contactSupport = url => {
    Linking.openURL(url);
  };
  const updateAvatar = src => {
    fetch(APP_BASE_URL + 'user/updateAvatar', {
      method: 'POST',
      body: JSON.stringify({
        newAvatar: src,
      }),
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
    })
      .then(d => d.json())
      .then(async res => {
        if (res.success) {
          await setStorageItem('user', JSON.stringify(res.user));
          setAvatar(src);
          setVisible(false);
          showToast(res.message);
        } else {
          showToast(res.message);
        }
      });
  };
  useEffect(() => {
    getAvatar();
  }, []);

  return (
    <PageWithTitle title={'Profile'}>
      <AppModal
        visible={visible}
        title={'Choose Avatar'}
        closeModal={() => setVisible(false)}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {AvatarArray.map(avatar => {
            return (
              <Pressable
                onPress={() => updateAvatar(avatar.src)}
                key={avatar.id}
                style={styles.avatarContainer}>
                <Image style={styles.avatar} source={{uri: avatar.src}} />
              </Pressable>
            );
          })}
        </View>
      </AppModal>
      <AppModal
        visible={devsModalVisible}
        closeModal={() => setDevsNameModalVisible(false)}
        title={'App Devs'}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {team.map(avatar => {
            return (
              <Pressable
                onPress={() => contactSupport(avatar.link)}
                key={avatar.id}
                style={styles.devContainer}>
                <Image style={styles.devImage} source={avatar.image} />
                <Text style={styles.devName}>{avatar.name}</Text>
              </Pressable>
            );
          })}
        </View>
      </AppModal>
      <View style={styles.dashboard}>
        <Pressable onPress={() => setVisible(true)}>
          <Image
            source={{
              uri: avatar,
            }}
            style={styles.headerImage}
          />
        </Pressable>
        <Text style={FontStyles.h2}>{user.name}</Text>
        <Text style={FontStyles.subtitle}>@{user.username}</Text>
      </View>
      <Pressable
        onPress={() => setDevsNameModalVisible(true)}
        style={styles.itemBg}>
        <DevIcon style={{marginRight: Layouts.medium}} />
        <Text style={FontStyles.lightH3}>Developers</Text>
      </Pressable>
      <Pressable onPress={inviteAFriend} style={styles.itemBg}>
        <GiftIcon style={{marginRight: Layouts.medium}} />
        <Text style={FontStyles.lightH3}>Invite a friend</Text>
      </Pressable>
      <Text style={styles.sectionLabel}>Support</Text>
      <Pressable
        onPress={() => contactSupport('mailto:icell@nitkkr.ac.in')}
        style={[styles.itemBg, GlobalStyles.rowSpread]}>
        <Text style={FontStyles.lightH3}>Contact Support</Text>
        <RightCaretIcon style={{marginRight: Layouts.medium}} />
      </Pressable>
      <Pressable style={[styles.itemBg, GlobalStyles.rowSpread]}>
        <Text style={FontStyles.lightH3}>App Updates</Text>
        <RightCaretIcon style={{marginRight: Layouts.medium}} />
      </Pressable>
      <Pressable
        onPress={appSignOut}
        style={[styles.itemBg, GlobalStyles.rowSpread]}>
        <Text style={[FontStyles.lightH3, {color: AppColors.sellRed}]}>
          Log Out
        </Text>
      </Pressable>
      <View style={styles.dashboard}>
        <Image
          source={require('../../../../assets/images/icell_logo.png')}
          style={styles.footerImage}
        />
        <Text style={FontStyles.subtitle}>Developed by</Text>
        <Text style={FontStyles.subtitle}>Industry Cell, NIT Kurukshetra</Text>
        <Text style={FontStyles.subtitle}>Version 0.1</Text>
      </View>
    </PageWithTitle>
  );
};

const styles = StyleSheet.create({
  dashboard: {
    alignItems: 'center',
  },
  headerImage: {
    height: 120,
    width: 120,
    resizeMode: 'contain',
  },
  itemBg: {
    backgroundColor: AppColors.backgroundHighlight,
    marginTop: Layouts.medium,
    padding: Layouts.large,
    borderRadius: Layouts.regular,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionLabel: {
    ...FontStyles.h3,
    marginTop: Layouts.large,
  },
  footerImage: {
    height: 50,
    resizeMode: 'contain',
    opacity: 0.6,
    marginTop: Layouts.xxxLarge,
    marginBottom: Layouts.small,
  },
  avatarContainer: {
    width: '33%',
    height: 100,
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  devContainer: {
    width: '33%',
    padding: Layouts.medium,
    alignItems: 'center',
    marginBottom: Layouts.medium,
  },
  devImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  devName: {
    ...FontStyles.h4,
    marginTop: Layouts.small,
  },
});

export default More;
