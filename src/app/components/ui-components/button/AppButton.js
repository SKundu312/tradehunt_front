import React from 'react';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import {Layouts} from '../../../constants/theme';
import {AppColors} from './../../../constants/colors';
import {FontStyles} from './../../../constants/theme';
import Icon from 'react-native-vector-icons/AntDesign';

const AppButton = ({
  clear,
  children,
  alignRight,
  cta,
  onPress,
  maxWidth,
  leftIcon,
  style,
  rounded,
  outline,
  outlineColor,
  disabled,
  showLoader,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.buttonContainer,
        clear ? styles.clearButtonContainer : styles.filledButtonContainer,
        alignRight && styles.alignRight,
        disabled && {backgroundColor: AppColors.roseGray},
        maxWidth && styles.maxWidth,
        style,
        rounded && styles.rounded,
        outline && {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: outlineColor,
          paddingVertical: Layouts.large,
        },
      ]}>
      {leftIcon && leftIcon}
      {showLoader ? (
        <ActivityIndicator color={AppColors.white} size={16} />
      ) : (
        <Text
          style={[
            styles.buttonText,
            clear ? styles.clearButtonText : styles.filledButtonText,
            leftIcon && styles.marginLeftSmall,
            outline && {
              color: outlineColor,
            },
          ]}>
          {children}
        </Text>
      )}
      {cta && (
        <Icon
          name="arrowright"
          color={clear ? AppColors.primary : AppColors.white}
          style={styles.cta}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: Layouts.small,
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonContainer: {},
  alignRight: {
    alignSelf: 'flex-end',
  },
  filledButtonContainer: {
    padding: Layouts.regular,
    backgroundColor: AppColors.primaryBlue,
  },
  buttonText: {
    ...FontStyles.h3,
  },
  clearButtonText: {
    color: AppColors.primaryDark,
  },
  filledButtonText: {
    color: AppColors.white,
  },
  cta: {
    textAlignVertical: 'center',
    marginLeft: Layouts.small,
  },
  maxWidth: {
    alignSelf: 'auto',
    width: '100%',
  },
  marginLeftSmall: {
    marginLeft: Layouts.small,
  },
  rounded: {
    borderRadius: Layouts.xxLarge,
    paddingVertical: Layouts.large,
  },
});
export default AppButton;
