import React, {FunctionComponent} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ParamListBase} from '@react-navigation/native';
// import {
//   LoginManager,
//   AccessToken,
//   GraphRequest,
//   GraphRequestManager,
// } from 'react-native-fbsdk-next';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// local imports
import {colors, styles} from '../../themes';
import {Facebook_Icon} from '../../assets/svgs';
import {moderateScale} from '../../common/constants';
import {StackNav} from '../../navigation/NavigationKeys';
import {
  setRefreshToken,
  setToken,
  setUserDetail,
} from '../../utils/asyncstorage';
import {stopLoader} from '../../utils/helpers';
// import {isUserRegistered} from '../../api/authApi';

type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const FaceBookLogin: FunctionComponent<Props> = ({navigation}) => {
  // const signIn = async () => {
  //   LoginManager.logInWithPermissions(['public_profile', 'email']).then(
  //     function (result) {
  //       if (result.isCancelled) {
  //       } else {
  //         AccessToken.getCurrentAccessToken().then(data => {
  //           let accessToken = data.accessToken;

  //           async function _responseInfoCallback(error, result) {
  //             if (error) {
  //               alert('Error fetching data: ' + JSON.stringify(error));
  //             } else {
  //               const userInfo = result;
  //               const user = {
  //                 email: userInfo?.email,
  //                 name: userInfo?.first_name,
  //                 lastName: userInfo?.last_name,
  //                 isFromGoogleFacebookLogin: true,
  //               };
  //               let userData = await isUserRegistered(user.email);
  //               if (userData) {
  //                 await setUserDetail(userData?.userInfo);
  //                 await setRefreshToken(userData?.refreshToken);
  //                 await setToken(userData?.token);
  //                 global.userDetail = userData?.userInfo;
  //                 navigation.reset({
  //                   index: 0,
  //                   routes: [{name: StackNav.DrawerNavigation}],
  //                 });
  //               } else {
  //                 navigation.navigate(StackNav.Signup, {user});
  //               }
  //               stopLoader();
  //             }
  //           }

  //           // const infoRequest = new GraphRequest(
  //           //   '/me',
  //           //   {
  //           //     accessToken: accessToken,
  //           //     parameters: {
  //           //       fields: {
  //           //         string: 'email,name,first_name,middle_name,last_name',
  //           //       },
  //           //     },
  //           //   },
  //           //   _responseInfoCallback,
  //           // );
  //           // new GraphRequestManager().addRequest(infoRequest).start();
  //         });
  //       }
  //     },
  //     function (error) {
  //       alert('Login failed with error: ' + error);
  //     },
  //   );
  // };

  return (
    <TouchableOpacity onPress={()=>{}} style={localStyles.iconStyle}>
      <Facebook_Icon height={moderateScale(30)} width={moderateScale(30)} />
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

export default FaceBookLogin;
