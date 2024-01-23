import {Alert} from 'react-native';
import strings from '../i18n/strings';

/**
 * start global loader
 */
const startLoader = () => global.props.startLoader();

/**
 * stop global loader
 */
const stopLoader = () => global.props.stopLoader();

/**
 * return wether global loader is start or not
 * @returns {Boolean}
 */
const isLoading = () => global.props.isLoading();

const isConnected = () => global.props.isConnected();

const isNotConnected = () => global.props.isNotConnected();

const isWrongSomthing = () => global.props.isWrongSomthing();

const isNotWrongSomthing = () => global.props.isNotWrongSomthing();

//Show Popup Alert
const showPopupWithOk = (
  title: string,
  message: string,
  okClicked = () => {},
) => {
  Alert.alert(!!title ? title : strings.appName, !!message ? message : '', [
    {text: strings.ok.toUpperCase(), onPress: () => okClicked()},
  ]);
};
//Show Popup with ok and cancel
const showPopupWithOkAndCancel = (
  title: string,
  message: string,
  okClicked = () => {},
  cancelClicked = () => {},
) => {
  Alert.alert(!!title ? title : strings.appName, !!message ? message : '', [
    {
      text: strings.cancel,
      onPress: () => cancelClicked(),
      style: 'cancel',
    },
    {
      text: strings.ok,
      onPress: () => okClicked(),
    },
  ]);
};
const showPopupWithExit = (message: string, okClicked = () => {}) => {
  Alert.alert(strings.appName, !!message ? message : '', [
    {
      text: strings.ok,
      onPress: () => okClicked && okClicked(),
    },
  ]);
};

export {
  startLoader,
  stopLoader,
  isLoading,
  showPopupWithOk,
  showPopupWithOkAndCancel,
  showPopupWithExit,
  isConnected,
  isNotConnected,
  isWrongSomthing,
  isNotWrongSomthing,
};
