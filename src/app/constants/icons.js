import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {AppColors} from './colors';
const ICON_SIZE = 24;

export const ArrowBackIcon = ({onPress, style}) => (
  <FontAwesome5Icon
    onPress={onPress}
    style={style}
    name="long-arrow-alt-left"
    size={ICON_SIZE}
    color={AppColors.white}
  />
);
export const ClockIcon = ({onPress, style, size}) => (
  <FontAwesome
    onPress={onPress}
    style={style}
    name="clock-o"
    size={size || ICON_SIZE}
    color={AppColors.white}
  />
);
export const CrossIcon = ({onPress, style, size}) => (
  <Entypo
    onPress={onPress}
    style={style}
    name="cross"
    size={size || ICON_SIZE}
    color={AppColors.white}
  />
);
export const RightCaretIcon = ({onPress, style, size}) => (
  <Entypo
    onPress={onPress}
    style={style}
    name="chevron-small-right"
    size={size || ICON_SIZE}
    color={AppColors.white}
  />
);
export const DevIcon = ({onPress, style, size}) => (
  <Entypo
    onPress={onPress}
    style={style}
    name="code"
    size={size || ICON_SIZE}
    color={AppColors.white}
  />
);
export const EditIcon = ({onPress, style, size}) => (
  <Feather
    onPress={onPress}
    style={style}
    name="edit-3"
    size={size || ICON_SIZE}
    color={AppColors.white}
  />
);
export const GiftIcon = ({onPress, style, size}) => (
  <Feather
    onPress={onPress}
    style={style}
    name="gift"
    size={size || ICON_SIZE}
    color={AppColors.white}
  />
);

