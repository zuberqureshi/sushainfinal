import {Dimensions, Platform} from 'react-native';
// import DeviceInfo from 'react-native-device-info';

//Device dimensions
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
export const deviceWidth = viewportWidth;
export const deviceHeight = viewportHeight;

let sampleHeight = 800;
let sampleWidth = 360;

const scale = viewportWidth / 375;

//Device type check
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isTablet = viewportHeight / viewportWidth < 1.6;

//Get Width of Screen
export function getWidth(value: number) {
  return (value / sampleWidth) * deviceWidth;
}

//Get Height of Screen
export function getHeight(value: number) {
  return (value / sampleHeight) * deviceHeight;
}

//Responsive size function
export function moderateScale(size: number) {
  const newSize = size * scale;
  return Math.round(newSize);
}

//AsyncStorage keys
export const ON_BOARDING = 'ON_BOARDING';
export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const USER_DETAIL = 'USER_DETAIL';
export const TOKEN = 'TOKEN';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const TIME_FORMATE = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
export const TIME_YMD = 'YYYYMMDD';

// // get device IP
// export const getDeviceIp = async () => {
//   const ipAddress = await DeviceInfo.getIpAddress();
//   return ipAddress;
// };

// // get Device Name
// export const getDeviceName = async () => {
//   const deviceName = await DeviceInfo.getDeviceName();
//   return deviceName;
// };

// // get Device OS
// export const getDeviceOS = async () => {
//   const deviceOS = await DeviceInfo.getSystemName();
//   return deviceOS;
// };

// // get Device unique ID
// export const getDeviceUniqueId = async () => {
//   const deviceUniqueId = await DeviceInfo.getUniqueId();
//   return deviceUniqueId;
// };

export const getSortedArray = (array: any, key: string) => {
  if (array?.length > 1) {
    return array.sort((a: any, b: any) => {
      if (a[key] < b[key]) {
        return -1;
      }
      if (a[key] > b[key]) {
        return 1;
      }
      return 0;
    });
  } else {
    return array;
  }
};
