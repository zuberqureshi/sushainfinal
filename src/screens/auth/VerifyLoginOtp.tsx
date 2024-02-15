import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
// import CountDown from 'react-native-countdown-component';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { Text, Toast, ToastTitle, useToast } from '@gluestack-ui/themed';
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
import CountDown from 'react-native-countdown-component';
import PrimaryButton from '../../components/common/Button/PrimaryButton';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import useLoginOtpVerify from '../../hooks/auth/login-otp-verify';
import useResendOtp from '../../hooks/auth/resend-otp';
import { setAccessToken, getAccessToken }  from '../../utils/network'
type Props = {
  route: any;
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const VerifyLoginOtp = ({route, navigation}:Props) => {
  const {mobile,screenType} = route.params;
  const input = useRef(null)
  const toast = useToast()

  const [otpInput, setOtpInput] = useState<string>('');
  const onPinChange = (code: React.SetStateAction<string>) => setPin(code);
  const [isTimeOver, setIsTimeOver] = useState(false);

    //api call
  const useLoginOtpVerifyMutation = useLoginOtpVerify()
  const useResendOtpMutation = useResendOtp()

  


  const handleCellTextChange = async (text: string, i: number) => {
    if (i === 0) {
      const clippedText = await Clipboard.getString();
      if (clippedText.slice(0, 1) === text) {
        input.current?.setValue(clippedText, true);
      }
    }
  };


  
  const otpVerify = async () => {
    let payload = {
      mobile: mobile,
      otp: otpInput,
    };

    console.log('oTPPP',payload);

     useLoginOtpVerifyMutation.mutate(payload, {
        onSuccess: async (data) => {
         

          // await setAccessToken('AccessTokenInfo',
          //   JSON.stringify({
          //     accessToken: data?.data?.result[0]?.token,
          //     refreshToken: data?.data?.result[0]?.refreshToken,
          //     expirationTime: data?.data?.result[0]?.ExpirationTime,
          //   }))


          // await setAccessToken('userInfo',
          //   JSON.stringify({
          //     userId: data?.data?.result[0]?.user.id,
          //     userName: data?.data?.result[0]?.user.first_name,
          //     userMobile: data?.data?.result[0]?.user.mobile,
          //   }))

         
           
          if(screenType === 'signup'){
          navigation.navigate(StackNav.LoginScreen)
          toast.show({
            placement: "bottom",
            render: ({ id }: { id: string }) => {
              const toastId = "toast-" + id
              return (
                <Toast nativeID={toastId} variant="accent" action="success">
                  <ToastTitle>SignUp Successfully</ToastTitle>
                </Toast>
              );
            },
          })
        }
        
        },
        onError: (error) => {
          toast.show({
            placement: "bottom",
            render: ({ id }: { id: string }) => {
              const toastId = "toast-" + id
              return (
                <Toast nativeID={toastId} variant="accent" action="error">
                  <ToastTitle>Something went wrong, please try again later</ToastTitle>
                </Toast>
              )
            }
          })
        }
      })
  };
  useEffect(() => {
    // if (pin.length === 4) {
    //   otpVerify();
    // }
  }, []);

  const navigateBack = () => navigation.goBack();

  const onFinishTimer = () => setIsTimeOver(true);

  const onPressResend = async () => {

    input.current.clear()
    setIsTimeOver(false);
 
    let payload = {
      mobile: mobile,
    };

    useResendOtpMutation.mutate(payload, {
      onSuccess: (data) => {
        console.log('OTP RESEND DATA',data?.data);
        toast.show({
          placement: "bottom",
          render: ({ id }: { id: string }) => {
            const toastId = "toast-" + id
            return (
              <Toast nativeID={toastId} variant="accent" action="success">
                <ToastTitle>OTP Resend </ToastTitle>
              </Toast>
            );
          },
        })
         
        // navigation.navigate(StackNav.VerifyLoginOtp,{mobile:values.number})
      
      },
      onError: (error) => {
        toast.show({
          placement: "bottom",
          render: ({ id }: { id: string }) => {
            const toastId = "toast-" + id
            return (
              <Toast nativeID={toastId} variant="accent" action="error">
                <ToastTitle>Something went wrong, please try again later</ToastTitle>
              </Toast>
            )
          }
        })
      }
    })
  };

  return (
    <Container statusBarStyle='dark-content' >
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
      fontFamily='$InterRegular' fontSize={12} color={colors.black} textAlign='center'

        style={[styles.mt20, styles.mh25, styles.ph30]}
        alignSelf='center'>
        {strings.otpDescription} +91 {mobile}
      </Text>
    
      <OTPTextView
          ref={input}
          // containerStyle={localStyles.pinInputStyle}
          defaultValue={otpInput}
          handleTextChange={setOtpInput}
          handleCellTextChange={handleCellTextChange}
          inputCount={4}
          keyboardType="numeric"
          tintColor={colors.primary}
        />
       
    { !isTimeOver &&  <PrimaryButton buttonText='Verify OTP' onPress={otpVerify} disabled={useLoginOtpVerifyMutation.isPending} loading={useLoginOtpVerifyMutation.isPending} marginTop={responsiveHeight(2.5)} height={35} borderRadius={10}  /> }

      <View style={styles.rowCenter}> 
        {isTimeOver ? (
        
           <PrimaryButton buttonText={strings.resendOtp}  disabled={useResendOtpMutation.isPending} loading={useResendOtpMutation.isPending}   onPress={onPressResend} marginTop={responsiveHeight(2.5)} height={35} borderRadius={10}  /> 
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
