// libraries imports
import React from 'react';
import {WebView} from 'react-native-webview';
// import {TERMS_URL} from '@env'

// local imports
import CSafeAreaView from '../../components/common/CSafeAreaView';
import CHeader from '../../components/common/CHeader';
import strings from '../../i18n/strings';
import {startLoader, stopLoader} from '../../utils/helpers';

const TermsOfService = () => {
  return (
    <CSafeAreaView>
      <CHeader title={strings.termsOfService} />''
      <WebView
        onLoadStart={startLoader}
        onLoadEnd={stopLoader}
        source={{uri: 'https://sushainclinic.com/terms-user'}}
      />
    </CSafeAreaView>
  );
};

export default TermsOfService;
