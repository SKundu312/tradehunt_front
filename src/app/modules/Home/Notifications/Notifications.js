import React, {useState, useEffect, useRef} from 'react';
import PageWithTitle from '../../../components/hoc/PageWithTitle';
import {
  Text,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  Pressable,
  Linking,
} from 'react-native';
import {Layouts} from '../../../constants/theme';
import {FontStyles} from './../../../constants/theme';
import {getNotifications} from './services/notifsService';
const {width} = Dimensions.get('screen');
const CARD_SIZE = width * 0.95;

const Notifications = ({params}) => {
  const [dataList, setDataList] = useState([]);

  useEffect(async () => {
    const data = await getNotifications();
    console.log(data);
    setDataList(data);
  }, []);
  const renderCard = ({item}) => {
    return (
      <Pressable onPress={() => Linking.openURL(item.link)}>
        <Image
          source={{uri: item.img}}
          style={{
            height: '100%',
            width: CARD_SIZE,
            marginHorizontal: (width - CARD_SIZE) / 2,
            resizeMode: 'cover',
            borderRadius: Layouts.large,
          }}
        />
      </Pressable>
    );
  };
  return (
    <PageWithTitle title={'News Feed'}>
      <Text style={[FontStyles.subtitle, {textAlign: 'center'}]}>
        Swipe Left/Right to see more
      </Text>
      <FlatList
        keyExtractor={(item, index) => 'key' + index}
        data={dataList}
        horizontal
        style={{
          marginHorizontal: -Layouts.regular,
          marginVertical: Layouts.large,
        }}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={renderCard}
      />
    </PageWithTitle>
  );
};

const styles = StyleSheet.create({});

export default Notifications;
