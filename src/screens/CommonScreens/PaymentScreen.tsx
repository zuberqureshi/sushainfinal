import {StyleSheet} from 'react-native';
import React from 'react';

// local imports
import CSafeAreaView from '../../components/common/CSafeAreaView';
import CHeader from '../../components/common/CHeader';
import strings from '../../i18n/strings';

export default function PaymentScreen() {
  return (
    <CSafeAreaView>
      <CHeader title={strings.payment} />
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({});
