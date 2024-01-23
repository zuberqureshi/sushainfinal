import React, {useEffect, FunctionComponent} from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {ParamListBase} from '@react-navigation/native';
// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// local imports
import {colors, styles} from '../../themes';
import {Google_Icon} from '../../assets/svgs';
import {moderateScale} from '../../common/constants';
import {StackNav} from '../../navigation/NavigationKeys';
import {startLoader, stopLoader} from '../../utils/helpers';
import {
  setRefreshToken,
  setToken,
  setUserDetail,
} from '../../utils/asyncstorage';
// import {isUserRegistered} from '../../api/authApi';

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const GoogleLogin: FunctionComponent<Props> = ({navigation}) => {
  useEffect(() => {
    // if (Platform.OS === 'android') {
    //   GoogleSignin.configure({
    //     webClientId:
    //       '839585087266-g4g4n572udl46mj2eejf3o1d20s42na1.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    //     offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    //   });
    // } else {
    //   GoogleSignin.configure({
    //     webClientId:
    //       '839585087266-bu75079pf89mhrt0j5o4a9s0jngaq132.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)',
    //     offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    //   });
    // }
  }, []);
  // const signIn = async () => {
  //   startLoader();
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     const token = await GoogleSignin.getTokens();
  //     if (userInfo && userInfo.user) {
  //       const user = {
  //         email: userInfo.user.email,
  //         name: userInfo.user.givenName,
  //         lastName: userInfo.user.familyName,
  //         isFromGoogleFacebookLogin: true,
  //       };
  //       let userData = await isUserRegistered(user.email);
  //       if (userData) {
  //         await setUserDetail(userData?.userInfo);
  //         await setRefreshToken(userData?.refreshToken);
  //         await setToken(userData?.token);
  //         global.userDetail = userData?.userInfo;
  //         navigation.reset({
  //           index: 0,
  //           routes: [{name: StackNav.DrawerNavigation}],
  //         });
  //       } else {
  //         navigation.navigate(StackNav.Signup, {user});
  //       }

  //       stopLoader();
  //     }
  //   } catch (error) {
  //     console.log('AUTH ERROR>>>', JSON.stringify(error));
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       stopLoader();
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       startLoader();
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       stopLoader();
  //     } else {
  //       stopLoader();
  //     }
  //   }
  // };

  return (
    <TouchableOpacity onPress={()=>{}} style={localStyles.iconStyle}>
      <Google_Icon height={moderateScale(30)} width={moderateScale(30)} />
    </TouchableOpacity>
  );
};
const localStyles = StyleSheet.create({
  iconStyle: {
    borderWidth: moderateScale(1),
    borderColor: colors.primary,
    height: moderateScale(47),
    width: moderateScale(47),
    ...styles.center,
    borderRadius: moderateScale(47 / 2),
  },
});

export default GoogleLogin;
