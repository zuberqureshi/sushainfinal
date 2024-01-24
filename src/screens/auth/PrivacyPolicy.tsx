// libraries imports
import React from 'react';
import {WebView} from 'react-native-webview';
// import {PRIVACY_URL} from '@env';

// local imports
import {styles} from '../../themes';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import CHeader from '../../components/common/CHeader';

import strings from '../../i18n/strings';
import {startLoader, stopLoader} from '../../utils/helpers';

const PrivacyPolicy = () => {
  return (
    <CSafeAreaView>
      <CHeader title={strings.privacyPolicy} />
      <WebView
        onLoadStart={startLoader}
        onLoadEnd={stopLoader}
        source={{uri: 'https://sushainclinic.com/terms-user'}}
        style={styles.flex}
      />
    </CSafeAreaView>
  );
};

export default PrivacyPolicy;
