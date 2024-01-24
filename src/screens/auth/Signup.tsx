import {
  Image,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {FunctionComponent, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';

// local imports
import typography from '../../themes/typography';
import {colors, styles} from '../../themes';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';
import CText from '../../components/common/CText';
import strings from '../../i18n/strings';
import images from '../../assets/images';
import {
  getDeviceIp,
  getDeviceName,
  getDeviceOS,
  getDeviceUniqueId,
  getHeight,
  moderateScale,
} from '../../common/constants';
import CInput from '../../components/common/CInput';
import CButton from '../../components/common/CButton';
import {ArrowDown, BackArrow, Eye, EyeDashed} from '../../assets/svgs';
import {StackNav} from '../../navigation/NavigationKeys';
import {
  validateConfirmPassword,
  validateEmail,
  validateMobile,
  validateName,
  validatePassword,
} from '../../utils/validators';
import {postRequestApi} from '../../api/axios';
import {USER_REGISTER_LOG_IN_API} from '../../api/url';
import {LoginWithOtpResponse, SignupProp} from '../../types/Types';
import {showPopupWithOk} from '../../utils/helpers';

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

const Signup: FunctionComponent<Props> = ({route, navigation}) => {
  const user = route?.params?.user;

  // value states
  const [firstName, setFirstName] = useState(user?.name ? user?.name : '');
  const [lastName, setLastName] = useState(
    user?.lastName ? user?.lastName : '',
  );
  const [email, setEmail] = useState(user?.email ? user?.email : '');
  const [mobile, setMobile] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [isByEmail, setIsByEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');

  // style states
  const [firstNameInputStyle, setFirstNameInputStyle] =
    useState<StyleProp<ViewStyle>>(BlurredStyle);
  const [lastNameInputStyle, setLastNameInputStyle] =
    useState<StyleProp<ViewStyle>>(BlurredStyle);
  const [emailInputStyle, setEmailInputStyle] =
    useState<StyleProp<ViewStyle>>(BlurredStyle);
  const [mobileInputStyle, setMobileInputStyle] =
    useState<StyleProp<ViewStyle>>(BlurredStyle);
  const [passwordInputStyle, setPasswordInputStyle] =
    useState<StyleProp<ViewStyle>>(BlurredStyle);
  const [confirmPasswordInputStyle, setConfirmPasswordInputStyle] =
    useState<StyleProp<ViewStyle>>(BlurredStyle);
  const [referralCodeInputStyle, setReferralCodeInputStyle] =
    useState<StyleProp<ViewStyle>>(BlurredStyle);

  // show Password states
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  // error states
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const onChangeFirstName = (text: string): void => {
    const {msg} = validateName(text.trim());
    setFirstName(text);
    setFirstNameError(msg);
  };
  const onChangeLastName = (text: string): void => {
    const {msg} = validateName(text.trim());
    setLastName(text);
    setLastNameError(msg);
  };
  const onChangeEmail = (text: string): void => {
    const {msg} = validateEmail(text.trim());
    setEmail(text.trim());
    setEmailError(msg);
  };
  const onChangeMobile = (text: string): void => {
    const {msg} = validateMobile(text.trim());
    setMobile(text.trim());
    setMobileError(msg);
  };
  const onChangePassword = (val: string): void => {
    const {msg} = validatePassword(val.trim());
    setPassword(val.trim());
    setPasswordError(msg);
    if (confirmPassword !== '') {
      const {msg} = validateConfirmPassword(confirmPassword, val.trim());
      setConfirmPasswordError(msg);
    }
  };
  const onChangeConfirmPassword = (val: string): void => {
    const {msg} = validateConfirmPassword(val.trim(), password);
    setConfirmPassword(val.trim());
    setConfirmPasswordError(msg);
  };
  const onChangeReferralCode = (text: string): void => {
    setReferralCode(text);
  };

  const onFocusInput = (
    onHighlight: React.Dispatch<React.SetStateAction<StyleProp<ViewStyle>>>,
  ) => onHighlight(FocusedStyle);
  const onBlurInput = (
    onUnHighlight: React.Dispatch<React.SetStateAction<StyleProp<ViewStyle>>>,
  ) => onUnHighlight(BlurredStyle);

  const onFocusFirstName = () => {
    onFocusInput(setFirstNameInputStyle);
  };
  const onBlurFirstName = () => {
    onBlurInput(setFirstNameInputStyle);
  };

  const onFocusLastName = () => {
    onFocusInput(setLastNameInputStyle);
  };
  const onBlurLastName = () => {
    onBlurInput(setLastNameInputStyle);
  };

  const onFocusEmail = () => {
    onFocusInput(setEmailInputStyle);
  };
  const onBlurEmail = () => {
    onBlurInput(setEmailInputStyle);
  };

  const onFocusMobile = () => {
    onFocusInput(setMobileInputStyle);
  };
  const onBlurMobile = () => {
    onBlurInput(setMobileInputStyle);
  };

  const onFocusPassword = () => {
    onFocusInput(setPasswordInputStyle);
  };
  const onBlurPassword = () => {
    onBlurInput(setPasswordInputStyle);
  };

  const onFocusConfirmPassword = () => {
    onFocusInput(setConfirmPasswordInputStyle);
  };
  const onBlurConfirmPassword = () => {
    onBlurInput(setConfirmPasswordInputStyle);
  };

  const onFocusReferralCode = () => {
    onFocusInput(setReferralCodeInputStyle);
  };
  const onBlurReferralCode = () => {
    onBlurInput(setReferralCodeInputStyle);
  };

  const navigateBack = () => navigation.goBack();

  const onPressSkip = (): void => {
    navigation.reset({
      index: 0,
      routes: [{name: StackNav.DrawerNavigation}],
    });
  };

  const onPressTermsOfService = (): void =>
    navigation.navigate(StackNav.TermsOfService);

  const onPressPrivacyPolicy = (): void =>
    navigation.navigate(StackNav.PrivacyPolicy);

  const onPressSignIn = (): void => {
    navigation.navigate(StackNav.LoginScreen);
  };

  const onPressShowPassword = (): void => setShowPassword(!showPassword);

  const onPressShowConfirmPassword = (): void =>
    setShowConfirmPassword(!showConfirmPassword);

  const signUpApiCall = async () => {
    let payload = {
      mobile: mobile, // mandatory
      first_name: firstName, // mandatory
      last_name: lastName, // mandatory
      email: email ? email : undefined,
      device_type: await getDeviceOS(), //  MOBILEAPP
      device_data: await getDeviceUniqueId(),
      device_name: await getDeviceName(),
      login_ip: await getDeviceIp(),
      password: password,
      country_code: 'IN', // country code ISO
      app_fcm_token: 'fcmtoken',
    };
    let registerResponse = (await postRequestApi(
      USER_REGISTER_LOG_IN_API,
      payload,
    )) as LoginWithOtpResponse;
    if (registerResponse?.code === 200) {
      if (registerResponse.success) {
        console.log('=========', JSON.stringify(registerResponse));
        navigation.navigate(StackNav.VerifyRegisterOtp, {
          mobile: mobile,
        });
      }
    } else {
      showPopupWithOk('', registerResponse?.message);
    }
  };

  const onPressSignUp = async (): Promise<void> => {
    if (!firstName) {
      setFirstNameError(strings.thisFieldIsMandatory);
    }
    if (!lastName) {
      setLastNameError(strings.thisFieldIsMandatory);
    }
    if (isByEmail) {
      if (!email) {
        setEmailError(strings.thisFieldIsMandatory);
      }
    } else {
      if (!mobile) {
        setMobileError(strings.thisFieldIsMandatory);
      }
    }
    if (!password) {
      setPasswordError(strings.thisFieldIsMandatory);
    }
    if (!confirmPassword) {
      setConfirmPasswordError(strings.thisFieldIsMandatory);
    }
    if (isByEmail) {
      if (
        firstNameError === '' &&
        firstName &&
        lastNameError === '' &&
        lastName &&
        emailError === '' &&
        email &&
        mobileError === '' &&
        mobile &&
        passwordError === '' &&
        password &&
        confirmPasswordError === '' &&
        confirmPassword
      ) {
        await signUpApiCall();
      }
    } else {
      if (
        firstNameError === '' &&
        firstName &&
        lastNameError === '' &&
        lastName &&
        mobileError === '' &&
        mobile &&
        passwordError === '' &&
        password &&
        confirmPasswordError === '' &&
        confirmPassword
      ) {
        await signUpApiCall();
      }
    }
  };

  const rightAccessoryPassword = () => {
    return (
      <TouchableOpacity onPress={onPressShowPassword}>
        {showPassword ? <EyeDashed /> : <Eye />}
      </TouchableOpacity>
    );
  };

  const rightAccessoryConfirmPassword = () => {
    return (
      <TouchableOpacity onPress={onPressShowConfirmPassword}>
        {showConfirmPassword ? <EyeDashed /> : <Eye />}
      </TouchableOpacity>
    );
  };

  return (
    <CSafeAreaView style={localStyles.root}>
      <KeyBoardAvoidWrapper>
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
        <CInput
          toGetTextFieldValue={onChangeFirstName}
          _errorText={firstNameError}
          placeholder={strings.firstName}
          _value={firstName}
          inputContainerStyle={[
            localStyles.inputContainerStyle,
            firstNameInputStyle,
          ]}
          inputBoxStyle={localStyles.inputBoxStyle}
          _onFocus={onFocusFirstName}
          _onBlur={onBlurFirstName}
          placeholderTextColor={colors.placeHolderColor}
        />
        <CInput
          toGetTextFieldValue={onChangeLastName}
          _errorText={lastNameError}
          placeholder={strings.lastName}
          _value={lastName}
          inputContainerStyle={[
            localStyles.inputContainerStyle,
            lastNameInputStyle,
          ]}
          inputBoxStyle={localStyles.inputBoxStyle}
          _onFocus={onFocusLastName}
          _onBlur={onBlurLastName}
          placeholderTextColor={colors.placeHolderColor}
        />

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
          <CInput
            toGetTextFieldValue={onChangeEmail}
            _errorText={emailError}
            placeholder={strings.enterEmail}
            _value={email}
            inputContainerStyle={[
              localStyles.inputContainerStyle,
              emailInputStyle,
              styles.mt10,
            ]}
            inputBoxStyle={localStyles.inputBoxStyle}
            _onFocus={onFocusEmail}
            _onBlur={onBlurEmail}
            placeholderTextColor={colors.placeHolderColor}
          />
        )}

        <View
          style={[localStyles.countryCodeContainer, !isByEmail && styles.mt20]}>
          <View style={localStyles.countryCodeStyle}>
            <CText type={'r12'} color={colors.gray7}>
              {countryCode}
            </CText>
            <ArrowDown />
          </View>
          <TextInput
            onChangeText={onChangeMobile}
            placeholder={strings.enterMobileNumber}
            value={mobile}
            style={[
              localStyles.mobileNumberStyle,
              mobileInputStyle,
              {
                width: '78%',
              },
            ]}
            maxLength={10}
            keyboardType="number-pad"
            onFocus={onFocusMobile}
            onBlur={onBlurMobile}
            placeholderTextColor={colors.placeHolderColor}
          />
        </View>
        {mobileError && mobileError !== '' ? (
          <CText
            style={{
              ...localStyles.errorText,
              color: colors.alertColor,
            }}>
            {mobileError}
          </CText>
        ) : null}
        <CInput
          toGetTextFieldValue={onChangePassword}
          _errorText={passwordError}
          placeholder={strings.chooseNewPassword}
          _value={password}
          inputContainerStyle={[
            localStyles.inputContainerStyle,
            passwordInputStyle,
          ]}
          inputBoxStyle={localStyles.inputBoxStyle}
          _onFocus={onFocusPassword}
          _onBlur={onBlurPassword}
          keyBoardType={'default'}
          placeholderTextColor={colors.placeHolderColor}
          secureTextEntry={showPassword}
          rightAccessory={rightAccessoryPassword}
        />
        <CInput
          toGetTextFieldValue={onChangeConfirmPassword}
          _errorText={confirmPasswordError}
          placeholder={strings.confirmPassword}
          _value={confirmPassword}
          inputContainerStyle={[
            localStyles.inputContainerStyle,
            confirmPasswordInputStyle,
          ]}
          inputBoxStyle={localStyles.inputBoxStyle}
          _onFocus={onFocusConfirmPassword}
          _onBlur={onBlurConfirmPassword}
          keyBoardType={'default'}
          placeholderTextColor={colors.placeHolderColor}
          secureTextEntry={showConfirmPassword}
          rightAccessory={rightAccessoryConfirmPassword}
        />
        <CInput
          toGetTextFieldValue={onChangeReferralCode}
          placeholder={strings.referralCode}
          _value={referralCode}
          inputContainerStyle={[
            localStyles.inputContainerStyle,
            referralCodeInputStyle,
          ]}
          inputBoxStyle={localStyles.inputBoxStyle}
          _onFocus={onFocusReferralCode}
          _onBlur={onBlurReferralCode}
          placeholderTextColor={colors.placeHolderColor}
        />
        <CButton
          title={strings.signUp}
          type={'s16'}
          onPress={onPressSignUp}
          containerStyle={localStyles.saveBtnStyle}
        />
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
      </KeyBoardAvoidWrapper>
    </CSafeAreaView>
  );
};

export default Signup;

const localStyles = StyleSheet.create({
  root: {
    ...styles.ph20,
    ...styles.pv20,
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
    height: moderateScale(36),
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
});
