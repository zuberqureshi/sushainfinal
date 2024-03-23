import { StyleSheet, View, Text } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';

// local imports
import CSafeAreaView from '../../components/common/CSafeAreaView';
import { styles } from '../../themes';
import { StackNav } from '../../navigation/NavigationKeys';
// import {getRefreshToken, getToken, getUserDetail} from '../utils/asyncstorage';
// import {userSettingAPI} from '../api/authApi';
import { AuthContext } from '../../context/AuthContext'

import { getAccessToken, setAccessToken, CallApiJson, refreshTokenFetch } from '../../utils/network'
import { Container } from '../../components/Container';
import { Box, Image } from '@gluestack-ui/themed';
import images from '../../assets/images';
export default function Splash() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const authContext: any = useContext(AuthContext);
  var loginstatus = false;
  useEffect(() => {
    SplashScreen.hide();
    asyncProcess();
  }, [navigation]);

  async function load() {
    console.log('APP aload splash')
    var medType = await getAccessToken('medType')

    if (!medType)
      await setAccessToken('medType', 'ayurvedic');

    let v = JSON.parse(await getAccessToken('AccessTokenInfo'));
    let userD = JSON.parse(await getAccessToken('userInfo'))

    if (v?.accessToken) {
      loginstatus = true
      let currentTime = Math.floor(new Date().getTime() / 1000);
      console.log('tokeninfo from memoery', currentTime, v)

      if (currentTime < v?.expirationTime) {
        console.log('tokenvalid ')

        authContext.setAuthState({
          accessToken: v?.accessToken,
          refreshToken: v?.refreshToken,
          expirationTime: v?.expirationTime,
          authenticated: true,
        });

        authContext.setUserInfo({

          userUniqueId: userD?.userUniqueId,
          userId: userD?.userId,
          userName: userD?.userName,
          userMobile: userD.userMobile,

        });


      } else {
        console.log('tokenINvalid ')

        let body2 = {
          refreshToken: v?.refreshToken
        }

        const reftechAccessToken = await refreshTokenFetch();

        console.log('expiredtokenFetchedNewToken', body2, reftechAccessToken, v)
        if (reftechAccessToken.success == true) {
          await setAccessToken('AccessTokenInfo',
            JSON.stringify({
              accessToken: reftechAccessToken.result[0].token,
              refreshToken: v?.refreshToken,
              expirationTime: reftechAccessToken.result[0].ExpirationTime,
            }))

          authContext.setAuthState({

            accessToken: reftechAccessToken.result[0].token,
            refreshToken: v?.refreshToken,
            expirationTime: reftechAccessToken.result[0].ExpirationTime,
            authenticated: true,

          });

          authContext.setUserInfo({

            userUniqueId: userD?.userUniqueId,
            userId: userD?.userId,
            userName: userD?.userName,
            userMobile: userD.userMobile,

          });

          loginstatus = true

        } else {
          loginstatus = false
          console.log('redirect to login ');
        }



      }



    } else {
      loginstatus = false
      console.log('No tokeninfo from memoery')

    }


  }
  const asyncProcess = async () => {
    await load();
    // const settingData = await userSettingAPI();
    // console.log('settingData>>>', settingData);

    // (global as any).settingData = settingData;

    // let token = await getToken();
    // if (!!token) {
    //   let user = await getUserDetail();
    //   let refreshToken = await getRefreshToken();
    //   console.log('userDetails', user, token, refreshToken);

    //   if (!!user) {
    //     global.userDetail = user;
    //     navigation.reset({
    //       index: 0,
    //       routes: [{name: StackNav.DrawerNavigation}],
    //     });
    //   }
    // } else {
    //   navigation.reset({
    //     index: 0,
    //     routes: [{name: StackNav.AuthStack}],
    //   });
    // }
    console.log('authContextinsplash', authContext?.authState.authenticated)

    if(loginstatus==false)
    navigation.replace(StackNav.AuthStack)
    else     navigation.replace(StackNav.DrawerNavigation)

  };

  return (
    <Container statusBarStyle='dark-content'  >
      <Box flex={1} justifyContent='center' alignItems='center' >
        <Image alt='splashIcon' source={images.splashIcon} w={'75%'} h={268} />
      </Box>

    </Container>
  );
}
const localStyles = StyleSheet.create({
  container: {
    ...styles.center,
  },
});
