import {StyleSheet, View,Text} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';

// local imports
import CSafeAreaView from '../../components/common/CSafeAreaView';
import { styles } from '../../themes';
import { StackNav } from '../../navigation/NavigationKeys';
// import {getRefreshToken, getToken, getUserDetail} from '../utils/asyncstorage';
// import {userSettingAPI} from '../api/authApi';
import { AuthContext } from '../../context/AuthContext'

 import { getAccessToken, setAccessToken, CallApiJson } from '../../utils/network'
export default function Splash() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const authContext:any = useContext(AuthContext  );
    var l=false;
  useEffect(() => {
    SplashScreen.hide();
    asyncProcess();
  }, [navigation]);

  async function load () {
    console.log('APP Navigatorloadfunct')

    let v =  JSON.parse( await getAccessToken('AccessTokenInfo') ); 

    if(  v?.accessToken){
      console.log('tokeninfo from memoery',v)
 
      let  currentTime = Math.floor(new Date().getTime() / 1000);

      if( currentTime < v?.expirationTime ){
        console.log('tokenvalid ')
        l =true;
        authContext.setAuthState({
          accessToken: v?.accessToken,
          refreshToken: v?.refreshToken,
          expirationTime: v?.expirationTime,
          authenticated: true,
        });

      }else{

       let body2 = {
          token:v?.refreshToken
        }
        const reftechAccessToken =  await CallApiJson( 'auth/refreshtoken', 'POST', body2 );

        console.log( 'expiredtokenFetchedNewToken', reftechAccessToken )
        if( reftechAccessToken.result.success==true){
          await setAccessToken('AccessTokenInfo',
          JSON.stringify({
            accessToken:reftechAccessToken.result.access_token,
            refreshToken:v?.refreshToken,
            expirationTime: reftechAccessToken.result.ExpirationTime,
          }) )

           authContext.setAuthState({
          
            accessToken:reftechAccessToken.result.access_token,
            refreshToken:v?.refreshToken,
            expirationTime: reftechAccessToken.result.ExpirationTime,
            authenticated: true,

          });



        }else{
          console.log('redirect to login ');
        }



      }
 


    }else{
      console.log('No tokeninfo from memoery' )

    }


}
  const asyncProcess = async () => {
    await     load();
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
    console.log( 'authContextinsplash', authContext?.authState.authenticated)
    
    if(l==false)
    navigation.navigate(StackNav.AuthStack)
    else     navigation.navigate(StackNav.DrawerNavigation)

  };

  return (
    <CSafeAreaView style={localStyles.container}>
      <View />
      <Text>Splash </Text>
    </CSafeAreaView>
  );
}
const localStyles = StyleSheet.create({
  container: {
    ...styles.center,
  },
});
