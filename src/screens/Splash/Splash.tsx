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

export default function Splash() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const authContext:any = useContext(AuthContext  );

  useEffect(() => {
    SplashScreen.hide();
    asyncProcess();
  }, [navigation]);

  const asyncProcess = async () => {
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
    if (authContext?.authState?.authenticated === false) {

    navigation.navigate(StackNav.AuthStack)
    }else{
      navigation.navigate(StackNav.DrawerNavigation)

    }
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
