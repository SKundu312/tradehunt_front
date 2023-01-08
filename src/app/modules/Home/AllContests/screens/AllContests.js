import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, FlatList, Image, Pressable} from 'react-native';
import {FontStyles, Layouts} from '../../../../constants/theme';
import PageWithTitle from '../../../../components/hoc/PageWithTitle';
import Card from '../../../../components/ui-components/card/ContestCard';
import {View} from 'react-native';
import {GlobalStyles} from './../../../../constants/theme';
import ContestsSkeleton from './../components/ContestsSkeleton';
import {getStorageItem} from './../../../../utils/utils';
import {APP_BASE_URL} from './../../../../constants/urls';
const urlBuilder = avatar => {
  const url = `../../../../../assets/images/Memoji-${avatar}.png`;
  return url;
};
const AllContests = ({params, navigation}) => {
  const [activeContests, setActiveContests] = useState([]);
  const [userName, setUserName] = useState('New User');
  const [isLoading, setIsLoading] = useState(true);
  const getActiveContests = async () => {
    setIsLoading(true);
    const token = await getStorageItem('userToken');
    const userJson = await getStorageItem('user');
    console.log('calling get all contests');
    const user = JSON.parse(userJson);
    if (user.name) {
      setUserName(user.name);
    }
    fetch(APP_BASE_URL + 'contests/getActiveAndUpcomingContests', {
      headers: {
        'x-auth-token': token,
      },
    })
      .then(res => res.json())
      .then(d => {
        console.log(d);
        if (d.success) {
          setActiveContests(d.data);
        }
      });

    setIsLoading(false);
  };
  useEffect(() => {
    setTimeout(() => {
      getActiveContests();
    }, 1000);
  }, [navigation]);
  return (
    <PageWithTitle>
      {isLoading ? (
        <ContestsSkeleton />
      ) : (
        <FlatList
          ListHeaderComponent={
            <>
              <View style={GlobalStyles.rowSpread}>
                <View>
                  <Text style={FontStyles.h3}>Hello</Text>
                  <Text style={styles.title}>{userName}</Text>
                </View>
                <Pressable
                  onPress={() => navigation.navigate('Account')}></Pressable>
              </View>
            </>
          }
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>No Available Contests</Text>
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item._id}
          data={activeContests}
          renderItem={({item}) => (
            <Card
              {...item}
              navigation={navigation}
              helper={getActiveContests}
            />
          )}
        />
      )}
    </PageWithTitle>
  );
};

export default AllContests;
const styles = StyleSheet.create({
  title: {
    marginBottom: Layouts.large,
    ...FontStyles.h1,
  },
  headerImage: {
    width: Layouts.xxxLarge,
    height: Layouts.xxxLarge,
  },
  emptyText: {
    ...FontStyles.h3,
    textAlign: 'center',
    marginTop: Layouts.giant2,
  },
});
