import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PermissionsAndroid, Platform} from 'react-native';

export async function requestUserPermission() {
 
  if(Platform.OS == 'android' && Platform.Version >= 33){
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      if(granted == PermissionsAndroid.RESULTS.GRANTED){
              getFCMToken()
      }else{
        console.log('Permission Denied');

      }

    }else{
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        // await messaging().registerDeviceForRemoteMessages();
      if (enabled) {
        console.log('Authorization status:', authStatus);
        await messaging().registerDeviceForRemoteMessages();
        getFCMToken()
      }
    }
}

const getFCMToken = async()=>{
    let fcmToken = await AsyncStorage.getItem('fcmToken')
     console.log(fcmToken,"Fcm old token")
     if(!fcmToken){
        try {
            const fcmToken = await messaging().getToken();
            if(fcmToken){
                console.log(fcmToken,"new generate fcm token")
                await AsyncStorage.setItem('fcmToken',fcmToken)
            }
        } catch (error) {
            
            console.log(error,'error rasied in fcm token ')
        }
     }
  }
  
  export const notificationListener= async()=>{

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:', remoteMessage.notification);
      });

      messaging().onMessage(async remoteMessage => {
         console.log('A new FCM message arrived in foreground mode!', remoteMessage);
          });

      messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
       
        }
      
      });
  }