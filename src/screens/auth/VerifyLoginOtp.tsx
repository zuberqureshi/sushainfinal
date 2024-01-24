import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import CountDown from 'react-native-countdown-component';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { Text } from '@gluestack-ui/themed';
import OTPTextView from 'react-native-otp-textinput';
import Clipboard from '@react-native-clipboard/clipboard';

// local imports
import {colors, styles} from '../../themes';
import typography from '../../themes/typography';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import images from '../../assets/images';
import {getHeight, moderateScale} from '../../common/constants';
import strings from '../../i18n/strings';
// import {postRequestApi} from '../../api/axios';
// import {LOGIN_OTP_VERIFY, RESEND_MOBILE_OTP} from '../../api/url';
import {
  LoginWithOtpResponse,
  OtpVerifyResponse,
  VerifyLoginOtpProp,
} from '../../types/Types';
import {StackNav} from '../../navigation/NavigationKeys';
import {showPopupWithOk} from '../../utils/helpers';
import {BackArrow} from '../../assets/svgs';
import {
  setRefreshToken,
  setToken,
  setUserDetail,
} from '../../utils/asyncstorage';
import { Container } from '../../components/Container';
import Body from '../../components/Body/Body';

type Props = {
  route: any;
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const VerifyLoginOtp = ({route, navigation}:Props) => {
  // const {mobile} = route.params;
  const [otpInput, setOtpInput] = useState<string>('');
  const onPinChange = (code: React.SetStateAction<string>) => setPin(code);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const input = useRef(null)


  const handleCellTextChange = async (text: string, i: number) => {
    if (i === 0) {
      const clippedText = await Clipboard.getString();
      if (clippedText.slice(0, 1) === text) {
        input.current?.setValue(clippedText, true);
      }
    }
  };
  const otpVerify = async () => {
    // let payLoad = {
    //   mobile: mobile,
    //   otp: pin,
    // };

    // let otpVerifyResponse = (await postRequestApi(
    //   LOGIN_OTP_VERIFY,
    //   payLoad,
    // )) as OtpVerifyResponse;
    // if (otpVerifyResponse?.code === 200) {
    //   if (otpVerifyResponse?.success) {
    //     await setToken(otpVerifyResponse?.data[0]?.token);
    //     await setUserDetail(otpVerifyResponse?.data[0]?.user);
    //     await setRefreshToken(otpVerifyResponse?.data[0]?.refreshToken);
    //     global.userDetail = otpVerifyResponse?.data[0]?.user;
    //     navigation.reset({
    //       index: 0,
    //       routes: [{name: StackNav.DrawerNavigation}],
    //     });
    //   }
    // } else {
    //   showPopupWithOk('', otpVerifyResponse?.message);
    // }
  };
  useEffect(() => {
    // if (pin.length === 4) {
    //   otpVerify();
    // }
  }, []);

  const navigateBack = () => navigation.goBack();

  const onFinishTimer = () => setIsTimeOver(true);

  const onPressResend = async () => {
    // setPin('');
    // let payLoad = {
    //   mobile: mobile,
    // };

    // let otpResentResponse = (await postRequestApi(
    //   RESEND_MOBILE_OTP,
    //   payLoad,
    // )) as LoginWithOtpResponse;
    // if (otpResentResponse?.code === 200) {
    //   if (otpResentResponse?.success) {
    //     setIsTimeOver(false);
    //   }
    // } else {
    //   showPopupWithOk('', otpResentResponse?.message);
    // }
  };

  return (
    <Container >
      <Body style={localStyles.root} contentContainerStyle={{alignItems:'center'}} >

  
      <TouchableOpacity
        onPress={navigateBack}
        style={localStyles.backArrowStyle}>
        <BackArrow />
      </TouchableOpacity>
      <Image source={images.otpImage} style={localStyles.otpImageStyle} />
      <Text fontFamily='$InterSemiBold' fontSize={16} style={styles.mt20}>
        {strings.verificationCode}
      </Text>
      <Text
      fontFamily='$InterRegular' fontSize={12}

        style={[styles.mt20, styles.mh40, styles.ph30]}
        alignSelf='center'>
        {strings.otpDescription}
      </Text>
    
      <OTPTextView
          ref={input}
          // containerStyle={localStyles.pinInputStyle}
          handleTextChange={setOtpInput}
          handleCellTextChange={handleCellTextChange}
          inputCount={4}
          keyboardType="numeric"
          tintColor={colors.primary}
        />

      <View style={styles.rowCenter}>
        {isTimeOver ? (
          <TouchableOpacity
            onPress={onPressResend}
            disabled={isTimeOver ? false : true}
            style={localStyles.btnStyle}>
            <Text     fontFamily='$InterRegular' fontSize={12} alignSelf='center' color={colors.white}>
              {strings.resendOtp}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.rowCenter}>
            <Text fontFamily='$InterMedium' fontSize={14} color={colors.gray2} alignSelf='center'>
              {strings.resendCodeIn}
            </Text>
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
      </Body>
    </Container>
 
  );
};

export default VerifyLoginOtp;

const localStyles = StyleSheet.create({
  root: {
 
    ...styles.ph20,

  },
  backArrowStyle: {
    ...styles.selfStart,
    ...styles.mt20,
  },
  otpImageStyle: {
    width: moderateScale(110),
    height: moderateScale(110),
    resizeMode: 'contain',
    marginTop: getHeight(60),
  },
  pinInputStyle: {
    height: getHeight(55),
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
