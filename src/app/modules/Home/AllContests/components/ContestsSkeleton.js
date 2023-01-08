import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SkeletonComponent from '../../../../components/ui-components/skeleton/Skeleton';
import {Layouts} from '../../../../constants/theme';

const ContestsSkeleton = () => {
  return (
    <View>
      {Array(5)
        .fill('card')
        .map((_, i) => (
          <SkeletonComponent
            key={i}
            width={'100%'}
            height={Layouts.giant}
            style={styles.card}
          />
        ))}
    </View>
  );
};

export default ContestsSkeleton;

const styles = StyleSheet.create({
  card: {
    borderRadius: Layouts.large,
    marginBottom: Layouts.medium,
  },
});
