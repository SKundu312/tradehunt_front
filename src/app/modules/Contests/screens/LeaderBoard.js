import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import PageWithTitle from '../../../components/hoc/PageWithTitle';
import TopPerformers from '../../Home/AllContests/components/TopPerformers';
import {LEADERBOARD_DATA} from '../../Home/AllContests/data/dummydata';
import LeaderBoardCard from '../../Home/AllContests/components/LeaderBoardCard';
import {getLeaderBoard} from '../services/contestService';
import {showToast} from './../../../utils/utils';

const LeaderBoard = ({params, route, navigation}) => {
  const {leaderboardId, isPast} = route.params;
  const [leaderBoardData, setLeaderBoardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [initialSum, setInitialSum] = useState(0);

  const getLeaderBoardData = async () => {
    const d = await getLeaderBoard(leaderboardId, isPast);
    if (d.success) {
      if (d.data.leaderboard.length >= 3) {
        setLeaderBoardData(d.data.leaderboard);
        setInitialSum(d.data.contestId.initialSum);
        setIsLoading(false);
      } else {
        showToast('Not enough participants. Try again later');
        navigation.goBack();
      }
    } else {
      showToast('Leaderboard not available. Try again later');
      navigation.goBack();
    }
  };

  useEffect(() => {
    getLeaderBoardData();
  }, []);
  return (
    <PageWithTitle
      backButton
      title="Leaderboard"
      isLoading={isLoading}
      subtitle={'Hello'}>
      {!isLoading && (
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <TopPerformers leaderboard={leaderBoardData} />
          )}
          data={leaderBoardData}
          renderItem={({item, index}) => (
            <LeaderBoardCard item={item} initialSum={initialSum} />
          )}
          keyExtractor={(_, i) => String(i)}
        />
      )}
    </PageWithTitle>
  );
};

export default LeaderBoard;
