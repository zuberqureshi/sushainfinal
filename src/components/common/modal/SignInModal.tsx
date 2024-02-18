import { Pressable, StyleProp, StyleSheet, TextInput, TouchableOpacity, View, ViewStyle, } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import ActionSheet from 'react-native-actions-sheet';

import { useNavigation } from '@react-navigation/native';

// local imports
import { colors, styles } from '../../../themes';
import { getDeviceIp, getDeviceName, getHeight, moderateScale } from '../../../common/constants';
import strings from '../../../i18n/strings';
import typography from '../../../themes/typography';
import { CrossIconBlack, Eye, EyeDashed } from '../../../assets/svgs';
import { Box, Text, Toast, ToastTitle, useToast } from '@gluestack-ui/themed';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import PrimaryButton from '../Button/PrimaryButton';
import OTPTextView from 'react-native-otp-textinput';
import Clipboard from '@react-native-clipboard/clipboard';
import { useFormik } from 'formik';
import useUserRegister from '../../../hooks/auth/user-register';
import { signInWithOtpSchema } from '../../../utils/validators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useLoginOtpVerify from '../../../hooks/auth/login-otp-verify';
import { setAccessToken } from '../../../utils/network';







export default function SignInModal(props: any) {
    const { SheetRef } = props;
    const navigation = useNavigation();
    const input = useRef(null)
    const toast = useToast()

    const [otpInput, setOtpInput] = useState<string>('');
    // const [deviceName, setDeviceName] = useState('')
    const [signInState, setSignInState] = useState(true)

    //api call
    const useUserRegisterMutation = useUserRegister()
        
  const useLoginOtpVerifyMutation = useLoginOtpVerify()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { mobile: "" ,devicename:"" , deviceip: "" , devicefcm : "" },
        validationSchema: signInWithOtpSchema,
        onSubmit: values => {
            // updateProfile(values.country,values.address,values.name,values.mobile)
            // console.warn('formsubmit', values,);
            //   setLoading(true)
            const payload = {
                mobile: formik.values.mobile,  // mandatory 
                device_name: formik.values.devicename,
                // name :`${values.firstname} ${values.lastname}`,
                // password:values.password,
                // email: values.email,
                device_type: "MOBILEAPP",     //  MOBILEAPP
                device_data: "duii",
                login_ip: formik.values.deviceip,
                country_code: "IN", // country code ISO
                app_fcm_token: "ffjjj"
            }
            // navigation.navigate(StackNav.VerifyLoginOtp,{mobile:values.number})

              useUserRegisterMutation.mutate(payload, {
                onSuccess: (data) => {

                  console.log('SUGNUPP DATA',data?.data);

                  toast.show({
                    placement: "top",
                    render: ({ id }: { id: string }) => {
                      const toastId = "toast-" + id
                      return (
                        <Toast nativeID={toastId} variant="accent" action="success" zIndex={100} >
                          <ToastTitle>OTP Sent</ToastTitle>
                        </Toast>
                      );
                    },
                  })

                setSignInState(false)

                },
                onError: (error) => {
                  toast.show({
                    placement: "top",
                    render: ({ id }: { id: string }) => {
                      const toastId = "toast-" + id
                      return (
                        <Toast nativeID={toastId} variant="accent" action="error" zIndex={100} >
                          <ToastTitle>Something went wrong, please try again later</ToastTitle>
                        </Toast>
                      )
                    }
                  })
                }
              })


        }

    });

    const otpVerify = async () => {
        let payload = {
          mobile: formik.values.mobile,
          otp: otpInput,
        };
    
        console.log('oTPPP',payload);
    
         useLoginOtpVerifyMutation.mutate(payload, {
            onSuccess: async (data) => {
             
                console.log('sigggg',data);
                
    
                toast.show({
                  placement: "top",
                  render: ({ id }: { id: string }) => {
                    const toastId = "toast-" + id
                    return (
                      <Toast nativeID={toastId} variant="accent" action="success" zIndex={1} >
                        <ToastTitle>SignIn Successfully</ToastTitle>
                      </Toast>
                    );
                  },
                })
           
             
             
              await setAccessToken('AccessTokenInfo',
                JSON.stringify({
                  accessToken: data?.data?.result[0]?.token,
                  refreshToken: data?.data?.result[0]?.refreshToken,
                  expirationTime: data?.data?.result[0]?.ExpirationTime,
                }))
    
    
              await setAccessToken('userInfo',
                JSON.stringify({
    
                  userUniqueId: data?.data?.result[0]?.user.user_unique_id,
                  userId: data?.data?.result[0]?.user.id,
                  userName: data?.data?.result[0]?.user.first_name,
                  userMobile: data?.data?.result[0]?.user.mobile,
                  
                }))
    
    
                SheetRef.current?.setModalVisible(false)
               
            
            },
            onError: (error) => {
                console.log('EEEEEEEEEEE',error);
              toast.show({
                placement: "top",
                render: ({ id }: { id: string }) => {
                  const toastId = "toast-" + id
                  return (
                    <Toast nativeID={toastId} variant="accent" action="error" zIndex={100} >
                      <ToastTitle>Something went wrong, please try again later</ToastTitle>
                    </Toast>
                  )
                }
              })
            }
          })
      };

    const getDeviceDataFetch = async () => {
        let ip = await getDeviceIp()
        let nm = await getDeviceName()
        formik.setFieldValue( 'devicename' , nm )
        formik.setFieldValue( 'deviceip' , ip )
        let fcmToken =  await AsyncStorage.getItem('fcmToken')
        formik.setFieldValue( 'devicefcm' , fcmToken )

    }

    useEffect(() => {
        getDeviceDataFetch()
    }, [])





    const onPressCloseSheet = () =>{ 
        SheetRef.current?.setModalVisible(false)
        setSignInState(true)
        formik.resetForm()
        setOtpInput('')
        input.current = null

    }
    const onActionSheetClose = () => {

    };

    const handleCellTextChange = async (text: string, i: number) => {
        if (i === 0) {
            const clippedText = await Clipboard.getString();
            if (clippedText.slice(0, 1) === text) {
                input.current?.setValue(clippedText, true);
            }
        }
    };

    console.log('otp....', otpInput);


    return (
        <ActionSheet
            ref={SheetRef}
            onClose={onActionSheetClose}
            keyboardShouldPersistTaps={'handled'}

            containerStyle={localStyles.rootContainer}>
            <Box mx={5} >

                <Box flexDirection='row' alignItems='center' justifyContent='space-between' >
                    <Text fontFamily='$InterMedium' fontSize={14} color={colors.black} >Sign in to Continue</Text>
                    <Pressable onPress={onPressCloseSheet} >
                        <CrossIconBlack />
                    </Pressable>

                </Box>


                {signInState ? <Box borderWidth={1} borderColor={colors.borderColor} borderRadius={4} height={37} alignItems='center' flexDirection='row' overflow='hidden' mt={20} px={8} >
                    <Text fontFamily='$InterMedium' fontSize={12} color={'#656363'}>
                        +91
                    </Text>
                    <TextInput
                        onChangeText={formik.handleChange('mobile')}
                        onBlur={formik.handleBlur('mobile')}
                        value={formik.values.mobile}
                        placeholder={'Enter 10 digit mobile number'}
                        placeholderTextColor={colors.placeHolderColor}
                        keyboardType='number-pad'
                        autoCorrect={false}
                        style={[
                            localStyles.inputContainerStyle
                        ]}

                    />
                </Box>
                    :
                    <Box alignSelf='center' >
                        <OTPTextView
                            ref={input}

                            textInputStyle={{ width: 30 }}
                            defaultValue={otpInput}
                            handleTextChange={setOtpInput}
                            handleCellTextChange={handleCellTextChange}
                            inputCount={4}
                            keyboardType="numeric"
                            tintColor={colors.primary}
                        />
                    </Box>}

                {(formik.errors.mobile && formik.touched.mobile) ? <Text fontFamily='$InterRegular' lineHeight={14} fontSize={12} style={{ color: 'red', }} >{formik.errors.mobile}</Text> : null}

               { signInState ? <PrimaryButton disabled={useUserRegisterMutation.isPending} loading={useUserRegisterMutation.isPending} onPress={formik.handleSubmit} buttonText={'Get Verification Code'} height={34} marginTop={responsiveHeight(2.5)} />
                 :
                 <PrimaryButton disabled={useLoginOtpVerifyMutation.isPending} loading={useLoginOtpVerifyMutation.isPending}  onPress={otpVerify} buttonText={'Verified OTP'} height={34} marginTop={responsiveHeight(2.5)} />
               }

                <Box alignSelf='center' w={'80%'} mt={15} >
                    <Text fontFamily='$InterMedium' fontSize={10} color={'#565353'} textAlign='center' >By Proceeding you agree with our <Text fontFamily='$InterMedium' fontSize={10} color={'#198192'} textDecorationLine='underline' >
                        Terms of services</Text>
                        <Text fontFamily='$InterMedium' fontSize={10} color={'#565353'} > & </Text>
                        <Text fontFamily='$InterMedium' fontSize={10} color={'#198192'} textDecorationLine='underline' >
                            Privacy Policy</Text> .
                    </Text>

                </Box>


            </Box>


        </ActionSheet>
    );
}

