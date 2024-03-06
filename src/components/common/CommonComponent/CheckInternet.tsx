import { Linking, Modal, StyleSheet, View } from 'react-native';
import React, { forwardRef, memo, useImperativeHandle, useState } from 'react';

// local imports
import { MobileDataIcon, NoInternetIcon, WifiIcon } from '../../../assets/svgs';
import { colors } from '../../../themes';
import { styles } from '../../../themes';
import { getHeight, moderateScale } from '../../../common/constants';
import CText from '../CText';
import strings from '../../../i18n/strings';
import CButton from '../CButton';
import { useNetInfo } from '@react-native-community/netinfo';

export interface InternetRef {
  isConnected: () => void;
  isNotConnected: () => void;
}

const CheckInternet = ((props, ref) => {

  const onPressSetting = async () => await Linking.openSettings();
  // console.log('checkNET',props.netStatus?.isConnected);
  

  return (
    <Modal animationType="fade" visible={!(props?.netStatus?.isConnected)} transparent>
      <View style={localStyles.container}>
        <View style={localStyles.innerContainer}>
          <NoInternetIcon />
          <CText type="s16" style={styles.mv15}>
            {strings.noInternet}
          </CText>
          <CText
            type="r14"
            align="center"
            color={colors.textColor2}
            style={styles.ph30}>
            {strings.noInternetDesc}
          </CText>
          <CText type="m12" align="center" style={styles.mt25}>
            {strings.pleaseTurnOn}
          </CText>
          <View style={localStyles.btnContainer}>
            <CButton
              title={strings.wifi}
              onPress={onPressSetting}
              frontIcon={<WifiIcon />}
              type="m12"
              style={localStyles.btnTextStyle}
              containerStyle={localStyles.btnStyle}
            />
            <CButton
              title={strings.mobileData}
              onPress={onPressSetting}
              frontIcon={<MobileDataIcon />}
              type="m12"
              style={localStyles.btnTextStyle}
              containerStyle={localStyles.btnStyle}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
});

export default memo(CheckInternet);

const localStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    ...styles.center,
    backgroundColor: colors.modalBg,
  },
  innerContainer: {
    width: '85%',
    ...styles.p15,
    backgroundColor: colors.white,
    ...styles.center,
    borderRadius: moderateScale(20),
  },
  btnStyle: {
    ...styles.ph15,
    borderRadius: moderateScale(15),
    height: getHeight(34),
  },
  btnContainer: {
    ...styles.rowCenter,
    ...styles.mt15,
    gap: moderateScale(10),
  },
  btnTextStyle: {
    ...styles.ml5,
  },
});