import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import SampleContestArray from '../SampleContestArray.json';
import PageWithTitle from './../../../../components/hoc/PageWithTitle';
import ContestCard from './../../../../components/ui-components/card/ContestCard';
import {getStorageItem} from './../../../../utils/utils';
import {APP_BASE_URL} from './../../../../constants/urls';
import { FontStyles, Layouts } from '../../../../constants/theme';

const PastContests = ({navigation}) => {
  const [pastContests, setPastContests] = useState([]);
  const getActiveContests = async () => {
    const token = await getStorageItem('userToken');
    console.log('calling get past contests');
    fetch(APP_BASE_URL + 'contests/getPastContests', {
      headers: {
        'x-auth-token': token,
      },
    })
      .then(res => res.json())
      .then(d => {
        console.log(d);
        if (d.success) {
          console.log(d);
          setPastContests(d.data);
        } else {
          showToast('No past contests found');
        }
      });
  };
  useEffect(() => {
    getActiveContests();
  }, [navigation]);
  return (
    <PageWithTitle title={'Past Contests'}>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item._id}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No Past Contests</Text>
        )}
        data={pastContests}
        renderItem={({item}) => (
          <ContestCard {...item} isPast navigation={navigation} />
        )}
      />
    </PageWithTitle>
  );
};

export default PastContests;
const styles = StyleSheet.create({
  body: {
    padding: 20,
  },
  emptyText: {
    ...FontStyles.h3,
    textAlign: "center",
    marginTop: Layouts.giant2
  }
});
