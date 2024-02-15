import {
  Image,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle, Text
} from 'react-native';
import React, { FunctionComponent, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';

// local imports
import typography from '../../themes/typography';
import { colors, styles } from '../../themes';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';
import CText from '../../components/common/CText';
import strings from '../../i18n/strings';
import images from '../../assets/images';
import {
  // getDeviceIp,
  // getDeviceName,
  // getDeviceOS,
  // getDeviceUniqueId,
  getHeight,
  moderateScale,
} from '../../common/constants';
import CInput from '../../components/common/CInput';
import CButton from '../../components/common/CButton';
import { ArrowDown, BackArrow, Eye, EyeDashed } from '../../assets/svgs';
import { StackNav } from '../../navigation/NavigationKeys';
import {
  signUpSchema,
  signUpWithEmailSchema,
  validateConfirmPassword,
  validateEmail,
  validateMobile,
  validateName,
  validatePassword,
} from '../../utils/validators';
// import {postRequestApi} from '../../api/axios';
// import {USER_REGISTER_LOG_IN_API} from '../../api/url';
import { LoginWithOtpResponse, SignupProp } from '../../types/Types';
import { showPopupWithOk } from '../../utils/helpers';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Container } from '../../components/Container';
import Body from '../../components/Body/Body';
import { Box, Toast, ToastTitle, useToast } from '@gluestack-ui/themed';
import PrimaryButton from '../../components/common/Button/PrimaryButton';
import { useFormik } from 'formik';
import * as RNLocalize from "react-native-localize";
import useUserRegister from '../../hooks/auth/user-register';


const BlurredStyle: StyleProp<ViewStyle> = {
  backgroundColor: colors.white,
  borderColor: colors.borderColor,
};
const FocusedStyle: StyleProp<ViewStyle> = {
  backgroundColor: colors.inputFocusColor,
  borderColor: colors.primary,
};

