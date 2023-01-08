import React from 'react';
import TextInput from 'react-native/Libraries/Components/TextInput/TextInput';
import {StyleSheet, Text} from 'react-native';
import {Layouts} from '../../../constants/theme';
import {AppColors} from './../../../constants/colors';
import {FontStyles} from './../../../constants/theme';
import Icon from 'react-native-vector-icons/AntDesign';

const AppIput = ({onChange, value, editable, placeholder, label}) => (
  <>
    {label && <Text style={styles.label}>{label}:</Text>}
    <TextInput
      onChangeText={onChange}
      value={value}
      style={[styles.input, {color: editable ? 'black' : 'gray'}]}
      editable={editable}
      placeholder={placeholder}
    />
  </>
);

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderRadius: 15,
    margin: '1%',
    borderWidth: 1,
    padding: 5,
    color: 'black',
  },
  label: {
    color: 'black',
    marginLeft: '2%',
    marginTop: '2%',
    marginBottom: 0,
    ...FontStyles.label,
    padding: 0,
  },
});
export default AppIput;
