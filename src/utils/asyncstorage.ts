import AsyncStorage from '@react-native-async-storage/async-storage';
import {REFRESH_TOKEN, TOKEN, USER_DETAIL} from '../common/constants';

const setUserDetail = async (value: any) => {
  const stringifyData = JSON.stringify(value);
  await AsyncStorage.setItem(USER_DETAIL, stringifyData);
  return true;
};

const getUserDetail = async () => {
  const getUserData = await AsyncStorage.getItem(USER_DETAIL);
  if (!!getUserData) {
    return JSON.parse(getUserData);
  } else {
    return false;
  }
};

const removeUserDetail = async () => {
  await AsyncStorage.removeItem(USER_DETAIL);
};

const setToken = async (value: string) => {
  await AsyncStorage.setItem(TOKEN, value);
  return true;
};

const getToken = async () => {
  const getTokenData = await AsyncStorage.getItem(TOKEN);
  if (!!getTokenData) {
    return getTokenData;
  }
  return false;
};

const removeToken = async () => {
  await AsyncStorage.removeItem(TOKEN);
};

const setRefreshToken = async (value: string) => {
  await AsyncStorage.setItem(REFRESH_TOKEN, value);
  return true;
};

const getRefreshToken = async () => {
  const getTokenData = await AsyncStorage.getItem(REFRESH_TOKEN);
  if (!!getTokenData) {
    return getTokenData;
  }
  return false;
};

const removeRefreshToken = async () => {
  await AsyncStorage.removeItem(REFRESH_TOKEN);
};

const removeAsyncStorageData = async (key: any) => {
  await AsyncStorage.removeItem(key);
};

const setAsyncStorageData = async (key: any, value: any) => {
  const stringifyData = JSON.stringify(value);
  await AsyncStorage.setItem(key, stringifyData);
  return true;
};

const getAsyncStorageData = async (key: any) => {
  const getAsyncData = await AsyncStorage.getItem(key);
  if (!!getAsyncData) {
    return getAsyncData;
  }
  return false;
};

export {
  setUserDetail,
  getUserDetail,
  removeUserDetail,
  setToken,
  getToken,
  removeToken,
  setRefreshToken,
  getRefreshToken,
  removeRefreshToken,
  removeAsyncStorageData,
  setAsyncStorageData,
  getAsyncStorageData
};
