import { StyleSheet, TouchableOpacity, View, Image, TextInput, SafeAreaView } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { Text , Toast, ToastTitle, useToast } from '@gluestack-ui/themed'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';

import images from '../../assets/images'
import { colors, styles } from '../../themes'
import strings from '../../i18n/strings'
import { StackNav } from '../../navigation/NavigationKeys'
import { getHeight, moderateScale } from '../../common/constants'
import { loginSchema } from '../../utils/validators'
import { Eye, EyeDashed } from '../../assets/svgs'
import typography from '../../themes/typography'
import { Container } from '../../components/Container'
import Body from '../../components/Body/Body'
import GoogleLogin from '../../components/GoogleLogin'
import FaceBookLogin from '../../components/FaceBookLogin'
import PrimaryButton from '../../components/common/Button/PrimaryButton'
import ForgotePassword from '../../components/common/modal/ForgotePassword'
import useDoctorListSpec from '../../hooks/doctor/doctorList_spec'
import { AuthContext } from '../../context/AuthContext'
import useLoginByPassword from '../../hooks/auth/loginbypassword'
import {setAccessToken, getAccessToken } from '../../utils/network'

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [showPassword, setShowPassword] = useState(true)
  const authContext = useContext(AuthContext);

  async function load(){
    const localUserInfo =  JSON.parse( await getAccessToken('userInfo') ) ;
    const AccessTokenInfo =  JSON.parse( await getAccessToken('AccessTokenInfo') ) ;

    console.log( 'localUserInfoOnlogin',AccessTokenInfo)
  }
  
  useEffect(() => {
    load();
  }, []);
  const { data:categoryListMain, isPending:PendingCategoryList, isLoading:isLoadingCategoryList } =  useDoctorListSpec();
 
  const toast = useToast()

  const createloginByPassword = useLoginByPassword()

  const forgotePasswordRef = useRef<ActionSheetRef>(null);

  const onPressResetPassword = () => forgotePasswordRef.current?.show();


  const onPressSkip = async () => {
    navigation.reset({
      index: 0,
      routes: [{ name: StackNav.DrawerNavigation }],
    });
  };

  const onPressSignInWithOtp = async () => {
    // if (emailOrMobile.length === 0) {
    //   setEmailMobileError(strings.thisFieldIsMandatory);
    // }
    // if (emailMobileError === '' && emailOrMobile) {
    //   let otpSentResponse = (await postRequestApi(USER_REGISTER_LOG_IN_API, {
    //     mobile: emailOrMobile,
    //   })) as LoginWithOtpResponse;
    //   if (otpSentResponse?.code === 200) {
    //     if (otpSentResponse.success) {
    //       console.log('=========', JSON.stringify(otpSentResponse));
    //       navigation.navigate(StackNav.VerifyLoginOtp, {
    //         mobile: emailOrMobile,
    //         otp: otpSentResponse?.data[0]?.otpValue,
    //       });
    //     }
    //   } else {
    //     showPopupWithOk('', otpSentResponse?.message);
    //   }
    // }
    navigation.navigate(StackNav.VerifyLoginOtp);
  };

  return (

    <Container>

      <Body style={localStyles.root}>
        <TouchableOpacity onPress={onPressSkip}>
          <Text fontFamily='$InterMedium' fontSize={12} color={colors.primary} style={styles.selfEnd}>
            {strings.skip}
          </Text>
        </TouchableOpacity>
        <Image style={localStyles.imageStyle} source={images.signupImage} />
        <View style={localStyles.userSignInContainer}>
          <Text fontFamily='$InterSemiBold' fontSize={16}>{strings.userSignIn}</Text>
          <View style={localStyles.newMenberContainer}>
            <Text fontFamily='$InterRegular' fontSize={14}>{strings.newMember}</Text>
            <TouchableOpacity onPress={() => { }}>
              <Text fontFamily='$InterSemiBold' fontSize={14} color={colors.success}>
                {strings.signUp}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* use formik   */}
        <Formik
          enableReinitialize={true}
          initialValues={{ userid: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values, action) => {
            // updateProfile(values.country,values.address,values.name,values.mobile)
            console.warn('formsubmit', values);

            var body = {
              mobile:values.userid,
              password:values.password

            }

                createloginByPassword.mutate(body, {
                  onSuccess: async (data) => {
                    console.warn('afterlogindata', data?.data?.result[0]);

                await setAccessToken('AccessTokenInfo',
                 JSON.stringify({
                   accessToken:data?.data?.result[0]?.token,
                   refreshToken:data?.data?.result[0]?.refreshToken,
                   expirationTime: data?.data?.result[0]?.ExpirationTime,
                 }) )
 

                 await setAccessToken('userInfo',
                 JSON.stringify({
                   userName:data?.data?.result[0]?.user.first_name,
                   userMobile:data?.data?.result[0]?.user.mobile,
                  }) )

                    toast.show({
                      placement: "bottom",
                      render: ({ id }) => {
                        return (
                          <Toast nativeID={id} variant="accent" action="success">
                            <ToastTitle>Logged In   successfully</ToastTitle>
                          </Toast>
                        );
                      },
                    })

                    navigation.reset({
                      index: 0,
                      routes: [{ name: StackNav.DrawerNavigation }],
                    });
  

                  },
                  onError: (error) => {
                    console.log('errorafterlogin', error)
                  }
                })


            // action.resetForm()
            // loadUserInfo();

          }
          }
        >
          {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (


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
                  onChangeText={handleChange('userid')}
                  onBlur={handleBlur('userid')}
                  value={values.userid}
                  placeholder={strings.enterMobileOrEmail}
                  placeholderTextColor={colors.placeHolderColor}

                  autoCorrect={false}
                  style={[
                    localStyles.inputContainerStyle

                  ]}

                />

              </View>
              {(errors.userid && touched.userid) ? <Text style={{ color: 'red', paddingHorizontal: responsiveWidth(0.7) }}>{errors.userid}</Text> : null}

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
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
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
              {(errors.password && touched.password) ? <Text style={{ color: 'red', paddingHorizontal: responsiveWidth(0.7) }}>{errors.password}</Text> : null}



              <TouchableOpacity
                style={[styles.selfEnd, styles.mb10]}
                onPress={onPressResetPassword}>
                <Text

                  fontFamily='$InterSemiBold'
                  fontSize={12}
                  style={localStyles.underLineStyle}
                  color={colors.success}>
                  {strings.resetPassword}
                </Text>
              </TouchableOpacity>

              <PrimaryButton onPress={handleSubmit} buttonText={strings.signInNow} height={getHeight(34)} marginBottom={responsiveHeight(3)} />
            </View>


          )}
        </Formik>


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
        <View style={localStyles.dividerContainer}>
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
        </View>
        <PrimaryButton buttonText={strings.doctorLogin} height={getHeight(34)} marginVertical={responsiveHeight(3)} />
        <Text fontFamily='$InterRegular' fontSize={10} color={colors.gray} alignSelf='center'>
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

})