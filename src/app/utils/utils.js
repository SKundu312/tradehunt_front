import AsyncStorageLib from '@react-native-async-storage/async-storage';
import {ToastAndroid} from 'react-native';

export const showToast = message => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

export const setStorageItem = async (key, value) => {
  try {
    await AsyncStorageLib.setItem(key, value);
  } catch (e) {
    console.log('err in setting token', e);
  }
};
export const getStorageItem = async key => {
  try {
    return await AsyncStorageLib.getItem(key);
  } catch (e) {
    console.log('err in getting token', e);
  }
};
export const removeStorageItem = async key => {
  try {
    return await AsyncStorageLib.removeItem(key);
  } catch (e) {
    console.log('err in removing token', e);
  }
};
