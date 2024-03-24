import { StyleSheet, TouchableOpacity, View, Image, TextInput, SafeAreaView, ActivityIndicator, Keyboard } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { Modal, Text, Toast, ToastTitle, useToast } from '@gluestack-ui/themed'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Formik, useFormik } from 'formik'
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';

import images from '../../assets/images'
import { colors, styles } from '../../themes'
import strings from '../../i18n/strings'
import { StackNav } from '../../navigation/NavigationKeys'
import { getDeviceIp, getHeight, moderateScale } from '../../common/constants'
import { loginSchema } from '../../utils/validators'
import { Eye, EyeDashed } from '../../assets/svgs'
import typography from '../../themes/typography'
import { Container } from '../../components/Container'
import Body from '../../components/Body/Body'
import GoogleLogin from '../../components/GoogleLogin'
import FaceBookLogin from '../../components/FaceBookLogin'
import PrimaryButton from '../../components/common/Button/PrimaryButton'
import ForgotePassword from '../../components/common/modal/ForgotePassword'
import { AuthContext } from '../../context/AuthContext'
import useLoginByPassword from '../../hooks/auth/loginbypassword'
import { setAccessToken, getAccessToken } from '../../utils/network'
import SignInMOdal from '../../components/common/modal/SignInModal'
import SignInModal from '../../components/common/modal/SignInModal'
import useUserRegister from '../../hooks/auth/user-register'
import { getDeviceName } from 'react-native-device-info'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../../components/Loader/Loader'

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [showPassword, setShowPassword] = useState(true)
  const [loading, setLoading] = useState(false)
  const [skipLoader, setSkipLoader] = useState(true)
  const authContext:any = useContext(AuthContext);

  async function load() {
    const localUserInfo = JSON.parse(await getAccessToken('userInfo'));
    const AccessTokenInfo = JSON.parse(await getAccessToken('AccessTokenInfo'));

    console.log('localUserInfoOnlogin', AccessTokenInfo)
  }


 
  //api call
  const useUserRegisterMutation = useUserRegister()
  const getDeviceDataFetch = async () => {
    let ip = await getDeviceIp()
    let nm = await getDeviceName()
    // formik.setFieldValue( 'devicename' , nm )
    // formik.setFieldValue( 'deviceip' , ip )
    let fcmToken =  await AsyncStorage.getItem('fcmToken')
    // formik.setFieldValue( 'devicefcm' , fcmToken )
   
    let deviceData = {ip:ip,nm:nm,fcmToken:fcmToken}
    return deviceData
}

  useEffect(() => {
    load();
    // getDeviceDataFetch()
  }, []);

  const toast = useToast()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { userid: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: values => {
      // updateProfile(values.country,values.address,values.name,values.mobile)
      // console.warn('formsubmit', values);
      Keyboard.dismiss()
      setLoading(true)
      var body = {
        mobile: values.userid,
        password: values.password

      }
      
      createloginByPassword.mutate(body, {

      

        onSuccess: async (data) => {
          console.log('afterlogindata', data?.data?.result[0]?.user);

          if(data?.data?.success){

                  if(data?.data?.success==true  ){

                        await setAccessToken('AccessTokenInfo',
                          JSON.stringify({
                            accessToken: data?.data?.result[0]?.token,
                            refreshToken: data?.data?.result[0]?.refreshToken,
                            expirationTime: data?.data?.result[0]?.ExpirationTime,
                          }))

                        await setAccessToken('userInfo',
                          JSON.stringify({
                            userUniqueId: data?.data?.result[0]?.user?.user_unique_id,
                            userId: data?.data?.result[0]?.user?.id,
                            userName: data?.data?.result[0]?.user?.first_name,
                            userMobile: data?.data?.result[0]?.user?.mobile,
                          }))

                            authContext.setUserInfo({
                              
                              userUniqueId: data?.data?.result[0]?.user.user_unique_id,
                              userId: data?.data?.result[0]?.user.id,
                              userName: `${data?.data?.result[0]?.user.first_name} ${data?.data?.result[0]?.user.last_name}`,
                              userMobile: data?.data?.result[0]?.user.mobile,
                  
                            });

                        toast.show({
                          placement: "bottom",
                          render: ({ id }) => {
                            const toastId = "toast-" + id

                            return (
                              <Toast nativeID={toastId} variant="accent" action="success">
                                <ToastTitle>Logged In successfully</ToastTitle>
                              </Toast>
                            );
                          },
                        })

                        navigation.reset({
                          index: 0,
                          routes: [{ name: StackNav.DrawerNavigation }],
                        });
               }else{

                    toast.show({
                      placement: "bottom",
                      render: ({ id }) => {
                        const toastId = "toast-" + id

                        return (
                          <Toast nativeID={toastId} variant="accent" action="error">
                            <ToastTitle>Logged In Failed { data?.data?.message}</ToastTitle>
                          </Toast>
                        );
                      },
                    })
               }



          }else{
            toast.show({
              placement: "bottom",
              render: ({ id }: { id: string }) => {
                const toastId = "toast-" + id
                return (
                  <Toast nativeID={toastId} variant="accent" action="warning">
                    <ToastTitle>{data?.data?.message}</ToastTitle>
                  </Toast>
                );
              },
            })
          }

          setLoading(false)
        },
        onError: (error) => {

          toast.show({
            placement: "bottom",
            render: ({ id }) => {
              const toastId = "toast-" + id
              return (
                <Toast nativeID={toastId} variant="accent" action="success">
                  <ToastTitle>Something went wrong while login</ToastTitle>
                </Toast>
              );
            },
          })
          setLoading(false)
          console.log('errorafterlogin', error)
        }
      })


      // action.resetForm()
      // loadUserInfo();

    }

  });

  const createloginByPassword = useLoginByPassword()



  const forgotePasswordRef = useRef<ActionSheetRef>(null);

  const onPressResetPassword = () => forgotePasswordRef.current?.show();

  const signInModalRef = useRef<ActionSheetRef>(null);

  const onPressSignInModal = () => signInModalRef.current?.show();



  const onPressSkip = async () => {
    setSkipLoader(true)
    navigation.reset({
      index: 0,
      routes: [{ name: StackNav.DrawerNavigation }],
    });

    setSkipLoader(false)
  };



  function isTenDigitNumber(str) {
    // Check if the string consists of exactly 10 digits
    return /^\d{10}$/.test(str);
  }

  const onPressSignInWithOtp = async () => {

    let deviceInfo = await getDeviceDataFetch()
    // console.log({deviceInfo});
    
   
   if(isTenDigitNumber(formik.values.userid)){

    const payload = {
      mobile: formik.values.userid,  // mandatory 
      device_name: deviceInfo?.nm,
      // name :`${values.firstname} ${values.lastname}`,
      // password:values.password,
      // email: values.email,
      device_type: "MOBILEAPP",     //  MOBILEAPP
      device_data: "duii",
      login_ip: deviceInfo?.ip,
      country_code: "IN", // country code ISO
      app_fcm_token: deviceInfo?.fcmToken
  }
  // navigation.navigate(StackNav.VerifyLoginOtp,{mobile:values.number})

    useUserRegisterMutation.mutate(payload, {
      onSuccess: (data) => {

        console.log('SUGNUPP DATA',data?.data?.result[0]);

        if(data?.data?.success){
       

          toast.show({
            placement: "bottom",
            render: ({ id }: { id: string }) => {
              const toastId = "toast-" + id
              return (
                <Toast nativeID={toastId} variant="accent" action="success" >
                  <ToastTitle>OTP Sent </ToastTitle>
                </Toast>
              );
            },
          })
  
          navigation.navigate(StackNav.VerifyLoginOtp,{mobile:formik?.values?.userid,screenType:'signinwithotp'})
        }else{
          toast.show({
            placement: "bottom",
            render: ({ id }: { id: string }) => {
              const toastId = "toast-" + id
              return (
                <Toast nativeID={toastId} variant="accent" action="warning">
                  <ToastTitle>{data?.data?.message}</ToastTitle>
                </Toast>
              );
            },
          })
        }

        

      },
      onError: (error) => {
      
        console.log(error,'OTP SIGNIN');
        
        
        toast.show({
          placement: "top",
          render: ({ id }: { id: string }) => {
            const toastId = "toast-" + id
            return (
              <Toast nativeID={toastId} variant="accent" action="error" >
                <ToastTitle>Something went wrong, please try again later</ToastTitle>
              </Toast>
            )
          }
        })
      }
    })
    // navigation.navigate(StackNav.VerifyLoginOtp,{mobile:formik?.values?.userid,screenType:'signinwithotp'})
   }else{
    toast.show({
      placement: "bottom",
      render: ({ id }) => {
        const toastId = "toast-" + id

        return (
          <Toast nativeID={toastId} variant="accent" action="error">
            <ToastTitle>Please enter mobile number</ToastTitle>
          </Toast>
        );
      },
    })
   }
   
  };

  return (

    <Container>

      <Body style={localStyles.root}>
        {/* <TouchableOpacity onPress={onPressSkip}>
          <Text fontFamily='$InterMedium' fontSize={12} color={colors.primary} style={styles.selfEnd}>
            {strings.skip}
          </Text>
        </TouchableOpacity> */}
        <Image style={localStyles.imageStyle} source={images.signupImage} />
        <View style={localStyles.userSignInContainer}>
          <Text fontFamily='$InterSemiBold' fontSize={16}>{strings.userSignIn} Immedate 2 </Text>
          <View style={localStyles.newMenberContainer}>
            <Text fontFamily='$InterRegular' fontSize={14}>{strings.newMember}</Text>
            <TouchableOpacity onPress={() => { navigation.navigate(StackNav.Signup) }}>
              <Text fontFamily='$InterSemiBold' fontSize={14} color={colors.success}>
                {strings.signUp}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: responsiveHeight(1.5) }} >
          <View style={{
            borderWidth: moderateScale(1),
            borderRadius: moderateScale(6),
            height: moderateScale(40),
            borderColor: colors.borderColor,
            width: '100%', justifyContent: 'center', paddingHorizontal: responsiveWidth(0.7)
          }}>
            {/* <FontAwesome name="user-o" size={responsiveWidth(5)} /> */}
            <TextInput
              onChangeText={formik.handleChange('userid')}
              onBlur={formik.handleBlur('userid')}
              value={formik.values.userid}
              placeholder={strings.enterMobileOrEmail}
              placeholderTextColor={colors.placeHolderColor}

              autoCorrect={false}
              style={[
                localStyles.inputContainerStyle

              ]}

            />

          </View>
          {(formik.errors.userid && formik.touched.userid) ? <Text style={{ color: 'red', paddingHorizontal: responsiveWidth(0.7) }}>{formik.errors.userid}</Text> : null}

          <View style={{ ...styles.rowSpaceBetween, ...styles.mv15, alignSelf: 'flex-end' }}>
            <TouchableOpacity
              onPress={onPressSignInWithOtp}
              style={styles.selfEnd}>
              <Text
                fontFamily='$InterSemiBold'
                fontSize={12}
                style={localStyles.underLineStyle}
                color={colors.success}>
                {strings.signInWithOtp}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{
            borderWidth: moderateScale(1),
            borderRadius: moderateScale(6),
            height: moderateScale(40),
            borderColor: colors.borderColor,
            width: '100%', paddingHorizontal: responsiveWidth(0.7), flexDirection: 'row', alignItems: 'center',
          }}>
            {/* <FontAwesome name="user-o" size={responsiveWidth(5)} /> */}
            <TextInput
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              value={formik.values.password}
              placeholder={strings.password}
              placeholderTextColor={colors.placeHolderColor}
              secureTextEntry={showPassword}

              style={[
                localStyles.inputContainerStyle, { width: '90%' }

              ]}

            />

            <TouchableOpacity style={{}} onPress={() => { setShowPassword(!showPassword) }}>
              {showPassword ? <EyeDashed /> : <Eye />}
            </TouchableOpacity>

          </View>
          {(formik.errors.password && formik.touched.password) ? <Text style={{ color: 'red', paddingHorizontal: responsiveWidth(0.7) }}>{formik.errors.password}</Text> : null}



          {/* <TouchableOpacity
            style={[styles.selfEnd, styles.mb10]}
            onPress={onPressResetPassword}>
            <Text

              fontFamily='$InterSemiBold'
              fontSize={12}
              style={localStyles.underLineStyle}
              color={colors.success}>
              {strings.resetPassword}
            </Text>
          </TouchableOpacity> */}

          <PrimaryButton disabled={loading} loading={loading} onPress={formik.handleSubmit} buttonText={strings.signInNow} height={getHeight(34)} marginTop={responsiveHeight(2.5)} marginBottom={responsiveHeight(3)} />
        </View>

        <View style={localStyles.dividerContainer}>
          <View style={localStyles.dividerStyle} />
          <Text fontFamily='$InterSemiBold' fontSize={12} color={colors.borderColor}>
            {strings.or}
          </Text>
          <View style={localStyles.dividerStyle} />
        </View>
        <View style={localStyles.iconContainer}>
          <GoogleLogin navigation={navigation} />
          <FaceBookLogin navigation={navigation} />
        </View>
        {/* <View style={localStyles.dividerContainer}>
          <View
            style={[
              localStyles.dividerStyle,
              {
                backgroundColor: colors.gray4,
              },
            ]}
          />
          <Text fontFamily='$InterRegular' fontSize={12}>{strings.signInForDoctors}</Text>
          <View
            style={[
              localStyles.dividerStyle,
              {
                backgroundColor: colors.gray4,
              },
            ]}
          />
        </View> */}
        {/* <PrimaryButton onPress={onPressSignInModal} buttonText={strings.doctorLogin} height={getHeight(34)} marginVertical={responsiveHeight(3)} /> */}
        <Text fontFamily='$InterRegular' fontSize={10} color={colors.gray} alignSelf='center' mt={140} >
          {strings.byProceedingYou}
          <Text
            onPress={() => { }}
            suppressHighlighting={true}
            fontFamily='$InterRegular' fontSize={10}
            style={[
              localStyles.underLineStyle,
              {
                textDecorationColor: colors.primary,
              },
            ]}
            color={colors.primary}>
            {strings.termsOfService}
          </Text>
          {' & '}
          <Text
            onPress={() => { }}
            suppressHighlighting={true}
            fontFamily='$InterRegular' fontSize={10}
            style={[
              localStyles.underLineStyle,
              {
                textDecorationColor: colors.primary,
              },
            ]}
            color={colors.primary}>
            {strings.privacyPolicy}
          </Text>
        </Text>


      </Body>

      <ForgotePassword SheetRef={forgotePasswordRef} />

      <SignInModal  SheetRef={signInModalRef}  />
    
    </Container>

  )
}

export default LoginScreen

const localStyles = StyleSheet.create({
  root: {
    ...styles.ph5,
    ...styles.pv10,
  },
  imageStyle: {
    width: moderateScale(220),
    height: getHeight(220),
    ...styles.selfCenter,
    resizeMode: 'contain',
  },
  userSignInContainer: {
    ...styles.mt20,
    ...styles.rowSpaceBetween,
  },
  newMenberContainer: {
    ...styles.flexRow,
    ...styles.center,
  },
  inputContainerStyle: {
    backgroundColor: colors.white,
    marginLeft: responsiveWidth(1.5),
    ...typography.fontSizes.f14,
    ...typography.fontWeights.Regular,
    ...styles.ph10,
    color:colors.black,

  },
  inputBoxStyle: {
    ...styles.pl20,
    ...typography.fontSizes.f14,
    ...typography.fontWeights.Regular,
  },
  underLineStyle: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: colors.success,
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
    ...styles.mv10,
    width: '55%',
    ...styles.selfCenter,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
  },

})