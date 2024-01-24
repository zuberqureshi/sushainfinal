import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FunctionComponent, useEffect, useState} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CountDown from 'react-native-countdown-component';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';

// local imports
import {colors, styles} from '../../themes';
import typography from '../../themes/typography';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import images from '../../assets/images';
import CText from '../../components/common/CText';
import {getHeight, moderateScale} from '../../common/constants';
import strings from '../../i18n/strings';
import {showPopupWithOk} from '../../utils/helpers';
import {postRequestApi} from '../../api/axios';
import {LOGIN_OTP_VERIFY, RESEND_MOBILE_OTP} from '../../api/url';
import {
  LoginWithOtpResponse,
  OtpVerifyResponse,
  VerifyLoginOtpProp,
} from '../../types/Types';
import {StackNav} from '../../navigation/NavigationKeys';
import {BackArrow} from '../../assets/svgs';
import {
  setRefreshToken,
  setToken,
  setUserDetail,
} from '../../utils/asyncstorage';

type Props = {
  route: VerifyLoginOtpProp;
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const VerifyRegisterOtp: FunctionComponent<Props> = ({route, navigation}) => {
  const {mobile} = route.params;
  const [pin, setPin] = useState('');
  const onPinChange = (code: React.SetStateAction<string>) => setPin(code);
  const [isTimeOver, setIsTimeOver] = useState(false);

  const otpVerify = async () => {
    let payLoad = {
      mobile: mobile,
      otp: pin,
    };
    let otpVerifyResponse = (await postRequestApi(
      LOGIN_OTP_VERIFY,
      payLoad,
    )) as OtpVerifyResponse;
    if (otpVerifyResponse?.code === 200) {
      if (otpVerifyResponse?.success) {
        await setToken(otpVerifyResponse?.data[0]?.token);
        await setUserDetail(otpVerifyResponse?.data[0]?.user);
        await setRefreshToken(otpVerifyResponse?.data[0]?.refreshToken);
        global.userDetail = otpVerifyResponse?.data[0]?.user;
        navigation.reset({
          index: 0,
          routes: [{name: StackNav.DrawerNavigation}],
        });
      }
    } else {
      showPopupWithOk('', otpVerifyResponse?.message, okClicked);
    }
  };
  useEffect(() => {
    if (pin.length === 4) {
      otpVerify();
    }
  }, [pin]);

  const navigateBack = () => navigation.goBack();

  const okClicked = () => setPin('');

  const onFinishTimer = () => setIsTimeOver(true);

  const onPressResend = async () => {
    setPin('');
    let payLoad = {
      mobile: mobile,
    };

    let otpResentResponse = (await postRequestApi(
      RESEND_MOBILE_OTP,
      payLoad,
    )) as LoginWithOtpResponse;
    if (otpResentResponse?.code === 200) {
      if (otpResentResponse?.success) {
        setIsTimeOver(false);
      }
    } else {
      showPopupWithOk('', otpResentResponse?.message);
    }
  };

  return (
    <CSafeAreaView style={localStyles.root}>
      <TouchableOpacity onPress={navigateBack} style={styles.selfStart}>
        <BackArrow />
      </TouchableOpacity>
      <Image source={images.otpImage} style={localStyles.otpImageStyle} />
      <CText type={'s16'} style={styles.mt20}>
        {strings.verificationCode}
      </CText>
      <CText
        type={'r12'}
        style={[styles.mt20, styles.mh40, styles.ph30]}
        align={'center'}>
        {strings.otpDescription}
      </CText>
      <OTPInputView
        pinCount={4}
        code={pin}
        onCodeChanged={onPinChange}
        autoFocusOnLoad={false}
        codeInputFieldStyle={localStyles.pinInputStyle}
        codeInputHighlightStyle={{
          backgroundColor: colors.inputFocusColor,
        }}
        style={localStyles.inputStyle}
      />

      <View style={styles.rowCenter}>
        {isTimeOver ? (
          <TouchableOpacity
            onPress={onPressResend}
            disabled={isTimeOver ? false : true}
            style={localStyles.btnStyle}>
            <CText type={'r14'} align={'center'} color={colors.white}>
              {strings.resendOtp}
            </CText>
          </TouchableOpacity>
        ) : (
          <View style={styles.rowCenter}>
            <CText type={'m14'} color={colors.gray2} align={'center'}>
              {strings.resendCodeIn}
            </CText>
            <CountDown
              id={'1'}
              until={60}
              onFinish={onFinishTimer}
              digitStyle={{backgroundColor: colors.white}}
              digitTxtStyle={localStyles.digitStyle}
              timeToShow={['M', 'S']}
              timeLabels={{m: undefined, s: undefined}}
              showSeparator
            />
          </View>
        )}
      </View>
    </CSafeAreaView>
  );
};

export default VerifyRegisterOtp;

const localStyles = StyleSheet.create({
  root: {
    ...styles.itemsCenter,
    ...styles.ph20,
  },
  otpImageStyle: {
    width: moderateScale(110),
    height: moderateScale(110),
    resizeMode: 'contain',
    marginTop: getHeight(60),
  },
  pinInputStyle: {
    height: getHeight(48),
    width: moderateScale(36),
    ...typography.fontSizes.f20,
    ...typography.fontWeights.SemiBold,
    color: colors.gray2,
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: moderateScale(2),
  },
  inputStyle: {
    height: getHeight(60),
    width: '70%',
    ...styles.mv30,
  },
  digitStyle: {
    fontSize: moderateScale(16),
    ...typography.fontWeights.Medium,
    color: colors.textColor,
  },
  btnStyle: {
    ...styles.mt20,
    ...styles.mh20,
    ...styles.pv10,
    ...styles.ph30,
    backgroundColor: colors.primary,
    borderRadius: moderateScale(10),
  },
});