const localStyles = StyleSheet.create({
    rootContainer: {
        ...styles.p20,
        borderTopLeftRadius: moderateScale(20),
        borderTopRightRadius: moderateScale(20),
    },
    otpInputContainerStyle: {
        height: moderateScale(36),
    },
    inputBoxStyle: {
        ...styles.pl20,
        ...typography.fontSizes.f14,
        ...typography.fontWeights.Regular,
    },
    dividerContainer: {
        ...styles.rowSpaceBetween,
        gap: moderateScale(20),
    },
    dividerStyle: {
        ...styles.flex,
        height: moderateScale(1),
        backgroundColor: colors.gray3,
    },
    iconContainer: {
        ...styles.rowSpaceAround,
        ...styles.mt15,
        ...styles.mb10,
        ...styles.ph30,
    },
    iconStyle: {
        ...styles.p10,
        borderWidth: moderateScale(1),
        borderColor: colors.primary,
        borderRadius: moderateScale(30),
    },
    underLineStyle: {
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: colors.success,
    },
    digitStyle: {
        fontSize: moderateScale(12),
        ...typography.fontWeights.Medium,
        color: colors.textColor,
    },
    digiContainerStyle: {
        backgroundColor: colors.white,
        height: getHeight(22),
        width: moderateScale(22),
        ...styles.center,
    },
    timerContainer: {
        ...styles.alignStart,
        ...styles.mb20,
    },
    saveBtnStyle: {
        width: '40%',
        ...styles.selfCenter,
        ...styles.mv20,
        borderRadius: moderateScale(10),
    },
    inputContainerStyle: {
        marginLeft: responsiveWidth(1.5),
        ...typography.fontSizes.f12,
        ...typography.fontWeights.Medium,
        marginBottom: responsiveHeight(-0.2),
        flex: 1,



    },
});
