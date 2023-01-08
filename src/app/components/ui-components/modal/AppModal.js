import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {AppColors} from '../../../constants/colors';
import {CrossIcon} from '../../../constants/icons';
import {Layouts} from '../../../constants/theme';
import {FontStyles} from './../../../constants/theme';

const AppModal = ({visible, closeModal, title, children, hideHeader}) => {
  return (
    <Modal
      animationType="slide"
      transparent
      onRequestClose={closeModal}
      style={styles.modalBg}
      visible={visible}>
      <Pressable onPress={closeModal} style={styles.bg} />
      <View style={styles.content}>
        {!hideHeader && (
          <View style={{marginBottom: Layouts.large}}>
            <Text style={styles.title}>{title}</Text>
            <CrossIcon onPress={closeModal} style={styles.icon} />
          </View>
        )}
        <ScrollView>{children}</ScrollView>
      </View>
    </Modal>
  );
};

export default AppModal;

const styles = StyleSheet.create({
  modalBg: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    flex:1
  },
  bg: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    flex: 1,
  },
  content: {
    backgroundColor: AppColors.muneBlue,
    borderTopRightRadius: Layouts.xLarge,
    borderTopLeftRadius: Layouts.xLarge,
    padding: Layouts.large,
    maxHeight: '60%',
  },
  title: {
    ...FontStyles.h2,
    textAlign: 'center',
  },
  icon: {
    position: 'absolute',
    right: 0,
    top: '5%',
  },
});
