/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/index';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging'
import { register } from "@videosdk.live/react-native-sdk";

register();

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  //Kill state
//   messaging().getInitialNotification(async remoteMessage => {
//     let data = await remoteMessage
//     console.log('Message handled in the Kill state!', data);
//   })

AppRegistry.registerComponent(appName, () => App);
