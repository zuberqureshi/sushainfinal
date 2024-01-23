import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {ScrollView} from 'react-native';
import {colors} from '../../../themes';

const BootamModal = ({
  onBackButtonPress,
  isVisible,
  children,
  onSwipeDown,
}: any) => {
  return (
    <View>
      <Modal
        isVisible={isVisible}
        style={localStyles.modalContainer}
        onSwipeDown={onSwipeDown}
        swipeDirection={'down'}
        onBackButtonPress={onBackButtonPress}>
        <ScrollView style={localStyles.modalSec}>
          <View>
            <View
              style={{
                backgroundColor: '#E1E1E1',
                width: 50,
                borderRadius: 10,
                alignSelf: 'center',
                marginVertical: 10,
                padding: 5,
              }}></View>
            {children}
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default BootamModal;

const localStyles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    marginLeft: 0,
    marginBottom: 0,
  },
  modalSec: {
    position: 'absolute',
    bottom: 0,
    height: 300,
    backgroundColor: colors.white,
    width: '100%',
    right: 0,
    left: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});