type Props = {
  route: SignupProp;
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const Signup = ({ route, navigation }) => {
  const user = route?.params?.user;
  const toast = useToast()


  const [countryCode, setCountryCode] = useState('+91');
  const [isByEmail, setIsByEmail] = useState(false);
 
  //api call
  const useUserRegisterMutation = useUserRegister()


  // show Password states
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { firstname: "", lastname: "", number: "", email: "", password: "", cpassword: "", referralcode: "" },
    validationSchema: isByEmail ? signUpWithEmailSchema : signUpSchema,
    onSubmit: values => {
      // updateProfile(values.country,values.address,values.name,values.mobile)
      // console.warn('formsubmit', values);

       const payload = {
        mobile: values.number,  // mandatory 
        device_name:"duii",
        name :`${values.firstname} ${values.lastname}`,
        password:values.password,
        email: values.email,
        device_type:"MOBILEAPP",     //  MOBILEAPP
        device_data:"duii",         
        login_ip:"duii",
        country_code:"IN", // country code ISO
        app_fcm_token:"ffjjj"
        }
        // navigation.navigate(StackNav.VerifyLoginOtp,{mobile:values.number})
      useUserRegisterMutation.mutate(payload, {
        onSuccess: (data) => {
          
          console.log('SUGNUPP DATA',data?.data);
          
          toast.show({
            placement: "bottom",
            render: ({ id }: { id: string }) => {
              const toastId = "toast-" + id
              return (
                <Toast nativeID={toastId} variant="accent" action="success">
                  <ToastTitle>OTP Sent</ToastTitle>
                </Toast>
              );
            },
          })
           
          navigation.navigate(StackNav.VerifyLoginOtp,{mobile:values.number,screenType:'signup'})
        
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




      // action.resetForm()
      // loadUserInfo();

    }

  });
//   const countryData = RNLocalize.findBestAvailableLanguage(['en', 'fr', 'es']); // Pass supported language codes
// console.log('Country Name:', countryData?.country);



  const navigateBack = () => navigation.goBack();

  const onPressSkip = (): void => {
    navigation.reset({
      index: 0,
      routes: [{ name: StackNav.DrawerNavigation }],
    });
  };

  const onPressTermsOfService = (): void =>
    navigation.navigate(StackNav.TermsOfService);

  const onPressPrivacyPolicy = (): void =>
    navigation.navigate(StackNav.PrivacyPolicy);

  const onPressSignIn = (): void => {
    navigation.navigate(StackNav.LoginScreen);
  };









  return (
    <Container statusBarStyle='dark-content' >
      <Body style={localStyles.root} >
        <View style={styles.rowSpaceBetween}>
          <View style={[styles.flexRow]}>
            <TouchableOpacity
              onPress={navigateBack}
              style={localStyles.backArrowStyle}>
              <BackArrow />
            </TouchableOpacity>
            <CText type="s16" color={colors.success}>
              {strings.signUp}
            </CText>
          </View>
          <TouchableOpacity onPress={onPressSkip}>
            <CText type="m12" color={colors.primary}>
              {strings.skip}
            </CText>
          </TouchableOpacity>
        </View>
        <View style={styles.center}>
          <Image style={localStyles.imageStyle} source={images.signupImage} />
        </View>

        <View style={{ gap: responsiveHeight(2.5) }} >

          <View style={{
            borderWidth: moderateScale(1),
            borderRadius: moderateScale(6),
            height: moderateScale(40),
            borderColor: colors.borderColor,
            width: '100%', justifyContent: 'center', paddingHorizontal: responsiveWidth(0.7),
          }}>
            <TextInput
              onChangeText={formik.handleChange('firstname')}
              onBlur={formik.handleBlur('firstname')}
              value={formik.values.firstname}
              placeholder={strings.firstName}
              placeholderTextColor={colors.placeHolderColor}

              autoCorrect={false}
              style={[
                localStyles.inputContainerStyles

              ]}

            />
          </View>
          {(formik.errors.firstname && formik.touched.firstname) ? <Text style={{ color: 'red', paddingHorizontal: responsiveWidth(0.7) }}>{formik.errors.firstname}</Text> : null}
          <View style={{
            borderWidth: moderateScale(1),
            borderRadius: moderateScale(6),
            height: moderateScale(40),
            borderColor: colors.borderColor,
            width: '100%', justifyContent: 'center', paddingHorizontal: responsiveWidth(0.7),
          }}>
            <TextInput
              onChangeText={formik.handleChange('lastname')}
              onBlur={formik.handleBlur('lastname')}
              value={formik.values.lastname}
              placeholder={strings.lastName}
              placeholderTextColor={colors.placeHolderColor}

              autoCorrect={false}
              style={[
                localStyles.inputContainerStyles

              ]}

            />
          </View>
          {(formik.errors.lastname && formik.touched.lastname) ? <Text style={{ color: 'red', paddingHorizontal: responsiveWidth(0.7) }}>{formik.errors.lastname}</Text> : null}
        </View>

        <View style={localStyles.btnContainer}>
          <CButton
            title={strings.byMobile}
            type={'b14'}
            onPress={() => setIsByEmail(false)}
            bgColor={!isByEmail ? colors.primary : colors.gray5}
            color={!isByEmail ? colors.white : colors.gray6}
            containerStyle={localStyles.btnStyle}
          />
          <CButton
            title={strings.byEmail}
            type={'b14'}
            onPress={() => setIsByEmail(true)}
            bgColor={isByEmail ? colors.primary : colors.gray5}
            color={isByEmail ? colors.white : colors.gray6}
            containerStyle={localStyles.btnStyle}
          />
        </View>
        {isByEmail && (
          <>
            <Box borderWidth={1} borderColor={colors.borderColor} borderRadius={4} height={40} overflow='hidden' mt={15} >

              <TextInput
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                value={formik.values.email}
                placeholder={strings.enterEmail}
                placeholderTextColor={colors.placeHolderColor}
                keyboardType='email-address'
                autoCorrect={false}
                style={[
                  localStyles.inputContainerStyles

                ]}

              />
            </Box>
            {(formik.errors.email && formik.touched.email) ? <Text style={{ color: 'red', paddingHorizontal: responsiveWidth(0.7) }}>{formik.errors.email}</Text> : null}

          </>


        )}

        <View
          style={[localStyles.countryCodeContainer, !isByEmail && styles.mt20]}>
          <View style={localStyles.countryCodeStyle}>
            <CText type={'r12'} color={colors.gray7}>
              {countryCode}
            </CText>
            <ArrowDown />
          </View>
          <Box borderWidth={1} justifyContent='center' borderColor={colors.borderColor} borderRadius={4} height={40} overflow='hidden' w={'75%'}  >

            <TextInput
              onChangeText={formik.handleChange('number')}
              onBlur={formik.handleBlur('number')}
              value={formik.values.number}
              placeholder={strings.enterMobileNumber}
              placeholderTextColor={colors.placeHolderColor}
              keyboardType='number-pad'
              autoCorrect={false}
              style={[
                localStyles.inputContainerStyles

              ]}

            />
          </Box>
       

        </View>
        {(formik.errors.number && formik.touched.number) ? <Text style={{ color: 'red', paddingHorizontal: responsiveWidth(0.7) }}>{formik.errors.number}</Text> : null}

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
            placeholder={strings.chooseNewPassword}
            placeholderTextColor={colors.placeHolderColor}
            secureTextEntry={showPassword}

            style={[
              localStyles.inputContainerStyles, { width: '90%' }

            ]}

          />

          <TouchableOpacity style={{}} onPress={() => { setShowPassword(!showPassword) }}>
            {showPassword ? <EyeDashed /> : <Eye />}
          </TouchableOpacity>

        </View>
        {(formik.errors.password && formik.touched.password) ? <Text style={{ color: 'red', paddingHorizontal: responsiveWidth(0.7) }}>{formik.errors.password}</Text> : null}

        <View style={{
          borderWidth: moderateScale(1),
          borderRadius: moderateScale(6),
          height: moderateScale(40),
          borderColor: colors.borderColor,
          width: '100%', paddingHorizontal: responsiveWidth(0.7), flexDirection: 'row', alignItems: 'center', marginTop: responsiveHeight(1.4)
        }}>
          {/* <FontAwesome name="user-o" size={responsiveWidth(5)} /> */}
          <TextInput
            onChangeText={formik.handleChange('cpassword')}
            onBlur={formik.handleBlur('cpassword')}
            value={formik.values.cpassword}
            placeholder={strings.confirmNewPassword}
            placeholderTextColor={colors.placeHolderColor}
            secureTextEntry={showPassword}

            style={[
              localStyles.inputContainerStyles, { width: '90%' }

            ]}

          />

          <TouchableOpacity style={{}} onPress={() => { setShowPassword(!showPassword) }}>
            {showPassword ? <EyeDashed /> : <Eye />}
          </TouchableOpacity>

        </View>
        {(formik.errors.cpassword && formik.touched.cpassword) ? <Text style={{ color: 'red', paddingHorizontal: responsiveWidth(0.7) }}>{formik.errors.cpassword}</Text> : null}
       
        <Box borderWidth={1} justifyContent='center' borderColor={colors.borderColor} borderRadius={4} height={40} overflow='hidden' mt={10}  >

          <TextInput
            onChangeText={formik.handleChange('referralcode')}
            onBlur={formik.handleBlur('referralcode')}
            value={formik.values.referralcode}
            placeholder={strings.referralCode}
            placeholderTextColor={colors.placeHolderColor}
            autoCorrect={false}
            style={[
              localStyles.inputContainerStyles

            ]}

          />
        </Box>
        {(formik.errors.referralcode && formik.touched.referralcode) ? <Text style={{ color: 'red', paddingHorizontal: responsiveWidth(0.7) }}>{formik.errors.referralcode}</Text> : null}

        <PrimaryButton onPress={formik.handleSubmit} disabled={useUserRegisterMutation?.isPending } loading={ useUserRegisterMutation?.isPending } buttonText='Sign Up' width={'30%'} height={responsiveHeight(5)} alignSelf='center' marginTop={responsiveHeight(1.4)} />
        <View style={localStyles.signInContainer}>
          <CText type="r12" color={colors.black2} style={styles.selfEnd}>
            {strings.alreadyHaveAccount}
          </CText>
          <CText
            onPress={onPressSignIn}
            suppressHighlighting={true}
            type="s14"
            color={colors.success}
            style={localStyles.underLineStyle}>
            {strings.signIn}
          </CText>
        </View>
        <CText type="r10" color={colors.gray} align="center">
          {strings.byProceedingYou}
          <CText
            onPress={onPressTermsOfService}
            suppressHighlighting={true}
            type="r10"
            style={[
              localStyles.underLineStyle,
              {
                textDecorationColor: colors.primary,
              },
            ]}
            color={colors.primary}>
            {strings.termsOfService}
          </CText>
          {' & '}
          <CText
            onPress={onPressPrivacyPolicy}
            suppressHighlighting={true}
            type="r10"
            style={[
              localStyles.underLineStyle,
              {
                textDecorationColor: colors.primary,
              },
            ]}
            color={colors.primary}>
            {strings.privacyPolicy}
          </CText>
        </CText>
      </Body>
    </Container>
  );
};

export default Signup;

const localStyles = StyleSheet.create({
  root: {
    ...styles.ph10,
    ...styles.pv10,
  },
  backArrowStyle: {
    ...styles.selfCenter,
    ...styles.mr10,
  },
  imageStyle: {
    width: moderateScale(200),
    height: moderateScale(190),
    resizeMode: 'contain',
  },
  inputContainerStyle: {
    height: moderateScale(36),
  },
  inputBoxStyle: {
    ...styles.pl20,
    ...typography.fontSizes.f14,
    ...typography.fontWeights.Regular,
  },
  btnContainer: {
    ...styles.rowSpaceBetween,
    ...styles.mt10,
  },
  btnStyle: {
    width: '48%',
    height: getHeight(38),
  },
  countryCodeStyle: {
    borderWidth: moderateScale(1),
    borderColor: colors.borderColor,
    borderRadius: moderateScale(6),
    ...styles.rowCenter,
    ...styles.ph10,
    gap: moderateScale(5),
    width: '20%',
    height: moderateScale(40),
  },
  mobileNumberStyle: {
    ...styles.ph20,
    ...styles.pv10,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(6),
    ...typography.fontSizes.f14,
    ...typography.fontWeights.Regular,
    height: moderateScale(36),
  },
  countryCodeContainer: {
    ...styles.rowSpaceBetween,
    width: '100%',
    ...styles.mt10,
    ...styles.mb10,
  },
  signInContainer: {
    ...styles.mv10,
    ...styles.rowCenter,
  },
  saveBtnStyle: {
    ...styles.mt15,
    ...styles.selfCenter,
    ...styles.ph30,
    borderRadius: moderateScale(10),
    height: getHeight(38),
  },
  underLineStyle: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: colors.success,
  },
  errorText: {
    textAlign: 'left',
    ...typography.fontSizes.f12,
    ...styles.ml10,
  },
  inputContainerStyles: {
    backgroundColor: colors.white,
    marginLeft: responsiveWidth(1.5),
    ...typography.fontSizes.f14,
    ...typography.fontWeights.Regular,
    ...styles.ph10,




  },
});
