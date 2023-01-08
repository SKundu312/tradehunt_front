import React from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import {FontStyles, Layouts} from './../../constants/theme';
import {AppColors} from './../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ArrowBackIcon} from '../../constants/icons';

const PageWithTitle = ({
  title,
  children,
  subtitle,
  backButton,
  isLoading,
  style,
}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.headerContainer}>
        {backButton && (
          <ArrowBackIcon
            onPress={() => navigation.goBack()}
            style={styles.icon}
          />
        )}
        {title && <Text style={styles.header}>{title}</Text>}
        {isLoading && (
          <ActivityIndicator color={AppColors.white} style={styles.loader} />
        )}
      </View>
      {children}
    </View>
  );
};
export default PageWithTitle;
const styles = StyleSheet.create({
  container: {
    padding: Layouts.regular,
    flex: 1,
    paddingBottom: 0,
    backgroundColor: AppColors.background,
  },
  headerContainer: {
    paddingBottom: Layouts.large,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    ...FontStyles.h2,
  },
  icon: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  loader: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  subtitle: {
    ...FontStyles.normal,
    color: AppColors.subtitle,
  },
});
